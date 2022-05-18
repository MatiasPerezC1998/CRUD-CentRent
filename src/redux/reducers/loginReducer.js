import { LOGIN_START, LOGIN_SUCCES, LOGIN_ERROR, LOGOUT } from "../actions/loginAction";

const initialState = {
    loadLogin: false,
    logged: false,
    message: '',
    users: [],
    token: localStorage.getItem('token') || null,

}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case LOGIN_START: return {            
            ...state,
            loadLogin: action.payload.loadLogin,
            logged: action.payload.logged,
            message: action.payload.message,
        }

        case LOGIN_SUCCES: return {
            ...state,
            loadLogin: action.payload.loadLogin,
            logged: action.payload.logged,
            message: action.payload.message,
            token: action.payload.token,
            users: action.payload.users,
        }

        case LOGIN_ERROR: return {
            ...state,
            loadLogin: action.payload.loadLogin,
            logged: action.payload.logged,
            message: action.payload.message,
            users: action.payload.users
        }

        case LOGOUT: return {
            ...state,
            logged: action.payload.logged,
            message: action.payload.logged,
            token: action.payload.token,
            users: action.payload.users
        }

        default: return state;
    }
}

export default loginReducer;