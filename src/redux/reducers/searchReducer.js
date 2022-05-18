import { SEARCH_CUSTOMER_START, SEARCH_CUSTOMER_SUCCES, SEARCH_CUSTOMER_ERROR,
    SEARCH_CAR_START, SEARCH_CAR_SUCCES, SEARCH_CAR_ERROR
} from "../actions/searchAction";

const initialState = {
    customerSearch: false,
    customerFound: false,
    carSearch: false,
    carFound: false,
    message: '',
    customer: [],
    car: [],
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {

        // SEARCH CUSTOMER CASES
        case SEARCH_CUSTOMER_START: return {
            ...state,
            customerSearch: action.payload.customerSearch,
            customerFound: action.payload.customerFound,
            message: action.payload.message
        }

        case SEARCH_CUSTOMER_SUCCES: return {
            ...state,
            customer: action.payload.customer,
            customerSearch: action.payload.customerSearch,
            customerFound: action.payload.customerFound,
            message: action.payload.message
        }

        case SEARCH_CUSTOMER_ERROR: return {
            ...state,
            customerSearch: action.payload.customerSearch,
            customerFound: action.payload.customerFound,
            message: action.payload.message
        }

        // SEARCH CAR CASES
        case SEARCH_CAR_START: return {
            ...state,
            carSearch: action.payload.carSearch,
            carFound: action.payload.carFound,
            message: action.payload.message
        }

        case SEARCH_CAR_SUCCES: return {
            ...state,
            car: action.payload.car,
            carSearch: action.payload.carSearch,
            carFound: action.payload.carFound,
            message: action.payload.message
        }

        case SEARCH_CAR_ERROR: return {
            ...state,
            carSearch: action.payload.carSearch,
            carFound: action.payload.carFound,
            message: action.payload.message
        }

        default: return state;
    }
}

export default searchReducer;