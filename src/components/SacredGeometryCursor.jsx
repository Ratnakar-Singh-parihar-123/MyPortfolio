import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

function SacredGeometryCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [sacredSymbol, setSacredSymbol] = useState("🌸");

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });

    const symbols = ["🌸", "🌺", "🕉️", "☯️", "⚛️", "✡️", "🔯", "🪷"];
    let index = 0;

    const interval = setInterval(() => {
      setSacredSymbol(symbols[index]);
      index = (index + 1) % symbols.length;
    }, 1000);

    window.addEventListener("mousemove", move);

    const elements = document.querySelectorAll("a, button");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => setHover(true));
      el.addEventListener("mouseleave", () => setHover(false));
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", move);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", () => setHover(true));
        el.removeEventListener("mouseleave", () => setHover(false));
      });
    };
  }, []);

  return (
    <>
      {/* Main mandala */}
      <motion.div
        animate={{
          x: pos.x - 40,
          y: pos.y - 40,
          scale: hover ? 1.5 : 1,
          rotate: [0, 360],
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
        className="fixed pointer-events-none z-[9999]"
      >
        {/* Outer lotus */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 10, delay: i * 1.25, repeat: Infinity },
              scale: { duration: 2, repeat: Infinity },
            }}
            className="absolute w-4 h-8 bg-gradient-to-t from-amber-400/30 to-rose-400/30 rounded-full"
            style={{
              left: 16,
              top: 4,
              transformOrigin: "bottom center",
              rotate: `${i * 45}deg`,
            }}
          />
        ))}

        {/* Inner circle */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-amber-400/40 left-2 top-2" />

        {/* Sacred symbol */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute text-3xl left-5 top-5"
        >
          {sacredSymbol}
        </motion.div>

        {/* Energy points */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
            className="absolute w-2 h-2 bg-amber-400 rounded-full blur-[1px]"
            style={{
              left: 19 + Math.cos((i * 90 * Math.PI) / 180) * 15,
              top: 19 + Math.sin((i * 90 * Math.PI) / 180) * 15,
            }}
          />
        ))}
      </motion.div>

      {/* Floating mantras */}
      {hover &&
        [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: pos.x - 10 + Math.sin(Date.now() * 0.001 + i) * 60,
              y: pos.y - 10 + Math.cos(Date.now() * 0.001 + i) * 60,
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
            className="fixed text-2xl pointer-events-none z-[9998]"
            style={{
              color: ["#fbbf24", "#f472b6", "#a78bfa", "#6ee7b7", "#fca5a5"][i],
            }}
          >
            {["ॐ", "🌀", "✨", "💫", "🌟"][i]}
          </motion.div>
        ))}

      {/* Sacred geometry grid */}
      <div
        className="fixed inset-0 pointer-events-none z-[9996] opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at ${pos.x}px ${pos.y}px, #fbbf24 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </>
  );
}

export default SacredGeometryCursor;
