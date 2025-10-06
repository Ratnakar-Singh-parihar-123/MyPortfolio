import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import Button from "./ui/Button";
import resumefile from "../assets/resume/Ratnakar_Singh_Parihar.pdf"; // ✅ correct import

const ResumePopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumefile; // ✅ using imported file path
    link.download = "Ratnakar_Singh_Parihar.pdf";
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/40 
                       rounded-3xl shadow-2xl w-[90%] md:w-[65%] lg:w-[50%] overflow-hidden 
                       transition-all duration-300"
          >
            {/* Glow Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/30 via-purple-500/20 to-cyan-500/30 pointer-events-none blur-[40px]" />

            {/* Header */}
            <div className="relative flex justify-between items-center p-5 border-b border-white/20 dark:border-gray-700/50">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                My Resume
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* ✅ Resume Preview */}
            <div className="relative p-4 bg-gradient-to-br from-gray-50/40 via-white/20 to-gray-100/10 dark:from-gray-900/60 dark:to-gray-800/30 overflow-auto max-h-[70vh]">
              <iframe
                src={resumefile} // ✅ FIXED here!
                title="Resume Preview"
                className="w-full h-[70vh] rounded-xl shadow-inner border border-white/20 dark:border-gray-700/50"
              ></iframe>
            </div>

            {/* Footer */}
            <div className="relative flex justify-center p-5 border-t border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
              <Button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 
                           hover:from-blue-700 hover:to-purple-700 text-white shadow-md transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumePopup;