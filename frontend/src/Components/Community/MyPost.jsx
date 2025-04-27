import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";

const MyPost = () => {
  const snap = useSnapshot(state);
  
  return (
    <div
      onClick={() => {
        state.createPostModalOpened = true;
      }}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        padding: '16px',
        marginBottom: '20px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        }
      }}
    >
      {/* Gradient accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        background: 'linear-gradient(to bottom, #64B5F6, #1E88E5)',
        borderRadius: '4px 0 0 4px'
      }}></div>
      
      {/* Main content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '12px'
      }}>
        {/* Icon with pulse animation */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'rgba(100, 181, 246, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '16px',
          color: '#1E88E5',
          fontSize: '20px',
          animation: 'pulse 2s infinite'
        }}>
          <i className="fas fa-edit"></i>
        </div>
        
        {/* Text content */}
        <div>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '4px'
          }}>Create a new post</div>
          <div style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.4'
          }}>Share your thoughts, skills or questions with the community</div>
        </div>
      </div>
      
      {/* Hover overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(100, 181, 246, 0.05)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        ':hover': {
          opacity: 1
        }
      }}></div>

      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default MyPost;