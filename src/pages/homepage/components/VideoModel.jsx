import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ReelA from "../../../assets/video/01.mp4";

const videos = [
  {
    id: 1,
    title: "Portfolio Intro Reel",
    desc: "A quick cinematic intro of my work.",
    url: ReelA,
    duration: "0:45",
  },
  {
    id: 2,
    title: "UI/UX Showcase",
    desc: "Smooth and modern UI animations.",
    url: "/reels/uiux.mp4",
    duration: "1:20",
  },
  {
    id: 3,
    title: "3D Motion Design",
    desc: "Immersive 3D animations and transitions.",
    url: "/reels/3d-motion.mp4",
    duration: "0:58",
  },
];

export default function ReelSection() {
  const [show, setShow] = useState(true);
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Handle video setup
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = isMuted;
    vid.volume = volume;

    if (isPlaying) {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      vid.pause();
    }

    // Get duration when loaded
    const handleLoadedMetadata = () => {
      setDuration(vid.duration);
    };

    vid.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      vid.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [index, isMuted, isPlaying, volume]);

  // Progress tracking
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !isPlaying) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      return;
    }

    const updateProgress = () => {
      if (vid.duration && !isNaN(vid.duration)) {
        const currentProgress = (vid.currentTime / vid.duration) * 100;
        setProgress(currentProgress);
        setCurrentTime(vid.currentTime);

        if (currentProgress >= 99.5) {
          nextVideo();
        }
      }
    };

    progressIntervalRef.current = setInterval(updateProgress, 100);
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [index, isPlaying]);

  const nextVideo = () => {
    setProgress(0);
    setCurrentTime(0);
    setIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setProgress(0);
    setCurrentTime(0);
    setIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const togglePlayPause = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isPlaying) {
      vid.pause();
      setIsPlaying(false);
    } else {
      vid.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleSeek = (e) => {
    const vid = videoRef.current;
    if (!vid || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    vid.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
          />

          {/* Main Reel Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              duration: 0.5,
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setShowVolumeSlider(false);
            }}
          >
            <div className="relative max-w-4xl w-full">
              {/* Video Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Video */}
                <motion.video
                  key={index}
                  ref={videoRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  autoPlay
                  playsInline
                  muted={isMuted}
                  className="w-full aspect-video object-cover"
                >
                  <source src={videos[index].url} type="video/mp4" />
                </motion.video>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {/* Title */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2"
                    >
                      <h2 className="text-white font-semibold text-sm">
                        {videos[index].title}
                      </h2>
                    </motion.div>

                    {/* Duration Badge */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className="bg-black/50 backdrop-blur-md rounded-full px-3 py-1"
                    >
                      <span className="text-white/80 text-xs">
                        {videos[index].duration}
                      </span>
                    </motion.div>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShow(false)}
                    className="w-10 h-10 flex items-center justify-center bg-black/50 
                    hover:bg-black/70 rounded-full backdrop-blur-md text-white
                    transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Center Controls (Visible on hover) */}
                <AnimatePresence>
                  {isHovering && (
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevVideo}
                        className="w-12 h-12 flex items-center justify-center bg-black/60 
                        hover:bg-black/80 rounded-full backdrop-blur-md text-white
                        transition-all duration-200"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </motion.button>

                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlayPause}
                        className="w-16 h-16 flex items-center justify-center bg-white/20 
                        hover:bg-white/30 rounded-full backdrop-blur-md text-white
                        transition-all duration-200"
                      >
                        {isPlaying ? (
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </motion.button>

                      <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextVideo}
                        className="w-12 h-12 flex items-center justify-center bg-black/60 
                        hover:bg-black/80 rounded-full backdrop-blur-md text-white
                        transition-all duration-200"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                </AnimatePresence>

                {/* Bottom Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div
                      className="relative h-1 bg-white/20 rounded-full cursor-pointer group"
                      onClick={handleSeek}
                    >
                      <motion.div
                        className="absolute h-full bg-white rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          left: `${progress}%`,
                          transform: `translateX(-50%) translateY(-50%)`,
                        }}
                      />
                    </div>

                    {/* Time Display */}
                    <div className="flex justify-between mt-2">
                      <span className="text-white/80 text-xs">
                        {formatTime(currentTime)}
                      </span>
                      <span className="text-white/80 text-xs">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Play/Pause */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlayPause}
                        className="text-white hover:text-white/80 transition-colors"
                      >
                        {isPlaying ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </motion.button>

                      {/* Volume Control */}
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleMute}
                          onMouseEnter={() => setShowVolumeSlider(true)}
                          className="text-white hover:text-white/80 transition-colors"
                        >
                          {isMuted || volume === 0 ? (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                              />
                            </svg>
                          ) : volume < 0.5 ? (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                              />
                            </svg>
                          )}
                        </motion.button>

                        {/* Volume Slider */}
                        <AnimatePresence>
                          {showVolumeSlider && isHovering && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-full left-0 mb-2 p-2 bg-black/80 backdrop-blur-md rounded-lg"
                            >
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer
                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                                [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white 
                                [&::-webkit-slider-thumb]:rounded-full"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Video Counter */}
                      <div className="flex gap-1 ml-4">
                        {videos.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setIndex(i);
                              setProgress(0);
                              setCurrentTime(0);
                            }}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              i === index
                                ? "bg-white w-6"
                                : "bg-white/40 w-2 hover:bg-white/60"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      className="text-white/80 text-sm hidden md:block"
                    >
                      {videos[index].desc}
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
