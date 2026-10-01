import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Sparkles,
  SlidersHorizontal,
  Download,
  Clock,
} from "lucide-react";

import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import RelatedProjects from "./components/RelatedProjects";
import MobileAppPhoneCard from "./components/MobileAppPhoneCard";

import { allProjects, portfolioStats } from "../../data/projectsData";
import {
  categories,
  sortOptions,
  TYPE_ORDER,
  COMPLEXITY_ORDER,
  heroPills,
} from "../../data/categories";

/* ============================================================
   🎨 COLOR HELPERS
   ============================================================ */
const colorMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    hover: "hover:bg-primary/20",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    hover: "hover:bg-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    hover: "hover:bg-emerald-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    hover: "hover:bg-purple-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    hover: "hover:bg-orange-500/20",
  },
};

/* ============================================================
   📥 APK HELPER
   ------------------------------------------------------------
   Only real web-accessible URLs are shown as download buttons.
   Local machine paths (e.g. "/Users/.../app.apk") are ignored so
   the UI never renders a broken download link.
   ============================================================ */
const getApkUrl = (project) => {
  const url = project?.apkUrl;
  if (!url || typeof url !== "string") return null;
  if (url.startsWith("/Users/") || /^[A-Za-z]:\\/.test(url)) return null;
  return url;
};

/* Recency order (position inside allProjects) — safe for string ids */
const RECENCY_ORDER = allProjects.reduce(
  (acc, p, i) => ({ ...acc, [p.id]: i }),
  {},
);

