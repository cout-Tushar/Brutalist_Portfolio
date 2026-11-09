"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SystemCore({ paused }: { paused: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const pause = useRef(paused);
  useEffect(() => {
    pause.current = paused;
  }, [paused]);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0.7, 9);
    camera.lookAt(0, 0, 0);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0, 0);
    el.appendChild(renderer.domElement);
    const root = new THREE.Group();
    scene.add(root);
    const copper = new THREE.MeshStandardMaterial({
      color: 0xe58558,
      metalness: 0.7,
      roughness: 0.28,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x292c29,
      metalness: 0.8,
      roughness: 0.35,
    });
    const lime = new THREE.MeshStandardMaterial({
      color: 0xd0ed8c,
      emissive: 0x91b34e,
      emissiveIntensity: 0.55,
      metalness: 0.3,
      roughness: 0.3,
    });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(0.91, 0), dark);
    root.add(shell);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(shell.geometry),
      new THREE.LineBasicMaterial({ color: 0xeaae80 }),
    );
    root.add(edges);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.45 + i * 0.3, 0.035, 8, 120),
        i === 1 ? lime : copper,
      );
      ring.rotation.set(0.6 + i * 0.65, i * 0.9, i * 0.4);
      root.add(ring);
      for (let j = 0; j < 3; j++) {
        const angle = (j / 3) * Math.PI * 2;
        const node = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.16, 0.16),
          i === 1 ? lime : copper,
        );
        node.position.set(
          Math.cos(angle) * (1.45 + i * 0.3),
          Math.sin(angle) * (1.45 + i * 0.3),
          0,
        );
        ring.add(node);
      }
    }
    for (let i = 0; i < 7; i++) {
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, 0.035, 0.85),
        i % 2 ? copper : dark,
      );
      plate.position.y = -0.5 + i * 0.17;
      plate.rotation.y = Math.PI / 4;
      root.add(plate);
    }
    scene.add(new THREE.HemisphereLight(0xfff1dd, 0x344334, 3));
    const light = new THREE.DirectionalLight(0xffa06c, 5);
    light.position.set(2, 3, 4);
    scene.add(light);
    const rim = new THREE.DirectionalLight(0xc3ff93, 3);
    rim.position.set(-4, 1, -2);
    scene.add(rim);
    let frame = 0,
      visible = true,
      x = 0,
      y = 0,
      tick = 0;
    const resize = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      renderer.setSize(r.width, r.height);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();
    const move = (event: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = ((event.clientX - r.left) / r.width - 0.5) * 0.5;
      y = ((event.clientY - r.top) / r.height - 0.5) * 0.3;
    };
    const leave = () => {
      x = 0;
      y = 0;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    const animate = () => {
      if (visible && !document.hidden) {
        if (!pause.current) {
          tick += 0.002;
          root.rotation.y += (tick + x - root.rotation.y) * 0.035;
          root.rotation.x += (y + 0.2 - root.rotation.x) * 0.035;
        }
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(animate);
    };
    const viewport = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    viewport.observe(el);
    const lost = (event: Event) => {
      event.preventDefault();
      el.style.opacity = "0";
    };
    const restored = () => {
      el.style.opacity = "1";
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    renderer.domElement.addEventListener("webglcontextrestored", restored);
    animate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          materials.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);
  return <div ref={host} className="webgl-core" aria-hidden="true" />;
}
