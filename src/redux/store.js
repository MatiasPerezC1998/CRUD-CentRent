import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; //instalar
import thunk from "redux-thunk"; //instalar

import loginReducer from "./reducers/loginReducer";
import registerReducer from "./reducers/registerReducer";
import carReducer from "./reducers/carReducer";
import customerReducer from "./reducers/customerReducer";
import searchReducer from "./reducers/searchReducer";

const reducer = combineReducers({
    loginReducer,
    registerReducer,
    carReducer,
    customerReducer,
    searchReducer,
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk))
);

console.log(store.getState());

export default store;