import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Sparkles, Move } from "lucide-react";

// Initial skills data with enhanced emojis and colors
const initialSkills = [
  {
    id: "1",
    name: "React",
    emoji: "⚛️",
    color: "from-blue-500 to-cyan-400",
    bgGlow: "bg-blue-500/20",
    icon: "⚛️",
  },
  {
    id: "2",
    name: "Node.js",
    emoji: "🟢",
    color: "from-green-500 to-emerald-400",
    bgGlow: "bg-green-500/20",
    icon: "🟢",
  },
  {
    id: "3",
    name: "Express",
    emoji: "🚂",
    color: "from-gray-500 to-slate-400",
    bgGlow: "bg-gray-500/20",
    icon: "🚂",
  },
  {
    id: "4",
    name: "MongoDB",
    emoji: "🍃",
    color: "from-green-600 to-lime-500",
    bgGlow: "bg-green-600/20",
    icon: "🍃",
  },
  {
    id: "5",
    name: "JavaScript",
    emoji: "🟨",
    color: "from-yellow-500 to-amber-400",
    bgGlow: "bg-yellow-500/20",
    icon: "🟨",
  },
  {
    id: "6",
    name: "MySQL",
    emoji: "🐬",
    color: "from-blue-600 to-indigo-500",
    bgGlow: "bg-blue-600/20",
    icon: "🐬",
  },
  {
    id: "7",
    name: "HTML",
    emoji: "🌐",
    color: "from-orange-500 to-red-400",
    bgGlow: "bg-orange-500/20",
    icon: "🌐",
  },
  {
    id: "8",
    name: "CSS",
    emoji: "🎨",
    color: "from-blue-400 to-purple-500",
    bgGlow: "bg-purple-500/20",
    icon: "🎨",
  },
  {
    id: "9",
    name: "REST API",
    emoji: "🔌",
    color: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
    icon: "🔌",
  },
  {
    id: "10",
    name: "JWT Auth",
    emoji: "🔐",
    color: "from-red-500 to-rose-500",
    bgGlow: "bg-red-500/20",
    icon: "🔐",
  },
];

// Sortable Skill Item Component with enhanced design
const SortableSkill = ({ skill, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: skill.id,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isSortableDragging ? 50 : "auto",
    position: "relative",
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative inline-flex items-center gap-2 px-4 py-2.5 
        bg-gradient-to-r ${skill.color} 
        text-white font-medium rounded-full 
        shadow-lg hover:shadow-xl 
        transition-all duration-300
        cursor-grab active:cursor-grabbing
        select-none
        ${isSortableDragging ? "shadow-2xl scale-105 ring-2 ring-white/50 ring-offset-2 ring-offset-transparent" : ""}
        ${isDragging ? "opacity-50" : ""}
        group
        overflow-hidden
      `}
    >
      {/* Animated Background Glow */}
      <div
        className={`absolute inset-0 ${skill.bgGlow} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Shimmer Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Content */}
      <span className="relative text-lg filter drop-shadow-md group-hover:rotate-12 transition-transform duration-300">
        {skill.emoji}
      </span>
      <span className="relative text-sm sm:text-base font-semibold tracking-wide">
        {skill.name}
      </span>

      {/* Drag Handle with Animation */}
      <div className="relative ml-1 p-1 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/20">
        <GripVertical size={14} className="text-white/80" />
      </div>

      {/* Active Drag Indicator */}
      {isSortableDragging && (
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white animate-ping" />
          <span className="absolute inline-flex h-full w-full rounded-full bg-white" />
        </div>
      )}
    </motion.div>
  );
};

// Drag Overlay Component for better visual feedback
const DragOverlaySkill = ({ skill }) => {
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2.5 
        bg-gradient-to-r ${skill.color} 
        text-white font-medium rounded-full 
        shadow-2xl scale-110
        cursor-grabbing
        select-none
        ring-2 ring-white/50 ring-offset-2 ring-offset-transparent
      `}
    >
      <span className="text-lg filter drop-shadow-md">{skill.emoji}</span>
      <span className="text-sm sm:text-base font-semibold tracking-wide">
        {skill.name}
      </span>
      <Move size={14} className="text-white/80 ml-1" />
    </div>
  );
};

// Main Draggable Skills Component with enhanced features
const DraggableSkills = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [isDragging, setIsDragging] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event) => {
    setIsDragging(true);
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setIsDragging(false);
    setActiveId(null);
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setSkills((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragCancel = () => {
    setIsDragging(false);
    setActiveId(null);
  };

  const activeSkill = skills.find((skill) => skill.id === activeId);

  return (
    <div className="w-full space-y-4">
      {/* Header with Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Sparkles size={18} className="text-blue-500" />
          My Tech Stack
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          {skills.length} technologies
        </span>
      </div>

      {/* Drag and Drop Container */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={skills}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {skills.map((skill) => (
              <SortableSkill
                key={skill.id}
                skill={skill}
                isDragging={isDragging}
              />
            ))}
          </div>
        </SortableContext>

        {/* Drag Overlay for visual feedback */}
        <DragOverlay>
          {activeId && activeSkill ? (
            <DragOverlaySkill skill={activeSkill} />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Interactive Hint with Animation */}
      <motion.div
        initial={{ opacity: 0.5, y: 5 }}
        animate={{
          opacity: isDragging ? 0.2 : 0.7,
          y: isDragging ? 10 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center lg:justify-start gap-2 text-xs text-gray-500 dark:text-gray-400 group cursor-default"
      >
        <div className="relative">
          <Move
            size={14}
            className="group-hover:rotate-12 transition-transform duration-300"
          />
          {!isDragging && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          )}
        </div>
        <span className="font-medium">
          {isDragging
            ? "Release to rearrange"
            : "Drag and drop to rearrange skills"}
        </span>
      </motion.div>

      {/* Visual Feedback Area */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"
        />
      )}
    </div>
  );
};

// Import motion from framer-motion
import { motion } from "framer-motion";
import { DragOverlay } from "@dnd-kit/core";

export default DraggableSkills;
