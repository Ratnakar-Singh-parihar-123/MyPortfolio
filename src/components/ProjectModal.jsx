import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./AppIcon";
import Image from "./AppImage";
import Button from "./ui/Button";

/* ============================================================
   PROJECT MODAL — Redesigned
   ------------------------------------------------------------
   • Full-screen-safe layout (leaves room for bottom nav bar)
   • Hero gallery with thumbnail strip
   • Animated section cards with icons
   • Nicer tech chips, metric cards, feature grid
   • Graceful fallbacks when fields are missing
   ============================================================ */

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  /* ---------------- Gallery data ---------------- */
  const gallery = useMemo(() => {
    if (!project) return [];
    const g = Array.isArray(project.gallery) ? project.gallery : [];
    // Always put the main image first, avoid duplicate
    const main = project.image;
    const rest = g.filter((img) => img && img !== main);
    return [main, ...rest].filter(Boolean);
  }, [project]);

  /* Reset active image when project changes */
  useEffect(() => {
    setActiveImageIndex(0);
    setCopied(false);
  }, [project?.id]);

  /* ---------------- Body scroll lock + ESC ---------------- */
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight")
          setActiveImageIndex((i) =>
            gallery.length ? (i + 1) % gallery.length : 0,
          );
        if (e.key === "ArrowLeft")
          setActiveImageIndex((i) =>
            gallery.length ? (i - 1 + gallery.length) % gallery.length : 0,
          );
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose, gallery.length]);

  if (!project) return null;

  /* ---------------- Safe field extraction ---------------- */
  const {
    title,
    description,
    fullDescription,
    category,
    status,
    year,
    complexity,
    duration,
    rating,
    industry,
    technologies = [],
    features = [],
    metrics = [],
    challenges = [],
    links = {},
    liveUrl,
    githubUrl,
  } = project;

  // Support both `links.live` and top-level `liveUrl`
  const liveLink = links?.live || liveUrl;
  const githubLink = links?.github || githubUrl;

  const longDescription = fullDescription || description;

  /* ---------------- Status color helper ---------------- */
  const statusStyle = (() => {
    const s = (status || "").toLowerCase();
    if (s.includes("live") || s.includes("production"))
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
    if (s.includes("development") || s.includes("progress"))
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
    if (s.includes("planned") || s.includes("coming"))
      return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30";
    return "bg-primary/15 text-primary border-primary/30";
  })();

  /* ---------------- Share handler ---------------- */
  const handleShare = async () => {
    const shareUrl = liveLink || window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled — ignore */
    }
  };

  /* ---------------- Framer variants ---------------- */
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 24,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * i, duration: 0.35 },
    }),
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) onClose();
  };

  const hasGallery = gallery.length > 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-3 pt-3 pb-24 sm:px-4 sm:pt-6 sm:pb-10">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-md"
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex flex-col w-full max-w-5xl max-h-full overflow-hidden border shadow-2xl bg-background border-border rounded-3xl"
          >
            {/* ---------------- Close Button ---------------- */}
            <button
              onClick={onClose}
              className="absolute z-30 flex items-center justify-center w-10 h-10 transition-all border rounded-full outline-none top-4 right-4 bg-background/80 backdrop-blur-md border-border hover:bg-muted focus:ring-2 focus:ring-primary"
              aria-label="Close modal"
            >
              <Icon name="X" size={18} />
            </button>

            {/* ---------------- Scrollable Content ---------------- */}
            <div className="overflow-y-auto">
              {/* ================================================== */}
              {/* HERO GALLERY                                        */}
              {/* ================================================== */}
              <div className="relative">
                <div className="relative h-56 overflow-hidden sm:h-72 md:h-80 bg-muted">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={gallery[activeImageIndex] || project.image}
                        alt={title}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Prev / Next buttons (only if gallery) */}
                  {hasGallery && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImageIndex(
                            (i) => (i - 1 + gallery.length) % gallery.length,
                          )
                        }
                        className="absolute flex items-center justify-center text-white transition-all -translate-y-1/2 border rounded-full w-9 h-9 left-3 top-1/2 bg-black/40 backdrop-blur-sm border-white/20 hover:bg-black/60"
                        aria-label="Previous image"
                      >
                        <Icon name="ChevronLeft" size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setActiveImageIndex((i) => (i + 1) % gallery.length)
                        }
                        className="absolute flex items-center justify-center text-white transition-all -translate-y-1/2 border rounded-full w-9 h-9 right-3 top-1/2 bg-black/40 backdrop-blur-sm border-white/20 hover:bg-black/60"
                        aria-label="Next image"
                      >
                        <Icon name="ChevronRight" size={18} />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {hasGallery && (
                    <div className="absolute top-4 left-4 px-2.5 py-1 text-[11px] font-medium text-white bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
                      {activeImageIndex + 1} / {gallery.length}
                    </div>
                  )}

                  {/* Bottom overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {/* Status badge */}
                      {status && (
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${statusStyle}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {status}
                        </span>
                      )}

                      {/* Category */}
                      {category && (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white border rounded-full bg-white/15 backdrop-blur-sm border-white/20">
                          {category}
                        </span>
                      )}

                      {/* Year */}
                      {year && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-white border rounded-full bg-white/15 backdrop-blur-sm border-white/20">
                          <Icon name="Calendar" size={12} />
                          {year}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                      {title}
                    </h2>

                    {/* Quick meta row */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-white/80 sm:text-sm">
                      {rating && (
                        <span className="inline-flex items-center gap-1">
                          <Icon
                            name="Star"
                            size={14}
                            className="text-amber-400 fill-amber-400"
                          />
                          <span className="font-semibold">{rating}</span>
                          <span className="opacity-70">/ 5</span>
                        </span>
                      )}
                      {complexity && (
                        <span className="inline-flex items-center gap-1">
                          <Icon name="Layers" size={14} />
                          {complexity}
                        </span>
                      )}
                      {duration && (
                        <span className="inline-flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {duration}
                        </span>
                      )}
                      {industry && (
                        <span className="inline-flex items-center gap-1">
                          <Icon name="Briefcase" size={14} />
                          {industry}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thumbnail strip */}
                {hasGallery && (
                  <div className="px-4 pt-3 pb-1 overflow-x-auto border-b bg-muted/30 border-border sm:px-6">
                    <div className="flex gap-2 pb-2">
                      {gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                            activeImageIndex === idx
                              ? "border-primary ring-2 ring-primary/30 scale-105"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${title} ${idx + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ================================================== */}
              {/* BODY                                                */}
              {/* ================================================== */}
              <div className="p-5 space-y-8 sm:p-8 sm:space-y-10">
                {/* ---------- Overview ---------- */}
                {longDescription && (
                  <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    <SectionHeader
                      icon="FileText"
                      title="Overview"
                      subtitle="What this project is about"
                    />
                    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {longDescription.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* ---------- Metrics ---------- */}
                {metrics?.length > 0 && (
                  <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    <SectionHeader
                      icon="BarChart3"
                      title="Key Metrics"
                      subtitle="Impact at a glance"
                    />
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 sm:gap-4">
                      {metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-4 text-center transition-all border bg-gradient-to-br from-primary/5 to-transparent rounded-2xl border-border hover:border-primary/40 hover:-translate-y-0.5"
                        >
                          {m?.icon && (
                            <div className="flex items-center justify-center mx-auto mb-2 rounded-lg w-9 h-9 bg-primary/10">
                              <Icon
                                name={m.icon}
                                size={16}
                                className="text-primary"
                              />
                            </div>
                          )}
                          <div className="text-lg font-bold sm:text-xl text-foreground">
                            {m?.value}
                          </div>
                          <div className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground">
                            {m?.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* ---------- Technologies ---------- */}
                {technologies?.length > 0 && (
                  <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    <SectionHeader
                      icon="Code2"
                      title="Tech Stack"
                      subtitle="Built with modern tools"
                    />
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all border rounded-lg sm:text-sm bg-card border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* ---------- Features ---------- */}
                {features?.length > 0 && (
                  <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                  >
                    <SectionHeader
                      icon="Sparkles"
                      title="Key Features"
                      subtitle="What makes it stand out"
                    />
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                      {features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 transition-colors border rounded-xl bg-card/50 border-border hover:bg-primary/5 hover:border-primary/30"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-primary/15">
                            <Icon
                              name="Check"
                              size={12}
                              className="text-primary"
                            />
                          </div>
                          <span className="text-xs leading-relaxed sm:text-sm text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* ---------- Challenges ---------- */}
                {challenges?.length > 0 && (
                  <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                  >
                    <SectionHeader
                      icon="Lightbulb"
                      title="Challenges & Solutions"
                      subtitle="Problems solved along the way"
                    />
                    <div className="space-y-3">
                      {challenges.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-2xl bg-card border-border"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-lg bg-amber-500/15">
                              <Icon
                                name="AlertCircle"
                                size={13}
                                className="text-amber-500"
                              />
                            </div>
                            <div className="text-sm font-semibold text-foreground">
                              {item?.challenge}
                            </div>
                          </div>
                          <div className="flex items-start gap-2 pl-8">
                            <span className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                              {item?.solution}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </div>
            </div>

            {/* ================================================== */}
            {/* STICKY FOOTER ACTIONS                               */}
            {/* ================================================== */}
            <div className="flex flex-col gap-3 px-5 py-4 border-t sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5 bg-background/95 backdrop-blur-md border-border">
              <div className="hidden text-xs sm:block text-muted-foreground">
                Press{" "}
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-muted rounded border border-border">
                  Esc
                </kbd>{" "}
                to close
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                {liveLink && (
                  <Button
                    variant="default"
                    size="lg"
                    iconName="ExternalLink"
                    iconPosition="right"
                    className="w-full font-semibold sm:w-auto"
                    onClick={() =>
                      window.open(liveLink, "_blank", "noopener,noreferrer")
                    }
                  >
                    Live Demo
                  </Button>
                )}

                {githubLink && (
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Github"
                    iconPosition="left"
                    className="w-full font-medium sm:w-auto"
                    onClick={() =>
                      window.open(githubLink, "_blank", "noopener,noreferrer")
                    }
                  >
                    View Code
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="lg"
                  iconName={copied ? "Check" : "Share2"}
                  iconPosition="left"
                  className="w-full font-medium sm:w-auto"
                  onClick={handleShare}
                >
                  {copied ? "Copied!" : "Share"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   Small helper — consistent section header
   ============================================================ */
const SectionHeader = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10">
      <Icon name={icon} size={16} className="text-primary" />
    </div>
    <div className="min-w-0">
      <h3 className="text-base font-bold sm:text-lg text-foreground">
        {title}
      </h3>
      {subtitle && (
        <p className="text-[11px] sm:text-xs text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

export default ProjectModal;
