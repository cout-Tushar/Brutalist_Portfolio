"use client";
import { useEffect, useRef, useState } from "react";
import type { ParticleField } from "./system-core";
import "./particle-hero.css";

export default function ParticleHero({ resume }: { resume: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const field = useRef<ParticleField | null>(null);
  const [ready, setReady] = useState(false);
  const [drift, setDrift] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let revision = 0;
    async function setup() {
      const current = ++revision;
      field.current?.dispose();
      field.current = null;
      setReady(false);
      setPaused(false);
      setDrift(false);
      if (motion.matches) return;
      try {
        const { createParticleField } = await import("./system-core");
        if (current !== revision || !stage.current) return;
        field.current = createParticleField(stage.current, setReady);
      } catch {
        setReady(false);
      }
    }
    void setup();
    motion.addEventListener("change", setup);
    return () => {
      revision++;
      motion.removeEventListener("change", setup);
      field.current?.dispose();
      field.current = null;
    };
  }, []);

  function mode(value: boolean) {
    setDrift(value);
    setPaused(false);
    field.current?.setDrift(value);
    field.current?.setPaused(false);
  }

  return (
    <section
      className="particle-hero shell"
      id="top"
      aria-labelledby="hero-name"
    >
      <div className="field-header mono">
        <span>DELHI, INDIA</span>
        <span>
          <i className="status-dot" />
          OPEN TO OPPORTUNITIES
        </span>
      </div>
      <div className="field-frame">
        <div className="particle-stage" ref={stage} aria-hidden="true" />
        <h1
          id="hero-name"
          className={ready ? "field-name accessible-name" : "field-name"}
        >
          Tushar Mishra
        </h1>
      </div>
      <div className="field-info">
        <div className="field-intro">
          <p className="field-motto">
            MAKE IT <em>WORK.</em>
          </p>
          <p>
            I’m Tushar, a full-stack developer building dependable APIs,
            real-time applications, and developer tools.
          </p>
          <div className="field-actions">
            <a className="button primary" href="#work">
              View Projects <span aria-hidden="true">↓</span>
            </a>
            <a className="button" href="#contact">
              Contact Me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        {ready && (
          <div className="field-controls mono">
            <span className="field-pointer-hint">
              MOVE TO PUSH · CLICK TO DETONATE
            </span>
            <span className="field-touch-hint">
              DRAG TO PUSH · TAP TO DETONATE
            </span>
            <div className="field-switches">
              <div role="group" aria-label="Particle mode">
                <button aria-pressed={!drift} onClick={() => mode(false)}>
                  FORM
                </button>
                <button aria-pressed={drift} onClick={() => mode(true)}>
                  DRIFT
                </button>
              </div>
              <button
                className="pause-field"
                aria-label={paused ? "Resume motion" : "Pause motion"}
                aria-pressed={paused}
                onClick={() => {
                  field.current?.setPaused(!paused);
                  setPaused(!paused);
                }}
              >
                {paused ? "▶" : "Ⅱ"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="field-footer mono">
        <a href="#work">↓ &nbsp; SCROLL TO EXPLORE</a>
        <a href={resume} target="_blank" rel="noopener noreferrer">
          View resume ↗
        </a>
      </div>
    </section>
  );
}
