import React, { useEffect, useState } from "react";
import "./movie.css";

import Navbar from "./../Navbar/Navbar";
import { useHistory } from "react-router-dom";

import { MovieState } from "../../Context/MovieProvider";

const Favourite = () => {
  const {
    state: { movies },
  } = MovieState();

  const history = useHistory();
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const renderMovies = async () => {
      movies.map(async (movieId) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=e46d5ba175a6d09d100586166d6ca8ac`
        );
        const data = await res.json();
        setMovieData((movieData) => [...movieData, data]);
      });
    };
    renderMovies();
  }, []);
  console.log(movieData);
  return (
    <div className="movie_page">
      <Navbar />
      <div className="homepage_title">Favourite Movies</div>
      <div className="moviecard_wraper">
        {movieData.length > 0 ? (
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
          ))
        ) : (
          <h3 style={{ color: "skyblue", marginTop: "1rem" }}>
            Add Some Movies To Favourite List :)
          </h3>
        )}
      </div>
    </div>
  );
};

export default Favourite;
