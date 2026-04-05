import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProjectFilters = ({
  onSearch,
  projectCount,
  onClearFilters,
  activeFilters,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const hasActiveFilters = Object.values(activeFilters || {}).some(
    (arr) => arr?.length > 0,
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
                <Icon name="Search" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Search Projects
                </h2>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">
                    {projectCount}
                  </span>{" "}
                  project{projectCount !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                className="text-xs px-3 py-2 border-destructive/30 text-destructive hover:bg-destructive/10"
                onClick={onClearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Search Input */}
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, technology, industry, or features..."
                value={searchInput}
                onChange={handleSearchChange}
                autoFocus
                className="w-full pl-12 pr-10 py-3 text-base bg-background/80 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              <Icon
                name="Search"
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              {searchInput && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <Icon
                    name="X"
                    size={16}
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>
              )}
            </div>

            {/* Search Hint */}
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Icon name="Info" size={12} />
              Try searching for: React, MongoDB, Healthcare, E-commerce, etc.
            </p>
          </div>

          {/* Active Search Query */}
          {searchInput && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 text-sm bg-primary/5 rounded-lg p-2"
            >
              <Icon name="Search" size={14} className="text-primary" />
              <span className="text-foreground">
                Showing results for:{" "}
                <span className="font-semibold text-primary">
                  "{searchInput}"
                </span>
              </span>
              <button
                onClick={clearSearch}
                className="ml-auto text-primary hover:underline text-xs"
              >
                Clear
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectFilters;
