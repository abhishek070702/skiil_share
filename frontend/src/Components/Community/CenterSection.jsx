import React, { useEffect, useState } from "react";
import { Avatar, Empty, Spin, message } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import PostService from "../../Services/PostService";
import SkillPlanService from "../../Services/SkillPlanService";
import TobBox from "./TobBox";
import StateDebugger from "./StateDebugger";
import MyPost from "./MyPost";
import FriendsPost from "./FriendsPost";
import CreateSkillPlanBox from "./CreateSkillPlanBox";
import SkillPlanCard from "./SkillPlanCard";
import FriendsSection from "./FriendsSection";
import Notifications from "./Notifications";
import { motion } from "framer-motion";

const CenterSection = () => {
  const snap = useSnapshot(state);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await PostService.getPosts();
        const uniquePosts = [];
        const seenIds = new Set();

        result.forEach((post) => {
          if (!seenIds.has(post.id)) {
            seenIds.add(post.id);
            uniquePosts.push(post);
          }
        });

        if (isMounted) {
          state.posts = uniquePosts;
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [isMounted]);

  useEffect(() => {
    const loadUserSkillPlans = async () => {
      if (snap.activeIndex !== 2 || !snap.currentUser?.uid) return;

      try {
        setLoading(true);
        const userSkillPlans = await SkillPlanService.getUserSkillPlans(snap.currentUser.uid);
        if (isMounted) {
          state.skillPlans = userSkillPlans;
        }
      } catch (err) {
        console.error("Failed to fetch skill plans:", err);
        message.error("Failed to load your skill plans");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUserSkillPlans();
  }, [snap.activeIndex, snap.currentUser?.uid, isMounted]);

  const renderContent = () => {
    switch (snap.activeIndex) {
      case 1: // Posts
        return (
          <section style={styles.feedSection}>
            <div style={styles.createPost}>
              <MyPost />
            </div>
            <div style={styles.postsFeed}>
              {snap.posts.length > 0 ? (
                snap.posts.map((post, idx) => (
                  <FriendsPost key={post.id || idx} post={post} />
                ))
              ) : (
                <Empty 
                  description="No posts yet" 
                  style={styles.emptyState}
                  imageStyle={styles.emptyImage}
                />
              )}
            </div>
          </section>
        );
      case 2: // Skill Plans
        return (
          <section style={styles.skillsSection}>
            <StateDebugger />
            <CreateSkillPlanBox />
            {loading ? (
              <div style={styles.loadingWrapper}>
                <Spin size="large" />
              </div>
            ) : snap.skillPlans?.length > 0 ? (
              <div style={styles.skillsGrid}>
                {snap.skillPlans.map((plan) => (
                  <SkillPlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            ) : (
              <Empty 
                description="No skill plans created yet" 
                style={styles.emptyState}
                imageStyle={styles.emptyImage}
              />
            )}
          </section>
        );
      case 3: // Friends
        return (
          <section style={styles.friendsSection}>
            <FriendsSection />
          </section>
        );
      case 4: // Notifications
        return (
          <section style={styles.notificationsSection}>
            <Notifications />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <main style={styles.centerContainer}>
      <motion.header 
        style={styles.profileHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={styles.headerDecoration} />
        <div style={styles.profileHeaderContent}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar
              style={styles.profileAvatar}
              size={120}
              src={snap.currentUser?.image}
              onClick={() => {
                state.profileModalOpend = true;
              }}
            />
          </motion.div>
          <motion.h2 
            style={styles.profileName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {snap.currentUser?.username || 'User'}
          </motion.h2>
          <motion.div 
            style={styles.profileStats}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div style={styles.statItem}>
              <span style={styles.statValue}>{snap.skillPlans?.length || 0}</span>
              <span style={styles.statLabel}>Skill Plans</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>
                {snap.skillPlans?.filter(plan => plan.isFinished).length || 0}
              </span>
              <span style={styles.statLabel}>Completed</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>
                {snap.skillPlans?.filter(plan => !plan.isFinished).length || 0}
              </span>
              <span style={styles.statLabel}>In Progress</span>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <TobBox />

      <div style={styles.mainContent}>
        {renderContent()}
      </div>
    </main>
  );
};

// Styles object for better organization
const styles = {
  centerContainer: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    position: 'relative',
  },
  profileHeader: {
    position: 'relative',
    width: '100%',
    padding: '40px 0',
    marginBottom: '30px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.9) 100%)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },
  profileHeaderContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  profileAvatar: {
    width: '120px',
    height: '120px',
    border: '4px solid #fff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '16px',
  },
  profileName: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#262626',
    marginBottom: '8px',
    textAlign: 'center',
  },
  profileStats: {
    display: 'flex',
    gap: '24px',
    marginTop: '16px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1890ff',
  },
  statLabel: {
    fontSize: '14px',
    color: '#8c8c8c',
  },
  headerDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.1,
    background: 'radial-gradient(circle at 50% 50%, rgba(24, 144, 255, 0.2) 0%, rgba(82, 196, 26, 0.2) 100%)',
  },
  mainContent: {
    marginTop: '20px',
    animation: 'fadeIn 0.6s ease-out',
  },
  feedSection: {
    width: '100%',
    maxWidth: '750px',
    margin: '0 auto',
    paddingBottom: '20px',
  },
  createPost: {
    marginBottom: '30px',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '10px',
  },
  postsFeed: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    paddingBottom: '20px',
  },
  skillsSection: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    paddingBottom: '20px',
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '25px',
    marginTop: '30px',
  },
  friendsSection: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  notificationsSection: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  emptyState: {
    margin: '50px 0',
    padding: '50px 0',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
  },
  emptyImage: {
    height: '100px',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(15px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  }
};

export default CenterSection;
