import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import UserService from "../../Services/UserService";
import { BASE_URL } from "../../constants";
import state from "../../Utils/Store";

const CommentCard = ({ comment }) => {
  const [userData, setUserData] = useState();

  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const result = await UserService.getProfileById(comment.userId);
      const result2 = await axios.get(
        `${BASE_URL}/users/${result.userId}`,
        config
      );
      setUserData({ ...result2.data, ...result });
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, [comment.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300 max-w-2xl mx-auto"
    >
      {userData && (
        <div className="flex items-start space-x-4">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              <img
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                src={userData.image}
                alt={userData.username}
                onClick={() => {
                  state.selectedUserProfile = userData;
                  state.friendProfileModalOpened = true;
                }}
              />
            </motion.div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {userData.username || "User"}
              </h3>
              {comment.createdAt && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              )}
            </div>
            <p className="mt-1 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {comment.commentText}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CommentCard;