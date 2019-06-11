import { combineReducers } from "redux";

import { toastReducer as toast } from "react-native-redux-toast";
import { reducer as auth } from "./auth";
import { reducer as lists } from "./lists";
import { reducer as books } from "./books";

export default combineReducers({
  auth,
  lists,
  books,
  toast
});
