import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import RoleDashboardSidebar from "../components/RoleDashboardSidebar";
import RoleDashboardTopbar from "../components/RoleDashboardTopbar";

const RoleDashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Route change par mobile sidebar close karo
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Mobile drawer open hone par background scroll lock karo
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden role-dashboard bg-background text-foreground">
      <div className="flex w-full h-full min-h-0">
        {/* Desktop sidebar: always stays in place */}
        <aside className="hidden h-full w-[250px] shrink-0 border-r border-border lg:block xl:w-[270px]">
          <div className="h-full overflow-y-auto overscroll-contain">
            <RoleDashboardSidebar />
          </div>
        </aside>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.button
                type="button"
                aria-label="Close dashboard navigation"
                className="fixed inset-0 z-50 cursor-default bg-black/50 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileOpen(false)}
              />

              {/* Drawer */}
              <motion.aside
                id="dashboard-mobile-sidebar"
                className="fixed inset-y-0 left-0 z-[60] w-[280px] max-w-[85vw] overflow-y-auto border-r border-border bg-background shadow-2xl lg:hidden"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 32,
                }}
              >
                <RoleDashboardSidebar
                  onNavigate={() => setIsMobileOpen(false)}
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Right side: fixed height */}
        <div className="flex flex-col flex-1 h-full min-w-0 min-h-0 overflow-hidden">
          {/* Dashboard's own topbar: does not scroll away */}
          <div className="relative z-30 border-b shrink-0 border-border bg-background">
            <RoleDashboardTopbar onMenuClick={() => setIsMobileOpen(true)} />
          </div>

          {/* Only this content area scrolls */}
          <main
            id="role-dashboard-content"
            className="flex-1 min-w-0 min-h-0 px-4 py-6 overflow-x-hidden overflow-y-auto overscroll-y-contain sm:px-6 lg:px-8 lg:py-8"
          >
            <div className="mx-auto w-full max-w-[1400px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RoleDashboardLayout;
