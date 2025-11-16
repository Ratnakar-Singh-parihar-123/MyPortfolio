import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ReelA from "../../../assets/video/01.mp4";

const videos = [
  {
    id: 1,
    title: "Portfolio Intro Reel",
    desc: "A quick cinematic intro of my work.",
    url: ReelA,
  },
  {
    id: 2,
    title: "UI/UX Showcase",
    desc: "Smooth and modern UI animations.",
    url: "/reels/uiux.mp4",
  },
];

export default function ReelSection() {
  const [show, setShow] = useState(true);
  const [index, setIndex] = useState(0);
  const [sound, setSound] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);

  // Handle Video Sound & Play
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = !sound;
    vid.play().catch(() => {});
  }, [index, sound]);

  // Auto-progress bar + auto-next
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const update = () => {
      if (vid.duration) {
        const p = (vid.currentTime / vid.duration) * 100;
        setProgress(p);

        if (p >= 99) nextVideo();
      }
    };

    const interval = setInterval(update, 150);

    return () => clearInterval(interval);
  }, [index]);

  const nextVideo = () => {
    setProgress(0);
    setIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: "160%", opacity: 0, scale: 0.6 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: "160%", opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed right-6 top-24 z-[999] w-[235px] h-[430px] 
          rounded-[30px] overflow-hidden relative
          bg-white/10 border border-white/15 backdrop-blur-[20px]
          shadow-[0px_0px_40px_rgba(255,255,255,0.12),0_0_20px_rgba(0,0,0,0.6)]"
        >
          {/* Glow outline */}
          <div className="absolute inset-0 rounded-[30px] 
            shadow-[0_0_25px_rgba(255,255,255,0.18)] pointer-events-none" />

          {/* Inner soft light overlay */}
          <div className="absolute inset-0 bg-gradient-to-br 
            from-white/10 to-transparent pointer-events-none" />

          {/* Close button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setShow(false)}
            className="absolute right-2 top-2 w-8 h-8 flex items-center justify-center 
            bg-black/50 hover:bg-black/70 text-white rounded-full text-sm
            shadow-[0_0_6px_rgba(0,0,0,0.4)] backdrop-blur-md z-40"
          >
            ✕
          </motion.button>

          {/* Sound button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setSound(!sound)}
            className="absolute left-2 top-2 w-8 h-8 flex items-center justify-center 
            bg-black/50 hover:bg-black/70 text-white rounded-full text-sm
            shadow-[0_0_6px_rgba(0,0,0,0.4)] backdrop-blur-md z-40"
          >
            {sound ? "🔊" : "🔈"}
          </motion.button>

          {/* Smooth fade + scale video */}
          <motion.video
            key={index}
            ref={videoRef}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videos[index].url} type="video/mp4" />
          </motion.video>

          {/* Title card */}
          <div className="absolute bottom-0 left-0 right-0 p-4 
            bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[14px] font-semibold tracking-wide"
            >
              {videos[index].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.8, y: 0 }}
              className="text-[10px] leading-tight"
            >
              {videos[index].desc}
            </motion.p>
          </div>

          {/* Next button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={nextVideo}
            className="absolute right-3 bottom-24 w-9 h-9 flex items-center justify-center
            bg-white/25 hover:bg-white/40 rounded-full 
            backdrop-blur-xl text-white text-sm shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          >
            ➤
          </motion.button>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
