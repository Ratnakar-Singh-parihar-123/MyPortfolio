import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  School,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  ChevronRight,
  Star,
  Users,
  Target,
  BookMarked,
  Trophy,
  ExternalLink,
  Clock,
  Flag,
} from "lucide-react";
import Header from "../../components/ui/Header";
import SchooleImg from "../../assets/schoolImg/schoolImg.webp";

const Education = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = (e) => {
      setDarkMode(e.detail.isDark);
    };

    window.addEventListener("themeChange", handleThemeChange);

    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    }

    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  const educationTimeline = [
    {
      id: 1,
      institution: "IES University Bhopal",
      location: "Bhopal, Madhya Pradesh",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      duration: "2022 - 2026",
      status: "B.Tech Graduate 2026 | Full Stack Developer",
      description:
        "Completed Bachelor of Technology in Computer Science & Engineering with focus on software development, web technologies, data structures, algorithms, and full-stack application development.",
      achievements: [
        "Built multiple full-stack MERN projects",
        "Developed responsive web applications using React.js",
        "Participated in coding and technical events",
        "Completed academic and personal software projects",
      ],
      courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Web Development",
      ],
      type: "college",
      image:
        "https://content.jdmagicbox.com/comp/bhopal/65/0755p755std2700465/catalogue/ies-university-bhopal-kalkheda-bhopal-institutes-9h4364j1aw.jpg?w=1920&q=75",
      color: "blue",
    },
    {
      id: 2,
      institution: "Saraswati Higher Secondary school ",
      location: "Nagod District Satna , Madhya Pradesh",
      stream: "Science Stream (PCM)",
      duration: "2021 - 2022",
      description:
        "Completed Higher Secondary Education (11th & 12th) with a focus on Physics, Chemistry, and Mathematics.",
      achievements: [
        "Science stream with PCM",
        "Mathematics proficiency",
        "Science project participation",
      ],
      focus: ["Physics", "Chemistry", "Mathematics", "English"],
      type: "school",
      image: SchooleImg,
      color: "green",
    },
    {
      id: 3,
      institution: "Saraswati Higher Secondary school ",
      location: "Nagod District Satna , Madhya Pradesh",
      grade: "10th Standard",
      duration: "2019 - 2020",
      description:
        "Completed foundational education with strong academic performance and participation in extracurricular activities.",
      achievements: [
        "Completed secondary education",
        "Science and mathematics foundation",
        "Extracurricular participation",
        "Academic excellence",
      ],
      type: "school",
      image: SchooleImg,
      color: "purple",
    },
  ];

  const milestones = [
    {
      title: "Started Engineering Journey",
      year: "2022",
      description: "Began B.Tech in Computer Science",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Science Stream Selection",
      year: "2020",
      description: "Chose PCM for 11th & 12th",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Current Focus",
      year: "Present",
      description: "B.Tech Graduate (2026) | Full Stack Developer ",
      icon: <Target className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Career Milestone",
      year: "2026 - Present",
      description:
        "Full Stack Developer Intern at BinaryLogix Technologies LLP, contributing to modern web applications and strengthening industry-level development skills.",
      icon: <Flag className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const developedSkills = [
    { skill: "Problem Solving", level: 95, category: "Analytical" },
    { skill: "Logical Thinking", level: 90, category: "Analytical" },
    { skill: "Mathematics", level: 88, category: "Academic" },
    { skill: "Computer Fundamentals", level: 92, category: "Technical" },
    { skill: "Web Development", level: 85, category: "Technical" },
    { skill: "Team Collaboration", level: 80, category: "Soft Skills" },
    { skill: "Project Management", level: 75, category: "Soft Skills" },
    { skill: "Research Skills", level: 82, category: "Academic" },
  ];

  return (
    <section
      id="education"
      className={`min-h-screen py-10 px-4 md:px-6 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-50 text-gray-800"
      }`}
    >
      <Header />

      <div className="max-w-6xl pt-2 mx-auto">
        {/* Header Section - More Compact */}
        <div className="mt-6 mb-10 text-center">
          <div className="relative inline-block mb-4">
            <h1
              className={`text-3xl md:text-5xl font-bold relative ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Academic{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Journey
              </span>
            </h1>
          </div>
          <p
            className={`text-base max-w-2xl mx-auto mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            My educational path from school to engineering, focusing on
            continuous learning and skill development
          </p>

          {/* Current Status Badge - Smaller */}
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full shadow-md ${
              darkMode
                ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/30"
                : "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200"
            }`}
          >
            <div
              className={`p-1.5 rounded-full mr-2 ${
                darkMode ? "bg-blue-800/50" : "bg-white"
              }`}
            >
              <Target
                className={`h-4 w-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              />
            </div>
            <div>
              <span className="text-sm font-bold">Current Status:</span>
              <span
                className={`ml-1 text-sm ${darkMode ? "text-blue-300" : "text-blue-700"}`}
              >
                B.Tech Computer Science Graduate • Full Stack Developer
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Section - Compact Cards */}
        <div className="relative mb-16">
          <div className="absolute w-1 h-full transform left-4 md:left-1/2 md:-translate-x-1/2">
            <div
              className={`h-full w-0.5 ${
                darkMode
                  ? "bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                  : "bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200"
              }`}
            ></div>
          </div>

          {educationTimeline.map((item, index) => (
            <div
              key={item.id}
              className={`relative mb-8 ${
                index % 2 === 0
                  ? "md:pr-1/2 md:pl-0 md:text-right"
                  : "md:pl-1/2 md:pr-0"
              }`}
            >
              <div
                className={`absolute left-3 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 rounded-full z-10 ${
                  item.type === "college"
                    ? "bg-blue-500 ring-3 ring-blue-500/20"
                    : "bg-green-500 ring-3 ring-green-500/20"
                }`}
              ></div>

              <div
                className={`ml-10 md:ml-0 ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <div
                  className={`group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? "bg-gray-800/50 border border-gray-700"
                      : "bg-white border border-gray-100"
                  }`}
                >
                  <div className="md:flex">
                    {/* Image Section - Smaller */}
                    <div
                      className={`md:w-2/5 h-32 md:h-auto relative overflow-hidden ${
                        item.type === "college"
                          ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                          : "bg-gradient-to-br from-green-500/10 to-emerald-500/10"
                      }`}
                    >
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <img
                        src={item.image}
                        alt={item.institution}
                        className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute z-20 bottom-2 left-2">
                        <div
                          className={`px-2 py-0.5 rounded-full backdrop-blur-sm text-xs ${
                            darkMode
                              ? "bg-black/40 text-white"
                              : "bg-white/80 text-gray-800"
                          }`}
                        >
                          {item.type === "college" ? "College" : "School"}
                        </div>
                      </div>
                    </div>

                    {/* Content Section - Tighter Padding */}
                    <div className="p-4 md:w-3/5">
                      <div className="flex flex-col gap-2 mb-3 md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="mb-1 text-xl font-bold">
                            {item.institution}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                                darkMode
                                  ? item.type === "college"
                                    ? "bg-blue-900/30 text-blue-300"
                                    : "bg-green-900/30 text-green-300"
                                  : item.type === "college"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              <MapPin className="w-3 h-3 mr-1" />
                              {item.location}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                                darkMode
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {item.duration}
                            </span>
                          </div>
                        </div>

                        {item.status && (
                          <div
                            className={`px-2 py-1 rounded-md text-xs whitespace-nowrap ${
                              darkMode
                                ? "bg-gradient-to-r from-blue-900/40 to-purple-900/40"
                                : "bg-gradient-to-r from-blue-100 to-purple-100"
                            }`}
                          >
                            <span
                              className={`font-medium ${darkMode ? "text-blue-300" : "text-blue-700"}`}
                            >
                              {item.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {(item.degree || item.stream || item.grade) && (
                        <div className="mb-2">
                          <h4
                            className={`font-semibold text-sm mb-1 flex items-center ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            <GraduationCap className="w-4 h-4 mr-1" />
                            {item.degree || item.stream || item.grade}
                          </h4>
                          {item.field && (
                            <p
                              className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              {item.field}
                            </p>
                          )}
                        </div>
                      )}

                      <p
                        className={`text-sm mb-3 leading-relaxed ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {item.description}
                      </p>

                      {(item.courses || item.focus) && (
                        <div className="mb-3">
                          <h4
                            className={`font-semibold text-xs mb-1.5 flex items-center ${
                              darkMode ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            <BookMarked className="w-3 h-3 mr-1" />
                            Key{" "}
                            {item.type === "college" ? "Courses" : "Subjects"}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {(item.courses || item.focus).map((course, idx) => (
                              <span
                                key={idx}
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  darkMode
                                    ? item.type === "college"
                                      ? "bg-blue-900/30 text-blue-300"
                                      : "bg-green-900/30 text-green-300"
                                    : item.type === "college"
                                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                                      : "bg-green-50 text-green-700 border border-green-100"
                                }`}
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.achievements && (
                        <div>
                          <h4
                            className={`font-semibold text-xs mb-1.5 flex items-center ${
                              darkMode ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            <Trophy className="w-3 h-3 mr-1" />
                            Achievements
                          </h4>
                          <ul className="space-y-0.5">
                            {item.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-xs"
                              >
                                <ChevronRight
                                  className={`h-3 w-3 mt-0.5 mr-1 flex-shrink-0 ${
                                    darkMode ? "text-blue-400" : "text-blue-600"
                                  }`}
                                />
                                <span
                                  className={
                                    darkMode ? "text-gray-300" : "text-gray-600"
                                  }
                                >
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestones Section - Smaller Cards */}
        <div className="mb-16">
          <h2
            className={`text-2xl md:text-3xl font-bold text-center mb-8 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Academic{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Milestones
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative rounded-xl p-4 overflow-hidden group transition-all duration-300 hover:scale-105 ${
                  darkMode ? "bg-gray-800/50" : "bg-white"
                } shadow-md`}
              >
                <div
                  className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-10 -mt-10 opacity-20 bg-gradient-to-br ${milestone.color}`}
                ></div>
                <div
                  className={`absolute bottom-0 left-0 w-20 h-20 rounded-full -ml-10 -mb-10 opacity-20 bg-gradient-to-tr ${milestone.color}`}
                ></div>

                <div className="relative">
                  <div
                    className={`inline-flex p-2 rounded-lg mb-3 ${
                      darkMode
                        ? "bg-gray-700/50 text-white"
                        : "bg-gradient-to-br from-gray-50 to-white text-gray-800"
                    }`}
                  >
                    {milestone.icon}
                  </div>

                  <div className="mb-1 text-2xl font-bold">
                    {milestone.year}
                  </div>
                  <h3 className="mb-1 text-base font-bold">
                    {milestone.title}
                  </h3>
                  <p
                    className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section - More Compact */}
        <div
          className={`rounded-xl p-6 ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
              : "bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100"
          }`}
        >
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">
              Skills{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Developed
              </span>
            </h2>
            <p
              className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Key competencies gained through my academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold">Skill Proficiency</h3>
              <div className="space-y-4">
                {developedSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <span
                        className={`text-sm font-bold ${
                          skill.category === "Analytical"
                            ? "text-blue-600"
                            : skill.category === "Technical"
                              ? "text-purple-600"
                              : skill.category === "Academic"
                                ? "text-green-600"
                                : "text-orange-600"
                        }`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className={`h-1.5 rounded-full overflow-hidden ${
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`h-full rounded-full ${
                          skill.category === "Analytical"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                            : skill.category === "Technical"
                              ? "bg-gradient-to-r from-purple-500 to-pink-500"
                              : skill.category === "Academic"
                                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                : "bg-gradient-to-r from-orange-500 to-yellow-500"
                        }`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <div className="mt-0.5 text-xs opacity-70">
                      {skill.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                className={`rounded-lg p-5 h-full ${
                  darkMode ? "bg-gray-800/30" : "bg-white/50"
                }`}
              >
                <h3 className="mb-4 text-xl font-bold">Academic Highlights</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center mb-2 text-sm font-bold">
                      <Users className="w-4 h-4 mr-1 text-blue-500" />
                      University Journey
                    </h4>

                    <ul className="space-y-1.5 text-sm">
                      <li className="flex items-center">
                        <Star className="w-3 h-3 mr-2 text-yellow-500" />
                        <span>B.Tech CSE Graduate (2026)</span>
                      </li>

                      <li className="flex items-center">
                        <Star className="w-3 h-3 mr-2 text-yellow-500" />
                        <span>Strong Foundation in Computer Science</span>
                      </li>

                      <li className="flex items-center">
                        <Star className="w-3 h-3 mr-2 text-yellow-500" />
                        <span>Hands-on MERN Stack Development</span>
                      </li>

                      <li className="flex items-center">
                        <Star className="w-3 h-3 mr-2 text-yellow-500" />
                        <span>15+ Academic & Personal Projects</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center mb-2 text-sm font-bold">
                      <BookOpen className="w-4 h-4 mr-1 text-green-500" />
                      Core Learning Areas
                    </h4>

                    <ul className="space-y-1.5 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-green-500" />
                        <span>Data Structures & Algorithms</span>
                      </li>

                      <li className="flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-green-500" />
                        <span>Database Management Systems</span>
                      </li>

                      <li className="flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-green-500" />
                        <span>Operating Systems & Computer Networks</span>
                      </li>

                      <li className="flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-green-500" />
                        <span>Full Stack Web Development</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center mb-2 text-sm font-bold">
                      <Target className="w-4 h-4 mr-1 text-purple-500" />
                      Career Objective
                    </h4>

                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Seeking opportunities as a Full Stack Developer where I
                      can apply my expertise in React.js, Node.js, Express.js,
                      and MongoDB to build scalable applications while
                      continuously learning modern technologies and industry
                      best practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Note - More Compact */}
        <div
          className={`mt-12 text-center rounded-xl p-6 ${
            darkMode
              ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30"
              : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="mb-2 text-xl font-bold md:text-2xl">
              Building the Future Through Technology
            </h3>

            <p
              className={`text-sm mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              My journey from academic learning to real-world development has
              equipped me with strong problem-solving abilities, software
              engineering principles, and hands-on experience in building modern
              web applications. As a B.Tech Computer Science graduate, I am
              passionate about creating impactful digital solutions and
              continuously expanding my technical expertise.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-700"
                }`}
              >
                <p className="w-3 h-3 mr-1" />
                Full Stack Developer
              </div>

              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-700"
                }`}
              >
                <Target className="w-3 h-3 mr-1" />
                Career Ready
              </div>

              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-700"
                }`}
              >
                <p className="w-3 h-3 mr-1" />
                Growth Mindset
              </div>

              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-white text-gray-700"
                }`}
              >
                <p className="w-3 h-3 mr-1" />
                Open to Opportunities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
