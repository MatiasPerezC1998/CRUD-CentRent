import { SEARCH_GET_START, SEARCH_GET_SUCCES, SEARCH_GET_ERROR } from "../actions/searchAction";

const initialState = {
    loadSearch: false,
    searched: false,
    message: '',
    customer: [],
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {

        // GET CASES
        case SEARCH_GET_START: return {
            ...state,
            loadSearch: action.payload.loadSearch,
            searched: action.payload.searched,
            message: action.payload.searched
        }

        case SEARCH_GET_SUCCES: return {
            ...state,
            customer: action.payload.customer,
            loadSearch: action.payload.loadSearch,
            searched: action.payload.searched,
            message: action.payload.message
        }

        case SEARCH_GET_ERROR: return {
            ...state,
            loadSearch: action.payload.loadSearch,
            searched: action.payload.searched,
            message: action.payload.message,
        }

        default: return state;
    }
}

export default searchReducer;