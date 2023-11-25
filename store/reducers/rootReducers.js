import { combineReducers } from "redux";
import userReducer from "./user";
import draftProjectReducer from "./draftProject";

const rootReducer = combineReducers({
  user: userReducer,
  draftProject: draftProjectReducer,
});

export default rootReducer;
