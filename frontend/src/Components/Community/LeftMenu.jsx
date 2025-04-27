import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import { motion } from "framer-motion";
import { 
  HomeOutlined, 
  BookOutlined, 
  TeamOutlined, 
  BellOutlined,
  TrophyOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import "../../Styles/LeftMenu.css";

const TopMenu = () => {
  const snap = useSnapshot(state);

  const handleClick = (index) => {
    state.activeIndex = index;
  };

  const menuItems = [
    { icon: <HomeOutlined />, label: "Posts", index: 1 },
    { icon: <BookOutlined />, label: "Skill Plans", index: 2 },
    { icon: <TeamOutlined />, label: "Friends", index: 3 },
    { icon: <BellOutlined />, label: "Notifications", index: 4 },
    { icon: <TrophyOutlined />, label: "Achievements", index: 5 },
    { icon: <SettingOutlined />, label: "Settings", index: 6 }
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <motion.div 
      className="top-menu"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="top-menu-container">
        {/* Logo/Brand */}
        <div className="top-menu-logo">
          <motion.div 
            className="logo-icon"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <TrophyOutlined />
          </motion.div>
          <span className="logo-text">SkillShare</span>
        </div>

        {/* Navigation Items */}
        <nav className="top-menu-nav">
          {menuItems.map((item) => (
            <motion.div
              key={item.index}
              className={`top-menu-item ${snap.activeIndex === item.index ? 'active' : ''}`}
              onClick={() => handleClick(item.index)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="top-menu-icon">{item.icon}</span>
              <span className="top-menu-label">{item.label}</span>
              {snap.activeIndex === item.index && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="top-menu-profile">
          <motion.div 
            className="profile-avatar"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              state.profileModalOpend = true;
            }}
          >
            <img 
              src={snap.currentUser?.image || "https://via.placeholder.com/100"} 
              alt="Profile"
            />
          </motion.div>
          <div className="profile-info">
            <h3 className="profile-name">{snap.currentUser?.name || "User"}</h3>
            <p className="profile-role">Skill Enthusiast</p>
          </div>
          <motion.div
            className="logout-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <LogoutOutlined />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopMenu;