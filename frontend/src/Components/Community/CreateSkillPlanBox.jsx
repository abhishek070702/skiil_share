import React from "react";
import { useSnapshot } from "valtio";
import { motion, AnimatePresence } from "framer-motion";
import state from "../../Utils/Store";
import { FiPlusCircle, FiEdit3 } from "react-icons/fi";
import { FaMagic, FaRocket } from "react-icons/fa";

const CreateSkillPlanBox = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { type: "spring", damping: 10, stiffness: 100 }
        }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.98 }}
        className="skill-plan-box"
        onClick={() => {
          state.createSkillPlanOpened = true;
        }}
      >
        <div className="flex items-center gap-4 p-6">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-lg"
          >
            <FiPlusCircle className="w-6 h-6" />
          </motion.div>

          <div className="flex-1">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium text-blue-500 mb-2"
            >
              Create new skill plan
            </motion.div>
            <input
              type="text"
              placeholder={`What skills are you planning to learn, ${snap.currentUser?.username || "User"}?`}
              className="w-full bg-gray-50 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer placeholder-gray-400 transition-all duration-200 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-blue-400"
              readOnly
            />
          </div>
        </div>

        <div className="px-6 pb-4 flex items-center justify-between text-xs text-gray-500">
          <motion.div 
            whileHover={{ x: 3 }}
            className="flex items-center space-x-2"
          >
            <FaMagic className="text-purple-400" />
            <span>AI-powered suggestions</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ x: -3 }}
            className="flex items-center space-x-2"
          >
            <FaRocket className="text-orange-400" />
            <span>Track your progress</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateSkillPlanBox;