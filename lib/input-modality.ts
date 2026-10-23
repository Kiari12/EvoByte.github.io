"use client";
import { useEffect, useState } from "react";

/* Tracks whether the last input was a keyboard or a pointer.
   Keyboard-triggered UI never animates (§9.1), so components read this
   and drop their transition to 0. Also mirrored on <html data-input>. */
type Modality = "keyboard" | "pointer";
let current: Modality = "pointer";
const listeners = new Set<(m: Modality) => void>();

function set(m: Modality) {
  if (m === current) return;
  current = m;
  document.documentElement.dataset.input = m;
  listeners.forEach((fn) => fn(m));
}

let installed = false;
export function installInputModality() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  document.documentElement.dataset.input = current;
  addEventListener("keydown", (e) => { if (!e.metaKey && !e.ctrlKey && !e.altKey) set("keyboard"); }, true);
  addEventListener("pointerdown", () => set("pointer"), true);
}

export function useInputModality() {
  const [m, setM] = useState<Modality>(current);
  useEffect(() => {
    listeners.add(setM);
    return () => { listeners.delete(setM); };
  }, []);
  return m;
}
