import { combineReducers } from "redux";
import customerReducer from "./customer";
import customerDataReducer from "./customerData";
import draftProjectReducer from "./draftProject";

const rootReducer = combineReducers({
  customer: customerReducer,
  customerData: customerDataReducer,
  draftProject: draftProjectReducer,
});

export default rootReducer;
