import React from "react";
import styled from "styled-components";

const Loader = ({ size = 72, text = "Loading" }) => {
  const px = typeof size === "number" ? `${size}px` : size;

  return (
    <Wrapper style={{ "--s": px }}>
      <div
        className="stage"
        role="status"
        aria-live="polite"
        aria-label={text || "Loading"}
      >
        {/* Ambient halo */}
        <span className="ambient" aria-hidden="true" />

        {/* Outer conic sweep ring */}
        <span className="ring ring-outer" aria-hidden="true" />

        {/* Dotted middle ring */}
        <span className="ring ring-dots" aria-hidden="true" />

        {/* Inner dual-arc ring */}
        <span className="ring ring-arc" aria-hidden="true" />

        {/* Orbiting sparks */}
        <span className="orbit orbit-a" aria-hidden="true">
          <i />
        </span>
        <span className="orbit orbit-b" aria-hidden="true">
          <i />
        </span>
        <span className="orbit orbit-c" aria-hidden="true">
          <i />
        </span>

        {/* Glass core */}
        <span className="core" aria-hidden="true">
          <span className="core-flare" />
        </span>
      </div>

      {text && (
        <div className="caption">
          <span className="caption-text">{text}</span>
          <span className="caption-dots" aria-hidden="true">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      )}
    </Wrapper>
  );
};

/* =========================================================
   STYLES
========================================================= */

