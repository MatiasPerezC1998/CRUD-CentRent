import { REGISTER_START, REGISTER_SUCCES, REGISTER_ERROR } from "../actions/registerAction";

const initialState = {
    loadRegister: false,
    registered: false,
    message: '',
    users: []
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_START: return {
            ...state,
            loadRegister: action.payload.loadRegister,
            registered: action.payload.registered,
            message: action.payload.message,
        }

        case REGISTER_SUCCES: return {
            ...state,
            loadRegister: action.payload.loadRegister,
            registered: action.payload.registered,
            message: action.payload.message,
            users: action.payload.users,
        }

        case REGISTER_ERROR: return {
            ...state,
            loadRegister: action.payload.loadRegister,
            registered: action.payload.registerError,
            message: action.payload.message,
        }

        default: return state;
    }
}

export default registerReducer;