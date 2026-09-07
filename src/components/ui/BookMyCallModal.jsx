import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  Video,
  Code2,
  ArrowLeft,
  CheckCircle2,
  User,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Globe,
  Check,
  CheckCircle,
} from "lucide-react";
import ProfileImg from "../../assets/heroImg/hero.jpeg";

// Time slots from 9:00 AM to 6:00 PM (30-min intervals)
const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const STEPS = [
  { id: 0, label: "Meeting" },
  { id: 1, label: "Date" },
  { id: 2, label: "Time" },
  { id: 3, label: "Details" },
];

const BookMyCallModal = ({ isOpen, onClose }) => {
  // ---- State ----
  // Stage 0: Meeting Type | Stage 1: Date | Stage 2: Time | Stage 3: Details Form | Stage 4: Success
  const [stage, setStage] = useState(0);
  const [meetingType, setMeetingType] = useState("discovery"); // 'discovery' (15m) or 'consultation' (30m)

  // Calendar State
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState("");

  // Form State
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Input Focus Ref
  const nameInputRef = useRef(null);

  // Timezone string
  const userTimezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata (IST)";

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage(0);
      setMeetingType("discovery");
      setCurrentYear(today.getFullYear());
      setCurrentMonth(today.getMonth());
      setSelectedDay(today.getDate());
      setSelectedTime("");
      setUserName("");
      setUserEmail("");
      setUserMessage("");
      setIsSending(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Auto focus input when reaching Stage 3 (Details)
  useEffect(() => {
    if (stage === 3) {
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Escape Key Handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // Calendar Helper Math
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let startingDayIndex = firstDayOfMonth.getDay() - 1;
  if (startingDayIndex === -1) startingDayIndex = 6; // Sunday to index 6

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const formattedSelectedDateStr = `${MONTH_NAMES[currentMonth]} ${selectedDay}, ${currentYear}`;
  const meetingDurationStr = meetingType === "discovery" ? "15 minutes" : "30 minutes";
  const meetingTitleStr =
    meetingType === "discovery" ? "Discovery Call" : "Technical Consultation";

  // ---- Navigation Handlers ----
  const handleBack = () => {
    if (stage > 0 && stage < 4) {
      setStage((prev) => prev - 1);
    }
  };

  const handleSelectMeetingType = (type) => {
    setMeetingType(type);
    // Automatic guided transition to Calendar
    setStage(1);
  };

  const handleSelectDateDay = (day) => {
    setSelectedDay(day);
    // Automatic guided transition to Time Slot selection
    setStage(2);
  };

  const handleSelectTimeSlot = (time) => {
    setSelectedTime(time);
    // Automatic guided transition to Details Form
    setStage(3);
  };

  const handleConfirmBooking = (e) => {
    if (e) e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) return;

    setIsSending(true);

    const subject = `Booking Request: ${meetingTitleStr} - ${userName}`;
    const body = `Hi Ratnakar,

I would like to book an appointment with you:

• Name: ${userName}
• Email: ${userEmail}
• Meeting Type: ${meetingTitleStr} (${meetingDurationStr})
• Date: ${formattedSelectedDateStr}
• Time: ${selectedTime}
• Timezone: ${userTimezone}
• Notes / Message: ${userMessage || "No additional notes"}

Looking forward to connecting!`;

    window.location.href = `mailto:ratnakarsinghparihar07@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setIsSending(false);
      setStage(4); // Success Screen
    }, 750);
  };

  // Framer motion variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 26,
        staggerChildren: 0.08,
      },
    },
    exit: { opacity: 0, scale: 0.96, y: 15, transition: { duration: 0.2 } },
  };

  const itemFade = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Main Modal Container */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-[960px] max-h-[92vh] sm:max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800/90 overflow-hidden flex flex-col md:flex-row select-none"
        >
          {/* LEFT PANEL: HOST PROFILE (Desktop View) */}
          <motion.div
            variants={itemFade}
            className="hidden md:flex md:w-[38%] bg-slate-50/80 dark:bg-slate-950/60 border-r border-slate-200/80 dark:border-slate-800 p-8 flex-col justify-between relative overflow-hidden"
          >
            <div className="relative z-10 space-y-6">
              {/* Profile Image & Status Pulse */}
              <div className="flex items-center gap-4">
                <div className="relative group shrink-0">
                  <div className="w-16 h-16 rounded-2xl p-0.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/20 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={ProfileImg}
                      alt="Ratnakar Singh Parihar"
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-slate-900" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    Ratnakar Singh Parihar
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    Full Stack Developer
                  </p>
                </div>
              </div>

              {/* Bio Quote */}
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                "Building scalable web & mobile experiences with modern technologies."
              </p>

              <div className="h-px bg-slate-200/80 dark:bg-slate-800" />

              {/* Meeting Meta Details */}
              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>{meetingDurationStr}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <span>Google Meet / Online Video Call</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="truncate">{userTimezone}</span>
                </div>
              </div>

              <div className="h-px bg-slate-200/80 dark:bg-slate-800" />

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {["MERN Stack", "React", "Node.js", "MongoDB", "React Native"].map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Quote / Footer text */}
            <div className="relative z-10 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for freelance & full-time roles
              </div>
            </div>
          </motion.div>

          {/* MOBILE HEADER (Compacted Host Info for Mobile) */}
          <div className="md:hidden p-4 bg-slate-100/90 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl p-0.5 bg-gradient-to-tr from-indigo-500 to-purple-500 shrink-0">
                <img
                  src={ProfileImg}
                  alt="Ratnakar Singh Parihar"
                  className="w-full h-full object-cover rounded-[8px]"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Ratnakar Singh Parihar
                </h4>
                <p className="text-[11px] text-indigo-500 font-semibold mt-0.5">
                  {meetingTitleStr} • {meetingDurationStr}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:opacity-80 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT PANEL: SCHEDULING AREA */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-900">
            {/* Top Navigation & Smart Progress Bar */}
            <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
              {/* Back Button */}
              {stage > 0 && stage < 4 ? (
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div className="text-xs font-bold text-indigo-500 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-500" /> Book a Call
                </div>
              )}

              {/* Progress Tracker Breadcrumbs */}
              {stage < 4 && (
                <div className="flex items-center gap-2">
                  {STEPS.map((step, idx) => {
                    const isCompleted = stage > step.id;
                    const isActive = stage === step.id;

                    return (
                      <React.Fragment key={step.id}>
                        <div
                          className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                            isActive
                              ? "text-indigo-600 dark:text-indigo-400 font-bold"
                              : isCompleted
                              ? "text-emerald-500"
                              : "text-slate-400 dark:text-slate-600"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                          ) : null}
                          <span>{step.label}</span>
                        </div>
                        {idx < STEPS.length - 1 && (
                          <span className="text-slate-300 dark:text-slate-700 text-xs">›</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="hidden md:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Stage Content Area */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto no-scrollbar">
              <AnimatePresence mode="wait">
                {/* STAGE 0: MEETING TYPE SELECTION */}
                {stage === 0 && (
                  <motion.div
                    key="stage-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        Select Meeting Type
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Choose the consultation format that best fits your conversation goal.
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      {/* Option 1: Discovery Call */}
                      <button
                        type="button"
                        onClick={() => handleSelectMeetingType("discovery")}
                        className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${
                          meetingType === "discovery"
                            ? "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500 shadow-md ring-1 ring-indigo-500/30"
                            : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-indigo-500/40"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                              Discovery Call
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              Quick 15-min intro to discuss your project or hiring opportunity.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                            15 min
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </button>

                      {/* Option 2: Technical Consultation */}
                      <button
                        type="button"
                        onClick={() => handleSelectMeetingType("consultation")}
                        className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${
                          meetingType === "consultation"
                            ? "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500 shadow-md ring-1 ring-purple-500/30"
                            : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-purple-500/40"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-500 flex items-center justify-center shrink-0">
                            <Code2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                              Technical Consultation
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              Deep-dive technical discussion (architecture, code review, tech stack).
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                            30 min
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STAGE 1: CUSTOM INTERACTIVE CALENDAR */}
                {stage === 1 && (
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                          Choose a Date
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Select an available date on the calendar.
                        </p>
                      </div>

                      {/* Month Navigation */}
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                        <button
                          onClick={handlePrevMonth}
                          className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 dark:text-white px-2">
                          {MONTH_NAMES[currentMonth]} {currentYear}
                        </span>
                        <button
                          onClick={handleNextMonth}
                          className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Days of Week Header */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400">
                      {DAYS_OF_WEEK.map((day) => (
                        <div key={day} className="py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Dates Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty padding slots */}
                      {Array.from({ length: startingDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-9 sm:h-10" />
                      ))}

                      {/* Day slots */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const dateObj = new Date(currentYear, currentMonth, dayNum);
                        const isPast =
                          dateObj.setHours(0, 0, 0, 0) <
                          new Date().setHours(0, 0, 0, 0);
                        const isSelected = selectedDay === dayNum;
                        const isToday =
                          today.getDate() === dayNum &&
                          today.getMonth() === currentMonth &&
                          today.getFullYear() === currentYear;

                        return (
                          <button
                            key={dayNum}
                            disabled={isPast}
                            onClick={() => handleSelectDateDay(dayNum)}
                            className={`h-9 sm:h-10 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center relative ${
                              isPast
                                ? "text-slate-300 dark:text-slate-700 pointer-events-none opacity-40"
                                : isSelected
                                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105"
                                : isToday
                                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/40"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STAGE 2: TIME SLOTS GRID */}
                {stage === 2 && (
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Available Times
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formattedSelectedDateStr} • {userTimezone}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {TIME_SLOTS.map((time, idx) => {
                        const isSelected = selectedTime === time;

                        return (
                          <motion.button
                            key={time}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03, duration: 0.2 }}
                            onClick={() => handleSelectTimeSlot(time)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-150 border ${
                              isSelected
                                ? "bg-indigo-500 text-white border-indigo-500 shadow-md scale-105"
                                : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500/40 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            {time}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STAGE 3: USER DETAILS FORM */}
                {stage === 3 && (
                  <motion.div
                    key="stage-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Enter Your Details
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Finalize your appointment request details.
                      </p>
                    </div>

                    {/* Summary Appointment Badge */}
                    <div className="p-4 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex flex-wrap gap-4 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{formattedSelectedDateStr}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{meetingTitleStr} ({meetingDurationStr})</span>
                      </div>
                    </div>

                    {/* Form Input Fields */}
                    <form onSubmit={handleConfirmBooking} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Your Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            ref={nameInputRef}
                            type="text"
                            required
                            placeholder="e.g. Alex Johnson"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Your Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Message / Topics to Discuss (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Briefly describe what you'd like to discuss..."
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60 transition-all resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={!userName.trim() || !userEmail.trim() || isSending}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
                      >
                        {isSending ? (
                          <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                        ) : (
                          <>
                            Confirm Booking <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STAGE 4: SUCCESS CONFIRMATION SCREEN */}
                {stage === 4 && (
                  <motion.div
                    key="stage-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="py-6 flex flex-col items-center text-center space-y-4"
                  >
                    {/* Animated Green Checkmark & Profile Photo */}
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-lg ring-4 ring-emerald-500/20"
                      >
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                      </motion.div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Meeting Request Sent! 🎉
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm">
                        I'll get back to you shortly to confirm the meeting details.
                      </p>
                    </div>

                    {/* Booking Card Summary */}
                    <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 space-y-2 max-w-sm">
                      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700/80 pb-3">
                        <img
                          src={ProfileImg}
                          alt="Ratnakar Singh Parihar"
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            Ratnakar Singh Parihar
                          </p>
                          <p className="text-[11px] text-indigo-500 font-semibold">
                            {meetingTitleStr} ({meetingDurationStr})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>Date & Time:</span>
                        <span className="text-slate-900 dark:text-white font-bold">
                          {formattedSelectedDateStr} at {selectedTime}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all mt-2"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookMyCallModal;
