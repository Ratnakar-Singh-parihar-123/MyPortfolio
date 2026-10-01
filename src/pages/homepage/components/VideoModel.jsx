import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  X,
  Play,
  Volume2,
  VolumeX,
  ChevronUp,
  Maximize2,
  Mail,
  Linkedin,
  Sparkles,
} from "lucide-react";

// ============================================================
// 🎬 IMPORT VIDEOS
// ============================================================
import ReelA from "../../../assets/video/FoodMitraDemo.mp4";
import ReelB from "../../../assets/video/FoodMitraDemo1.mp4";
import ReelC from "../../../assets/video/FoodMitraDelivery.mp4";
import ReelD from "../../../assets/video/FoodMitraHouseTiffin.mp4";
import ReelE from "../../../assets/video/Yammiverse.mp4";

// ============================================================
// 🖼️ IMPORT PROJECT LOGOS
// ============================================================
import FoodMitraLogo from "../../../assets/AppImg/AppLogoImg/FoodMitra.png";
import DeliveryPartnerLogo from "../../../assets/AppImg/AppLogoImg/FoodMitraDelivery.png";
import TiffinHouseLogo from "../../../assets/AppImg/AppLogoImg/FoodMitraHouseTiffin.png";
import YammiverseLogo from "../../../assets/websitelogo/Yammiverse.png";

// ============================================================
// 📩 CONTACT + SOCIAL
// ============================================================
const EMAIL = "ratnakarsinghparihar9399@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ratnakarsinghparihar";

