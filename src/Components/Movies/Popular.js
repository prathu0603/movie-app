import React, { useEffect, useState } from "react";
import "./movie.css";

import Navbar from "./../Navbar/Navbar";
import { useHistory } from "react-router-dom";

const Popular = () => {
  const history = useHistory();
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const discoverApi = `https://api.themoviedb.org/3/movie/popular?api_key=e46d5ba175a6d09d100586166d6ca8ac&page=1`;
    fetchMovies(discoverApi);
  }, []);

  const fetchMovies = async (path) => {
    const res = await fetch(path);
    const data = await res.json();
    setMovieData([...movieData, ...data.results]);
    setCurrentPage(data.page);
  };
  const nextPage = () => {
    const discoverApi = `https://api.themoviedb.org/3/movie/popular?api_key=e46d5ba175a6d09d100586166d6ca8ac&page=${
      currentPage + 1
    }`;
    fetchMovies(discoverApi);
  };
  return (
    <div className="movie_page">
      <Navbar />
      <div className="homepage_title">Popular Movies</div>
      <div className="moviecard_wraper">
        {movieData &&
          movieData.map((movie) => (
            <div className="movie_card">
              <div className="movie_poster">
                <img
                  src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                />
              </div>
              <div className="movie_details">
                <h3 onClick={() => history.push(`/movie/${movie.id}`)}>
                  {movie.title}
                </h3>
                <p className="movie_details_overview">{movie.overview}</p>
                <div className="movie_details_bottom">
                  <span className="movie_details_date">
                    {movie.release_date}
                  </span>
                  <span className="movie_details_rating">
                    {movie.vote_average}
                  </span>
                </div>
              </div>
            </div>
          ))}
        <button className="btn btn-danger loadmore_btn" onClick={nextPage}>
          Load More Movies....
        </button>
      </div>
    </div>
  );
};

export default Popular;
