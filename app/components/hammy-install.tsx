"use client";
import { useState } from "react";
export default function HammyInstall() {
  const [status, setStatus] = useState("Copy");
  async function copy() {
    try {
      await navigator.clipboard.writeText("npm install -g tushar_hammy");
      setStatus("Copied");
    } catch {
      setStatus("Select command to copy");
    }
  }
  return (
    <div className="install-command">
      <span className="mono muted">
        INSTALL HAMMY / FROM THE PROJECT README
      </span>
      <div>
        <code>npm install -g tushar_hammy</code>
        <button onClick={copy} aria-live="polite">
          {status}
        </button>
      </div>
      <a
        href="https://www.npmjs.com/package/tushar_hammy"
        target="_blank"
        rel="noopener noreferrer"
      >
        View npm package ↗
      </a>
    </div>
  );
}
