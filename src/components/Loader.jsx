import React, { useState, useEffect } from "react";
import styled from "styled-components";

/* ═══════════════════════════════════════════════
   INNER CONTENT (RSP + CAPTION) — duplicated per half
═══════════════════════════════════════════════ */
const LoaderContent = ({ text }) => (
  <div
    className="loader-wrap"
    role="status"
    aria-live="polite"
    aria-label={text}
  >
    <div className="loader">
      <svg
        viewBox="0 0 200 64"
        className="loader-svg"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2={2}
            x2={0}
            y1={62}
            x1={0}
            id="rspGradR"
          >
            <stop stopColor="#973BED" />
            <stop offset={1} stopColor="#007CFF" />
          </linearGradient>

          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2={0}
            x2={0}
            y1={64}
            x1={0}
            id="rspGradS"
          >
            <stop stopColor="#FFC800" />
            <stop offset={1} stopColor="#F0F" />
            <animateTransform
              repeatCount="indefinite"
              keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
              keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
              dur="8s"
              values="0 82 32;-270 82 32;-270 82 32;-540 82 32;-540 82 32;-810 82 32;-810 82 32;-1080 82 32;-1080 82 32"
              type="rotate"
              attributeName="gradientTransform"
            />
          </linearGradient>

          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2={2}
            x2={0}
            y1={62}
            x1={0}
            id="rspGradP"
          >
            <stop stopColor="#00E0ED" />
            <stop offset={1} stopColor="#00DA72" />
          </linearGradient>
        </defs>

        {/* R — visible ~11-53, fully in LEFT half */}
        <path
          d="M 15 54 L 15 10 L 31 10 C 49 10 49 32 31 32 L 15 32 M 31 32 L 49 54"
          stroke="url(#rspGradR)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={360}
          className="dash dash-r"
        />

        {/* S — visible ~65.5-98.5, fully in LEFT half */}
        <path
          d="M 94 14 C 90 6 74 6 70 14 C 66 22 76 28 82 32 C 90 36 98 42 94 50 C 90 58 74 58 70 50"
          stroke="url(#rspGradS)"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={360}
          className="spin dash-s"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />

        {/* P — visible ~141-185, fully in RIGHT half */}
        <path
          d="M 145 54 L 145 10 L 163 10 C 181 10 181 32 163 32 L 145 32"
          stroke="url(#rspGradP)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={360}
          className="dash dash-p"
        />
      </svg>
    </div>

    {text && (
      <div className="caption">
        <span className="caption-text">{text}</span>
        <span className="caption-dots">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </span>
      </div>
    )}
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN LOADER — split cover reveal
═══════════════════════════════════════════════ */
const Loader = ({
  text = "Loading",
  isOpen,
  autoOpenAfter = 2400,
  onOpened,
}) => {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isOpen === true) setOpened(true);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen !== undefined) return;
    if (!autoOpenAfter || autoOpenAfter <= 0) return;
    const t = setTimeout(() => setOpened(true), autoOpenAfter);
    return () => clearTimeout(t);
  }, [isOpen, autoOpenAfter]);

  useEffect(() => {
    if (!opened) return;
    const notify = onOpened && setTimeout(() => onOpened(), 1450);
    const hide = setTimeout(() => setHidden(true), 1750);
    return () => {
      if (notify) clearTimeout(notify);
      clearTimeout(hide);
    };
  }, [opened, onOpened]);

  return (
    <Wrapper
      className={`${opened ? "is-open" : ""} ${hidden ? "is-hidden" : ""}`}
      aria-hidden={opened}
    >
      <div className="half half-left">
        <div className="half-content">
          <LoaderContent text={text} />
        </div>
        <span className="edge-shadow" />
      </div>

      <div className="half half-right">
        <div className="half-content">
          <LoaderContent text={text} />
        </div>
        <span className="edge-shadow" />
      </div>
    </Wrapper>
  );
};

