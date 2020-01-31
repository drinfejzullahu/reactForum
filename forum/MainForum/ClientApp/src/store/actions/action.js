import axios from "axios";

export const GET_DATA = "GET_DATA";
export const FILTER_DATA = "FILTER_DATA";

export const getData = data => {
  return {
    type: GET_DATA,
    data: data
  };
};

export const getFromLocalStorage = () => {
  return dispatch => {
    const email = JSON.parse(localStorage.getItem("email"));
    const data = { email: email };
    if (email !== null) {
      dispatch(logIn(data));
    }
  };
};

export const logOutAction = () => {
  return {
    type: "LOG_OUT"
  };
};

export const logOut = () => {
  return dispatch => {
    localStorage.clear();
    dispatch(logOutAction());
  };
};

export const getDataAsync = () => {
  return dispatch => {
    let comments = null;
    axios
      .get("/api/post")
      .then(res => {
        comments = res.data;

        dispatch(getData(comments));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getUsers = data => {
  return {
    type: "GET_USERS",
    data: data
  };
};

export const getUsersAsync = () => {
  return dispatch => {
    axios
      .get("/api/user")
      .then(res => {
        let users = res.data;
        dispatch(getUsers(users));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getRooms = data => {
  return {
    type: "GET_ROOMS",
    data: data
  };
};

export const getRoomsAsync = () => {
  return dispatch => {
    axios
      .get("/api/room")
      .then(res => {
        let rooms = res.data;
        dispatch(getRooms(rooms));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const logIn = data => {
  return {
    type: "LOGIN",
    data: data
  };
};

export const logInAction = data => {
  return dispatch => {
    localStorage.setItem("email", JSON.stringify(data.email));
    dispatch(logIn(data));
  };
};

export const showNavBar = () => {
  return {
    type: "SHOWNAVBAR"
  };
};

export const hideNavBar = () => {
  return {
    type: "HIDENAVBAR"
  };
};

export const inputSearchData = inp => {
  return {
    type: FILTER_DATA,
    inp: inp
  };
};
