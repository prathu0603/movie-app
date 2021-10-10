import React, { createContext, useReducer, useContext } from "react";
import { movieReducer } from "./Reducer";

const Movie = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : false,
    movies: localStorage.getItem("movies")
      ? JSON.parse(localStorage.getItem("movies"))
      : [],
  });

  return (
    <Movie.Provider value={{ state, dispatch }}>{children}</Movie.Provider>
  );
};

export const MovieState = () => {
  return useContext(Movie);
};

export default Context;
