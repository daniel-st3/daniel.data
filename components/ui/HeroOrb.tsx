"use client";

import { useEffect, useRef } from "react";

export default function HeroOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;

    (async () => {
      const THREE = await import("three");

      const width = mount.clientWidth || 480;
      const height = mount.clientHeight || 480;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.z = 3.8;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // --- Particle sphere (Fibonacci distribution) ---
      const particleCount = 280;
      const radius = 1.4;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const positions: any[] = [];

      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        positions.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
          )
        );
      }

      // Particle points
      const ptGeo = new THREE.BufferGeometry();
      const ptPos = new Float32Array(particleCount * 3);
      positions.forEach((p, i) => {
        ptPos[i * 3] = p.x;
        ptPos[i * 3 + 1] = p.y;
        ptPos[i * 3 + 2] = p.z;
      });
      ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));

      const ptMat = new THREE.PointsMaterial({
        color: 0x7096c8,
        size: 0.035,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
      });
      const ptMesh = new THREE.Points(ptGeo, ptMat);

      // Connection lines between nearby particles
      const lineVerts: number[] = [];
      const maxDist = 0.52;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          if (positions[i].distanceTo(positions[j]) < maxDist) {
            lineVerts.push(
              positions[i].x, positions[i].y, positions[i].z,
              positions[j].x, positions[j].y, positions[j].z
            );
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(lineVerts), 3)
      );
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x4a6fa5,
        transparent: true,
        opacity: 0.22,
      });
      const lineMesh = new THREE.LineSegments(lineGeo, lineMat);

      // Subtle inner glow sphere
      const glowGeo = new THREE.SphereGeometry(1.3, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x1a3a6a,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);

      // Group everything
      const group = new THREE.Group();
      group.add(glowMesh);
      group.add(lineMesh);
      group.add(ptMesh);
      scene.add(group);

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        const rect = mount.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      mount.addEventListener("mousemove", onMouseMove);

      // Resize
      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // Animate
      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.004;

        // Slow base rotation + subtle mouse tilt
        group.rotation.y = t * 0.4 + mouseX * 0.3;
        group.rotation.x = Math.sin(t * 0.2) * 0.15 + mouseY * 0.15;

        // Gentle breathing scale
        const scale = 1 + Math.sin(t * 0.8) * 0.018;
        group.scale.setScalar(scale);

        renderer.render(scene, camera);
      };
      animate();

      (mount as any).__orbCleanup = () => {
        cancelAnimationFrame(animId);
        mount.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        ptGeo.dispose();
        lineGeo.dispose();
        glowGeo.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      if ((mount as any).__orbCleanup) (mount as any).__orbCleanup();
      else cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", minHeight: 400 }}
    />
  );
}
