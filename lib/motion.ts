export const EASE_OUT = [0.23, 1, 0.32, 1] as const; // default
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const; // moving A → B
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const; // sheets, drawers

export const DUR = { instant: 0.1, fast: 0.16, base: 0.22, slow: 0.32, hero: 0.5 } as const;

/* For gestures or interruptible movement: a spring with no bounce */
export const SPRING = { type: "spring", duration: 0.4, bounce: 0 } as const;
