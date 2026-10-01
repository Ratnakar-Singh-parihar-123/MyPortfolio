import React from "react";
import styled from "styled-components";

const Loader = ({ size = 64, text = "Loading" }) => {
  return (
    <Wrapper>
      <div className="loader-wrap" style={{ width: size, height: size }}>
        {/* Outer rotating gradient ring */}
        <span className="ring ring-1" />
        {/* Middle counter-rotating ring */}
        <span className="ring ring-2" />
        {/* Inner pulsing core */}
        <span className="core" />
        {/* Soft glow */}
        <span className="glow" />
      </div>

      {text && (
        <div className="loading-text" style={{ marginTop: size * 0.35 }}>
          {text}
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  gap: 0;

  .loader-wrap {
    position: relative;
    display: grid;
    place-items: center;
  }

  /* ---------- Rings ---------- */
  .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border-style: solid;
    border-color: transparent;
    will-change: transform;
  }

  .ring-1 {
    border-width: 3px;
    border-top-color: hsl(214, 97%, 59%);
    border-right-color: hsl(280, 90%, 65%);
    animation: spin 1.1s linear infinite;
    filter: drop-shadow(0 0 6px hsla(214, 97%, 59%, 0.55));
  }

  .ring-2 {
    inset: 18%;
    border-width: 3px;
    border-bottom-color: hsl(330, 90%, 65%);
    border-left-color: hsl(214, 97%, 59%);
    animation: spin-reverse 1.6s linear infinite;
    filter: drop-shadow(0 0 6px hsla(330, 90%, 65%, 0.5));
    opacity: 0.9;
  }

  /* ---------- Pulsing core ---------- */
  .core {
    width: 22%;
    height: 22%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      hsl(214, 100%, 75%),
      hsl(214, 97%, 59%) 60%,
      hsl(280, 90%, 55%)
    );
    box-shadow:
      0 0 12px hsla(214, 97%, 59%, 0.7),
      0 0 24px hsla(280, 90%, 65%, 0.35);
    animation: pulse 1.4s ease-in-out infinite;
  }

  /* ---------- Ambient glow ---------- */
  .glow {
    position: absolute;
    inset: -25%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      hsla(214, 97%, 59%, 0.18) 0%,
      hsla(280, 90%, 65%, 0.08) 45%,
      transparent 70%
    );
    z-index: -1;
    animation: glow-pulse 2.2s ease-in-out infinite;
  }

  /* ---------- Text ---------- */
  .loading-text {
    font-size: 0.75rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    font-weight: 600;
    color: hsl(214, 30%, 45%);
    display: inline-flex;
    align-items: center;
    gap: 1px;
    animation: fade 1.6s ease-in-out infinite;
  }

  .dot {
    opacity: 0;
    animation: dot-blink 1.4s infinite;
  }
  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @media (prefers-color-scheme: dark) {
    .loading-text {
      color: hsl(214, 20%, 75%);
    }
  }

  /* ---------- Keyframes ---------- */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-reverse {
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.35);
      opacity: 0.85;
    }
  }

  @keyframes glow-pulse {
    0%,
    100% {
      opacity: 0.7;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.08);
    }
  }

  @keyframes fade {
    0%,
    100% {
      opacity: 0.65;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes dot-blink {
    0%,
    60%,
    100% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
  }
`;

export default Loader;
