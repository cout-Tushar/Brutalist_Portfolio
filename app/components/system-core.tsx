import * as THREE from "three";
import { phrases, sampleFormations } from "./particle-formations";

export interface ParticleField {
  setPaused(value: boolean): void;
  setDrift(value: boolean): void;
  dispose(): void;
}

export function createParticleField(
  host: HTMLElement,
  onReady: (ready: boolean) => void,
): ParticleField {
  const mobile = matchMedia("(pointer: coarse)").matches || innerWidth < 680;
  const count = mobile
    ? 7800
    : navigator.hardwareConcurrency <= 4
      ? 20000
      : 30000;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  const canvas = renderer.domElement;
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 1.75));
  renderer.setClearColor(0, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 4000);
  camera.position.z = 2000;
  const geometry = new THREE.BufferGeometry();
  const position = new Float32Array(count * 3);
  const velocity = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const orbit = new Float32Array(count * 3);
  const noise = Float32Array.from({ length: 64 }, () => Math.random() - 0.5);
  const styles = getComputedStyle(host);
  const palette = ["--lime", "--lime", "--lime", "--ink", "--muted"].map(
    (token) => new THREE.Color(styles.getPropertyValue(token).trim()),
  );
  palette.push(palette[0].clone().lerp(palette[4], 0.55));
  for (let i = 0; i < count; i++) {
    seeds[i] = Math.random();
    palette[Math.floor(Math.random() * palette.length)].toArray(colors, i * 3);
    const angle = Math.random() * 2 * Math.PI;
    const band = (Math.random() - 0.5) * 0.5;
    orbit[i * 3] = angle;
    orbit[i * 3 + 1] = band;
    orbit[i * 3 + 2] = Math.random() - 0.5;
  }
  const points = new THREE.BufferAttribute(position, 3).setUsage(
    THREE.DynamicDrawUsage,
  );
  geometry.setAttribute("position", points);
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    uniforms: {
      time: { value: 0 },
      size: { value: 2 },
      dpr: { value: renderer.getPixelRatio() },
    },
    vertexShader: `
      attribute float seed;
      uniform float time, size, dpr;
      varying vec3 tint;
      varying float opacity;
      void main() {
        vec3 p = position;
        p.xy += vec2(sin(time*.68 + seed*103.), cos(time*.54 + seed*91.)) * (.35 + seed*.65);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.);
        gl_PointSize = max(1., dpr * size * (.64 + seed*.84));
        tint = color;
        opacity = .48 + seed*.50;
      }`,
    fragmentShader: `
      varying vec3 tint;
      varying float opacity;
      void main() {
        float radius = length(gl_PointCoord - .5);
        gl_FragColor = vec4(tint, opacity * (1. - smoothstep(.22, .5, radius)));
        #include <colorspace_fragment>
      }`,
  });
  const cloud = new THREE.Points(geometry, material);
  cloud.frustumCulled = false;
  scene.add(cloud);
  let width = 0,
    height = 0,
    active = count,
    phrase = 0,
    age = 0,
    time = 0;
  let formations: ReturnType<typeof sampleFormations>;
  let drift = false,
    paused = false,
    visible = false,
    lost = false,
    frame = 0,
    last = 0;
  let pointerX = 0,
    pointerY = 0,
    hovering = false;
  let interval = 0,
    samples = 0;
  function resize() {
    const w = host.clientWidth,
      h = host.clientHeight;
    if (!w || !h || (w === width && h === height)) return;
    const initial = !width;
    width = w;
    height = h;
    formations = sampleFormations(w, h, count);
    if (initial || paused) position.set(formations[phrase].coords);
    points.needsUpdate = true;
    Object.assign(camera, {
      left: -w / 2,
      right: w / 2,
      top: h / 2,
      bottom: -h / 2,
    });
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    material.uniforms.size.value = dotSize();
    if (!lost) renderer.render(scene, camera);
  }
  function dotSize() {
    return Math.min(
      3.9,
      Math.max(1.1, Math.sqrt(formations[phrase].area / active) * 1.22),
    );
  }
  function locate(e: PointerEvent) {
    const rect = host.getBoundingClientRect();
    const x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    pointerX = x - width / 2;
    pointerY = height / 2 - y;
    hovering = true;
    host.style.setProperty("--px", x + "px");
    host.style.setProperty("--py", y + "px");
  }
  function leave() {
    hovering = false;
    host.style.removeProperty("--px");
    host.style.removeProperty("--py");
  }
  function detonate(e: PointerEvent) {
    if (paused || e.button !== 0) return;
    locate(e);
    const radius = Math.min(210, width * 0.28);
    for (let j = 0; j < active * 3; j += 3) {
      const x = position[j] - pointerX,
        y = position[j + 1] - pointerY;
      const distance = Math.hypot(x, y);
      if (distance >= radius) continue;
      const impulse = 1350 * (1 - distance / radius);
      velocity[j] += (x * impulse) / Math.max(distance, 1);
      velocity[j + 1] += (y * impulse) / Math.max(distance, 1);
      velocity[j + 2] += impulse * (seeds[j / 3] - 0.35);
    }
  }
  function release(e: PointerEvent) {
    if (e.pointerType !== "mouse") leave();
  }
  function tick(now: number) {
    const elapsed = last ? (now - last) / 1000 : 1 / 60;
    last = now;
    const dt = Math.min(elapsed, 0.033);
    time += dt;
    if (!drift && (age += Math.min(elapsed, 0.1)) >= 4.65) {
      age = 0;
      phrase = (phrase + 1) % phrases.length;
      host.dataset.formation = phrases[phrase];
    }
    // Measure sustained frame time; scattered samples span each complete glyph at any draw count.
    interval += elapsed;
    samples++;
    if (samples >= 75) {
      if (interval / samples > 0.023)
        active = Math.max(mobile ? 2600 : 6500, Math.floor(active * 0.78));
      else if (interval / samples < 0.0175)
        active = Math.min(count, active + 700);
      geometry.setDrawRange(0, active);
      interval = 0;
      samples = 0;
    }
    const goal = formations[phrase].coords;
    const damping = Math.exp(-8 * dt),
      pull = 43 * dt;
    const radius = Math.min(102, width * 0.17),
      radius2 = radius * radius;
    const phase = time * 0.26;
    for (let i = 0, j = 0; i < active; i++, j += 3) {
      let x = goal[j],
        y = goal[j + 1],
        z = goal[j + 2];
      if (drift) {
        const a = orbit[j] + phase,
          band = orbit[j + 1],
          grain = orbit[j + 2];
        // Periodic value noise bends adjacent strands together without a seam.
        const u = (a + band * 0.3) * (64 / (2 * Math.PI));
        const cell = Math.floor(u),
          f = u - cell,
          blend = f * f * (3 - 2 * f);
        const ripple =
          noise[cell & 63] * (1 - blend) + noise[(cell + 1) & 63] * blend;
        const wave = Math.sin(3 * a + phase + band) + ripple * 0.12;
        const ring =
          0.71 + 0.23 * Math.cos(3 * a - phase) + 0.2 * band + 0.045 * grain;
        x = Math.cos(2 * a + band) * ring * width * 0.43;
        y =
          (wave * 0.53 + 0.33 * Math.sin(2 * a) + band * 0.6 + grain * 0.07) *
          height *
          0.4;
        z = Math.sin(2 * a + band) * ring * height * 0.35;
      }
      const dx = position[j] - pointerX,
        dy = position[j + 1] - pointerY;
      const dist2 = dx * dx + dy * dy;
      if (hovering && dist2 < radius2) {
        const dist = Math.max(1, Math.sqrt(dist2));
        const push = ((1 - dist / radius) * radius * 2) / dist;
        x += dx * push;
        y += dy * push;
      }
      velocity[j] = (velocity[j] + (x - position[j]) * pull) * damping;
      velocity[j + 1] =
        (velocity[j + 1] + (y - position[j + 1]) * pull) * damping;
      velocity[j + 2] =
        (velocity[j + 2] + (z - position[j + 2]) * pull) * damping;
      position[j] += velocity[j] * dt;
      position[j + 1] += velocity[j + 1] * dt;
      position[j + 2] += velocity[j + 2] * dt;
    }
    cloud.rotation.y +=
      ((hovering ? (pointerX / width) * 0.16 : 0) - cloud.rotation.y) * dt * 5;
    cloud.rotation.x +=
      ((hovering ? (-pointerY / height) * 0.11 : 0) - cloud.rotation.x) *
      dt *
      5;
    material.uniforms.time.value = time;
    material.uniforms.size.value +=
      (dotSize() - material.uniforms.size.value) * dt * 6;
    points.clearUpdateRanges();
    points.addUpdateRange(0, active * 3);
    points.needsUpdate = true;
    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    cancelAnimationFrame(frame);
    last = 0;
    interval = 0;
    samples = 0;
    if (!document.hidden && visible && !paused && !lost)
      frame = requestAnimationFrame(tick);
  }
  function contextLost(e: Event) {
    e.preventDefault();
    lost = true;
    onReady(false);
    schedule();
  }
  function restored() {
    lost = false;
    renderer.render(scene, camera);
    onReady(true);
    schedule();
  }
  const resizeObserver = new ResizeObserver(resize);
  const viewport = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });
  function dispose() {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    viewport.disconnect();
    document.removeEventListener("visibilitychange", schedule);
    host.removeEventListener("pointermove", locate);
    host.removeEventListener("pointerleave", leave);
    host.removeEventListener("pointerdown", detonate);
    host.removeEventListener("pointerup", release);
    host.removeEventListener("pointercancel", leave);
    canvas.removeEventListener("webglcontextlost", contextLost);
    canvas.removeEventListener("webglcontextrestored", restored);
    leave();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  }
  try {
    host.append(canvas);
    host.dataset.formation = phrases[phrase];
    resize();
    resizeObserver.observe(host);
    viewport.observe(host);
    document.addEventListener("visibilitychange", schedule);
    host.addEventListener("pointermove", locate);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointerdown", detonate);
    host.addEventListener("pointerup", release);
    host.addEventListener("pointercancel", leave);
    canvas.addEventListener("webglcontextlost", contextLost);
    canvas.addEventListener("webglcontextrestored", restored);
    onReady(true);
  } catch (error) {
    dispose();
    throw error;
  }
  return {
    dispose,
    setPaused(value) {
      paused = value;
      schedule();
    },
    setDrift(value) {
      drift = value;
    },
  };
}
