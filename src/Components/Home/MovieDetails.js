import React, { useEffect, useState } from "react";
import "./details.css";
import { useParams } from "react-router-dom";

import Navbar from "./../Navbar/Navbar";

import { MovieState } from "../../Context/MovieProvider";

import { api } from "../../api";
import { Alert } from "react-bootstrap";

import load from "./../../Assets/1480.gif";

const MovieDetails = () => {
  const {
    state: { user, movies },
    dispatch,
  } = MovieState();

  const [message, setMessage] = useState("");
  const [showFav, setShowFav] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const movieDetail = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e46d5ba175a6d09d100586166d6ca8ac`
      );
      const data = await res.json();
      setMovie(data);
    };
    movieDetail();
  }, []);

  useEffect(() => {
    const FavBtn = () => {
      movies.map((movieId) => {
        if (movieId == id) {
          console.log("match");
          return setShowFav(false);
        }
      });
      // setShowFav(true);
      // console.log("unmatch");
    };
    FavBtn();
  }, [movies]);

  const addFavourite = async () => {
    setMessage("");
    try {
      const res = await fetch(`${api}/favourite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          movieId: id,
        }),
      });
      if (res.status === 404) {
        setMessage("No User Found");
      } else if (res.status === 200) {
        const data = await res.json();
        await localStorage.setItem("movies", JSON.stringify(data.user.movies));
        await dispatch({
          type: "INITIAL",
          payload: JSON.parse(localStorage.getItem("movies")),
        });
        setMessage("Movie Added To Favourite List");
      } else if (res.status === 500) {
        setMessage("Server Error");
      }
    } catch (error) {
      setMessage("Server Error, Try Again");
    }
  };

  return (
    <div className="movieDetails_wraper">
      <Navbar />
      {message && <Alert variant="primary">{message}</Alert>}
      <div className="movieDetails">
        {movie ? (
          <>
            <div className="movieDetails_poster">
              <img
                src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
              />
              <div className="movieDetails_info">
                <h3>{movie.original_title}</h3>
                <p>{movie.overview}</p>
              </div>
              {user && showFav && (
                <button
                  className="btn btn-primary favourite_btn"
                  onClick={addFavourite}
                >
                  Add Favourite
                </button>
              )}
            </div>

            <div className="movieDetails_bottom">
              <h3>Movie Info</h3>
              <div className="movieDetails_full">
                <p>
                  <span>Title</span> : {movie.original_title}
                </p>
                <p>
                  <span>Runtime</span> : {movie.runtime} min.
                </p>
                <p>
                  <span>Rating</span> : {movie.vote_average} / 10
                </p>
                <p>
                  <span>Release-date</span> : {movie.release_date}
                </p>
                <p>
                  <span>Status</span> : {movie.status}
                </p>
                <p>
                  <span>Tagline</span> : {movie.tagline ? movie.tagline : "N/A"}
                </p>
                <p>
                  <span>Revenue</span> : {movie.revenue}
                </p>
              </div>
            </div>
          </>
        ) : (
          <img src={load} />
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
