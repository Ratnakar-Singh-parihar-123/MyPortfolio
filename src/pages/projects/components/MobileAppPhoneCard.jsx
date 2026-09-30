import React from "react";
import { motion } from "framer-motion";
import {
  Apple,
  Smartphone as AndroidIcon,
  Signal,
  Wifi,
  Battery,
} from "lucide-react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const MobileAppPhoneCard = ({ app, onViewDetails, index }) => {
  const getIconName = (iconName) => {
    const map = {
      Shield: "Shield",
      FileText: "FileText",
      ShoppingBag: "ShoppingBag",
      Utensils: "Utensils",
      Bike: "Bike",
      Store: "Store",
      Car: "Car",
    };
    return map[iconName] || "Smartphone";
  };

  const complexityStyle = {
    Advanced: "bg-destructive/10 text-destructive border-destructive/20",
    Intermediate: "bg-warning/10 text-warning border-warning/20",
    Beginner: "bg-success/10 text-success border-success/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      onClick={() => onViewDetails(app)}
      className="h-full cursor-pointer group"
    >
      <div className="relative h-full p-3.5 overflow-hidden transition-all duration-300 border bg-gradient-to-br from-card to-card/60 rounded-2xl border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Complexity badge — top right */}
        <div className="absolute z-10 top-3 right-3">
          <div
            className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
              complexityStyle[app.complexity] || complexityStyle.Beginner
            }`}
          >
            {app.complexity}
          </div>
        </div>

        <div className="flex gap-3.5">
          {/* ============ ANDROID PHONE MOCKUP ============ */}
          <div className="flex-shrink-0">
            <div className="relative w-[110px]">
              {/* Outer frame */}
              <div className="relative p-[3px] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[1.1rem] shadow-xl ring-1 ring-white/5">
                <div className="relative overflow-hidden bg-black rounded-[0.9rem]">
                  {/* Punch-hole camera */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[5px] h-[5px] bg-black rounded-full z-20 ring-[1.5px] ring-gray-800/90" />

                  {/* Screenshot */}
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "9/19.5" }}
                  >
                    <img
                      src={app.image}
                      alt={app.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover gradient */}
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 group-hover:opacity-100" />

                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between px-2 pt-1.5 text-white/85 text-[6px] font-medium z-10">
                      <span>9:41</span>
                      <div className="flex items-center gap-0.5">
                        <Signal className="w-1.5 h-1.5" strokeWidth={2.5} />
                        <Wifi className="w-1.5 h-1.5" strokeWidth={2.5} />
                        <Battery className="w-2 h-1.5" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Status pill (top-left) */}
                    <div className="absolute top-4 left-1.5 z-10">
                      <span className="px-1.5 py-0.5 text-[6px] font-bold text-white rounded-full bg-green-500/95 backdrop-blur-sm">
                        {app.status}
                      </span>
                    </div>

                    {/* Platform icons (top-right) */}
                    <div className="absolute top-4 right-1.5 z-10 flex items-center gap-0.5 px-1 py-0.5 text-white rounded-full bg-black/60 backdrop-blur-sm">
                      {app.platforms?.includes("iOS") && (
                        <Apple className="w-1.5 h-1.5" />
                      )}
                      {app.platforms?.includes("Android") && (
                        <AndroidIcon className="w-1.5 h-1.5" />
                      )}
                    </div>

                    {/* App icon on hover (center) */}
                    <div className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 group-hover:opacity-100 group-hover:scale-110">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${app.iconColor} flex items-center justify-center shadow-2xl ring-2 ring-white/30`}
                      >
                        <Icon
                          name={getIconName(app.iconName)}
                          size={16}
                          className="text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gesture nav bar */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-[2.5px] bg-white/35 rounded-full" />
                </div>

                {/* Right-side hardware buttons (Android: power + volume) */}
                <div className="absolute right-0 top-10 translate-x-[1.5px] w-[2.5px] h-5 bg-gray-600 rounded-r-sm" />
                <div className="absolute right-0 top-[70px] translate-x-[1.5px] w-[2.5px] h-8 bg-gray-600 rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* ============ APP INFO ============ */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 pr-14">
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${app.iconColor} flex items-center justify-center shadow-md flex-shrink-0`}
              >
                <Icon
                  name={getIconName(app.iconName)}
                  size={15}
                  className="text-white"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold truncate transition-colors text-foreground group-hover:text-primary">
                  {app.title}
                </h3>
                <p className="text-[10px] text-muted-foreground truncate">
                  {app.category || "Mobile App"}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-[11px] leading-snug text-muted-foreground mb-2.5 line-clamp-2">
              {app.description}
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1 mb-2.5">
              {app.technologies?.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 text-[8.5px] font-medium rounded-md bg-muted text-muted-foreground"
                >
                  {tech.split(" ")[0]}
                </span>
              ))}
              {app.technologies?.length > 3 && (
                <span className="px-1.5 py-0.5 text-[8.5px] font-medium rounded-md bg-muted text-muted-foreground">
                  +{app.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-3 mb-3 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={10} />
                <span>{app.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Users" size={10} />
                <span>{app.teamSize}</span>
              </div>
            </div>

            {/* Action buttons — pushed to bottom */}
            <div className="flex gap-1.5 mt-auto">
              {app.liveUrl && (
                <Button
                  variant="secondary"
                  size="xs"
                  iconName="ExternalLink"
                  iconPosition="left"
                  className="flex-1 text-[10px] h-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(app.liveUrl, "_blank");
                  }}
                >
                  Live
                </Button>
              )}
              {app.githubUrl && (
                <Button
                  variant="outline"
                  size="xs"
                  iconName="Github"
                  className="flex-1 text-[10px] h-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(app.githubUrl, "_blank");
                  }}
                >
                  Code
                </Button>
              )}
              <Button
                variant="outline"
                size="xs"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => onViewDetails(app)}
                className="flex-1 text-[10px] h-7 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
              >
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileAppPhoneCard;
