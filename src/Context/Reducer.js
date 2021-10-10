export const movieReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL":
      return { ...state, movies: action.payload };
    case "USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
