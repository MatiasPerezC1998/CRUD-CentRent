import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; //instalar
import thunk from "redux-thunk"; //instalar

import loginReducer from "./reducers/loginReducer";
import registerReducer from "./reducers/registerReducer";
import customerReducer from "./reducers/customerReducer";
import carReducer from "./reducers/carReducer";
import carTypeReducer from "./reducers/carTypeReducer";
import searchReducer from "./reducers/searchReducer";

const reducer = combineReducers({
    loginReducer,
    registerReducer,
    customerReducer,
    carReducer,
    carTypeReducer,
    searchReducer,
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk))
);

console.log(store.getState());

export default store;