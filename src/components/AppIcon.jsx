import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiHtml5,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiMysql,
  SiRender,
  SiRedux,
  SiFramer,
  SiSocketdotio,
} from 'react-icons/si';
import { FaJava, FaCss3Alt } from 'react-icons/fa';

const TECH_LOGOS = {
  react: SiReact,
  "react.js": SiReact,
  "react native": SiReact,
  "react native development": SiReact,
  javascript: SiJavascript,
  js: SiJavascript,
  node: SiNodedotjs,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  express: SiExpress,
  "express.js": SiExpress,
  html: SiHtml5,
  html5: SiHtml5,
  css: FaCss3Alt,
  css3: FaCss3Alt,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  git: SiGit,
  github: SiGithub,
  "git & github": SiGit,
  postman: SiPostman,
  vercel: SiVercel,
  mysql: SiMysql,
  sql: SiMysql,
  render: SiRender,
  redux: SiRedux,
  framer: SiFramer,
  "socket.io": SiSocketdotio,
  java: FaJava,
};

function Icon({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth = 2,
  ...props
}) {
  if (!name) {
    return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
  }

  const lookup = name.toLowerCase().trim();
  const TechIcon = TECH_LOGOS[lookup];

  if (TechIcon) {
    return <TechIcon size={size} className={className} {...props} />;
  }

  const IconComponent = LucideIcons?.[name];

  if (!IconComponent) {
    return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}

export default Icon;