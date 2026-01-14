import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, School, Calendar, MapPin, 
  Award, BookOpen, ChevronRight, Star,
  Users, Target, BookMarked, Trophy,
  ExternalLink, Clock, Flag
} from 'lucide-react';
import Header from '../../components/ui/Header';

const Education = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Listen for dark mode changes from Header
  useEffect(() => {
    const handleThemeChange = (e) => {
      setDarkMode(e.detail.isDark);
    };
    
    window.addEventListener('themeChange', handleThemeChange);
    
    // Initial check
    if (document.documentElement.classList.contains('dark')) {
      setDarkMode(true);
    }
    
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  // Education timeline data
  const educationTimeline = [
    {
      id: 1,
      institution: "Ies University Bhopal",
      location: "Bhopal, Madhya Pradesh",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      duration: "2021 - Present",
      status: "Final Year (Expected Graduation: 2026)",
      description: "Currently pursuing final year with focus on software development, algorithms, and computer science fundamentals.",
      achievements: [
        "Active participant in coding competitions",
        "Course projects in full-stack development",
        "Technical club member",
        "Academic projects in web technologies"
      ],
      courses: ["Data Structures", "Algorithms", "Database Management", "Web Development", "Computer Networks"],
      type: "college",
      image: "https://content.jdmagicbox.com/comp/bhopal/65/0755p755std2700465/catalogue/ies-university-bhopal-kalkheda-bhopal-institutes-9h4364j1aw.jpg?w=1920&q=75",
      color: "blue"
    },
    {
      id: 2,
      institution: "Saraswati Higher Secondary school Nagod",
      location: "City, State",
      stream: "Science Stream (PCM)",
      duration: "2021 - 2022",
      description: "Completed 11th and 12th standard with Physics, Chemistry, and Mathematics as main subjects. Developed strong analytical and problem-solving skills.",
      achievements: [
        "Science stream with PCM",
        "Mathematics proficiency",
        "Logical reasoning development",
        "Science project participation"
      ],
      focus: ["Physics", "Chemistry", "Mathematics", "Computer Science", "English"],
      type: "school",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxYLPWOweouz-hmVdvgf8N2u7cbFlvKTjIOMcaMHZLKSD9e5A7I3Mxj7o8okCtpy5nNNaSgKFNToQKhMFR_tctAYzFdnZYtaO1_hv0Xm5rCsXPNblpdZvk79F7qaw7-9Q_2n-Ag=s1360-w1360-h1020-rw",
      color: "green"
    },
    {
      id: 3,
      institution: "Saraswati Higher Secondary school Nagod",
      location: "City, State",
      grade: "10th Standard",
      duration: "2019 - 2020",
      description: "Completed foundational education with strong academic performance and participation in extracurricular activities.",
      achievements: [
        "Completed secondary education",
        "Science and mathematics foundation",
        "Extracurricular participation",
        "Academic excellence"
      ],
      type: "school",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxYLPWOweouz-hmVdvgf8N2u7cbFlvKTjIOMcaMHZLKSD9e5A7I3Mxj7o8okCtpy5nNNaSgKFNToQKhMFR_tctAYzFdnZYtaO1_hv0Xm5rCsXPNblpdZvk79F7qaw7-9Q_2n-Ag=s1360-w1360-h1020-rw",
      color: "purple"
    }
  ];

  // Academic milestones
  const milestones = [
    {
      title: "Started Engineering Journey",
      year: "2022",
      description: "Began B.Tech in Computer Science",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Science Stream Selection",
      year: "2020",
      description: "Chose PCM for 11th & 12th",
      icon: <BookOpen className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Current Status",
      year: "Present",
      description: "Final Year B.Tech Student",
      icon: <Target className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Future Goal",
      year: "2026",
      description: "Graduation & Career Launch",
      icon: <Flag className="h-6 w-6" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  // Skills developed during education
  const developedSkills = [
    { skill: "Problem Solving", level: 95, category: "Analytical" },
    { skill: "Logical Thinking", level: 90, category: "Analytical" },
    { skill: "Mathematics", level: 88, category: "Academic" },
    { skill: "Computer Fundamentals", level: 92, category: "Technical" },
    { skill: "Web Development", level: 85, category: "Technical" },
    { skill: "Team Collaboration", level: 80, category: "Soft Skills" },
    { skill: "Project Management", level: 75, category: "Soft Skills" },
    { skill: "Research Skills", level: 82, category: "Academic" }
  ];

  return (
    <section 
      id="education" 
      className={`min-h-screen py-16 px-4 md:px-8 transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white' 
          : 'bg-gradient-to-b from-blue-50 via-white to-gray-50 text-gray-800'
      }`}
    >
      <Header />
      
      <div className="max-w-7xl mx-auto pt-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
            <h1 className={`text-4xl md:text-6xl font-bold relative ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Academic <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
          </div>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            My educational path from school to engineering, focusing on continuous learning and skill development
          </p>
          
          {/* Current Status Badge */}
          <div className={`inline-flex items-center px-6 py-3 rounded-full shadow-lg ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/30' 
              : 'bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200'
          }`}>
            <div className={`p-2 rounded-full mr-3 ${
              darkMode ? 'bg-blue-800/50' : 'bg-white'
            }`}>
              <Target className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <span className="font-bold">Current Status:</span>
              <span className={`ml-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Final Year B.Tech Student in Bhopal
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative mb-20">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1">
            <div className={`h-full w-0.5 ${
              darkMode ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500' : 'bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200'
            }`}></div>
          </div>

          {educationTimeline.map((item, index) => (
            <div 
              key={item.id}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-1/2 md:pl-0 md:text-right' : 'md:pl-1/2 md:pr-0'
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-3 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full z-10 ${
                item.type === 'college' 
                  ? 'bg-blue-500 ring-4 ring-blue-500/20' 
                  : 'bg-green-500 ring-4 ring-green-500/20'
              }`}></div>

              <div className={`ml-12 md:ml-0 ${
                index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
              }`}>
                <div className={`group rounded-2xl overflow-hidden shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-100'
                }`}>
                  <div className="md:flex">
                    {/* Image Section */}
                    <div className={`md:w-2/5 h-48 md:h-auto relative overflow-hidden ${
                      item.type === 'college' 
                        ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
                        : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <img 
                        src={item.image} 
                        alt={item.institution}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <div className={`px-3 py-1 rounded-full backdrop-blur-sm ${
                          darkMode ? 'bg-black/40 text-white' : 'bg-white/80 text-gray-800'
                        }`}>
                          <span className="text-sm font-medium">
                            {item.type === 'college' ? 'College' : 'School'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-3/5 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{item.institution}</h3>
                          <div className="flex items-center flex-wrap gap-3 mb-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              darkMode 
                                ? item.type === 'college' ? 'bg-blue-900/30 text-blue-300' : 'bg-green-900/30 text-green-300'
                                : item.type === 'college' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                            }`}>
                              <MapPin className="h-3 w-3 mr-1" />
                              {item.location}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              <Calendar className="h-3 w-3 mr-1" />
                              {item.duration}
                            </span>
                          </div>
                        </div>
                        
                        {item.status && (
                          <div className={`px-3 py-1 rounded-lg ${
                            darkMode ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40' : 'bg-gradient-to-r from-blue-100 to-purple-100'
                          }`}>
                            <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                              {item.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Degree/Stream */}
                      {(item.degree || item.stream || item.grade) && (
                        <div className="mb-4">
                          <h4 className={`font-semibold mb-2 flex items-center ${
                            darkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                            <GraduationCap className="h-5 w-5 mr-2" />
                            {item.degree || item.stream || item.grade}
                          </h4>
                          {item.field && (
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {item.field}
                            </p>
                          )}
                        </div>
                      )}

                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>

                      {/* Courses/Focus Areas */}
                      {(item.courses || item.focus) && (
                        <div className="mb-4">
                          <h4 className={`font-semibold mb-2 flex items-center ${
                            darkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            <BookMarked className="h-4 w-4 mr-2" />
                            Key {item.type === 'college' ? 'Courses' : 'Subjects'}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(item.courses || item.focus).map((course, idx) => (
                              <span 
                                key={idx}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  darkMode 
                                    ? item.type === 'college' 
                                      ? 'bg-blue-900/30 text-blue-300' 
                                      : 'bg-green-900/30 text-green-300'
                                    : item.type === 'college' 
                                      ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                                      : 'bg-green-50 text-green-700 border border-green-100'
                                }`}
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievements */}
                      {item.achievements && (
                        <div>
                          <h4 className={`font-semibold mb-2 flex items-center ${
                            darkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            <Trophy className="h-4 w-4 mr-2" />
                            Achievements & Highlights
                          </h4>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <ChevronRight className={`h-4 w-4 mt-1 mr-2 flex-shrink-0 ${
                                  darkMode ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
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

        {/* Milestones Section */}
        <div className="mb-20">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Academic <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Milestones
            </span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl p-6 overflow-hidden group transition-all duration-500 hover:scale-105 ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white'
                } shadow-lg`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 opacity-20 bg-gradient-to-br ${milestone.color}`}></div>
                <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full -ml-12 -mb-12 opacity-20 bg-gradient-to-tr ${milestone.color}`}></div>
                
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    darkMode 
                      ? 'bg-gray-700/50 text-white' 
                      : 'bg-gradient-to-br from-gray-50 to-white text-gray-800'
                  }`}>
                    {milestone.icon}
                  </div>
                  
                  <div className="text-3xl font-bold mb-2">{milestone.year}</div>
                  <h3 className="text-lg font-bold mb-2">{milestone.title}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Developed Section */}
        <div className={`rounded-2xl p-8 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100'
        }`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Developed
              </span>
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Key competencies gained through my academic journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Skill Proficiency</h3>
              <div className="space-y-6">
                {developedSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.skill}</span>
                      <span className={`font-bold ${
                        skill.category === 'Analytical' ? 'text-blue-600' :
                        skill.category === 'Technical' ? 'text-purple-600' :
                        skill.category === 'Academic' ? 'text-green-600' :
                        'text-orange-600'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className={`h-full rounded-full ${
                          skill.category === 'Analytical' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          skill.category === 'Technical' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                          skill.category === 'Academic' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          'bg-gradient-to-r from-orange-500 to-yellow-500'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <div className="text-xs mt-1 opacity-70">
                      {skill.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className={`rounded-xl p-6 h-full ${
                darkMode ? 'bg-gray-800/30' : 'bg-white/50'
              }`}>
                <h3 className="text-2xl font-bold mb-6">Academic Focus</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-500" />
                      College Experience
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Final Year B.Tech Student</span>
                      </li>
                      <li className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Computer Science Focus</span>
                      </li>
                      <li className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Practical Project Experience</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-3 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                      School Foundation
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-green-500" />
                        <span>Science Stream (PCM)</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-green-500" />
                        <span>Strong Mathematics Base</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-green-500" />
                        <span>Analytical Thinking Development</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-3 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-purple-500" />
                      Future Goals
                    </h4>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Leveraging my academic foundation to build a successful career in software development, with focus on creating innovative solutions and continuous learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className={`mt-16 text-center rounded-2xl p-8 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30' 
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
        }`}>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Education as a Foundation for Innovation
            </h3>
            <p className={`text-lg mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              My academic journey has provided me with a strong foundation in analytical thinking, problem-solving, 
              and technical skills. From school science streams to college engineering courses, each phase has 
              contributed to my development as a software developer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}>
                <Clock className="h-4 w-4 mr-2" />
                Ongoing Learning
              </div>
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}>
                <Target className="h-4 w-4 mr-2" />
                Career Focused
              </div>
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Continuous Growth
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;