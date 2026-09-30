// ============================================================
// 🗂️ CATEGORIES
// ============================================================
export const categories = [
  { id: "all", name: "All Projects", icon: "Grid3x3" },
  { id: "fullstack", name: "Full Stack", icon: "Layers" },
  { id: "react", name: "React Apps", icon: "React" },
  { id: "htmlcss", name: "HTML/CSS", icon: "Code" },
  { id: "mobile", name: "Mobile Apps", icon: "Smartphone" },
];

// ============================================================
// 🔄 SORT OPTIONS
// ============================================================
export const sortOptions = [
  { value: "category", label: "Category" },
  { value: "recent", label: "Most Recent" },
  { value: "rating", label: "Highest Rated" },
  { value: "complexity", label: "Complexity" },
];

// ============================================================
// 📐 ORDER MAPS (for sorting)
// ============================================================
export const TYPE_ORDER = {
  fullstack: 1,
  react: 2,
  htmlcss: 3,
  mobile: 4,
};

export const COMPLEXITY_ORDER = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

// ============================================================
// 🎨 HERO PILLS (small badges in hero)
// ============================================================
export const heroPills = [
  {
    icon: "Layers",
    label: "Full-Stack Apps",
    color: "primary",
  },
  {
    icon: "React",
    label: "React Projects",
    color: "blue",
  },
  {
    icon: "Code",
    label: "HTML/CSS Websites",
    color: "emerald",
  },
  {
    icon: "Smartphone",
    label: "Mobile Apps",
    subLabel: "iOS & Android",
    color: "purple",
  },
];