const Wrapper = styled.div`
  /* Palette (HSL triplets for easy alpha) */
  --c-1: 214 97% 59%; /* blue   */
  --c-2: 280 90% 65%; /* violet */
  --c-3: 330 90% 65%; /* pink   */
  --c-4: 190 95% 55%; /* cyan   */

  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 24px;

  /* =======================================================
     STAGE (everything scales from --s)
  ======================================================= */
  .stage {
    position: relative;
    width: var(--s, 72px);
    height: var(--s, 72px);
    display: grid;
    place-items: center;
    isolation: isolate;
  }

  /* -------------------------------------------------------
     Ambient halo
  ------------------------------------------------------- */
  .ambient {
    position: absolute;
    inset: -38%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      hsl(var(--c-1) / 0.22) 0%,
      hsl(var(--c-2) / 0.14) 32%,
      hsl(var(--c-3) / 0.07) 52%,
      transparent 72%
    );
    filter: blur(14px);
    z-index: -1;
    animation: halo 2.6s ease-in-out infinite;
    pointer-events: none;
  }

  /* -------------------------------------------------------
     Rings (shared)
  ------------------------------------------------------- */
  .ring {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
  }

  /* Outer — conic gradient masked into a ring */
  .ring-outer {
    inset: 0;
    background: conic-gradient(
      from 0deg,
      transparent 0%,
      hsl(var(--c-1)) 12%,
      hsl(var(--c-4)) 28%,
      hsl(var(--c-2)) 46%,
      hsl(var(--c-3)) 62%,
      transparent 78%
    );
    -webkit-mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 2.5px),
      #000 calc(100% - 2.5px) 100%
    );
    mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 2.5px),
      #000 calc(100% - 2.5px) 100%
    );
    animation: spin 2.6s linear infinite;
    filter: drop-shadow(0 0 8px hsl(var(--c-1) / 0.5));
  }

  /* Middle — dotted ring via repeating-conic */
  .ring-dots {
    inset: 15%;
    background: repeating-conic-gradient(
      from 0deg,
      hsl(var(--c-2) / 0.9) 0deg 5deg,
      transparent 5deg 22deg
    );
    -webkit-mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 2px),
      #000 calc(100% - 2px) 100%
    );
    mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 2px),
      #000 calc(100% - 2px) 100%
    );
    animation: spin-rev 3.4s linear infinite;
    opacity: 0.95;
  }

  /* Inner — dual arc ring */
  .ring-arc {
    inset: 30%;
    border: 2px solid transparent;
    border-top-color: hsl(var(--c-3));
    border-right-color: hsl(var(--c-1));
    animation: spin 1.5s linear infinite;
    filter: drop-shadow(0 0 6px hsl(var(--c-3) / 0.6));
  }
  .ring-arc::before {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px solid transparent;
    border-bottom-color: hsl(var(--c-4) / 0.75);
    border-left-color: hsl(var(--c-4) / 0.45);
    animation: spin-rev 2.2s linear infinite;
  }

  /* -------------------------------------------------------
     Orbiting sparks
  ------------------------------------------------------- */
  .orbit {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    animation: spin linear infinite;
    pointer-events: none;
    will-change: transform;
  }
  .orbit i {
    position: absolute;
    top: -3px;
    left: 50%;
    width: 6px;
    height: 6px;
    margin-left: -3px;
    border-radius: 50%;
    display: block;
  }

  .orbit-a {
    animation-duration: 4s;
  }
  .orbit-a i {
    background: hsl(var(--c-1));
    box-shadow:
      0 0 8px hsl(var(--c-1) / 0.9),
      0 0 18px hsl(var(--c-1) / 0.5);
  }

  .orbit-b {
    inset: 15%;
    animation-duration: 5.4s;
    animation-direction: reverse;
  }
  .orbit-b i {
    background: hsl(var(--c-3));
    box-shadow:
      0 0 8px hsl(var(--c-3) / 0.9),
      0 0 18px hsl(var(--c-3) / 0.5);
  }

  .orbit-c {
    inset: 30%;
    animation-duration: 3.1s;
  }
  .orbit-c i {
    background: hsl(var(--c-4));
    box-shadow:
      0 0 8px hsl(var(--c-4) / 0.9),
      0 0 18px hsl(var(--c-4) / 0.5);
  }

  /* -------------------------------------------------------
     Glass core
  ------------------------------------------------------- */
  .core {
    position: relative;
    width: 26%;
    height: 26%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 32% 28%,
      hsl(0 0% 100% / 0.95) 0%,
      hsl(var(--c-1) / 0.95) 25%,
      hsl(var(--c-1)) 45%,
      hsl(var(--c-2)) 80%
    );
    box-shadow:
      0 0 10px hsl(var(--c-1) / 0.75),
      0 0 26px hsl(var(--c-2) / 0.45),
      0 0 44px hsl(var(--c-3) / 0.2),
      inset 0 -2px 4px hsl(var(--c-2) / 0.65),
      inset 0 1px 2px hsl(0 0% 100% / 0.7);
    animation: breathe 1.8s ease-in-out infinite;
  }
  .core-flare {
    position: absolute;
    inset: 14%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 25%,
      hsl(0 0% 100% / 0.9),
      transparent 62%
    );
    opacity: 0.85;
    animation: flare 2.2s ease-in-out infinite;
  }

  /* -------------------------------------------------------
     Caption (gradient shimmer text)
  ------------------------------------------------------- */
  .caption {
    margin-top: calc(var(--s, 72px) * 0.32);
    display: inline-flex;
    align-items: baseline;
    gap: 1px;
    font-size: clamp(10px, calc(var(--s, 72px) * 0.16), 14px);
    font-weight: 600;
    letter-spacing: 0.34em;
    text-transform: uppercase;
    user-select: none;
    line-height: 1;
  }

  .caption-text {
    background: linear-gradient(
      90deg,
      hsl(220 14% 40%) 0%,
      hsl(var(--c-1)) 32%,
      hsl(var(--c-2)) 52%,
      hsl(var(--c-3)) 70%,
      hsl(220 14% 40%) 100%
    );
    background-size: 220% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shimmer 3s linear infinite;
    padding-right: 0.06em;
  }

  .caption-dots {
    display: inline-flex;
    align-items: baseline;
  }
  .caption-dots span {
    display: inline-block;
    opacity: 0;
    color: hsl(var(--c-1));
    text-shadow: 0 0 8px hsl(var(--c-1) / 0.7);
    animation: dot-blink 1.4s infinite;
    line-height: 1;
  }
  .caption-dots span:nth-child(2) {
    animation-delay: 0.18s;
  }
  .caption-dots span:nth-child(3) {
    animation-delay: 0.36s;
  }

  /* -------------------------------------------------------
     Dark mode
  ------------------------------------------------------- */
  @media (prefers-color-scheme: dark) {
    .caption-text {
      background: linear-gradient(
        90deg,
        hsl(220 14% 62%) 0%,
        hsl(var(--c-4)) 32%,
        hsl(var(--c-1)) 52%,
        hsl(var(--c-2)) 70%,
        hsl(220 14% 62%) 100%
      );
      background-size: 220% 100%;
      -webkit-background-clip: text;
      background-clip: text;
    }
    .ring-outer {
      filter: drop-shadow(0 0 10px hsl(var(--c-1) / 0.65));
    }
    .core {
      box-shadow:
        0 0 12px hsl(var(--c-1) / 0.85),
        0 0 30px hsl(var(--c-2) / 0.55),
        0 0 52px hsl(var(--c-3) / 0.28),
        inset 0 -2px 4px hsl(var(--c-2) / 0.7),
        inset 0 1px 2px hsl(0 0% 100% / 0.75);
    }
  }

  /* -------------------------------------------------------
     Accessibility — reduced motion
  ------------------------------------------------------- */
  @media (prefers-reduced-motion: reduce) {
    .ring-outer,
    .ring-dots,
    .ring-arc,
    .ring-arc::before,
    .orbit,
    .orbit i,
    .core,
    .core-flare,
    .ambient,
    .caption-text,
    .caption-dots span {
      animation: none !important;
    }
    .caption-dots span {
      opacity: 0.85;
    }
    .ambient {
      opacity: 0.85;
    }
  }

  /* -------------------------------------------------------
     Keyframes
  ------------------------------------------------------- */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-rev {
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes breathe {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.12);
    }
  }

  @keyframes flare {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 0.95;
      transform: scale(1.08);
    }
  }

  @keyframes halo {
    0%,
    100% {
      opacity: 0.7;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.06);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @keyframes dot-blink {
    0%,
    60%,
    100% {
      opacity: 0;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-1px);
    }
  }
`;

export default Loader;
