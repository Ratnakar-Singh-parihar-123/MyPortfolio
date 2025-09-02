// ResumeActions.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";      // ← adjust path
import Icon   from "../AppIcon";    // ← adjust path

const RESUME_URL = "/assets/Ratnakar_Singh_Parihar_Resume.pdf";

const ResumeActions = () => {
  const [open, setOpen] = useState(false);

  /* close on Esc */
  const escHandler = useCallback(e => e.key === "Escape" && setOpen(false), []);
  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", escHandler);
      document.body.style.overflow = "hidden";        // lock scroll
    }
    return () => {
      window.removeEventListener("keydown", escHandler);
      document.body.style.overflow = "";              // unlock scroll
    };
  }, [open, escHandler]);

  return (
    <>
      {/* trigger */}
      <Button
        variant="outline"
        size="sm"
        iconName="ExternalLink"
        iconPosition="left"
        className="text-sm"
        onClick={() => setOpen(true)}
      >
        View Résumé
      </Button>

      <AnimatePresence>
        {open && (
          /* backdrop */
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* dialog */}
            <motion.div
              className="w-full max-w-3xl h-[80vh] max-h-[90vh] bg-background rounded-lg shadow-2xl flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-semibold">My Résumé</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close résumé viewer"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>

              {/* PDF viewer */}
              <div className="flex-grow overflow-auto" tabIndex={-1}>
                <iframe
                  src={RESUME_URL}
                  title="Résumé PDF"
                  className="w-full h-full min-h-full"
                  tabIndex={-1}
                />
              </div>

              {/* footer */}
              <div className="p-4 border-t border-border flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  <a href={RESUME_URL} download="Ratnakar_Singh_Parihar_Resume.pdf">
                    Download Résumé
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResumeActions;
