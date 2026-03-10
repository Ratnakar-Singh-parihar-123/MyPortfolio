import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const hoverOn = () => setHover(true);
    const hoverOff = () => setHover(false);

    window.addEventListener("mousemove", move);

    const elements = document.querySelectorAll("a, button");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", hoverOn);
      el.addEventListener("mouseleave", hoverOff);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", hoverOn);
        el.removeEventListener("mouseleave", hoverOff);
      });
    };
  }, []);

  return (
    <>
      {/* Glow background */}
      <motion.div
        animate={{
          x: pos.x - 40,
          y: pos.y - 40,
          scale: hover ? 1.5 : 1,
          opacity: hover ? 0.4 : 0.2,
        }}
        transition={{ type: "spring", stiffness: 120 }}
        className="w-20 h-20 bg-purple-500 rounded-full fixed blur-2xl pointer-events-none z-40"
      />

      {/* Outer ring */}
      <motion.div
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: hover ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-10 h-10 border border-purple-400 rounded-full fixed pointer-events-none z-50"
      />

      {/* Inner dot */}
      <motion.div
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: hover ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full fixed pointer-events-none z-50 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
      />
    </>
  );
}

export default Cursor;
