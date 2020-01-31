import React, { useEffect } from "react";
import NavBar from "./components/nav/NavBar";
import MainPage from "./components/mainpage/MainPage";
import Login from "./components/auth/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import Question from "./components/question/Question";
import Profile from "./components/profile/Profile";
import SignUp from "./components/auth/SignUp";
import Room from "./components/room/Room";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./store/actions/action";
import UniqueRoom from "./components/room/UniqueRoom";
import AdminMainPage from "./components/admin/AdminMainPage";

function App() {
  const showNavBar = useSelector(state => state.showNavBar);
  const dispatch = useDispatch();
  const email = useSelector(state => state.email);

  useEffect(() => {
    dispatch(actions.showNavBar());
    dispatch(actions.getFromLocalStorage());
  }, []);

  console.log(email);

  return (
    <div className="App">
      {showNavBar ? <NavBar /> : null}
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route
          path="/admin"
          exact
          render={() =>
            email === "admin@drini.adrian" ? (
              <AdminMainPage />
            ) : (
              <h1>Ku je nis?</h1>
            )
          }
        />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route
          path="/askaquestion"
          exact
          render={() =>
            email === "" ? <Redirect to="/login" /> : <Question />
          }
        />
        <Route
          path="/my-profile"
          exact
          render={() => (email === "" ? <Redirect to="/login" /> : <Profile />)}
        />
        <Route path="/rooms" exact component={Room} />
        <Route path="/room/:id" component={UniqueRoom} />
      </Switch>
    </div>
  );
}

export default App;