// ============================================================
// 🔤 FALLBACK INITIALS
// ============================================================
const getInitials = (title) =>
  title
    .replace(/[—–\-·|]/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// ============================================================
// 🎬 PROJECT SHORT VIDEOS
// ============================================================
const videos = [
  {
    id: 1,
    title: "FoodMitra — Complete Ecosystem",
    projectName: "FoodMitra",
    desc: "A complete food delivery ecosystem connecting customers, Tiffin Houses, and delivery partners through dedicated app workflows.",
    url: ReelA,
    logo: FoodMitraLogo,
    handle: "@foodmitra",
    brandColor: "from-orange-500 to-red-500",
    accent: "rgba(249,115,22,0.5)",
    audioUrl: null,
  },
  {
    id: 2,
    title: "FoodMitra — Customer App",
    projectName: "FoodMitra",
    desc: "Customer-side experience covering nearby food discovery, menu browsing, cart, ordering, payment, and delivery tracking.",
    url: ReelB,
    logo: FoodMitraLogo,
    handle: "@foodmitra",
    brandColor: "from-orange-500 to-amber-500",
    accent: "rgba(251,146,60,0.5)",
    audioUrl: null,
  },
  {
    id: 3,
    title: "FoodMitra — Delivery Partner App",
    projectName: "FoodMitra Delivery",
    desc: "Delivery partner workflow covering nearby delivery requests, order acceptance, pickup, navigation, status updates, and delivery completion.",
    url: ReelC,
    logo: DeliveryPartnerLogo,
    handle: "@foodmitra.delivery.partner",
    brandColor: "from-blue-500 to-cyan-500",
    accent: "rgba(59,130,246,0.5)",
    audioUrl: null,
  },
  {
    id: 4,
    title: "FoodMitra Tiffin House — Vendor App",
    projectName: "FoodMitra Tiffin House",
    desc: "Tiffin House workflow covering order management, food preparation, order status updates, and coordination with delivery partners.",
    url: ReelD,
    logo: TiffinHouseLogo,
    handle: "@foodmitra.tiffin.house",
    brandColor: "from-green-500 to-emerald-600",
    accent: "rgba(16,185,129,0.5)",
    audioUrl: null,
  },
  {
    id: 5,
    title: "Yammiverse — Recipe Sharing Platform",
    projectName: "Yammiverse",
    desc: "A MERN-based recipe-sharing platform where users can discover recipes, explore cooking instructions, and share their own creations.",
    url: ReelE,
    logo: YammiverseLogo,
    handle: "@yammiverse",
    brandColor: "from-purple-500 to-pink-500",
    accent: "rgba(168,85,247,0.5)",
    audioUrl: null,
  },
];

// ============================================================
// 🎞️ ANIMATION EASING
// ============================================================
const ENTER_EASE = [0.22, 1, 0.36, 1];
const EXIT_EASE = [0.65, 0, 0.35, 1];

export default function ReelSection({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [miniProgress, setMiniProgress] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const miniVideoRef = useRef(null);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const audioRef = useRef(null);
  const bgMediaRef = useRef([]);
  const rafRef = useRef(null);
  const miniRafRef = useRef(null);
  const isLoopResettingRef = useRef(false);
  const introTimerRef = useRef(null);

  // ============================================================
  // 🔊 CUSTOM AUDIO CHECK
  // ============================================================
  const hasCustomAudio = (v) => Boolean(v?.audioUrl);

  // ============================================================
  // ⏱️ 1 SECOND DELAY BEFORE WIDGET APPEARS
  // ============================================================
  useEffect(() => {
    if (typeof open === "boolean") {
      if (open) {
        const t = setTimeout(() => setMounted(true), 1000);

        return () => clearTimeout(t);
      }

      setMounted(false);
    } else {
      const t = setTimeout(() => setMounted(true), 1000);

      return () => clearTimeout(t);
    }
  }, [open]);

  // ============================================================
  // 🎬 INTRO REVEAL ON EACH VIDEO CHANGE
  // ============================================================
  useEffect(() => {
    if (!isFullscreen) return;

    setShowIntro(true);

    if (introTimerRef.current) {
      clearTimeout(introTimerRef.current);
    }

    introTimerRef.current = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => {
      if (introTimerRef.current) {
        clearTimeout(introTimerRef.current);
      }
    };
  }, [activeIndex, isFullscreen]);

  // ============================================================
  // ❌ CLOSE EVERYTHING
  // ============================================================
  const closeAll = useCallback(() => {
    setMounted(false);
    setIsFullscreen(false);
    onClose?.();
  }, [onClose]);

  // ============================================================
  // ⏸️ PAUSE BACKGROUND MEDIA
  // ============================================================
  useEffect(() => {
    if (!mounted) return;

    const all = Array.from(document.querySelectorAll("video, audio"));

    const ourEls = [
      miniVideoRef.current,
      audioRef.current,
      ...videoRefs.current,
    ].filter(Boolean);

    bgMediaRef.current = [];

    all.forEach((el) => {
      if (ourEls.includes(el)) return;

      bgMediaRef.current.push({
        el,
        wasPaused: el.paused,
      });

      try {
        el.pause();
        el.muted = true;
      } catch {}
    });

    return () => {
      bgMediaRef.current.forEach(({ el, wasPaused }) => {
        if (!wasPaused) {
          try {
            el.play().catch(() => {});
          } catch {}
        }
      });

      bgMediaRef.current = [];
    };
  }, [mounted]);

  // ============================================================
  // 🔒 BODY SCROLL LOCK
  // ============================================================
  useEffect(() => {
    if (!isFullscreen) return;

    const prev = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isFullscreen]);

  // ============================================================
  // ⌨️ KEYBOARD SHORTCUTS
  // ============================================================
  useEffect(() => {
    if (!isFullscreen) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }

      if (e.key === "ArrowDown") {
        scrollToIndex(Math.min(activeIndex + 1, videos.length - 1));
      }

      if (e.key === "ArrowUp") {
        scrollToIndex(Math.max(activeIndex - 1, 0));
      }

      if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isFullscreen, activeIndex]);

  // ============================================================
  // ▶️ MINI VIDEO AUTOPLAY
  // ============================================================
  useEffect(() => {
    const vid = miniVideoRef.current;

    if (!vid) return;

    vid.muted = true;

    if (!isFullscreen && mounted) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isFullscreen, mounted, activeIndex]);

  // ============================================================
  // 📊 MINI PROGRESS
  // ============================================================
  useEffect(() => {
    if (isFullscreen || !mounted) return;

    const tick = () => {
      const vid = miniVideoRef.current;

      if (vid && vid.duration && !isNaN(vid.duration)) {
        setMiniProgress((vid.currentTime / vid.duration) * 100);
      }

      miniRafRef.current = requestAnimationFrame(tick);
    };

    miniRafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(miniRafRef.current);
    };
  }, [isFullscreen, mounted, activeIndex]);

  // ============================================================
  // 📱 DETECT ACTIVE VIDEO FROM SCROLL
  // ============================================================
  useEffect(() => {
    const el = containerRef.current;

    if (!el || !isFullscreen) return;

    const onScroll = () => {
      if (isLoopResettingRef.current) return;

      const h = el.clientHeight;

      const idx = Math.round(el.scrollTop / h);

      if (idx !== activeIndex && idx >= 0 && idx < videos.length) {
        setActiveIndex(idx);
        setIsPaused(false);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [isFullscreen, activeIndex]);

  // ============================================================
  // ▶️ PLAY ACTIVE VIDEO / PAUSE OTHERS
  // ============================================================
  useEffect(() => {
    if (!isFullscreen) return;

    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;

      const customAudio = hasCustomAudio(videos[i]);

      vid.muted = customAudio ? true : isMuted;

      if (i === activeIndex) {
        if (!isPaused) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeIndex, isPaused, isFullscreen, isMuted]);

  // ============================================================
  // 🔇 UPDATE VIDEO MUTE
  // ============================================================
  useEffect(() => {
    if (!isFullscreen) return;

    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;

      vid.muted = hasCustomAudio(videos[i]) ? true : isMuted;
    });
  }, [isMuted, isFullscreen]);

  // ============================================================
  // 🎵 CUSTOM AUDIO
  // ============================================================
  useEffect(() => {
    const a = audioRef.current;

    if (!a) return;

    const activeVideo = videos[activeIndex];

    if (!hasCustomAudio(activeVideo)) {
      try {
        a.pause();
        a.removeAttribute("src");
        a.load();
      } catch {}

      return;
    }

    if (!isFullscreen) {
      a.pause();
      return;
    }

    try {
      const wanted = activeVideo.audioUrl;

      if (a.getAttribute("src") !== wanted) {
        a.src = wanted;
        a.currentTime = 0;
      }

      a.loop = true;
      a.muted = isMuted;

      if (!isPaused) {
        a.play().catch(() => {});
      } else {
        a.pause();
      }
    } catch {}
  }, [activeIndex, isFullscreen, isPaused, isMuted]);

  // ============================================================
  // 🔊 UPDATE AUDIO MUTE
  // ============================================================
  useEffect(() => {
    const a = audioRef.current;

    if (!a) return;

    a.muted = isMuted;
  }, [isMuted]);

  // ============================================================
  // 📊 FULLSCREEN PROGRESS
  // ============================================================
  useEffect(() => {
    if (!isFullscreen) return;

    const tick = () => {
      const vid = videoRefs.current[activeIndex];

      if (vid && vid.duration && !isNaN(vid.duration)) {
        setProgress((vid.currentTime / vid.duration) * 100);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isFullscreen, activeIndex]);

  // ============================================================
  // 👆 SWIPE HINT
  // ============================================================
  useEffect(() => {
    if (!isFullscreen) return;

    setShowHint(true);

    const t = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(t);
  }, [isFullscreen, activeIndex]);

  // ============================================================
  // 📜 SCROLL TO VIDEO
  // ============================================================
  const scrollToIndex = (i) => {
    const el = containerRef.current;

    if (!el) return;

    el.scrollTo({
      top: i * el.clientHeight,
      behavior: "smooth",
    });
  };

  // ============================================================
  // 🎬 VIDEO END
  // ============================================================
  const handleVideoEnd = (i) => {
    if (i !== activeIndex) return;

    const el = containerRef.current;

    if (!el) return;

    if (i === videos.length - 1) {
      isLoopResettingRef.current = true;

      el.scrollTo({
        top: 0,
        behavior: "auto",
      });

      setActiveIndex(0);
      setIsPaused(false);

      requestAnimationFrame(() => {
        isLoopResettingRef.current = false;
      });

      return;
    }

    const next = i + 1;

    el.scrollTo({
      top: next * el.clientHeight,
      behavior: "smooth",
    });
  };

  // ============================================================
  // 🎮 CONTROLS
  // ============================================================
  const togglePlayPause = () => {
    setIsPaused((p) => !p);
  };

  const toggleMute = () => {
    setIsMuted((m) => !m);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    setIsPaused(false);
  };

  // ============================================================
  // 🔗 MUTE + NAVIGATE
  // ============================================================
  const muteAndNavigate = useCallback((url) => {
    setIsMuted(true);

    const els = [
      miniVideoRef.current,
      audioRef.current,
      ...videoRefs.current,
    ].filter(Boolean);

    els.forEach((el) => {
      try {
        el.muted = true;
        el.pause();
      } catch {}
    });

    setTimeout(() => {
      if (url.startsWith("mailto:")) {
        window.location.href = url;
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }, 120);
  }, []);

  // ============================================================
  // 🔗 LINKEDIN
  // ============================================================
  const openLinkedIn = (e) => {
    e.stopPropagation();

    muteAndNavigate(LINKEDIN_URL);
  };

  // ============================================================
  // 📩 CONTACT
  // ============================================================
  const openContact = (e) => {
    e.stopPropagation();

    muteAndNavigate(`mailto:${EMAIL}?subject=Let's%20work%20together`);
  };

  // ============================================================
  // 🚫 DON'T RENDER
  // ============================================================
  if (!mounted && !isFullscreen) {
    return null;
  }

  const activeVideo = videos[activeIndex];

  return (
    <>
      {/* ============================================================
          CUSTOM SCROLLBAR HIDE
          ============================================================ */}
      <style>{`
        [data-reel-scroll]::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
          display: none !important;
        }

        [data-reel-scroll] {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      {/* ============================================================
          CUSTOM AUDIO
          ============================================================ */}
      <audio ref={audioRef} preload="auto" loop playsInline />

      {/* ================================================================ */}
      {/* 🎬 MINI REEL WIDGET                                              */}
      {/* ================================================================ */}

      <AnimatePresence>
        {!isFullscreen && (
          <motion.div
            key="mini-reel"
            initial={{
              x: -340,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                duration: 1.15,
                ease: ENTER_EASE,
              },
            }}
            exit={{
              x: -340,
              opacity: 0,
              transition: {
                duration: 1.15,
                ease: EXIT_EASE,
              },
            }}
            className="
              fixed
              z-[60]

              left-3
              bottom-4

              sm:left-6
              sm:bottom-8

              md:left-10
              md:bottom-12

              lg:left-12
              lg:bottom-16
            "
          >
            <div className="relative">
              {/* ========================================================
                  AMBIENT BRAND GLOW
                  ======================================================== */}
              <div
                className="
                  absolute
                  -inset-2
                  sm:-inset-3
                  rounded-[1.8rem]
                  blur-xl
                  sm:blur-2xl
                  opacity-45
                  sm:opacity-60
                  pointer-events-none
                  transition-all
                  duration-700
                "
                style={{
                  background: `radial-gradient(
                    circle at 50% 50%,
                    ${activeVideo.accent || "rgba(168,85,247,0.5)"},
                    transparent 70%
                  )`,
                }}
              />

              {/* ========================================================
                  MINI CARD
                  ======================================================== */}
              <motion.div
                onClick={openFullscreen}
                whileHover={{
                  scale: 1.03,
                  y: -4,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    openFullscreen();
                  }
                }}
                className="
                  group
                  relative

                  w-[132px]
                  h-[220px]

                  sm:w-[150px]
                  sm:h-[255px]

                  md:w-[165px]
                  md:h-[275px]

                  rounded-[1.35rem]
                  overflow-hidden
                  bg-black

                  ring-1
                  ring-white/20

                  shadow-[0_18px_50px_-10px_rgba(0,0,0,0.9)]

                  cursor-pointer
                  block
                  touch-manipulation
                  select-none
                "
                aria-label="Open reels"
              >
                {/* ======================================================
                    MINI VIDEO
                    ====================================================== */}
                <video
                  key={activeIndex}
                  ref={miniVideoRef}
                  src={activeVideo.url}
                  muted
                  autoPlay
                  playsInline
                  preload="auto"
                  onEnded={() =>
                    setActiveIndex((prev) => (prev + 1) % videos.length)
                  }
                  className="absolute inset-0 object-cover w-full h-full "
                />

                {/* ======================================================
                    TOP GRADIENT
                    ====================================================== */}
                <div className="absolute inset-x-0 top-0 h-16 pointer-events-none  bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

                {/* ======================================================
                    BOTTOM GRADIENT
                    ====================================================== */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none  h-28 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                {/* ======================================================
                    MINI PROGRESS
                    ====================================================== */}
                <div
                  className="
                    absolute
                    top-0
                    left-0
                    right-0
                    z-30
                    h-[2.5px]
                    bg-white/15
                  "
                >
                  <div
                    className="
                      h-full
                      bg-white
                      rounded-r-full
                      transition-[width]
                      duration-100
                      ease-linear
                    "
                    style={{
                      width: `${miniProgress}%`,
                      boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                    }}
                  />
                </div>

                {/* ======================================================
                    PROJECT BADGE
                    ====================================================== */}
                <div
                  className="
                    absolute
                    z-20

                    flex
                    items-center
                    gap-1.5

                    pl-1
                    pr-2
                    py-1

                    rounded-full

                    left-2
                    top-3

                    bg-black/60
                    backdrop-blur-md

                    ring-1
                    ring-white/20

                    pointer-events-none

                    max-w-[105px]
                  "
                >
                  <div
                    className={`
                      w-4
                      h-4
                      rounded-full

                      bg-gradient-to-br
                      ${activeVideo.brandColor || "from-primary to-purple-500"}

                      flex
                      items-center
                      justify-center

                      overflow-hidden
                      flex-shrink-0

                      ring-1
                      ring-white/20
                    `}
                  >
                    {activeVideo.logo ? (
                      <img
                        src={activeVideo.logo}
                        alt=""
                        className="object-cover w-full h-full "
                      />
                    ) : (
                      <span
                        className="
                          text-[7px]
                          font-bold
                          text-white
                        "
                      >
                        {getInitials(activeVideo.title)}
                      </span>
                    )}
                  </div>

                  <span
                    className="
                      text-[8px]
                      font-bold
                      text-white
                      tracking-wider
                      uppercase
                      truncate
                      max-w-[75px]
                    "
                  >
                    {activeVideo.projectName}
                  </span>
                </div>

                {/* ======================================================
                    CLOSE BUTTON
                    ALWAYS VISIBLE ON MOBILE
                    ====================================================== */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeAll();
                  }}
                  className="absolute z-30 flex items-center justify-center text-white transition-all duration-200 rounded-full shadow-lg opacity-100  top-2 right-2 w-7 h-7 bg-black/65 backdrop-blur-md ring-1 ring-white/25 hover:bg-red-500/90 hover:scale-105 active:scale-90 touch-manipulation"
                  aria-label="Hide reel widget"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* ======================================================
                    MUTE BUTTON
                    ====================================================== */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="
                    absolute
                    z-30

                    bottom-2.5
                    left-2.5

                    flex
                    items-center
                    justify-center

                    w-7
                    h-7

                    rounded-full

                    text-white

                    bg-black/65
                    backdrop-blur-md

                    ring-1
                    ring-white/25

                    shadow-lg

                    transition-all
                    duration-200

                    hover:bg-black/85
                    hover:scale-105

                    active:scale-90

                    touch-manipulation
                  "
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* ======================================================
                    FULLSCREEN HINT
                    DESKTOP ONLY
                    ====================================================== */}
                <div className="absolute inset-0 items-center justify-center hidden transition-opacity duration-300 opacity-0 pointer-events-none  lg:flex group-hover:opacity-100">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-xl  bg-black/60 backdrop-blur-md ring-1 ring-white/30">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* ======================================================
                    BOTTOM INFO
                    ====================================================== */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0

                    p-2.5
                    pl-10
                    pr-2

                    text-left
                  "
                >
                  <p
                    className="
                      text-white
                      text-[10px]
                      sm:text-[11px]

                      font-semibold
                      line-clamp-2

                      leading-tight
                    "
                  >
                    {activeVideo.title}
                  </p>

                  <p
                    className="
                      text-white/55
                      text-[9px]
                      line-clamp-1
                    "
                  >
                    {activeVideo.handle}
                  </p>
                </div>

                {/* ======================================================
                    HOVER BRAND RING
                    ====================================================== */}
                <div
                  className="
                    absolute
                    inset-0

                    rounded-[1.35rem]

                    transition-all
                    duration-300

                    pointer-events-none

                    ring-2
                    ring-transparent

                    group-hover:ring-white/25
                  "
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* 🎬 FULLSCREEN MODAL                                               */}
      {/* ================================================================ */}

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="reel-full"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              ease: EXIT_EASE,
            }}
            className="
              fixed
              inset-0
              z-[999]
              bg-black/95
            "
          >
            {/* ==========================================================
                BACKDROP
                ========================================================== */}
            <div
              className="absolute inset-0  lg:bg-black/70 lg:backdrop-blur-xl"
              onClick={() => setIsFullscreen(false)}
            />

            {/* ==========================================================
                FULLSCREEN CONTAINER
                ========================================================== */}
            <motion.div
              initial={{
                x: "-100vw",
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: "-100vw",
                opacity: 0,
              }}
              transition={{
                duration: 0.9,
                ease: isFullscreen ? ENTER_EASE : EXIT_EASE,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none  lg:p-6"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="
                  relative

                  w-full
                  h-full

                  lg:w-[400px]
                  lg:h-[88vh]
                  lg:max-h-[780px]

                  lg:rounded-[2rem]

                  overflow-hidden

                  bg-black

                  pointer-events-auto

                  lg:ring-1
                  lg:ring-white/15

                  lg:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95)]
                "
              >
                {/* ======================================================
                    VIDEO SCROLLER
                    ====================================================== */}
                <div
                  ref={containerRef}
                  data-reel-scroll
                  className="w-full h-full overflow-y-scroll  snap-y snap-mandatory overscroll-contain"
                  style={{
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {videos.map((video, i) => {
                    const isActive = i === activeIndex;

                    const initials = getInitials(video.title);

                    const videoShouldBeMuted = hasCustomAudio(video)
                      ? true
                      : isMuted;

                    return (
                      <div
                        key={video.id}
                        className="relative flex-shrink-0 w-full h-full overflow-hidden  snap-start snap-always"
                      >
                        {/* ==================================================
                            FULLSCREEN VIDEO
                            ================================================== */}
                        <video
                          ref={(el) => (videoRefs.current[i] = el)}
                          src={video.url}
                          muted={videoShouldBeMuted}
                          playsInline
                          preload="metadata"
                          onEnded={() => handleVideoEnd(i)}
                          onClick={togglePlayPause}
                          className="object-cover w-full h-full "
                        />

                        {/* ==================================================
                            TOP GRADIENT
                            ================================================== */}
                        <div className="absolute inset-x-0 top-0 pointer-events-none  h-44 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

                        {/* ==================================================
                            BOTTOM GRADIENT
                            ================================================== */}
                        <div className="absolute inset-x-0 bottom-0 pointer-events-none  h-80 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />

                        {/* ==================================================
                            PROJECT BADGE
                            ================================================== */}
                        <motion.div
                          initial={{
                            opacity: 0,
                            x: -20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: 0.15,
                            duration: 0.4,
                          }}
                          className="absolute z-20 flex items-center gap-2 py-1 pl-1 pr-3 rounded-full pointer-events-none  top-3 left-3 bg-black/60 backdrop-blur-md ring-1 ring-white/20"
                        >
                          <div
                            className={`
                              w-6
                              h-6

                              rounded-full

                              bg-gradient-to-br
                              ${
                                video.brandColor || "from-primary to-purple-500"
                              }

                              flex
                              items-center
                              justify-center

                              overflow-hidden
                              flex-shrink-0

                              ring-1
                              ring-white/25
                            `}
                          >
                            {video.logo ? (
                              <img
                                src={video.logo}
                                alt=""
                                className="object-cover w-full h-full "
                              />
                            ) : (
                              <span
                                className="
                                  text-[9px]
                                  font-bold
                                  text-white
                                "
                              >
                                {initials}
                              </span>
                            )}
                          </div>

                          <span
                            className="
                              text-[11px]
                              font-bold
                              text-white

                              tracking-wide
                              uppercase

                              whitespace-nowrap
                            "
                          >
                            {video.projectName}
                          </span>

                          <span
                            className="
                              hidden
                              text-[10px]
                              text-white/50
                              sm:inline
                            "
                          >
                            • App Demo
                          </span>
                        </motion.div>

                        {/* ==================================================
                            PROGRESS SEGMENTS
                            ================================================== */}
                        <div className="absolute z-20 flex gap-1  top-14 left-3 right-3">
                          {videos.map((_, idx) => {
                            const isDone = idx < i;

                            const isNow = idx === i;

                            return (
                              <div
                                key={idx}
                                className="
                                    flex-1

                                    h-[3px]

                                    bg-white/20

                                    rounded-full

                                    overflow-hidden

                                    backdrop-blur-sm
                                  "
                              >
                                <div
                                  className="h-full bg-white rounded-full "
                                  style={{
                                    width: isDone
                                      ? "100%"
                                      : isNow
                                        ? `${progress}%`
                                        : "0%",
                                    transition: isNow
                                      ? "width 100ms linear"
                                      : "none",
                                    boxShadow: isNow
                                      ? "0 0 8px rgba(255,255,255,0.7)"
                                      : "none",
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>

                        {/* ==================================================
                            TOP RIGHT CONTROLS
                            ================================================== */}
                        <div className="absolute z-20 flex flex-col gap-2  top-20 right-3">
                          {/* MUTE */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMute();
                            }}
                            className="flex items-center justify-center w-10 h-10 text-white transition rounded-full  bg-black/50 backdrop-blur-md ring-1 ring-white/20 hover:bg-black/70 active:scale-95 touch-manipulation"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>

                          {/* CLOSE */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsFullscreen(false);
                            }}
                            className="flex items-center justify-center w-10 h-10 text-white transition rounded-full  bg-black/50 backdrop-blur-md ring-1 ring-white/20 hover:bg-red-500/80 active:scale-95 touch-manipulation"
                            aria-label="Back to mini"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* ==================================================
                            RIGHT ACTION RAIL
                            ================================================== */}
                        <div className="absolute z-20 flex flex-col items-center gap-5  right-3 bottom-32">
                          <ReelAction
                            icon={Mail}
                            label="Contact"
                            activeColor="text-primary"
                            onClick={openContact}
                          />

                          <ReelAction
                            icon={Linkedin}
                            label="Follow"
                            activeColor="text-blue-400"
                            onClick={openLinkedIn}
                          />
                        </div>

                        {/* ==================================================
                            BOTTOM INFO
                            ================================================== */}
                        <div className="absolute bottom-0 left-0 z-10 p-4 pb-5 text-left  right-20">
                          {/* PROFILE */}
                          <div className="flex items-center gap-3 mb-3 ">
                            <div
                              className={`
                                flex
                                items-center
                                justify-center

                                overflow-hidden

                                text-xs
                                font-bold
                                text-white

                                rounded-full

                                w-10
                                h-10

                                ring-2
                                ring-white/30

                                flex-shrink-0

                                bg-gradient-to-br
                                ${
                                  video.brandColor ||
                                  "from-primary to-purple-500"
                                }
                              `}
                            >
                              {video.logo ? (
                                <img
                                  src={video.logo}
                                  alt={video.handle}
                                  className="object-cover w-full h-full rounded-full "
                                />
                              ) : (
                                <span className="tracking-tight">
                                  {initials}
                                </span>
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white truncate ">
                                {video.handle}
                              </p>

                              <p
                                className="
                                  text-white/55
                                  text-[11px]
                                  truncate
                                "
                              >
                                Ratnakar Singh Parihar
                              </p>
                            </div>
                          </div>

                          {/* TITLE */}
                          <h3 className="mb-1 text-sm font-semibold text-white  line-clamp-1">
                            {video.title}
                          </h3>

                          {/* DESCRIPTION */}
                          <p className="text-xs leading-snug  text-white/70 line-clamp-2">
                            {video.desc}
                          </p>

                          {/* WATERMARK */}
                          <div
                            className="
                              flex
                              items-center
                              gap-1.5

                              mt-2.5
                              pt-2.5

                              border-t
                              border-white/10
                            "
                          >
                            <Sparkles className="w-3 h-3 text-primary" />

                            <span
                              className="
                                text-[10px]
                                text-white/55
                              "
                            >
                              Made by{" "}
                              <span className="font-semibold  text-white/90">
                                @ratnakar.dev
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* ==================================================
                            INTRO REVEAL
                            ================================================== */}
                        <AnimatePresence>
                          {isActive && showIntro && (
                            <motion.div
                              key={`intro-${video.id}-${activeIndex}`}
                              initial={{
                                opacity: 0,
                              }}
                              animate={{
                                opacity: 1,
                              }}
                              exit={{
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.5,
                              }}
                              className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none  bg-black/75 backdrop-blur-xl"
                            >
                              {/* BIG LOGO */}
                              <motion.div
                                initial={{
                                  scale: 0.4,
                                  opacity: 0,
                                  rotate: -8,
                                }}
                                animate={{
                                  scale: 1,
                                  opacity: 1,
                                  rotate: 0,
                                }}
                                transition={{
                                  delay: 0.15,
                                  type: "spring",
                                  damping: 14,
                                  stiffness: 180,
                                }}
                                className={`
                                    relative

                                    w-28
                                    h-28

                                    rounded-[1.8rem]

                                    overflow-hidden

                                    bg-gradient-to-br
                                    ${
                                      video.brandColor ||
                                      "from-primary to-purple-500"
                                    }

                                    flex
                                    items-center
                                    justify-center

                                    shadow-2xl

                                    ring-2
                                    ring-white/25
                                  `}
                                style={{
                                  boxShadow: `0 20px 60px -10px ${
                                    video.accent || "rgba(168,85,247,0.6)"
                                  }`,
                                }}
                              >
                                {video.logo ? (
                                  <img
                                    src={video.logo}
                                    alt=""
                                    className="object-cover w-full h-full "
                                  />
                                ) : (
                                  <span className="text-3xl font-bold text-white ">
                                    {initials}
                                  </span>
                                )}

                                <motion.div
                                  className="
                                      absolute
                                      inset-0

                                      rounded-[1.8rem]

                                      ring-2
                                      ring-white/40
                                    "
                                  animate={{
                                    scale: [1, 1.15, 1],
                                    opacity: [0.6, 0, 0.6],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />
                              </motion.div>

                              {/* PROJECT NAME */}
                              <motion.h2
                                initial={{
                                  y: 20,
                                  opacity: 0,
                                }}
                                animate={{
                                  y: 0,
                                  opacity: 1,
                                }}
                                transition={{
                                  delay: 0.4,
                                  duration: 0.5,
                                }}
                                className="mt-6 text-2xl font-bold tracking-tight text-white  md:text-3xl"
                              >
                                {video.projectName}
                              </motion.h2>

                              {/* HANDLE */}
                              <motion.p
                                initial={{
                                  y: 15,
                                  opacity: 0,
                                }}
                                animate={{
                                  y: 0,
                                  opacity: 1,
                                }}
                                transition={{
                                  delay: 0.55,
                                  duration: 0.5,
                                }}
                                className="
                                    mt-1.5

                                    text-xs
                                    font-medium

                                    tracking-wide

                                    text-white/65
                                  "
                              >
                                {video.handle}
                              </motion.p>

                              {/* DIVIDER + BUILT BY */}
                              <motion.div
                                initial={{
                                  opacity: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                }}
                                transition={{
                                  delay: 0.8,
                                  duration: 0.5,
                                }}
                                className="flex flex-col items-center gap-2 mt-5 "
                              >
                                <div className="w-20 h-px  bg-white/20" />

                                <p
                                  className="
                                      text-[10px]

                                      uppercase

                                      tracking-[0.25em]

                                      text-white/45
                                    "
                                >
                                  Built by
                                </p>

                                <p className="text-xs font-semibold  text-white/90">
                                  Ratnakar Singh Parihar
                                </p>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* ==================================================
                            PAUSE OVERLAY
                            ================================================== */}
                        <AnimatePresence>
                          {isPaused && isActive && !showIntro && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                scale: 0.6,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.6,
                              }}
                              transition={{
                                duration: 0.2,
                              }}
                              className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none "
                            >
                              <div className="flex items-center justify-center w-20 h-20 rounded-full  bg-black/50 backdrop-blur-md ring-1 ring-white/25">
                                <Play
                                  className="ml-1 text-white  w-9 h-9"
                                  fill="white"
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* ======================================================
                    BOTTOM DOTS — DESKTOP ONLY
                    ====================================================== */}
                <div
                  className="
                    absolute
                    bottom-3

                    left-1/2
                    -translate-x-1/2

                    hidden
                    lg:flex

                    gap-1.5

                    z-20
                  "
                >
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToIndex(i)}
                      className={`
                        h-1.5

                        rounded-full

                        transition-all
                        duration-300

                        ${
                          i === activeIndex
                            ? "w-7 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                            : "w-1.5 bg-white/35 hover:bg-white/60"
                        }
                      `}
                      aria-label={`Go to video ${i + 1}`}
                    />
                  ))}
                </div>

                {/* ======================================================
                    SWIPE HINT
                    ====================================================== */}
                <AnimatePresence>
                  {showHint && !showIntro && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="absolute z-20 -translate-x-1/2 pointer-events-none  left-1/2 bottom-24"
                    >
                      <div
                        className="
                            px-3
                            py-1.5

                            rounded-full

                            bg-black/60
                            backdrop-blur-md

                            ring-1
                            ring-white/20

                            text-white

                            text-[11px]

                            flex
                            items-center
                            gap-1.5
                          "
                      >
                        <ChevronUp className="w-3 h-3  animate-bounce" />
                        Swipe for next
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================
// 🎯 REEL ACTION BUTTON
// ============================================================
function ReelAction({ icon: Icon, label, active, activeColor, onClick }) {
  return (
    <motion.button
      whileTap={{
        scale: 0.85,
      }}
      whileHover={{
        scale: 1.08,
      }}
      onClick={onClick}
      className="flex flex-col items-center gap-1 text-white select-none  group touch-manipulation"
    >
      <div className="flex items-center justify-center transition-all rounded-full  w-11 h-11 bg-black/50 backdrop-blur-md ring-1 ring-white/20 group-hover:bg-black/70 group-hover:ring-white/35 group-active:scale-95">
        <Icon
          className={`
            w-5
            h-5

            transition-colors

            ${active ? activeColor : "text-white"}
          `}
          strokeWidth={2}
        />
      </div>

      {label && (
        <span
          className="
            text-[10px]
            font-medium
            text-white/85
          "
        >
          {label}
        </span>
      )}
    </motion.button>
  );
}