/* ============================================================
   🚀 MAIN COMPONENT
   ============================================================ */
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("category");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return allProjects.length;
    return allProjects.filter((p) => p.projectType === categoryId).length;
  };

  const hasActiveFilter = activeCategory !== "all";
  const activeCategoryObj = categories.find((c) => c.id === activeCategory);

  /* ---------------- FILTER + SORT ---------------- */
  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((project) => {
        if (project.title?.toLowerCase().includes(query)) return true;
        if (project.description?.toLowerCase().includes(query)) return true;
        if (
          project.technologies?.some((tech) =>
            tech.toLowerCase().includes(query),
          )
        )
          return true;
        if (project.industry?.toLowerCase().includes(query)) return true;
        if (
          project.features?.some((feature) =>
            feature.toLowerCase().includes(query),
          )
        )
          return true;
        if (project.category?.toLowerCase().includes(query)) return true;
        return false;
      });
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.projectType === activeCategory,
      );
    }

    switch (sortBy) {
      case "category":
        return [...filtered].sort(
          (a, b) => TYPE_ORDER[a.projectType] - TYPE_ORDER[b.projectType],
        );
      case "recent":
        return [...filtered].sort(
          (a, b) => RECENCY_ORDER[b.id] - RECENCY_ORDER[a.id],
        );
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "complexity":
        return [...filtered].sort(
          (a, b) =>
            COMPLEXITY_ORDER[b.complexity] - COMPLEXITY_ORDER[a.complexity],
        );
      default:
        return filtered;
    }
  }, [searchQuery, activeCategory, sortBy]);

  /* ---------------- SPLIT INTO SECTIONS ---------------- */
  const webResults = useMemo(
    () => filteredProjects.filter((p) => p.projectType !== "mobile"),
    [filteredProjects],
  );

  const mobileResults = useMemo(
    () => filteredProjects.filter((p) => p.projectType === "mobile"),
    [filteredProjects],
  );

  const clearSearch = () => setSearchQuery("");
  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  /* Body scroll lock when filter drawer is open */
  useEffect(() => {
    if (isFilterOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isFilterOpen]);

  /* ESC to close filter drawer */
  useEffect(() => {
    if (!isFilterOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsFilterOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFilterOpen]);

  /* ============================================================
     🧩 FILTER PANEL — reused inside the slide-in drawer
     ============================================================ */
  const filterPanel = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
          Categories
        </h3>
        <div className="space-y-1.5">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            const count = getCategoryCount(category.id);
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-sm shadow-primary/25"
                    : "text-foreground hover:bg-muted border border-transparent hover:border-border"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${
                    isActive ? "bg-white/20" : "bg-muted"
                  }`}
                >
                  <Icon
                    name={category.icon}
                    size={15}
                    className={
                      isActive ? "text-white" : "text-muted-foreground"
                    }
                  />
                </div>
                <span className="flex-1 font-medium text-left truncate">
                  {category.name}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear */}
      {hasActiveFilter && (
        <button
          onClick={clearAllFilters}
          className="flex items-center justify-center w-full gap-2 px-3 py-2.5 text-xs font-semibold transition border rounded-xl border-border text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="w-3.5 h-3.5" />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section className="relative pt-16 pb-12 overflow-hidden sm:pt-20 sm:pb-16 lg:pt-24 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full -top-40 -right-40 w-96 h-96 bg-primary/10 blur-3xl" />
        </div>

        <div className="relative container-brand">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 shadow-lg sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm rounded-2xl">
                  <Icon
                    name="FolderKanban"
                    size={32}
                    className="text-primary sm:hidden"
                  />
                  <Icon
                    name="FolderKanban"
                    size={36}
                    className="hidden text-primary sm:block"
                  />
                </div>
                <motion.div
                  className="absolute w-3 h-3 rounded-full sm:w-4 sm:h-4 -top-1 -right-1 bg-primary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
              My <span className="text-gradient-brand">Project Portfolio</span>
            </h1>

            <p className="max-w-3xl px-4 mx-auto mb-8 text-base leading-relaxed sm:text-lg md:text-xl text-muted-foreground sm:mb-10">
              Explore my journey through full-stack applications, React
              projects, HTML/CSS websites, and cross-platform mobile apps for
              iOS & Android.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:gap-3">
              {heroPills.map((pill, idx) => {
                const colors = colorMap[pill.color] || colorMap.primary;
                return (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08 }}
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full ${colors.bg} ${colors.text} text-xs sm:text-sm font-medium`}
                  >
                    <Icon name={pill.icon} size={12} />
                    {pill.label}
                    {pill.subLabel && (
                      <span className="hidden ml-1 text-xs opacity-70 sm:inline">
                        {pill.subLabel}
                      </span>
                    )}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MAIN CONTENT                                                      */}
      {/* ================================================================ */}
      <section className="py-8 sm:py-12">
        <div className="container-brand">
          {/* ---------------- TOOLBAR ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects, tech, features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-12 text-sm transition-all border shadow-sm bg-card border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 sm:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute p-1 -translate-y-1/2 rounded-full right-4 top-1/2 hover:bg-muted"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>

              {/* Filter button — visible on ALL screen sizes */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className={`relative flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border transition-all duration-300 ${
                  hasActiveFilter
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent"
                }`}
                aria-label="Open filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden text-sm font-semibold sm:inline">
                  Filters
                </span>
                {hasActiveFilter && (
                  <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full text-primary bg-white">
                    1
                  </span>
                )}
              </button>
            </div>

            {/* Result count + sort */}
            <div className="flex items-center justify-between gap-4 mt-4 mb-6">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {filteredProjects.length}
                </span>{" "}
                project{filteredProjects.length !== 1 ? "s" : ""}
                {hasActiveFilter && (
                  <span className="hidden ml-1 sm:inline">· filtered</span>
                )}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Icon
                  name="ArrowUpDown"
                  size={16}
                  className="hidden text-muted-foreground sm:block"
                />
                <span className="hidden text-sm font-medium text-foreground sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-xs border rounded-lg sm:text-sm bg-card border-border focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter chips — visible on ALL screen sizes */}
            <AnimatePresence>
              {hasActiveFilter && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 pb-4 mb-6 border-b border-border">
                    <span className="text-xs font-medium text-muted-foreground">
                      Active:
                    </span>
                    <button
                      onClick={() => setActiveCategory("all")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition"
                    >
                      <Icon name={activeCategoryObj?.icon} size={12} />
                      {activeCategoryObj?.name}
                      <X className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ============================================================ */}
          {/* 🌐 WEB PROJECTS SECTION                                       */}
          {/* ============================================================ */}
          {webResults.length > 0 && (
            <section className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10">
                  <Icon name="Globe" size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold sm:text-xl text-foreground">
                    Web Projects
                  </h2>
                  <p className="text-xs truncate sm:text-sm text-muted-foreground">
                    Full-stack apps, React applications & HTML/CSS websites
                  </p>
                </div>
                <span className="flex-shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                  {webResults.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {webResults.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.3 }}
                      onClick={(e) => {
                        if (e.target.closest("button") || e.target.closest("a"))
                          return;
                        handleViewDetails(project);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleViewDetails(project);
                        }
                      }}
                      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-2xl"
                    >
                      <ProjectCard
                        project={project}
                        onViewDetails={handleViewDetails}
                        index={index}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          )}

          {/* ============================================================ */}
          {/* 📱 MOBILE APPS SECTION                                        */}
          {/* ============================================================ */}
          {mobileResults.length > 0 && (
            <section className="pt-8 border-t border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-purple-500/10">
                  <Icon
                    name="Smartphone"
                    size={20}
                    className="text-purple-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold sm:text-xl text-foreground">
                    Mobile Applications
                  </h2>
                  <p className="text-xs truncate sm:text-sm text-muted-foreground">
                    React Native apps for Android — download & try the APK
                  </p>
                </div>
                <span className="flex-shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-500">
                  {mobileResults.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {mobileResults.map((project, index) => {
                    const apkUrl = getApkUrl(project);
                    return (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col"
                      >
                        <div
                          onClick={(e) => {
                            if (
                              e.target.closest("button") ||
                              e.target.closest("a")
                            )
                              return;
                            handleViewDetails(project);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleViewDetails(project);
                            }
                          }}
                          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-2xl"
                        >
                          <MobileAppPhoneCard
                            app={project}
                            onViewDetails={handleViewDetails}
                            index={index}
                          />
                        </div>

                        {/* APK ACTION ROW */}
                        <div className="flex gap-2 mt-3">
                          {apkUrl ? (
                            <a
                              href={apkUrl}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold shadow-sm shadow-primary/25 hover:bg-primary/90 transition"
                            >
                              <Download size={16} />
                              Download APK
                            </a>
                          ) : (
                            <div className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium border border-border">
                              <Clock size={16} />
                              {project.apkStatus || "APK Coming Soon"}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </section>
          )}

          {/* ---------------- NO RESULTS ---------------- */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center border bg-card rounded-2xl border-border"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/5 to-primary/10 sm:w-24 sm:h-24">
                <Search size={28} className="text-primary sm:hidden" />
                <Search size={32} className="hidden text-primary sm:block" />
              </div>
              <h3 className="mb-2 text-lg font-semibold sm:text-xl text-foreground">
                No Projects Found
              </h3>
              <p className="max-w-md px-4 mx-auto mb-6 text-sm text-muted-foreground sm:text-base">
                {searchQuery
                  ? `No projects matching "${searchQuery}". Try a different search term.`
                  : "No projects in this category. Try selecting a different category."}
              </p>
              {(searchQuery || hasActiveFilter) && (
                <Button
                  variant="outline"
                  iconName="X"
                  iconPosition="left"
                  onClick={clearAllFilters}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Clear All Filters
                </Button>
              )}
            </motion.div>
          )}

          {/* ---------------- RELATED ---------------- */}
          {selectedProject && (
            <RelatedProjects
              projects={allProjects}
              currentProject={selectedProject}
              onProjectSelect={handleViewDetails}
            />
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* STATS                                                             */}
      {/* ================================================================ */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-card via-background to-card">
        <div className="container-brand">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl text-foreground">
              By the Numbers
            </h2>
            <p className="max-w-2xl mx-auto text-sm text-muted-foreground sm:text-base">
              A quick look at my project portfolio across different technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
            {portfolioStats.map((stat, idx) => {
              const colors = colorMap[stat.color] || colorMap.primary;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 transition-all duration-300 border shadow-sm sm:p-6 bg-background rounded-2xl border-border hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-3 sm:gap-4 sm:mb-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${colors.bg} flex-shrink-0`}
                    >
                      <Icon
                        name={stat.icon}
                        size={20}
                        className={`${colors.text} sm:hidden`}
                      />
                      <Icon
                        name={stat.icon}
                        size={24}
                        className={`${colors.text} hidden sm:block`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl font-bold sm:text-3xl text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs truncate sm:text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-snug sm:text-sm text-muted-foreground line-clamp-2">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA                                                               */}
      {/* ================================================================ */}
      <section className="py-16 border-t sm:py-20 bg-background border-border">
        <div className="container-brand">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10">
                <Sparkles size={28} className="text-primary" />
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold leading-snug sm:text-3xl md:text-4xl text-foreground">
              Ready to Build Something{" "}
              <span className="text-primary">Amazing?</span>
            </h2>

            <p className="max-w-2xl px-4 mx-auto mb-8 text-base sm:text-lg text-muted-foreground sm:mb-10">
              From full-stack web applications to React Native mobile apps and
              modern websites, I'm always excited to collaborate and transform
              ideas into scalable, user-friendly, and impactful digital
              solutions.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="w-full px-8 font-semibold shadow-md sm:w-auto hover:shadow-lg"
                onClick={() =>
                  (window.location.href =
                    "mailto:ratnakarsinghparihar9399@gmail.com")
                }
              >
                Start a Conversation
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Github"
                iconPosition="left"
                className="w-full px-8 font-medium sm:w-auto"
                onClick={() =>
                  window.open(
                    "https://github.com/Ratnakar-Singh-parihar-123",
                    "_blank",
                  )
                }
              >
                View GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FILTER DRAWER — SLIDES IN FROM LEFT (all screen sizes)            */}
      {/* ================================================================ */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 32,
                stiffness: 320,
                mass: 0.9,
              }}
              className="fixed top-0 bottom-0 left-0 z-[101] w-[88%] max-w-sm bg-card rounded-r-3xl shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10">
                    <SlidersHorizontal className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Filter Projects
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      Choose a category to filter
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex items-center justify-center transition rounded-full w-9 h-9 hover:bg-muted"
                  aria-label="Close filter"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Panel */}
              <div className="flex-1 p-4 overflow-y-auto">{filterPanel}</div>

              {/* Footer */}
              <div className="flex items-center gap-3 p-4 pb-5 border-t border-border bg-card">
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="flex-1 py-3 text-sm font-semibold transition border rounded-xl bg-background border-border hover:bg-muted"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-3 text-sm font-semibold text-white transition shadow-md rounded-xl bg-primary hover:bg-primary/90 shadow-primary/25"
                >
                  Show {filteredProjects.length} Result
                  {filteredProjects.length !== 1 ? "s" : ""}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* MODAL                                                             */}
      {/* ================================================================ */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Projects;
