import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import { ThemeToggle } from "../ThemeProvider";
import { Link } from "react-router-dom";

// logo
import logoImg from "../../assets/logo/logo.jpeg";

// resume
import resumefile from "../../assets/resume/Ratnakar_Singh_Parihar.pdf";

const Header = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Home", path: "/", icon: "Home" },
    { name: "About", path: "/about", icon: "User" },
    { name: "Skills", path: "/skills", icon: "Code" },
    { name: "Projects", path: "/projects", icon: "FolderOpen" },
    { name: "Contact", path: "/contact", icon: "Mail" },
  ];

  const secondaryItems = [
    { name: "Achievements", path: "/achievements", icon: "Award" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="w-9 h-9 bg-gradient-brand rounded-lg flex items-center justify-center">
          <img
            src={logoImg} // image path
            alt="RSP Logo"
            className="w-7 h-7 object-contain rounded-lg"
          />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground tracking-tight">
          RSP.
        </span>
        <span className="text-xs text-muted-foreground font-medium -mt-1">
          Ratnakar Singh Parihar
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      } ${className}`}
    >
      <div className="container-brand">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <Logo />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </a>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-all duration-200">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>

              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                        isActivePath(item?.path)
                          ? "bg-primary text-primary-foreground"
                          : "text-popover-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <a href={resumefile}>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                className="text-sm"
              >
                Resume
              </Button>
            </a>
            <Link to="/contact">
              <Button
                variant="default"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                className="text-sm"
              >
                Let's Talk
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-smooth ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-t border-border">
          <div className="container-brand py-4">
            <nav className="space-y-2">
              {[...navigationItems, ...secondaryItems]?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </a>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-border">
              <Button
                variant="outline"
                fullWidth
                iconName="Download"
                iconPosition="left"
              >
                Download Resume
              </Button>
              <Button
                variant="default"
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
              >
                Let's Talk
              </Button>
            </div>

            {/* Status Indicator */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center space-x-3 px-4 py-2 bg-success/10 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-success font-medium">
                  Available for new projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
