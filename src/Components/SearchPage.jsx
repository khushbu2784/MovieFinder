import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

function SearchPage() {
  const [searchInput, setSearchInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // ⬅️ For page load

  // Show loading spinner on initial load (like welcome page)
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setErrors('');
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchInput}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setErrors('No movies found');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
      setErrors('Something went wrong. Please try again later.');
    }
    setLoading(false);
  };

  // Show full screen spinner on first load
  if (initialLoading) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-blue-800 via-pink-700 to-purple-600 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className='p-4 min-h-screen bg-gradient-to-br from-blue-800 via-pink-700 to-purple-600'>
      <h2 className='text-3xl mb-4 text-center text-white'>Search Movie</h2>

      <div className='flex justify-center gap-2'>
        <input
          className='border rounded px-4 py-2 w-1/2'
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder='Search for a movie'
        />
        <button
          onClick={fetchMovies}
          className='bg-blue-500 text-white px-4 py-2 font-bold rounded hover:bg-blue-600'
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-center text-white text-lg mt-44 animate-pulse">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white mx-auto"></div>
        </div>
      )}

      {errors && (
        <p className="text-rose-300/90 text-center mt-44 text-6xl font-bold">{errors}</p>
      )}

      {!loading && !movies.length && !errors && (
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-slate-300/55 text-center mt-44 text-6xl font-bold">
          Start by searching for a movie above.
        </motion.p>
      )}

      <div className='mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white/75 rounded shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.png"}
              className="w-full h-80 object-cover mb-4 rounded"
              alt={movie.Title}
            />
            <h3 className="text-lg font-bold">{movie.Title}</h3>
            <p className="text-gray-900 text-2xl">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
