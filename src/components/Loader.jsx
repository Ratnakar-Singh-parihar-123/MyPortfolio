import React from "react";
import styled from "styled-components";

// ⬇️ Apna logo import karo (path adjust karo)
import logoImg from "../../src/assets/logo/logo.jpeg";

const Loader = ({
  size = 96,
  text = "Loading",
  logoSrc = logoImg,
  logoAlt = "Loading",
}) => {
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
        <span className="halo" aria-hidden="true" />

        {/* Outer elegant gradient ring */}
        <span className="ring ring-outer" aria-hidden="true" />

        {/* Inner progress arc */}
        <span className="ring ring-arc" aria-hidden="true" />

        {/* Two orbiting sparks */}
        <span className="orbit orbit-a" aria-hidden="true">
          <i />
        </span>
        <span className="orbit orbit-b" aria-hidden="true">
          <i />
        </span>

        {/* Glass core with logo */}
        <span className="core" aria-hidden="true">
          <span className="core-ring" />
          <span className="core-glow" />
          <span className="core-logo">
            <img src={logoSrc} alt={logoAlt} draggable="false" />
          </span>
          <span className="core-shine" />
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
  /* ---------- Palette ---------- */
  --c-blue: 217 91% 60%;
  --c-violet: 262 83% 66%;
  --c-fuchsia: 330 85% 68%;
  --c-cyan: 189 94% 55%;

  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 24px;

  /* =======================================================
     STAGE
  ======================================================= */
  .stage {
    position: relative;
    width: var(--s, 96px);
    height: var(--s, 96px);
    display: grid;
    place-items: center;
    isolation: isolate;
  }

  /* =======================================================
     HALO — soft ambient glow
  ======================================================= */
  .halo {
    position: absolute;
    inset: -50%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      hsl(var(--c-violet) / 0.22) 0%,
      hsl(var(--c-blue) / 0.12) 35%,
      hsl(var(--c-fuchsia) / 0.06) 55%,
      transparent 72%
    );
    filter: blur(20px);
    z-index: -1;
    animation: halo 4s ease-in-out infinite;
    pointer-events: none;
  }

  /* =======================================================
     RINGS (base)
  ======================================================= */
  .ring {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
  }

  /* ---------- OUTER RING — conic gradient sweep ---------- */
  .ring-outer {
    inset: 0;
    background: conic-gradient(
      from 0deg,
      transparent 0%,
      hsl(var(--c-blue) / 0.9) 15%,
      hsl(var(--c-cyan)) 30%,
      hsl(var(--c-violet)) 50%,
      hsl(var(--c-fuchsia)) 70%,
      transparent 88%
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
    animation: spin 3s linear infinite;
    filter: drop-shadow(0 0 6px hsl(var(--c-violet) / 0.5));
  }

  /* ---------- ARC — dual color, one full turn ---------- */
  .ring-arc {
    inset: 16%;
    border: 2px solid transparent;
    border-top-color: hsl(var(--c-fuchsia) / 0.95);
    border-right-color: hsl(var(--c-blue) / 0.9);
    animation: spin 1.8s linear infinite;
    filter: drop-shadow(0 0 5px hsl(var(--c-fuchsia) / 0.55));
    opacity: 0.9;
  }

  /* =======================================================
     ORBITS — two sparks, opposite directions
  ======================================================= */
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
    top: -3.5px;
    left: 50%;
    width: 7px;
    height: 7px;
    margin-left: -3.5px;
    border-radius: 50%;
    display: block;
  }

  .orbit-a {
    animation-duration: 4.5s;
  }
  .orbit-a i {
    background: hsl(var(--c-cyan));
    box-shadow:
      0 0 8px hsl(var(--c-cyan) / 0.95),
      0 0 16px hsl(var(--c-cyan) / 0.55);
  }

  .orbit-b {
    inset: 16%;
    animation-duration: 6s;
    animation-direction: reverse;
  }
  .orbit-b i {
    background: hsl(var(--c-fuchsia));
    box-shadow:
      0 0 8px hsl(var(--c-fuchsia) / 0.95),
      0 0 16px hsl(var(--c-fuchsia) / 0.55);
  }

  /* =======================================================
     CORE — glass plate + big logo
  ======================================================= */
  .core {
    position: relative;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    display: grid;
    place-items: center;
    isolation: isolate;
    background: radial-gradient(
      circle at 35% 30%,
      hsl(0 0% 100% / 0.6) 0%,
      hsl(0 0% 100% / 0.15) 50%,
      hsl(var(--c-violet) / 0.14) 100%
    );
    box-shadow:
      0 0 14px hsl(var(--c-violet) / 0.45),
      0 0 34px hsl(var(--c-blue) / 0.28),
      0 0 60px hsl(var(--c-fuchsia) / 0.14),
      inset 0 0 0 1px hsl(0 0% 100% / 0.45),
      inset 0 -3px 6px hsl(var(--c-violet) / 0.32),
      inset 0 2px 4px hsl(0 0% 100% / 0.65);
    animation: breathe 2.4s ease-in-out infinite;
  }

  /* rotating conic ring border */
  .core-ring {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    padding: 2px;
    background: conic-gradient(
      from 0deg,
      hsl(var(--c-cyan)),
      hsl(var(--c-blue)),
      hsl(var(--c-violet)),
      hsl(var(--c-fuchsia)),
      hsl(var(--c-cyan))
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: spin 2.6s linear infinite;
    filter: drop-shadow(0 0 6px hsl(var(--c-violet) / 0.55));
    opacity: 0.92;
    pointer-events: none;
  }

  /* glow behind logo */
  .core-glow {
    position: absolute;
    inset: 5%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      hsl(var(--c-violet) / 0.4) 0%,
      hsl(var(--c-blue) / 0.18) 50%,
      transparent 72%
    );
    filter: blur(5px);
    animation: pulse-glow 2.4s ease-in-out infinite;
    pointer-events: none;
  }

  /* LOGO */
  .core-logo {
    position: relative;
    width: 88%;
    height: 88%;
    border-radius: 50%;
    overflow: hidden;
    display: block;
    box-shadow:
      inset 0 0 0 2px hsl(0 0% 100% / 0.9),
      0 3px 10px hsl(0 0% 0% / 0.15);
    background: #fff;
  }
  .core-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 50%;
    user-select: none;
    -webkit-user-drag: none;
    transform: scale(1.02);
  }

  /* subtle glass shine */
  .core-shine {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      hsl(0 0% 100% / 0.5) 0%,
      hsl(0 0% 100% / 0.1) 25%,
      transparent 45%
    );
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0.85;
  }

  /* =======================================================
     CAPTION
  ======================================================= */
  .caption {
    margin-top: calc(var(--s, 96px) * 0.32);
    display: inline-flex;
    align-items: baseline;
    gap: 1px;
    font-family: inherit;
    font-size: clamp(10px, calc(var(--s, 96px) * 0.13), 13px);
    font-weight: 600;
    letter-spacing: 0.36em;
    text-transform: uppercase;
    user-select: none;
    line-height: 1;
  }

  .caption-text {
    background: linear-gradient(
      90deg,
      hsl(220 12% 42%) 0%,
      hsl(var(--c-violet)) 30%,
      hsl(var(--c-blue)) 50%,
      hsl(var(--c-fuchsia)) 70%,
      hsl(220 12% 42%) 100%
    );
    background-size: 220% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shimmer 3.6s linear infinite;
    padding-right: 0.06em;
  }

  .caption-dots {
    display: inline-flex;
    align-items: baseline;
  }
  .caption-dots span {
    display: inline-block;
    opacity: 0;
    color: hsl(var(--c-violet));
    text-shadow: 0 0 8px hsl(var(--c-violet) / 0.7);
    animation: dot-blink 1.5s infinite;
    line-height: 1;
  }
  .caption-dots span:nth-child(2) {
    animation-delay: 0.18s;
  }
  .caption-dots span:nth-child(3) {
    animation-delay: 0.36s;
  }

  /* =======================================================
     DARK MODE — supports class-based (html.dark) AND media
  ======================================================= */
  html.dark &,
  .dark & {
    .caption-text {
      background: linear-gradient(
        90deg,
        hsl(220 12% 65%) 0%,
        hsl(var(--c-cyan)) 30%,
        hsl(var(--c-blue)) 50%,
        hsl(var(--c-violet)) 70%,
        hsl(220 12% 65%) 100%
      );
      background-size: 220% 100%;
      -webkit-background-clip: text;
      background-clip: text;
    }
    .caption-dots span {
      color: hsl(var(--c-cyan));
      text-shadow: 0 0 8px hsl(var(--c-cyan) / 0.7);
    }
    .core {
      background: radial-gradient(
        circle at 35% 30%,
        hsl(0 0% 100% / 0.22) 0%,
        hsl(0 0% 100% / 0.06) 50%,
        hsl(var(--c-violet) / 0.18) 100%
      );
      box-shadow:
        0 0 16px hsl(var(--c-violet) / 0.55),
        0 0 38px hsl(var(--c-blue) / 0.35),
        0 0 68px hsl(var(--c-fuchsia) / 0.2),
        inset 0 0 0 1px hsl(0 0% 100% / 0.25),
        inset 0 -3px 6px hsl(var(--c-violet) / 0.45),
        inset 0 2px 4px hsl(0 0% 100% / 0.4);
    }
    .core-logo {
      box-shadow:
        inset 0 0 0 2px hsl(0 0% 100% / 0.55),
        0 3px 12px hsl(0 0% 0% / 0.4);
    }
    .ring-outer {
      filter: drop-shadow(0 0 8px hsl(var(--c-violet) / 0.65));
    }
  }

  @media (prefers-color-scheme: dark) {
    .caption-text {
      background: linear-gradient(
        90deg,
        hsl(220 12% 65%) 0%,
        hsl(var(--c-cyan)) 30%,
        hsl(var(--c-blue)) 50%,
        hsl(var(--c-violet)) 70%,
        hsl(220 12% 65%) 100%
      );
      background-size: 220% 100%;
      -webkit-background-clip: text;
      background-clip: text;
    }
    .caption-dots span {
      color: hsl(var(--c-cyan));
      text-shadow: 0 0 8px hsl(var(--c-cyan) / 0.7);
    }
    .core {
      background: radial-gradient(
        circle at 35% 30%,
        hsl(0 0% 100% / 0.22) 0%,
        hsl(0 0% 100% / 0.06) 50%,
        hsl(var(--c-violet) / 0.18) 100%
      );
      box-shadow:
        0 0 16px hsl(var(--c-violet) / 0.55),
        0 0 38px hsl(var(--c-blue) / 0.35),
        0 0 68px hsl(var(--c-fuchsia) / 0.2),
        inset 0 0 0 1px hsl(0 0% 100% / 0.25),
        inset 0 -3px 6px hsl(var(--c-violet) / 0.45),
        inset 0 2px 4px hsl(0 0% 100% / 0.4);
    }
    .core-logo {
      box-shadow:
        inset 0 0 0 2px hsl(0 0% 100% / 0.55),
        0 3px 12px hsl(0 0% 0% / 0.4);
    }
    .ring-outer {
      filter: drop-shadow(0 0 8px hsl(var(--c-violet) / 0.65));
    }
  }

  /* =======================================================
     REDUCED MOTION
  ======================================================= */
  @media (prefers-reduced-motion: reduce) {
    .halo,
    .ring-outer,
    .ring-arc,
    .orbit,
    .orbit i,
    .core,
    .core-ring,
    .core-glow,
    .caption-text,
    .caption-dots span {
      animation: none !important;
    }
    .caption-dots span {
      opacity: 0.9;
    }
    .halo {
      opacity: 0.9;
    }
    .ring-arc {
      opacity: 1;
    }
  }

  /* =======================================================
     KEYFRAMES
  ======================================================= */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes breathe {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.045);
    }
  }

  @keyframes pulse-glow {
    0%,
    100% {
      opacity: 0.55;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  @keyframes halo {
    0%,
    100% {
      opacity: 0.75;
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
