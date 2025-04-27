import React, { useEffect, useState } from "react";
import "../Styles/Header.css";
import "../Styles/navbar.css";
import Header from "../Components/Home/Header";
import UserService from "../Services/UserService";
import state from "../Utils/Store";
import { Spin, message } from "antd";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserFetched, setIsUserFetched] = useState(false);

  useEffect(() => {
    console.log('[Home] Component mounted');

    const userId = localStorage.getItem("userId");
    if (userId) {
      console.log('[Home] userId found, fetching user profile...');
      fetchUserProfile();
    } else {
      console.log('[Home] No userId found in localStorage, user not logged in');
      setLoading(false); // No user to fetch, stop the loading spinner
    }

    // Check all localStorage items for debugging purposes
    logLocalStorage();

    return () => {
      console.log('[Home] Component unmounting');
    };
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userData = await UserService.getProfile();
      console.log('[Home] User profile fetched successfully:', userData);
      state.currentUser = userData;
      setIsUserFetched(true);
    } catch (err) {
      console.error('[Home] Error fetching user profile:', err);
      setError("Failed to fetch user profile. Please try again later.");
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  const logLocalStorage = () => {
    console.log('[Home] All localStorage items:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = key.includes('token') ? 'EXISTS (not shown for security)' : localStorage.getItem(key);
      console.log(`[Home] ${key}: ${value}`);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="large" />
        <p style={styles.loadingText}>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>{error}</p>
      </div>
    );
  }

  console.log('[Home] Rendering component');

  return (
    <div style={styles.container}>
      <Header />
      {isUserFetched && (
        <div style={styles.userGreetingContainer}>
          <div style={styles.userGreeting}>
            Welcome, {state.currentUser?.name}!
          </div>
        </div>
      )}
    </div>
  );
};

// Improved styles object for advanced visual enhancements
const styles = {
  container: {
    position: 'relative',
    width: '100%',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    backgroundColor: '#f0f2f5',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#1890ff',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
  },
  errorText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  userGreetingContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 10,
  },
  userGreeting: {
    padding: '15px 25px',
    backgroundColor: 'rgba(46, 204, 113, 0.9)',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    animation: 'fadeIn 0.5s ease-out',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
};

export default Home;