/* ═══════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════ */
const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
  perspective: 1600px;

  &.is-hidden {
    display: none;
  }

  /* ────────────── HALVES ────────────── */
  .half {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50.05%;
    overflow: hidden;
    background: var(--background, #ffffff);
    will-change: transform;
    /* No transition on base — only when opening (with settle delay) */
  }
  .half-left {
    left: 0;
    transform-origin: right center;
  }
  .half-right {
    right: 0;
    transform-origin: left center;
  }

  /* ────────────── CENTERED CONTENT ────────────── */
  .half-content {
    position: absolute;
    top: 50%;
    pointer-events: none;
  }
  .half-left .half-content {
    left: 100%;
    transform: translate(-50%, -50%);
  }
  .half-right .half-content {
    left: 0;
    transform: translate(-50%, -50%);
  }

  /* ────────────── SPINE EDGE SHADOWS ────────────── */
  .edge-shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.65s ease 0.2s;
  }
  .half-left .edge-shadow {
    right: 0;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.14), transparent);
  }
  .half-right .edge-shadow {
    left: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.14), transparent);
  }

  /* ────────────── OPEN STATE ────────────── */
  &.is-open .half-left {
    transform: translateX(-100%);
    transition: transform 1.15s cubic-bezier(0.83, 0, 0.17, 1) 0.12s;
  }
  &.is-open .half-right {
    transform: translateX(100%);
    transition: transform 1.15s cubic-bezier(0.83, 0, 0.17, 1) 0.12s;
  }
  &.is-open .edge-shadow {
    opacity: 1;
  }
  &.is-open {
    pointer-events: none;
  }

  /* ═══════════════════════════════════════
     ANIMATION STOP — when opening, freeze RSP
     fully drawn so the slide-away is clean.
  ═══════════════════════════════════════ */
  &.is-open .dash,
  &.is-open .dash-r,
  &.is-open .dash-s,
  &.is-open .dash-p,
  &.is-open .spin {
    animation: none !important;
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    transition:
      stroke-dasharray 0.28s ease-out,
      stroke-dashoffset 0.28s ease-out,
      rotate 0.28s ease-out,
      filter 0.28s ease-out;
  }

  &.is-open .loader {
    animation: none !important;
    transition: transform 0.28s ease-out;
  }

  /* ═══════════════════════════════════════
     INNER RSP LOADER CONTENT
  ═══════════════════════════════════════ */
  .loader-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(0.75rem, 2.5vw, 1.25rem);
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: logoFloat 3s ease-in-out infinite;
    will-change: transform;
  }

  .loader-svg {
    width: clamp(130px, 40vw, 200px);
    height: auto;
    overflow: visible;
    aspect-ratio: 200 / 64;
  }

  /* ────────── CAPTION ────────── */
  .caption {
    display: inline-flex;
    align-items: baseline;
    gap: 0.15em;
    font-family:
      "Inter",
      ui-sans-serif,
      system-ui,
      -apple-system,
      sans-serif;
    font-size: clamp(9.5px, 2.6vw, 12px);
    font-weight: 600;
    letter-spacing: clamp(0.24em, 0.9vw, 0.32em);
    text-transform: uppercase;
    color: hsl(220 10% 45%);
    user-select: none;
    line-height: 1;
    padding-left: clamp(0.24em, 0.9vw, 0.32em);
    animation: captionIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
    transition: opacity 0.35s ease;
  }

  .caption-text {
    background: linear-gradient(135deg, #973bed, #f0f 50%, #00e0ed);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &.is-open .caption {
    opacity: 0;
  }

  .caption-dots {
    display: inline-flex;
    gap: clamp(2px, 0.6vw, 3px);
    align-items: flex-end;
    padding-bottom: 1px;
  }

  .dot {
    width: clamp(2.5px, 0.7vw, 3px);
    height: clamp(2.5px, 0.7vw, 3px);
    border-radius: 50%;
    background: currentColor;
    color: hsl(262 83% 66%);
    opacity: 0.3;
    animation: dotPulse 1.4s ease-in-out infinite;
  }
  .dot:nth-child(1) {
    animation-delay: 0s;
  }
  .dot:nth-child(2) {
    animation-delay: 0.18s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.36s;
  }

  /* ────────── LETTER ANIMATIONS ────────── */
  .dash {
    animation:
      dashArray 2s ease-in-out infinite,
      dashOffset 2s linear infinite;
  }
  .spin {
    animation:
      spinDashArray 2s ease-in-out infinite,
      spin 8s ease-in-out infinite,
      dashOffset 2s linear infinite;
    transform-box: fill-box;
    transform-origin: center;
  }

  .dash-r {
    animation:
      dashArray 2s ease-in-out infinite,
      dashOffset 2s linear infinite,
      glowR 3s ease-in-out infinite;
  }
  .dash-s {
    animation:
      spinDashArray 2s ease-in-out infinite,
      spin 8s ease-in-out infinite,
      dashOffset 2s linear infinite,
      glowS 3s ease-in-out infinite;
  }
  .dash-p {
    animation:
      dashArray 2s ease-in-out infinite,
      dashOffset 2s linear infinite,
      glowP 3s ease-in-out infinite;
  }

  /* ────────── DARK MODE ────────── */
  html.dark &,
  .dark & {
    .half {
      background: var(--background, #11172a);
    }
    .caption {
      color: hsl(220 10% 68%);
    }
    .dot {
      color: hsl(262 83% 72%);
    }
    .half-left .edge-shadow {
      background: linear-gradient(to left, rgba(0, 0, 0, 0.5), transparent);
    }
    .half-right .edge-shadow {
      background: linear-gradient(to right, rgba(0, 0, 0, 0.5), transparent);
    }
  }

  /* ────────── RESPONSIVE ────────── */
  @media (max-width: 380px) {
    .loader-svg {
      width: clamp(108px, 36vw, 150px);
    }
    .caption {
      font-size: 9px;
      letter-spacing: 0.22em;
      padding-left: 0.22em;
    }
    .loader-wrap {
      gap: 0.65rem;
    }
  }

  @media (min-width: 768px) {
    .loader-svg {
      width: 200px;
    }
    .caption {
      font-size: 12px;
      letter-spacing: 0.32em;
      padding-left: 0.32em;
    }
  }

  /* ────────── REDUCED MOTION ────────── */
  @media (prefers-reduced-motion: reduce) {
    .half {
      transition: none !important;
    }
    .dash,
    .spin,
    .dash-r,
    .dash-s,
    .dash-p,
    .loader {
      animation: none !important;
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
    .caption {
      animation: none;
      opacity: 1;
      transform: none;
    }
    .dot {
      animation: none;
      opacity: 0.6;
    }
    .dash-r,
    .dash-s,
    .dash-p {
      filter: none;
    }
    &.is-open .half-left {
      transform: translateX(-100%);
      transition: none !important;
    }
    &.is-open .half-right {
      transform: translateX(100%);
      transition: none !important;
    }
  }

  /* ────────── KEYFRAMES ────────── */
  @keyframes dashArray {
    0% {
      stroke-dasharray: 0 1 359 0;
    }
    50% {
      stroke-dasharray: 0 359 1 0;
    }
    100% {
      stroke-dasharray: 359 1 0 0;
    }
  }
  @keyframes spinDashArray {
    0% {
      stroke-dasharray: 270 90;
    }
    50% {
      stroke-dasharray: 0 360;
    }
    100% {
      stroke-dasharray: 270 90;
    }
  }
  @keyframes dashOffset {
    0% {
      stroke-dashoffset: 365;
    }
    100% {
      stroke-dashoffset: 5;
    }
  }
  @keyframes spin {
    0% {
      rotate: 0deg;
    }
    12.5%,
    25% {
      rotate: 270deg;
    }
    37.5%,
    50% {
      rotate: 540deg;
    }
    62.5%,
    75% {
      rotate: 810deg;
    }
    87.5%,
    100% {
      rotate: 1080deg;
    }
  }
  @keyframes logoFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }
  @keyframes glowR {
    0%,
    100% {
      filter: drop-shadow(0 0 3px rgba(151, 59, 237, 0.4));
    }
    50% {
      filter: drop-shadow(0 0 6px rgba(151, 59, 237, 0.65));
    }
  }
  @keyframes glowS {
    0%,
    100% {
      filter: drop-shadow(0 0 3px rgba(255, 200, 0, 0.4));
    }
    50% {
      filter: drop-shadow(0 0 6px rgba(255, 200, 0, 0.65));
    }
  }
  @keyframes glowP {
    0%,
    100% {
      filter: drop-shadow(0 0 3px rgba(0, 224, 237, 0.4));
    }
    50% {
      filter: drop-shadow(0 0 6px rgba(0, 224, 237, 0.65));
    }
  }
  @keyframes captionIn {
    0% {
      opacity: 0;
      transform: translateY(6px);
      filter: blur(2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }
  @keyframes dotPulse {
    0%,
    100% {
      opacity: 0.25;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-1.5px);
    }
  }
`;

export default Loader;
