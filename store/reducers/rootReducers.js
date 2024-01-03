import { combineReducers } from "redux";
import customerReducer from "./customer";
import draftProjectReducer from "./draftProject";

const rootReducer = combineReducers({
  customer: customerReducer,
  draftProject: draftProjectReducer,
});

export default rootReducer;
