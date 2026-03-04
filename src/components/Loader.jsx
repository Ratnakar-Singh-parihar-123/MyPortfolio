import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader-container">
        <div className="loader">
          <svg
            viewBox="0 0 800 500"
            xmlns="http://www.w3.org/2000/svg"
            className="loader-svg"
          >
            <defs>
              <linearGradient id="chipGradient" x1={0} y1={0} x2={0} y2={1}>
                <stop offset="0%" stopColor="#2d2d2d">
                  <animate
                    attributeName="stop-color"
                    values="#2d2d2d;#3d3d3d;#2d2d2d"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#0f0f0f">
                  <animate
                    attributeName="stop-color"
                    values="#0f0f0f;#1f1f1f;#0f0f0f"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
              <linearGradient id="textGradient" x1={0} y1={0} x2={0} y2={1}>
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#aaaaaa" />
              </linearGradient>
              <linearGradient id="pinGradient" x1={1} y1={0} x2={0} y2={0}>
                <stop offset="0%" stopColor="#cccccc" />
                <stop offset="50%" stopColor="#999999" />
                <stop offset="100%" stopColor="#666666" />
              </linearGradient>

              {/* Glow effect */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Pulse animation for traces */}
              <filter id="pulse" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background glow circles */}
            <g className="glow-circles">
              <circle
                cx={400}
                cy={240}
                r={120}
                fill="none"
                stroke="#399fff"
                strokeWidth="0.5"
                opacity="0.1"
              >
                <animate
                  attributeName="r"
                  values="120;130;120"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={400}
                cy={240}
                r={100}
                fill="none"
                stroke="#399fff"
                strokeWidth="0.5"
                opacity="0.1"
              >
                <animate
                  attributeName="r"
                  values="100;110;100"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Traces with enhanced animations */}
            <g id="traces" filter="url(#pulse)">
              {/* Left side traces */}
              <path d="M100 100 H200 V210 H326" className="trace-bg" />
              <path d="M100 100 H200 V210 H326" className="trace-flow blue">
                <animate
                  attributeName="stroke-dashoffset"
                  values="438;0"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </path>

              <path d="M80 180 H180 V230 H326" className="trace-bg" />
              <path d="M80 180 H180 V230 H326" className="trace-flow blue2">
                <animate
                  attributeName="stroke-dashoffset"
                  values="438;0"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </path>

              <path d="M60 260 H150 V250 H326" className="trace-bg" />
              <path d="M60 260 H150 V250 H326" className="trace-flow blue">
                <animate
                  attributeName="stroke-dashoffset"
                  values="438;0"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </path>

              <path d="M100 350 H200 V270 H326" className="trace-bg" />
              <path d="M100 350 H200 V270 H326" className="trace-flow blue2">
                <animate
                  attributeName="stroke-dashoffset"
                  values="438;0"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Right side traces */}
              <path d="M700 90 H560 V210 H474" className="trace-bg" />
              <path d="M700 90 H560 V210 H474" className="trace-flow blue">
                <animate
                  attributeName="stroke-dashoffset"
                  values="438;0"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </path>

              <path d="M740 160 H580 V230 H474" className="trace-bg" />
              <path d="M740 160 H580 V230 H474" className="trace-flow blue2">
                <animate
                  attributeName="stroke-dashoffset"
                  values="438;0"
                  dur="2.3s"
                  repeatCount="indefinite"
                />
              </path>

              <path d="M720 250 H590 V250 H474" className="trace-bg" />
              <path d="M720 250 H590 V250 H474" className="trace-flow blue">
                <animate
                  attributeName="stroke-dashoffset"
                  values="438;0"
                  dur="2.7s"
                  repeatCount="indefinite"
                />
              </path>

              <path d="M680 340 H570 V270 H474" className="trace-bg" />
              <path d="M680 340 H570 V270 H474" className="trace-flow blue2">
                <animate
                  attributeName="stroke-dashoffset"
                  values="438;0"
                  dur="2.1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            {/* Main chip with animation */}
            <rect
              x={330}
              y={190}
              width={140}
              height={100}
              rx={20}
              ry={20}
              fill="url(#chipGradient)"
              stroke="#222"
              strokeWidth={3}
              filter="url(#glow)"
              className="chip-body"
            >
              <animate
                attributeName="y"
                values="190;192;190"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>

            {/* Left pins with animation */}
            <g className="left-pins">
              {[205, 225, 245, 265].map((y, index) => (
                <rect
                  key={`left-${index}`}
                  x={322}
                  y={y}
                  width={8}
                  height={10}
                  fill="url(#pinGradient)"
                  rx={2}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.6;1"
                    dur={`${1.5 + index * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>

            {/* Right pins with animation */}
            <g className="right-pins">
              {[205, 225, 245, 265].map((y, index) => (
                <rect
                  key={`right-${index}`}
                  x={470}
                  y={y}
                  width={8}
                  height={10}
                  fill="url(#pinGradient)"
                  rx={2}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.6;1"
                    dur={`${1.3 + index * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>

            {/* Loading text with animation */}
            <text
              x={400}
              y={240}
              fontFamily="Arial, sans-serif"
              fontSize={22}
              fill="url(#textGradient)"
              textAnchor="middle"
              alignmentBaseline="middle"
              className="chip-text"
            >
              <tspan>Loading</tspan>
              <animate
                attributeName="opacity"
                values="1;0.8;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </text>

            {/* Animated dots */}
            <text
              x={465}
              y={240}
              fontFamily="Arial, sans-serif"
              fontSize={22}
              fill="url(#textGradient)"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              <tspan>.</tspan>
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1s"
                repeatCount="indefinite"
              />
            </text>
            <text
              x={475}
              y={240}
              fontFamily="Arial, sans-serif"
              fontSize={22}
              fill="url(#textGradient)"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              <tspan>.</tspan>
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1s"
                begin="0.2s"
                repeatCount="indefinite"
              />
            </text>
            <text
              x={485}
              y={240}
              fontFamily="Arial, sans-serif"
              fontSize={22}
              fill="url(#textGradient)"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              <tspan>.</tspan>
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1s"
                begin="0.4s"
                repeatCount="indefinite"
              />
            </text>

            {/* Connection points with pulse animation */}
            {[
              { cx: 100, cy: 100 },
              { cx: 80, cy: 180 },
              { cx: 60, cy: 260 },
              { cx: 100, cy: 350 },
              { cx: 700, cy: 90 },
              { cx: 740, cy: 160 },
              { cx: 720, cy: 250 },
              { cx: 680, cy: 340 },
            ].map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.cx}
                  cy={point.cy}
                  r={5}
                  fill="#399fff"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="5;8;5"
                    dur={`${1.5 + index * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={point.cx} cy={point.cy} r={3} fill="#399fff">
                  <animate
                    attributeName="r"
                    values="3;5;3"
                    dur={`${1.5 + index * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </svg>

          {/* Loading text for mobile */}
          <div className="loading-text-mobile">
            <span>Loading</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const flowAnimation = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
`;

const StyledWrapper = styled.div`
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    padding: 1rem;
  }

  .loader {
    width: 100%;
    max-width: 800px;
    position: relative;
  }

  .loader-svg {
    width: 100%;
    height: auto;
    display: block;

    @media (max-width: 768px) {
      transform: scale(0.9);
    }

    @media (max-width: 480px) {
      transform: scale(0.8);
    }
  }

  .trace-bg {
    stroke: #252525;
    stroke-width: 1.8;
    fill: none;

    @media (max-width: 768px) {
      stroke-width: 1.5;
    }
  }

  .trace-flow {
    stroke-width: 1.8;
    fill: none;
    stroke-dasharray: 40 400;
    stroke-dashoffset: 438;
    filter: drop-shadow(0 0 6px currentColor);

    @media (max-width: 768px) {
      stroke-width: 1.5;
      filter: drop-shadow(0 0 4px currentColor);
    }
  }

  .blue {
    stroke: #399fff;
    color: #399fff;
  }

  .blue2 {
    stroke: #5fb2ff;
    color: #5fb2ff;
  }

  .chip-body {
    filter: drop-shadow(0 0 10px rgba(57, 159, 255, 0.3));

    @media (max-width: 768px) {
      filter: drop-shadow(0 0 6px rgba(57, 159, 255, 0.3));
    }
  }

  .chip-text {
    font-weight: bold;
    letter-spacing: 2px;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  .glow-circles {
    opacity: 0.5;

    @media (max-width: 768px) {
      opacity: 0.3;
    }
  }

  .left-pins,
  .right-pins {
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
  }

  /* Mobile loading text (hidden on desktop) */
  .loading-text-mobile {
    display: none;
    text-align: center;
    margin-top: 1rem;
    font-family: Arial, sans-serif;
    font-size: 1.2rem;
    color: #399fff;
    letter-spacing: 2px;

    @media (max-width: 480px) {
      display: block;
    }

    .dot {
      animation: ${pulseAnimation} 1s infinite;
      display: inline-block;
      margin-left: 2px;
    }

    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    .dot:nth-child(4) {
      animation-delay: 0.6s;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .loader-container {
      padding: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .loader-container {
      padding: 0.25rem;
    }

    /* Hide desktop text on very small screens */
    .chip-text {
      @media (max-width: 480px) {
        opacity: 0.5;
      }
    }
  }

  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    .trace-flow {
      animation: ${flowAnimation} 3s cubic-bezier(0.5, 0, 0.9, 1) infinite;
    }
  }

  /* Landscape mode on mobile */
  @media (max-width: 896px) and (orientation: landscape) {
    .loader-svg {
      transform: scale(0.7);
    }

    .loader-container {
      min-height: 100vh;
      padding: 0.5rem;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .trace-flow {
      stroke-width: 2.5;
    }

    .chip-body {
      stroke-width: 4;
    }
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .trace-flow,
    .chip-body,
    .left-pins rect,
    .right-pins rect,
    .chip-text,
    circle,
    .glow-circles circle {
      animation: none !important;
    }

    .trace-flow {
      stroke-dashoffset: 0;
    }
  }
`;

export default Loader;
