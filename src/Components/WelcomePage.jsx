import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-green-200 flex flex-col justify-center items-center px-4'>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 text-[#B03052] font-sans font-bold hover:text-[#9f2b4a]'
      >
        Welcome to MovieFinder!
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={() => navigate('/search')}
        className="py-3 px-5 sm:py-4 sm:px-6 text-sm sm:text-base md:text-lg rounded-full font-bold border-0 bg-[#E69DB8] text-[#3D0301] hover:bg-pink-600 hover:text-white hover:scale-105 transition duration-300"
      >
        Search for Movies
      </motion.button>
    </div>
  );
};

export default WelcomePage;
