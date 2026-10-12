import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/ui/Button";
import Icon from "components/AppIcon";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    if (window.history?.length > 1) {
      window.history.back();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-16 bg-background">
      <div className="w-full max-w-md text-center">
        {/* 404 */}
        <h1
          className="
            text-[120px]
            sm:text-[150px]
            font-extrabold
            leading-none
            tracking-tighter
            bg-gradient-to-br
            from-indigo-500
            via-violet-500
            to-blue-500
            bg-clip-text
            text-transparent
            select-none
          "
        >
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
          Page not found
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-3 mt-8 sm:flex-row">
          <Button
            variant="primary"
            icon={<Icon name="ArrowLeft" />}
            iconPosition="left"
            onClick={handleGoBack}
          >
            Go Back
          </Button>

          <Button
            variant="outline"
            icon={<Icon name="Home" />}
            iconPosition="left"
            onClick={handleGoHome}
          >
            Back to Home
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mt-10">
          <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
            or explore
          </span>
          <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {[
            { label: "Projects", path: "/projects" },
            { label: "Experience", path: "/experience" },
            { label: "Contact", path: "/contact" },
            { label: "Role Mode", path: "/role/full-stack", premium: true },
          ].map((link) => (
            <button
              key={link.path}
              type="button"
              onClick={() => navigate(link.path)}
              className={`
                rounded-full
                px-4
                py-1.5
                text-xs
                font-medium
                transition-all
                duration-200
                active:scale-95
                ${
                  link.premium
                    ? `
                      border
                      border-indigo-400/40
                      bg-gradient-to-r
                      from-indigo-500/[0.10]
                      to-violet-500/[0.08]
                      text-indigo-600
                      dark:text-indigo-300
                      hover:from-indigo-500/[0.16]
                      hover:to-violet-500/[0.12]
                    `
                    : `
                      border
                      border-slate-200
                      dark:border-slate-800
                      text-slate-600
                      dark:text-slate-400
                      hover:border-slate-300
                      hover:text-slate-900
                      dark:hover:text-white
                    `
                }
              `}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
