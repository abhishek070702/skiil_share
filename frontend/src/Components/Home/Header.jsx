import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiBook, FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";

// Components
import AuthModal from "../Modals/AuthModal";

// Services
import AuthService from "../../Services/AuthService";

// Styling
import "../../Styles/Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(AuthService.isAuthenticated());
    };

    checkAuthStatus();

    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("focus", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("focus", checkAuthStatus);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      navigate("/community");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    navigate("/");
  };

  const features = [
    {
      icon: <FiBook />,
      title: "Personalized Learning",
      description: "AI-powered skill plans tailored to your goals"
    },
    {
      icon: <FiUsers />,
      title: "Community Learning",
      description: "Connect with peers and share your progress"
    },
    {
      icon: <FiAward />,
      title: "Track Progress",
      description: "Monitor your achievements and growth"
    },
    {
      icon: <FiTrendingUp />,
      title: "Continuous Growth",
      description: "Adaptive learning paths that evolve with you"
    }
  ];

  return (
    <header className="header">
      {/* Animated background elements */}
      <div className="header-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <section className="section__container">
        <div className="header__content">
          <motion.div 
            className="header-text-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="header__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Master New Skills
            </motion.h1>
            
            <motion.h2 
              className="header__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Your Journey to Excellence Starts Here
            </motion.h2>
            
            <motion.p 
              className="header__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Create personalized skill plans, track your progress, and join a community of learners. 
              Our AI-powered platform adapts to your learning style and helps you achieve your goals faster.
            </motion.p>

            <motion.div 
              className="header__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.button 
                className="cta-button"
                onClick={handleAuthButtonClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started"}
                <FiArrowRight className="arrow-icon" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="features-showcase"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="features-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  className="feature-card"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="feature-icon-wrapper">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="feature-title">{features[activeFeature].title}</h3>
                  <p className="feature-description">{features[activeFeature].description}</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="feature-indicators">
                {features.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`feature-indicator ${index === activeFeature ? 'active' : ''}`}
                    onClick={() => setActiveFeature(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </header>
  );
};

export default Header;
