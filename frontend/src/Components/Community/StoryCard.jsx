import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import { Avatar, Tooltip } from "antd";
import { UserOutlined, PlayCircleOutlined } from "@ant-design/icons";

const StoryCard = ({ card }) => {
  const snap = useSnapshot(state);

  const handleClick = () => {
    state.selectedWorkoutStory = card;
    state.workoutStoryOpen = true;
  };

  const author = snap.users?.find(user => user.id === card.userId);

  return (
    <div 
      className="story-card"
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '160px',
        height: '240px',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      {/* Story Image with Gradient Overlay */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <img 
          src={card.image} 
          alt={card.title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.9)',
            transition: 'transform 0.5s ease'
          }}
        />
        
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
        }} />
        
        {/* Play Button */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          ':hover': {
            opacity: 1
          }
        }}>
          <PlayCircleOutlined 
            style={{ 
              fontSize: '40px',
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }} 
          />
        </div>
      </div>

      {/* Author Avatar */}
      <Tooltip title={author?.name || 'Unknown user'}>
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2px solid #ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 2,
          transition: 'transform 0.3s ease',
          ':hover': {
            transform: 'scale(1.1)'
          }
        }}>
          <Avatar 
            src={author?.image} 
            icon={<UserOutlined />} 
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      </Tooltip>

      {/* Story Title */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: 0,
        width: '100%',
        padding: '0 16px',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'center',
        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        zIndex: 1
      }}>
        {card.title}
      </div>

      {/* Online Status Indicator */}
      {author?.isOnline && (
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#52c41a',
          border: '2px solid #ffffff',
          zIndex: 3
        }} />
      )}
    </div>
  );
};

export default StoryCard;