"use client";

import { useEffect, useRef } from "react";

export default function StarfieldCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;

    (async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x030712);

      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
      );
      camera.position.set(0, 20, 100);

      const renderer = new THREE.WebGLRenderer({ antialias: false });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(1);
      mount.appendChild(renderer.domElement);

      // ── Scroll velocity tracking (internal, no React re-renders) ──
      let lastScrollY = window.scrollY;
      let scrollVelocity = 0;     // smoothed velocity
      let rawVelocity = 0;        // per-frame delta

      const onScroll = () => {
        const delta = Math.abs(window.scrollY - lastScrollY);
        rawVelocity = Math.max(rawVelocity, delta); // capture peak between frames
        lastScrollY = window.scrollY;
      };

      // ── Stars — 3 layers × 1500 particles ──
      const starLayers: InstanceType<typeof THREE.Points>[] = [];
      const starMaterials: InstanceType<typeof THREE.PointsMaterial>[] = [];
      const baseOpacities: number[] = [];
      const baseSizes: number[] = [];

      for (let layer = 0; layer < 3; layer++) {
        const count = 1500;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          pos[i * 3] = (Math.random() - 0.5) * 2400;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 900;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 2400 - 100;
        }
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

        const baseOpacity = 0.6 - layer * 0.1;
        const baseSize = 0.45 + layer * 0.28;
        const mat = new THREE.PointsMaterial({
          color: new THREE.Color(0.85 + layer * 0.05, 0.9 + layer * 0.03, 1.0),
          size: baseSize,
          transparent: true,
          opacity: baseOpacity,
          sizeAttenuation: true,
        });
        const stars = new THREE.Points(geo, mat);
        scene.add(stars);
        starLayers.push(stars);
        starMaterials.push(mat);
        baseOpacities.push(baseOpacity);
        baseSizes.push(baseSize);
      }

      // ── Nebula — 4 planes ──
      const nebulaMeshes: InstanceType<typeof THREE.Mesh>[] = [];
      const nebulaBaseOpacities: number[] = [];
      for (let n = 0; n < 4; n++) {
        const geo = new THREE.PlaneGeometry(
          350 + Math.random() * 350,
          180 + Math.random() * 200
        );
        const hue = 0.58 + Math.random() * 0.18;
        const baseOp = 0.03 + Math.random() * 0.04;
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(hue, 0.55, 0.28),
          transparent: true,
          opacity: baseOp,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 900,
          (Math.random() - 0.5) * 350,
          -150 - Math.random() * 600
        );
        mesh.rotation.z = Math.random() * Math.PI;
        scene.add(mesh);
        nebulaMeshes.push(mesh);
        nebulaBaseOpacities.push(baseOp);
      }

      // ── Mountain silhouettes — 4 layers ──
      const mountainColors = [0x0c1220, 0x0f1828, 0x131e38, 0x17233e];
      for (let m = 0; m < 4; m++) {
        const shape = new THREE.Shape();
        const w = 1000;
        const baseY = -80 - m * 22;
        const peakH = 65 + m * 32;
        shape.moveTo(-w / 2, baseY - 50);
        shape.lineTo(-w / 2, baseY);
        const peaks = 10 + m * 2;
        for (let p = 0; p <= peaks; p++) {
          const x = -w / 2 + (w / peaks) * p;
          const noise =
            Math.sin(p * 0.65 + m * 1.4) * 0.5 +
            Math.sin(p * 1.4 + m * 0.9) * 0.3 +
            Math.sin(p * 2.3 + m * 0.4) * 0.2;
          shape.lineTo(x, baseY + Math.abs(noise) * peakH);
        }
        shape.lineTo(w / 2, baseY);
        shape.lineTo(w / 2, baseY - 50);
        shape.closePath();
        const geo = new THREE.ShapeGeometry(shape);
        const mat = new THREE.MeshBasicMaterial({ color: mountainColors[m], side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.z = -30 - m * 65;
        mesh.position.y = -15;
        scene.add(mesh);
      }

      // ── Shooting stars (occasional streaks) ──
      interface ShootingStar {
        mesh: InstanceType<typeof THREE.Line>;
        velocity: { x: number; y: number; z: number };
        life: number;
        maxLife: number;
      }
      const shootingStars: ShootingStar[] = [];
      let shootTimer = 0;

      const spawnShootingStar = () => {
        const startX = (Math.random() - 0.5) * 1200;
        const startY = 150 + Math.random() * 200;
        const startZ = -100 - Math.random() * 400;
        const dir = new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          -(2 + Math.random() * 3),
          -(Math.random() * 2)
        );
        const points = [
          new THREE.Vector3(startX, startY, startZ),
          new THREE.Vector3(startX + dir.x * 15, startY + dir.y * 15, startZ + dir.z * 15),
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
          color: 0xd4e6ff,
          transparent: true,
          opacity: 0,
          linewidth: 1,
        });
        const line = new THREE.Line(geo, mat);
        scene.add(line);

        shootingStars.push({
          mesh: line,
          velocity: dir.multiplyScalar(3),
          life: 1.0,
          maxLife: 0.8 + Math.random() * 0.6,
        });
      };

      // ── Scroll-driven camera waypoints ──
      const waypoints = [
        { x: 0, y: 20, z: 100 },
        { x: 0, y: 25, z: 60 },
        { x: 0, y: 30, z: -50 },
        { x: 0, y: 40, z: -200 },
        { x: 0, y: 50, z: -350 },
        { x: 0, y: 60, z: -500 },
      ];

      let targetPos = { ...waypoints[0] };
      let currentPos = { ...waypoints[0] };

      const onScrollCam = () => {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        const pct = Math.min(window.scrollY / maxScroll, 1);
        const seg = pct * (waypoints.length - 1);
        const idx = Math.min(Math.floor(seg), waypoints.length - 2);
        const t = seg - idx;
        const a = waypoints[idx];
        const b = waypoints[idx + 1];
        targetPos = {
          x: a.x + (b.x - a.x) * t,
          y: a.y + (b.y - a.y) * t,
          z: a.z + (b.z - a.z) * t,
        };
      };

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("scroll", onScrollCam, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });

      let frameTime = 0;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        frameTime += 0.016;

        // ── Smooth scroll velocity ──
        const factor = rawVelocity > scrollVelocity ? 0.3 : 0.08;
        scrollVelocity += (rawVelocity - scrollVelocity) * factor;
        rawVelocity *= 0.85;
        const speed = Math.min(scrollVelocity / 50, 1); // 0–1 normalized

        // ── Camera interpolation ──
        const f = 0.035;
        currentPos.x += (targetPos.x - currentPos.x) * f;
        currentPos.y += (targetPos.y - currentPos.y) * f;
        currentPos.z += (targetPos.z - currentPos.z) * f;
        camera.position.set(currentPos.x, currentPos.y, currentPos.z);
        camera.lookAt(currentPos.x * 0.3, currentPos.y - 12, currentPos.z - 250);

        // ── Scroll-reactive star behavior ──
        starLayers.forEach((layer, i) => {
          // Base slow rotation
          const baseRotSpeed = 0.00006 * (i + 1);
          // Boost rotation when scrolling fast
          const scrollBoost = 1 + speed * 8;
          layer.rotation.y += baseRotSpeed * scrollBoost;
          layer.rotation.x += (baseRotSpeed * 0.5) * scrollBoost;

          // Opacity pulse: stars brighten dramatically when scrolling
          const opacityBoost = 1 + speed * 1.2;
          starMaterials[i].opacity = Math.min(baseOpacities[i] * opacityBoost, 1.0);

          // Size increase: stars stretch noticeably when scrolling fast
          const sizeBoost = 1 + speed * 0.9;
          starMaterials[i].size = baseSizes[i] * sizeBoost;

          // Color blueshift: stars shift toward bright blue-white during fast scroll
          const r = (0.85 + i * 0.05) - speed * 0.15;
          const g = (0.9 + i * 0.03) - speed * 0.05;
          const b = 1.0 + speed * 0.1;
          starMaterials[i].color.setRGB(
            Math.max(0.6, r),
            Math.max(0.75, g),
            Math.min(1.0, b)
          );
        });

        // ── Breathing nebulae ──
        nebulaMeshes.forEach((mesh, n) => {
          const breathe = Math.sin(frameTime * 0.5 + n * 1.5) * 0.3 + 1;
          const scrollGlow = 1 + speed * 2.5;
          const mat = mesh.material as InstanceType<typeof THREE.MeshBasicMaterial>;
          mat.opacity = Math.min(nebulaBaseOpacities[n] * breathe * scrollGlow, 0.25);

          // Nebulae scale up slightly during fast scroll — "warp" feel
          const nebulaScale = 1 + speed * 0.15;
          mesh.scale.set(nebulaScale, nebulaScale, 1);

          // Gentle drift
          mesh.rotation.z += 0.0001 * (n % 2 === 0 ? 1 : -1);
          mesh.position.y += Math.sin(frameTime * 0.3 + n) * 0.02;
        });

        // ── Shooting stars ──
        shootTimer += 0.016;
        // Spawn more frequently when scrolling
        const spawnInterval = speed > 0.3 ? 0.8 : 3.5;
        if (shootTimer > spawnInterval && shootingStars.length < 5) {
          spawnShootingStar();
          shootTimer = 0;
        }

        // Update shooting stars
        for (let s = shootingStars.length - 1; s >= 0; s--) {
          const ss = shootingStars[s];
          ss.life -= 0.02;

          const positions = ss.mesh.geometry.attributes.position.array as Float32Array;
          for (let p = 0; p < 2; p++) {
            positions[p * 3] += ss.velocity.x;
            positions[p * 3 + 1] += ss.velocity.y;
            positions[p * 3 + 2] += ss.velocity.z;
          }
          ss.mesh.geometry.attributes.position.needsUpdate = true;

          const mat = ss.mesh.material as InstanceType<typeof THREE.LineBasicMaterial>;
          // Fade in then out
          const alpha = ss.life > 0.7 ? (1 - ss.life) / 0.3 : ss.life / 0.7;
          mat.opacity = Math.max(0, alpha * 0.7);

          if (ss.life <= 0) {
            scene.remove(ss.mesh);
            ss.mesh.geometry.dispose();
            (ss.mesh.material as InstanceType<typeof THREE.Material>).dispose();
            shootingStars.splice(s, 1);
          }
        }

        renderer.render(scene, camera);
      };

      animate();

      (mount as any).__threeCleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("scroll", onScrollCam);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      if ((mount as any).__threeCleanup) (mount as any).__threeCleanup();
      else cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
