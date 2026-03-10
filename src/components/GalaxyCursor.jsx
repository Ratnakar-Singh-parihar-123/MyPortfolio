import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function GalaxyCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [stars, setStars] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    // Animation loop for galaxy rotation
    let frame;
    const animate = () => {
      setRotation((prev) => prev + 0.5);
      setPulse((prev) => {
        const newPulse = prev + 0.02;
        return newPulse > 1.2 ? 0.8 : newPulse;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Generate stars in the galaxy
      if (Math.random() > 0.7) {
        setStars((prev) =>
          [
            ...prev,
            {
              x: e.clientX,
              y: e.clientY,
              size: Math.random() * 3 + 1,
              speed: Math.random() * 2 + 1,
              angle: Math.random() * 360,
              life: 1,
              id: Date.now() + Math.random(),
              color: `hsl(${Math.random() * 60 + 200}, 80%, 70%)`,
            },
          ].slice(-30),
        );
      }
    };

    // Animate stars
    const interval = setInterval(() => {
      setStars((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + Math.cos((s.angle * Math.PI) / 180) * s.speed,
            y: s.y + Math.sin((s.angle * Math.PI) / 180) * s.speed,
            life: s.life - 0.01,
          }))
          .filter((s) => s.life > 0),
      );
    }, 50);

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
      {/* Galaxy core */}
      <motion.div
        animate={{
          x: pos.x - 50,
          y: pos.y - 50,
          scale: hover ? 1.8 : pulse,
          rotate: rotation,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          rotate: { duration: 0 },
        }}
        className="fixed pointer-events-none z-[9999]"
      >
        {/* Spiral arms */}
        {[...Array(4)].map((_, i) => {
          const armAngle = ((i * 90 + rotation) * Math.PI) / 180;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: 40,
                top: 40,
                transformOrigin: "center",
              }}
            >
              {[...Array(8)].map((_, j) => {
                const distance = 10 + j * 8;
                const x = Math.cos(armAngle + j * 0.5) * distance;
                const y = Math.sin(armAngle + j * 0.5) * distance;
                return (
                  <motion.div
                    key={j}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: j * 0.1,
                      repeat: Infinity,
                    }}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      left: x,
                      top: y,
                      background: `hsl(${200 + j * 20}, 80%, 70%)`,
                      boxShadow: `0 0 10px hsl(${200 + j * 20}, 80%, 70%)`,
                    }}
                  />
                );
              })}
            </motion.div>
          );
        })}

        {/* Central black hole */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              "0 0 30px #4a90e2",
              "0 0 60px #9b59b6",
              "0 0 30px #4a90e2",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md"
          style={{ left: 34, top: 34 }}
        />

        {/* Accretion disk */}
        <motion.div
          animate={{ rotate: -rotation }}
          transition={{ duration: 0 }}
          className="absolute w-24 h-24 rounded-full border-2 border-blue-400/30"
          style={{ left: 28, top: 28 }}
        />
      </motion.div>

      {/* Floating stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: star.life, scale: 0 }}
          animate={{
            opacity: star.life,
            scale: star.life * star.size,
            rotate: [0, 360],
          }}
          className="fixed rounded-full pointer-events-none z-[9998]"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            background: star.color,
            boxShadow: `0 0 10px ${star.color}`,
          }}
        />
      ))}

      {/* Nebula effect on hover */}
      {hover && (
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="fixed w-80 h-80 rounded-full pointer-events-none z-[9997]"
          style={{
            left: pos.x - 160,
            top: pos.y - 160,
            background:
              "radial-gradient(circle, rgba(74,144,226,0.2) 0%, rgba(155,89,182,0.2) 50%, transparent 80%)",
            filter: "blur(20px)",
          }}
        />
      )}

      {/* Cosmic dust */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: pos.x - 5 + Math.sin(rotation * 0.1 + i) * 100,
            y: pos.y - 5 + Math.cos(rotation * 0.1 + i) * 100,
            scale: [0.5, 1, 0.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="fixed w-1 h-1 bg-blue-300 rounded-full blur-[1px] pointer-events-none z-[9996]"
        />
      ))}
    </>
  );
}

export default GalaxyCursor;
