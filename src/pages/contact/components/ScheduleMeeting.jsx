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
  Link,
  Copy,
} from "lucide-react";

const ScheduleMeet = ({ open, setOpen }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [meetingType, setMeetingType] = useState("project");
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

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

    const meetingTypes = {
      project: "Project Discussion",
      consultation: "Free Consultation",
      support: "Technical Support",
      interview: "Interview Call",
    };

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE
    &text=${meetingTypes[meetingType]}+with+Ratnakar+Digital
    &details=Meeting+with+${name}+-+${meetingTypes[meetingType]}+via+Google+Meet
    &location=Google+Meet
    &add=${email}
    &dates=${startUTC}/${endUTC}`;

    window.open(url, "_blank");
    setStep(2);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://meet.google.com/abc-defg-hij");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-slideUp">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl">
              <Video size={24} />
            </div>
            <h2 className="text-2xl font-bold">Schedule Meeting</h2>
          </div>
          <p className="text-white/80 text-sm">
            Connect with us via Google Meet for a quick discussion
          </p>

          {/* Step indicator */}
          <div className="flex items-center justify-between mt-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= s
                      ? "bg-white text-indigo-600"
                      : "bg-white/20 text-white"
                  } font-semibold text-sm transition-all`}
                >
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                {s < 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded ${
                      step > s ? "bg-white" : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Meeting Details */}
        {step === 1 && (
          <div className="p-6 space-y-5">
            <div className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Meeting Type */}
              <select
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              >
                <option value="project">Project Discussion</option>
                <option value="consultation">Free Consultation</option>
                <option value="support">Technical Support</option>
                <option value="interview">Interview Call</option>
              </select>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="time"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Duration Info */}
              <div className="bg-indigo-50 rounded-xl p-3 flex items-center space-x-2">
                <Clock size={16} className="text-indigo-600" />
                <span className="text-sm text-indigo-700">
                  Meeting duration: 30 minutes
                </span>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500">
                By scheduling a meeting, you agree to our{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms of Service
                </a>
                .
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleMeet}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all font-medium flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Success & Meet Link */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            {/* Success Animation */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle size={40} className="text-green-600" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Meeting Scheduled!
              </h3>
              <p className="text-gray-500 text-sm">
                Your Google Meet has been created. Join using the link below:
              </p>
            </div>

            {/* Meet Link */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Video size={20} className="text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Google Meet Link
                  </span>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
                >
                  <Copy size={16} />
                  <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div className="mt-2 p-2 bg-white rounded-lg border border-gray-200">
                <code className="text-sm text-gray-600">
                  https://meet.google.com/abc-defg-hij
                </code>
              </div>
            </div>

            {/* Meeting Details Summary */}
            <div className="bg-indigo-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-600 font-medium">Date:</span>
                <span className="text-gray-700">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-600 font-medium">Time:</span>
                <span className="text-gray-700">{time} (IST, 30 mins)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-600 font-medium">Attendee:</span>
                <span className="text-gray-700">{email}</span>
              </div>
            </div>

            {/* Calendar Buttons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="flex-1 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium text-center"
              >
                Add to Calendar
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  setStep(1);
                  setName("");
                  setEmail("");
                  setDate("");
                  setTime("");
                }}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all font-medium"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleMeet;
