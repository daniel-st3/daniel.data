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
      renderer.setPixelRatio(1); // lock to 1x for performance
      mount.appendChild(renderer.domElement);

      // Stars — 3 layers × 1500 particles
      const starLayers: InstanceType<typeof THREE.Points>[] = [];
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
        const mat = new THREE.PointsMaterial({
          color: new THREE.Color(0.85 + layer * 0.05, 0.9 + layer * 0.03, 1.0),
          size: 0.45 + layer * 0.28,
          transparent: true,
          opacity: 0.6 - layer * 0.1,
          sizeAttenuation: true,
        });
        const stars = new THREE.Points(geo, mat);
        scene.add(stars);
        starLayers.push(stars);
      }

      // Nebula — 4 planes
      for (let n = 0; n < 4; n++) {
        const geo = new THREE.PlaneGeometry(
          350 + Math.random() * 350,
          180 + Math.random() * 200
        );
        const hue = 0.58 + Math.random() * 0.18;
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(hue, 0.55, 0.28),
          transparent: true,
          opacity: 0.03 + Math.random() * 0.04,
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
      }

      // Mountain silhouettes — 4 layers
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

      // Scroll-driven camera waypoints
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

      const onScroll = () => {
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
      window.addEventListener("resize", onResize, { passive: true });

      const animate = () => {
        animId = requestAnimationFrame(animate);

        const f = 0.035;
        currentPos.x += (targetPos.x - currentPos.x) * f;
        currentPos.y += (targetPos.y - currentPos.y) * f;
        currentPos.z += (targetPos.z - currentPos.z) * f;
        camera.position.set(currentPos.x, currentPos.y, currentPos.z);
        camera.lookAt(currentPos.x * 0.3, currentPos.y - 12, currentPos.z - 250);

        starLayers.forEach((layer, i) => {
          layer.rotation.y += 0.00006 * (i + 1);
          layer.rotation.x += 0.00003 * (i + 1);
        });

        renderer.render(scene, camera);
      };

      animate();

      (mount as any).__threeCleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("scroll", onScroll);
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
