import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (!isDesktop) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const hoverOn = () => setHover(true);
    const hoverOff = () => setHover(false);
    const clickDown = () => setClick(true);
    const clickUp = () => setClick(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", clickDown);
    window.addEventListener("mouseup", clickUp);

    const elements = document.querySelectorAll(
      "a, button, input, [role='button']",
    );
    elements.forEach((el) => {
      el.addEventListener("mouseenter", hoverOn);
      el.addEventListener("mouseleave", hoverOff);
    });

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", clickDown);
      window.removeEventListener("mouseup", clickUp);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", hoverOn);
        el.removeEventListener("mouseleave", hoverOff);
      });
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Background glow */}
      <motion.div
        animate={{
          x: pos.x - 30,
          y: pos.y - 30,
          scale: hover ? 2 : click ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          mass: 0.8,
        }}
        className="w-16 h-16 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full fixed pointer-events-none z-40 blur-2xl"
      />

      {/* Main ring */}
      <motion.div
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
          scale: hover ? 1.5 : click ? 0.6 : 1,
          rotate: hover ? 180 : click ? 90 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          mass: 0.3,
        }}
        className="w-8 h-8 border-2 border-purple-400 rounded-full fixed pointer-events-none z-50"
        style={{
          borderTopColor: hover ? "#f472b6" : "#c084fc",
          borderRightColor: hover ? "#c084fc" : "#f472b6",
          borderBottomColor: hover ? "#f472b6" : "#c084fc",
          borderLeftColor: hover ? "#c084fc" : "#f472b6",
        }}
      />

      {/* Core dot */}
      <motion.div
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          scale: hover ? 0 : click ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 20,
          mass: 0.2,
        }}
        className="w-1.5 h-1.5 bg-purple-400 rounded-full fixed pointer-events-none z-50"
      />
    </>
  );
}

export default Cursor;
