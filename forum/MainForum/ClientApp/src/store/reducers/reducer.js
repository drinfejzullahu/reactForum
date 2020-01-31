import * as actions from "../actions/action";
import { filterList } from "../../methods";
//comments == posts
const initialStore = {
  comments: [],
  filtered: [],
  isLogedIn: false,
  showNavBar: true,
  users: [],
  rooms: [],
  email: ""
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case actions.GET_DATA:
      return {
        ...state,
        comments: action.data
      };
    case actions.FILTER_DATA:
      let filtered = null;
      // let filtered = state.comments.filter(c => {
      //   return c.name.indexOf(action.inp) !== -1;
      // });
      if (action.inp) {
        filtered = filterList(action.inp, state.comments);
      }
      // else {
      //   filtered = state.comments.slice(0, 15);
      // }
      return {
        ...state,
        filtered: filtered
      };
    case "LOGIN":
      return {
        ...state,
        isLogedIn: true,
        email: action.data.email
      };
    case "SHOWNAVBAR":
      return {
        ...state,
        showNavBar: true
      };
    case "HIDENAVBAR":
      return {
        ...state,
        showNavBar: false
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.data
      };

    case "GET_ROOMS":
      return {
        ...state,
        rooms: action.data
      };
    case "LOG_OUT":
      return {
        ...state,
        isLogedIn: false,
        email: ""
      };
    default: {
      return state;
    }
  }
};

export default reducer;
