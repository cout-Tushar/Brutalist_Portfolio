"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const Core = dynamic(() => import("./system-core"), { ssr: false });

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Tushar Mishra home">
        tm<span>.</span>
      </a>
      <span className="header-note">ENGINEERING WITH INTENT</span>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="navigation"
        className={open ? "open" : ""}
        aria-label="Main navigation"
      >
        {[
          ["Work", "work"],
          ["Approach", "approach"],
          ["About", "about"],
          ["Contact ↗", "contact"],
        ].map(([label, id]) => (
          <a href={"#" + id} key={id} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function MotionLayer() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    let dead = false;
    async function setup() {
      dispose();
      if (media.matches || dead) return;
      let lenis: import("lenis").default | undefined;
      let stopped = false;
      const progress = document.querySelector<HTMLElement>(".scroll-progress");
      const update = () => {
        progress?.style.setProperty(
          "--progress",
          String(
            window.scrollY /
              Math.max(1, document.documentElement.scrollHeight - innerHeight),
          ),
        );
      };
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("entered");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
      const elements = [
        ...document.querySelectorAll<HTMLElement>(
          "[data-magnetic], [data-tilt]",
        ),
      ];
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const el = event.currentTarget as HTMLElement,
          r = el.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - 0.5,
          y = (event.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--mx", x * 9 + "px");
        el.style.setProperty("--my", y * 9 + "px");
        el.style.setProperty("--rx", -y * 3 + "deg");
        el.style.setProperty("--ry", x * 4 + "deg");
      };
      const reset = (event: PointerEvent) => {
        (event.currentTarget as HTMLElement).removeAttribute("style");
      };
      elements.forEach((el) => {
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", reset);
      });
      window.addEventListener("scroll", update, { passive: true });
      update();
      dispose = () => {
        stopped = true;
        lenis?.destroy();
        observer.disconnect();
        window.removeEventListener("scroll", update);
        elements.forEach((el) => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", reset);
          el.removeAttribute("style");
        });
      };
      if (matchMedia("(pointer:fine)").matches) {
        const { default: Lenis } = await import("lenis");
        if (!stopped && !dead)
          lenis = new Lenis({
            autoRaf: true,
            anchors: true,
            duration: 0.85,
            smoothWheel: true,
          });
      }
    }
    void setup();
    media.addEventListener("change", setup);
    return () => {
      dead = true;
      dispose();
      media.removeEventListener("change", setup);
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}

export function HeroCore() {
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = matchMedia(
      "(min-width: 850px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <div className="core-wrap">
      <div className="core-coordinate mono">FIG. 01 / CONNECTED SYSTEMS</div>
      <div className="core-fallback" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <div className="core-chip">
          TM<span>ENGINEERING CORE</span>
        </div>
      </div>
      {enabled && <Core paused={paused} />}
      <span className="core-label label-api">01 / API</span>
      <span className="core-label label-data">02 / DATA</span>
      <span className="core-label label-events">03 / EVENTS</span>
      <div className="core-caption mono">
        <span>
          <i className="status-dot" /> SYSTEMS, CONNECTED.
        </span>
        {enabled && (
          <button onClick={() => setPaused(!paused)} aria-pressed={paused}>
            {paused ? "Resume motion" : "Pause motion"}
          </button>
        )}
      </div>
    </div>
  );
}

const steps = [
  {
    name: "Request",
    code: "01 / ENTRY POINT",
    title: "Start with a clear contract.",
    body: "A client requests a resource through a defined API. Explicit inputs and predictable responses make the interface easier to integrate and maintain.",
    note: "REST APIs · Node.js · Express.js",
  },
  {
    name: "Identity",
    code: "02 / AUTHENTICATION",
    title: "Know who is asking.",
    body: "Authentication establishes the caller’s identity. Co-Op Code combines JWT authentication with password hashing, login, signup, and password reset.",
    note: "Project connection: Co-Op Code",
  },
  {
    name: "Permission",
    code: "03 / AUTHORIZATION",
    title: "Identity is only the beginning.",
    body: "BuildCore separates access for administrators, supervisors, and engineers. Role checks and resource ownership are distinct concerns when working across construction sites.",
    note: "Project connection: BuildCore ERP",
  },
  {
    name: "Data",
    code: "04 / PERSISTENCE",
    title: "Make the data model do its job.",
    body: "BuildCore uses PostgreSQL and Prisma for construction workflows. Co-Op Code uses MongoDB for user management and persistent application data.",
    note: "PostgreSQL · Prisma · MongoDB",
  },
  {
    name: "Response",
    code: "05 / FEEDBACK",
    title: "Close the loop.",
    body: "Return a useful response to the caller. For collaborative editing, Socket.io carries live changes between connected clients.",
    note: "Project connection: Co-Op Code",
  },
];
export function Architecture() {
  const [active, setActive] = useState(0);
  return (
    <div className="architecture">
      <div className="flow" aria-label="Explore the request lifecycle">
        {steps.map((step, i) => (
          <button
            key={step.name}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-controls="flow-detail"
          >
            <span className="node">{["↗", "◎", "◇", "▤", "↙"][i]}</span>
            <span className="mono">{step.name}</span>
            <small>0{i + 1}</small>
          </button>
        ))}
      </div>
      <div id="flow-detail" className="flow-detail" aria-live="polite">
        <span className="mono accent">{steps[active].code}</span>
        <h3>{steps[active].title}</h3>
        <p>{steps[active].body}</p>
        <span className="mono flow-note">{steps[active].note}</span>
      </div>
      <p className="illustration-note">
        Conceptual request lifecycle, with examples from my projects. Not a
        production topology.
      </p>
    </div>
  );
}

export function ProjectDemo({ type }: { type: string }) {
  const [selected, setSelected] = useState(0);
  if (type === "buildcore")
    return (
      <div className="product-demo buildcore-demo" data-tilt>
        <div className="window-bar">
          <span className="window-dots">● ● ●</span>
          <span>buildcore / workspace</span>
          <span>↗</span>
        </div>
        <div className="erp-layout">
          <aside>
            <strong>
              B<span> / CORE</span>
            </strong>
            <span className="selected">▦ Overview</span>
            <span>◈ Sites</span>
            <span>▤ Inventory</span>
            <span>◎ Workforce</span>
            <span>↗ Reports</span>
            <small>
              WORKSPACE
              <br />
              Construction operations
            </small>
          </aside>
          <div className="erp-main">
            <div className="mono">WORKSPACE / OVERVIEW</div>
            <h4>
              Every site.
              <br />
              One source of truth.
            </h4>
            <div className="demo-tabs">
              {["Operations", "Inventory", "Workforce"].map((x, i) => (
                <button
                  key={x}
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className="erp-chart" aria-hidden="true">
              {[35, 65, 45, 80, 58, 92, 72, 100, 85, 65, 90, 110].map(
                (h, i) => (
                  <i
                    key={i}
                    style={{
                      height:
                        h * (selected === 1 ? 0.75 : selected === 2 ? 0.55 : 1),
                    }}
                  />
                ),
              )}
            </div>
            <div className="erp-row">
              <span>
                {
                  [
                    "Site workflows",
                    "Material requests",
                    "Attendance tracking",
                  ][selected]
                }
              </span>
              <b>Connected ↗</b>
            </div>
            <div className="erp-row">
              <span>Role-based workspace</span>
              <b>Protected ◇</b>
            </div>
          </div>
        </div>
        <span className="demo-badge">INTERFACE ILLUSTRATION / SAMPLE DATA</span>
      </div>
    );
  if (type === "coop")
    return (
      <div className="product-demo editor-demo" data-tilt>
        <div className="window-bar">
          <span className="window-dots">● ● ●</span>
          <span>co-op code / shared editor</span>
          <span className="accent">● connected</span>
        </div>
        <div className="editor-tab">
          workspace.ts <span>×</span>
        </div>
        <pre aria-label="Illustrative collaborative editing code">
          <code>
            <span className="muted">01 </span>
            <span className="orange">const</span> workspace = &#123;{"\n"}
            <span className="muted">02 </span> idea:{" "}
            <span className="accent">&quot;Build together&quot;</span>,{"\n"}
            <span className="muted">03 </span> transport:{" "}
            <span className="accent">&quot;Socket.io&quot;</span>,{"\n"}
            <span className="muted">04 </span> collaboration:{" "}
            <span className="orange">true</span>
            {"\n"}
            <span className="muted">05 </span>&#125;;{"\n\n"}
            <span className="muted">07 // One workspace. Shared context.</span>
          </code>
        </pre>
        <span className="collab-cursor">
          ↖ <b>Collaborator</b>
        </span>
        <div className="editor-status mono">
          <span>◉ Live synchronization</span>
          <span>TypeScript</span>
        </div>
        <span className="demo-badge">
          COLLABORATION ILLUSTRATION / SAMPLE CODE
        </span>
      </div>
    );
  return (
    <div className="product-demo terminal-demo" data-tilt>
      <div className="window-bar">
        <span className="window-dots">● ● ●</span>
        <span>hammy / developer toolkit</span>
        <span>_</span>
      </div>
      <div className="terminal-content">
        <span className="mono accent">LESS CONTEXT SWITCHING.</span>
        <h4>
          Meet your API.
          <br />
          From the terminal.
        </h4>
        <div className="terminal-options">
          {["Execute", "Save", "Explain"].map((label, i) => (
            <button
              key={label}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              {label} ↗
            </button>
          ))}
        </div>
        <p key={selected} className="terminal-description">
          {
            [
              "Send HTTP requests directly from a command-line workflow.",
              "Keep requests and collections in persistent local storage.",
              "Use Groq-powered AI to review requests and explain responses.",
            ][selected]
          }
        </p>
      </div>
      <span className="demo-badge">CAPABILITY EXPLORER / NOT CLI OUTPUT</span>
    </div>
  );
}

export function SkillExplorer({
  groups,
}: {
  groups: Record<string, string[]>;
}) {
  const names = Object.keys(groups);
  const [active, setActive] = useState(names[0]);
  return (
    <div className="skill-explorer">
      <div className="skill-categories" aria-label="Skill categories">
        {names.map((name, i) => (
          <button
            aria-pressed={active === name}
            aria-controls="skill-content"
            key={name}
            onClick={() => setActive(name)}
          >
            <span className="mono">0{i + 1}</span>
            {name}
            <span>↗</span>
          </button>
        ))}
      </div>
      <div id="skill-content" className="skill-content">
        <span className="mono muted">MY TOOLBOX / {active.toUpperCase()}</span>
        <ul>
          {groups[active].map((item) => (
            <li key={item}>
              {item}
              <span>↗</span>
            </li>
          ))}
        </ul>
        <p>Chosen for the problem. Connected by strong fundamentals.</p>
      </div>
    </div>
  );
}
