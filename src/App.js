import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signin from "./Components/User/Signin";
import Signup from "./Components/User/Signup";
import Home from "./Components/Home/Home";
import MovieDetails from "./Components/Home/MovieDetails";
import Popular from "./Components/Movies/Popular";
import Latest from "./Components/Movies/Latest";
import Favourite from "./Components/Movies/Favourite";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/discover/popular" component={Popular} />
          <Route exact path="/discover/latest" component={Latest} />
          <Route exact path="/discover/favourites" component={Favourite} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
