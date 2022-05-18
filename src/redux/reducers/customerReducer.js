import { CUSTOMERS_GET_START, CUSTOMERS_GET_SUCCES, CUSTOMERS_GET_ERROR,
    CUSTOMERS_POST_START, CUSTOMERS_POST_SUCCES, CUSTOMERS_POST_ERROR,
    CUSTOMERS_UPDATE_START, CUSTOMERS_UPDATE_SUCCES, CUSTOMERS_UPDATE_ERROR,
    CUSTOMERS_DELETE_START, CUSTOMERS_DELETE_SUCCES, CUSTOMERS_DELETE_ERROR
} from "../actions/customerAction";

const initialState = {
    getCustomers: false,
    postCustomers: false,
    updateCustomers: false,
    deleteCustomers: false,
    message: '',
    customers: [],
    customer: {}
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {

        // GET CASES
        case CUSTOMERS_GET_START: return {
            ...state,
            getCustomers: action.payload.getCustomers,
            message: action.payload.message,
        }

        case CUSTOMERS_GET_SUCCES: return {
            ...state,
            customers: action.payload.customers,
            getCustomers: action.payload.getCustomers,
            message: action.payload.message,
        }

        case CUSTOMERS_GET_ERROR: return {
            ...state,
            getCustomers: action.payload.getCustomers,
            message: action.payload.message,
        }

        // POST CASES
        case CUSTOMERS_POST_START: return {
            ...state,
            postCustomers: action.payload.postCustomers,
            message: action.payload.message,
        }

        case CUSTOMERS_POST_SUCCES: return {
            ...state,
            customers: [...state.customers, action.payload.customers],
            postCustomers: action.payload.postCustomers,
            message: action.payload.message,
        }

        case CUSTOMERS_POST_ERROR: return {
            ...state,
            postCustomers: action.payload.postCustomers,
            message: action.payload.message,
        }

        // UPDATE CASES
        case CUSTOMERS_UPDATE_START: return {
            ...state,
            updateCustomers: action.payload.updateCustomers,
            message: action.payload.message,
        }

        case CUSTOMERS_UPDATE_SUCCES: return {
            ...state,
            customers: [...state.customers.filter(item => item.id !== action.payload.customers.id), action.payload.customers],
            updateCustomers: action.payload.updateCustomers,
            message: action.payload.message,
        }

        case CUSTOMERS_UPDATE_ERROR: return {
            ...state,
            updateCustomers: action.payload.updateCustomers,
            message: action.payload.message,
        }

        // DELETE CASES
        case CUSTOMERS_DELETE_START: return {
            ...state,
            deleteCustomers: action.payload.deleteCustomers,
            message: action.payload.message,
        }

        case CUSTOMERS_DELETE_SUCCES:
         return {
            ...state,
            customers: [...state.customers.filter(item => item.id !== action.payload.customer.id)],
            deleteCustomers: action.payload.deleteCustomers,
            message: action.payload.message,
        }

        case CUSTOMERS_DELETE_ERROR: return {
            ...state,
            deleteCustomers: action.payload.deleteCustomers,
            message: action.payload.message,
        }

        default: return state;
    }
}

export default customerReducer;