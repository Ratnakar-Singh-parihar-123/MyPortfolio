import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProjectFilters = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  projectCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filterCategories = [
    {
      key: "technology",
      label: "Technology",
      icon: "Code",
      color: "blue",
      options: filters?.technologies || [],
    },
    {
      key: "industry",
      label: "Industry",
      icon: "Building",
      color: "emerald",
      options: filters?.industries || [],
    },
    {
      key: "complexity",
      label: "Complexity",
      icon: "BarChart3",
      color: "purple",
      options: filters?.complexities || [],
    },
  ];

  const hasActiveFilters = Object.values(activeFilters)?.some(
    (arr) => arr?.length > 0,
  );

  const getCategoryColor = (category) => {
    const colors = {
      technology: "blue",
      industry: "emerald",
      complexity: "purple",
    };
    return colors[category] || "primary";
  };

  const filteredOptions = (options, category) => {
    if (!searchTerm) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Main Filter Card */}
      <div className="bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 border-b border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center"
              >
                <Icon name="Filter" size={20} className="text-primary" />
              </motion.div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Filter Projects
                </h2>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">
                    {projectCount}
                  </span>{" "}
                  project{projectCount !== 1 ? "s" : ""} available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search Input */}
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Search filters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-48 pl-9 pr-4 py-2 text-sm bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
              </div>

              {/* Expand/Collapse Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon
                  name={isExpanded ? "ChevronUp" : "ChevronDown"}
                  size={18}
                  className="text-muted-foreground"
                />
              </motion.button>

              {/* Clear All Button */}
              {hasActiveFilters && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    className="text-xs px-3 py-2 border-destructive/30 text-destructive hover:bg-destructive/10"
                    onClick={onClearFilters}
                  >
                    Clear All
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-5">
                {/* Filter Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterCategories.map((category) => {
                    const options = filteredOptions(
                      category.options,
                      category.label,
                    );
                    const color = getCategoryColor(category.key);

                    return (
                      <motion.div
                        key={category.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-3"
                      >
                        {/* Category Header */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 bg-${color}-500/10 rounded-lg flex items-center justify-center`}
                          >
                            <Icon
                              name={category.icon}
                              size={16}
                              className={`text-${color}-500`}
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">
                              {category.label}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {category.options.length} options
                            </p>
                          </div>
                        </div>

                        {/* Options Grid */}
                        {options.length > 0 ? (
                          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-muted-foreground/20">
                            {options.map((option) => {
                              const isActive =
                                activeFilters?.[category.key]?.includes(option);
                              return (
                                <motion.button
                                  key={option}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    onFilterChange(category.key, option)
                                  }
                                  className={`
                                    px-3 py-1.5 rounded-xl text-xs font-medium
                                    transition-all duration-200 relative overflow-hidden group
                                    ${
                                      isActive
                                        ? `bg-${color}-500 text-white shadow-md shadow-${color}-500/20`
                                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }
                                  `}
                                >
                                  {/* Active indicator */}
                                  {isActive && (
                                    <motion.div
                                      layoutId={`active-${category.key}-${option}`}
                                      className="absolute inset-0 bg-white/10"
                                      initial={false}
                                    />
                                  )}
                                  <span className="relative z-10 flex items-center gap-1">
                                    {option}
                                    {isActive && (
                                      <Icon
                                        name="Check"
                                        size={10}
                                        className="ml-1"
                                      />
                                    )}
                                  </span>
                                </motion.button>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground italic px-2">
                            No matching options
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Section */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-border/50 bg-muted/30 p-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Icon name="Filter" size={14} className="text-primary" />
                <span className="text-xs font-medium text-foreground">
                  Active Filters:
                </span>
              </div>

              <div className="flex flex-wrap gap-2 flex-1">
                {Object.entries(activeFilters).map(([category, values]) =>
                  values.map((value) => (
                    <motion.div
                      key={`${category}-${value}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs
                        bg-${getCategoryColor(category)}-500/10 
                        text-${getCategoryColor(category)}-700 dark:text-${getCategoryColor(category)}-300
                        border border-${getCategoryColor(category)}-500/20
                      `}
                    >
                      <Icon
                        name={
                          filterCategories.find((c) => c.key === category)?.icon
                        }
                        size={12}
                        className={`text-${getCategoryColor(category)}-500`}
                      />
                      <span className="font-medium">{value}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onFilterChange(category, value)}
                        className={`
                          hover:bg-${getCategoryColor(category)}-500/20 
                          rounded-full p-0.5 transition-colors
                        `}
                      >
                        <Icon name="X" size={10} />
                      </motion.button>
                    </motion.div>
                  )),
                )}
              </div>

              {/* Quick Stats */}
              <div className="text-xs text-muted-foreground bg-background/50 px-3 py-1.5 rounded-xl">
                {Object.values(activeFilters).flat().length} filter
                {Object.values(activeFilters).flat().length !== 1
                  ? "s"
                  : ""}{" "}
                applied
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectFilters;
