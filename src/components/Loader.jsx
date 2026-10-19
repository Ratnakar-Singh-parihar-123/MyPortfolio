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
        {/* Single clean rotating ring */}
        <span className="ring" aria-hidden="true" />

        {/* Logo */}
        <span className="logo" aria-hidden="true">
          <img src={logoSrc} alt={logoAlt} draggable="false" />
        </span>
      </div>

      {text && <span className="caption">{text}</span>}
    </Wrapper>
  );
};

/* =========================================================
   STYLES — SIMPLE
========================================================= */

const Wrapper = styled.div`
  --c-blue: 217 91% 60%;
  --c-violet: 262 83% 66%;

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
  }

  /* =======================================================
     RING — single gradient arc, rotates
  ======================================================= */
  .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      transparent 0%,
      hsl(var(--c-blue) / 0.9) 25%,
      hsl(var(--c-violet) / 0.9) 50%,
      transparent 75%
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
    animation: spin 1.1s linear infinite;
    pointer-events: none;
  }

  /* =======================================================
     LOGO
  ======================================================= */
  .logo {
    position: relative;
    width: 72%;
    height: 72%;
    border-radius: 50%;
    overflow: hidden;
    display: block;
    background: #fff;
    box-shadow: 0 2px 8px hsl(0 0% 0% / 0.12);
  }
  .logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }

  /* =======================================================
     CAPTION
  ======================================================= */
  .caption {
    margin-top: calc(var(--s, 96px) * 0.22);
    font-family: inherit;
    font-size: clamp(10px, calc(var(--s, 96px) * 0.12), 13px);
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: hsl(220 10% 45%);
    user-select: none;
    line-height: 1;
  }

  /* =======================================================
     DARK MODE
  ======================================================= */
  html.dark &,
  .dark & {
    .logo {
      box-shadow: 0 2px 10px hsl(0 0% 0% / 0.4);
    }
    .caption {
      color: hsl(220 10% 68%);
    }
  }

  @media (prefers-color-scheme: dark) {
    .logo {
      box-shadow: 0 2px 10px hsl(0 0% 0% / 0.4);
    }
    .caption {
      color: hsl(220 10% 68%);
    }
  }

  /* =======================================================
     REDUCED MOTION
  ======================================================= */
  @media (prefers-reduced-motion: reduce) {
    .ring {
      animation: none !important;
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
`;

export default Loader;
