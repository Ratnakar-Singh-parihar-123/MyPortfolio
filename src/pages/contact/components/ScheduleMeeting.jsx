import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Mail,
  Video,
  X,
  CheckCircle,
  ChevronRight,
  Users,
  Copy,
  Sparkles,
  ArrowRight,
  CalendarCheck,
  User,
  AtSign,
  Tag,
  ExternalLink,
} from "lucide-react";

const ScheduleMeet = ({ open, setOpen }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [meetingType, setMeetingType] = useState("project");
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const meetingTypes = {
    project: { label: "Project Discussion", icon: "💬", color: "blue" },
    consultation: { label: "Free Consultation", icon: "🎯", color: "emerald" },
    support: { label: "Technical Support", icon: "🛠️", color: "amber" },
    interview: { label: "Interview Call", icon: "🎤", color: "purple" },
  };

  const handleScheduleMeet = () => {
    if (!name || !email || !date || !time) {
      alert("Please fill all required fields");
      return;
    }

    const start = new Date(`${date}T${time}`);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 30);

    const startUTC = start.toISOString().replace(/[-:]|\.\d+/g, "");
    const endUTC = end.toISOString().replace(/[-:]|\.\d+/g, "");

    const url =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${meetingTypes[meetingType].label}+with+Ratnakar+Digital` +
      `&details=Meeting+with+${name}+-+${meetingTypes[meetingType].label}+via+Google+Meet` +
      `&location=Google+Meet` +
      `&add=${email}` +
      `&dates=${startUTC}/${endUTC}`;

    window.open(url, "_blank");
    setStep(2);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://meet.google.com/abc-defg-hij");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1);
      setName("");
      setEmail("");
      setDate("");
      setTime("");
    }, 300);
  };

  if (!open) return null;

  const currentType = meetingTypes[meetingType];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.25s_ease-out]">
      {/* Modal */}
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[slideUp_0.35s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh] overflow-y-auto">
        {/* ===== HEADER ===== */}
        <div className="relative px-6 pt-6 pb-4 border-b border-gray-100">
          <button
            onClick={handleClose}
            className="absolute flex items-center justify-center text-gray-500 transition-colors bg-gray-100 rounded-full top-4 right-4 w-9 h-9 hover:bg-gray-200 hover:text-gray-700"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-white shadow-lg rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-blue-500/25">
              <Video size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Schedule a Meeting
              </h2>
              <p className="text-sm text-gray-500">
                Connect with us via Google Meet
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-3 mt-5">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all duration-300 ${
                    step >= s
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                {s < 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                      step > s ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== STEP 1: FORM ===== */}
        {step === 1 && (
          <div className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full py-3 pr-4 text-sm text-black transition-all border border-gray-200 rounded-xl pl-11 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AtSign
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full py-3 pr-4 text-sm text-black transition-all border border-gray-200 rounded-xl pl-11 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Meeting Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Meeting Type
              </label>
              <div className="relative">
                <Tag
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                />
                <select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="w-full py-3 pr-10 text-sm text-gray-700 transition-all bg-white border border-gray-200 appearance-none rounded-xl pl-11 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  {Object.entries(meetingTypes).map(([key, { label }]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
              {/* Type badge */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg">{currentType.icon}</span>
                <span className="text-sm text-gray-600">
                  {currentType.label}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full bg-${currentType.color}-50 text-${currentType.color}-600 font-medium`}
                >
                  30 min
                </span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 "
                  />
                  <input
                    type="date"
                    className="w-full py-3 pr-3 text-sm text-black transition-all border border-gray-200 rounded-xl pl-11 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="time"
                    className="w-full py-3 pr-3 text-sm text-black transition-all border border-gray-200 rounded-xl pl-11 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Duration hint */}
            <div className="flex items-center gap-2.5 bg-blue-50/70 rounded-xl px-4 py-3 border border-blue-100/50">
              <Clock size={16} className="flex-shrink-0 text-blue-600" />
              <span className="text-sm text-blue-700">
                Meeting duration: <strong>30 minutes</strong>
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 transition-all border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleMeet}
                className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-medium text-white transition-all bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 group"
              >
                <span>Continue</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>

            <p className="text-xs text-center text-gray-400">
              By scheduling, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              &amp;{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms
              </a>
            </p>
          </div>
        )}

        {/* ===== STEP 2: SUCCESS ===== */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            {/* Success icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-[bounceIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">
                  <CheckCircle size={42} className="text-emerald-600" />
                </div>
                <div className="absolute -top-1 -right-1 animate-[ping_2s_ease-in-out_infinite]">
                  <Sparkles
                    size={18}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900">
                Meeting Scheduled! 🎉
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Your Google Meet link is ready. Join using the button below.
              </p>
            </div>

            {/* Meet Link Card */}
            <div className="p-4 border bg-gray-50/80 rounded-2xl border-gray-100/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                    <Video size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Google Meet
                  </span>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
                >
                  <Copy size={15} />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="mt-2.5 p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                <code className="font-mono text-sm text-gray-600 truncate">
                  meet.google.com/abc-defg-hij
                </code>
                <a
                  href="#"
                  className="flex-shrink-0 ml-3 text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Meeting Summary */}
            <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/80 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium text-gray-800">
                  {date &&
                    new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span className="font-medium text-gray-800">
                  {time}{" "}
                  <span className="font-normal text-gray-400">(IST)</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium text-gray-800">30 minutes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Attendee</span>
                <span className="text-gray-800 font-medium truncate max-w-[160px]">
                  {email}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 text-sm border-t border-gray-200/60">
                <span className="text-gray-500">Type</span>
                <span className="text-gray-800 font-medium flex items-center gap-1.5">
                  <span>{currentType.icon}</span>
                  {currentType.label}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-medium text-gray-600 transition-all border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                <CalendarCheck size={16} />
                Add to Calendar
              </a>
              <button
                onClick={handleClose}
                className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-medium text-white transition-all bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/30"
              >
                Done
                <CheckCircle size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(24px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes bounceIn {
                    0% { opacity: 0; transform: scale(0.5); }
                    60% { opacity: 1; transform: scale(1.08); }
                    100% { transform: scale(1); }
                }
                @keyframes ping {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.6); }
                }
            `}</style>
    </div>
  );
};

export default ScheduleMeet;
