import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import StoryCard from "./StoryCard";
import { PlusOutlined } from "@ant-design/icons";
import WorkoutStoryService from "../../Services/WorkoutStoryService";
import { Skeleton, message } from "antd";

const TopBox = () => {
  const snap = useSnapshot(state);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const stories = await WorkoutStoryService.getAllWorkoutStories();
        state.storyCards = stories;
      } catch (error) {
        console.error("Error fetching workout stories:", error);
        message.error("Failed to load workout stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (snap.activeIndex !== 1) {
    return null;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Workout Stories</h3>
      
      <div style={styles.storiesContainer}>
        {/* Create Story Card */}
        <div
          onClick={() => {
            state.createWorkoutStatusModalOpened = true;
          }}
          style={{
            ...styles.createCard,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isHovered ? '0 8px 24px rgba(25, 118, 210, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={styles.createIcon}>
            <PlusOutlined style={{ fontSize: '24px', color: '#1976d2' }} />
          </div>
          <div style={styles.createText}>Create Story</div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div style={styles.skeletonContainer}>
            {[...Array(4)].map((_, index) => (
              <Skeleton.Node 
                key={index} 
                active 
                style={{ 
                  width: 160, 
                  height: 240, 
                  borderRadius: 12,
                  marginRight: 16
                }} 
              />
            ))}
          </div>
        ) : (
          /* Story Cards */
          snap.storyCards?.map((card) => (
            <StoryCard key={card?.id} card={card} />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '16px',
    paddingLeft: '8px',
    borderLeft: '4px solid #1976d2',
  },
  storiesContainer: {
    display: 'flex',
    overflowX: 'auto',
    gap: '16px',
    paddingBottom: '8px',
    scrollbarWidth: 'none', // Firefox
    '::-webkit-scrollbar': {
      display: 'none', // Chrome/Safari
    },
  },
  createCard: {
    flexShrink: 0,
    width: '160px',
    height: '240px',
    borderRadius: '12px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    border: '1px dashed #1976d2',
  },
  createIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    transition: 'all 0.3s ease',
  },
  createText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1976d2',
  },
  skeletonContainer: {
    display: 'flex',
    gap: '16px',
  }
};

export default TopBox;