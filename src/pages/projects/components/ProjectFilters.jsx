import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProjectFilters = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  projectCount,
}) => {
  const filterCategories = [
    { key: "technology", label: "Technology", icon: "Code", options: filters?.technologies },
    { key: "industry", label: "Industry", icon: "Building", options: filters?.industries },
    { key: "complexity", label: "Complexity", icon: "BarChart3", options: filters?.complexities },
  ];

  const hasActiveFilters = Object.values(activeFilters)?.some(
    (arr) => arr?.length > 0
  );

  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Filter Projects
            </h3>
            <p className="text-xs text-muted-foreground">
              Showing {projectCount} project{projectCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            className="text-xs px-3 py-1"
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-4">
        {filterCategories.map((category) => (
          <div key={category.key}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name={category.icon} size={15} className="text-muted-foreground" />
              <h4 className="text-sm font-medium text-foreground">{category.label}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.options?.map((option) => {
                const isActive = activeFilters?.[category.key]?.includes(option);
                return (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onFilterChange(category.key, option)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-5 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Tag" size={14} className="text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground">
              Active Filters
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([category, values]) =>
              values.map((value) => (
                <div
                  key={`${category}-${value}`}
                  className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => onFilterChange(category, value)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition"
                  >
                    <Icon name="X" size={11} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;