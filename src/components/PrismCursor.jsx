import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function PrismCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [angle, setAngle] = useState(0);
  const particlesRef = useRef([]);

  useEffect(() => {
    let frame;
    const animate = () => {
      setAngle((prev) => prev + 0.02);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e) => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);

      // Create prism burst
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const particle = {
            id: Date.now() + i,
            x: e.clientX,
            y: e.clientY,
            angle: (i * 30 * Math.PI) / 180,
            speed: 5 + Math.random() * 5,
            color: `hsl(${i * 30}, 100%, 65%)`,
            life: 1,
          };
          particlesRef.current.push(particle);
        }, i * 20);
      }
    };

    // Animate particles
    const interval = setInterval(() => {
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + Math.cos(p.angle) * p.speed,
          y: p.y + Math.sin(p.angle) * p.speed,
          life: p.life - 0.02,
          speed: p.speed * 0.95,
        }))
        .filter((p) => p.life > 0);
    }, 16);

    window.addEventListener("mousemove", move);
    window.addEventListener("click", handleClick);

    const elements = document.querySelectorAll("a, button, .interactive");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => setHover(true));
      el.addEventListener("mouseleave", () => setHover(false));
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", handleClick);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", () => setHover(true));
        el.removeEventListener("mouseleave", () => setHover(false));
      });
    };
  }, []);

  return (
    <>
      {/* Main prism crystal */}
      <motion.div
        animate={{
          x: pos.x - 30,
          y: pos.y - 30,
          scale: hover ? 1.4 : clicked ? 0.8 : 1,
          rotate: angle * 50,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          rotate: { duration: 0 },
        }}
        className="fixed pointer-events-none z-[9999]"
        style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}
      >
        {/* Prism core - multiple layers for light refraction */}
        <svg width="60" height="60" viewBox="0 0 60 60">
          {/* Outer glow */}
          <defs>
            <radialGradient id="prismGlow" cx="30" cy="30" r="30">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="50%" stopColor="transparent" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Rainbow light rays */}
          {[...Array(6)].map((_, i) => {
            const hue = (i * 60 + angle * 10) % 360;
            return (
              <motion.path
                key={i}
                d={`M30,30 L${30 + Math.cos((i * Math.PI) / 3) * 40},${30 + Math.sin((i * Math.PI) / 3) * 40}`}
                stroke={`hsl(${hue}, 100%, 65%)`}
                strokeWidth="2"
                strokeOpacity="0.4"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Main crystal shape */}
          <motion.polygon
            points="30,5 50,20 50,40 30,55 10,40 10,20"
            fill="url(#prismGlow)"
            stroke="white"
            strokeWidth="1.5"
            animate={{
              stroke: [
                "#ff6b6b",
                "#4ecdc4",
                "#45b7d1",
                "#96ceb4",
                "#ffeaa7",
                "#ff6b6b",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          {/* Inner light */}
          <circle cx="30" cy="30" r="8" fill="white" filter="url(#glow)" />
        </svg>

        {/* Floating rainbow particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.cos(angle + i) * 20, 0],
              y: [0, Math.sin(angle + i) * 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: 28,
              top: 28,
              background: `hsl(${i * 120 + angle * 20}, 100%, 65%)`,
              boxShadow: `0 0 10px hsl(${i * 120 + angle * 20}, 100%, 65%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Light trail with rainbow effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: pos.x - 15 + Math.cos(angle + i) * (20 + i * 5),
            y: pos.y - 15 + Math.sin(angle + i) * (20 + i * 5),
            scale: [1, 0],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 1,
            delay: i * 0.1,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="fixed w-4 h-4 rounded-full pointer-events-none z-[9998]"
          style={{
            background: `hsl(${i * 45 + angle * 20}, 100%, 65%)`,
            filter: "blur(4px)",
            boxShadow: `0 0 20px hsl(${i * 45 + angle * 20}, 100%, 65%)`,
          }}
        />
      ))}

      {/* Particle system */}
      {particlesRef.current.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: p.life, scale: 1 }}
          animate={{ opacity: p.life, scale: p.life }}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-[9997]"
          style={{
            left: p.x,
            top: p.y,
            background: p.color,
            boxShadow: `0 0 20px ${p.color}`,
            filter: "blur(2px)",
          }}
        />
      ))}

      {/* Light beam effect on hover */}
      {hover && (
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="fixed w-40 h-40 rounded-full pointer-events-none z-[9996]"
          style={{
            left: pos.x - 80,
            top: pos.y - 80,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* Refraction grid */}
      <div
        className="fixed inset-0 pointer-events-none z-[9995]"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.02) 20px,
            rgba(255,255,255,0.02) 40px
          )`,
          maskImage: `radial-gradient(circle at ${pos.x}px ${pos.y}px, black 150px, transparent)`,
        }}
      />

      <style jsx global>{`
        * {
          cursor: none;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto;
          }
        }
      `}</style>
    </>
  );
}

export default PrismCursor;
