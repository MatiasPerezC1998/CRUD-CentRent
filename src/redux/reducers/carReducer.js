import { CARS_GET_START, CARS_GET_SUCCES, CARS_GET_ERROR,
    CARS_POST_START, CARS_POST_SUCCES, CARS_POST_ERROR,
    CARS_UPDATE_START, CARS_UPDATE_SUCCES, CARS_UPDATE_ERROR,
    CARS_DELETE_START, CARS_DELETE_SUCCES, CARS_DELETE_ERROR,
    IMAGE_POST_START, IMAGE_POST_SUCCES, IMAGE_POST_ERROR
} from "../actions/carAction";

const initialState = {
    getCars: false,
    postCars: false,
    updateCars: false,
    deleteCars: false,
    getImage: false,
    postImage: false,
    carMessage: '',
    imageMessage: '',
    image: {},
    cars: [],
    car: {}
}

const carReducer = (state = initialState, action) => {
    switch (action.type) {

        // CAR GET CASES
        case CARS_GET_START: return {
            ...state,
            getCars: action.payload.getCars,
            carMessage: action.payload.message,
        }

        case CARS_GET_SUCCES: return {
            ...state,
            cars: action.payload.cars,
            getCars: action.payload.getCars,
            carMessage: action.payload.message,
        }

        case CARS_GET_ERROR: return {
            ...state,
            getCars: action.payload.getCars,
            carMessage: action.payload.message,
        }

        // CAR POST CASES
        case CARS_POST_START: return {
            ...state,
            postCars: action.payload.postCars,
            carMessage: action.payload.message,
        }

        case CARS_POST_SUCCES: return {
            ...state,
            cars: [...state.cars, action.payload.cars],
            postCars: action.payload.postCars,
            carMessage: action.payload.message,
        }

        case CARS_POST_ERROR: return {
            ...state,
            postCars: action.payload.postCars,
            carMessage: action.payload.message,
        }

        // CAR UPDATE CASES
        case CARS_UPDATE_START: return {
            ...state,
            updateCars: action.payload.updateCars,
            carMessage: action.payload.message,
        }

        case CARS_UPDATE_SUCCES: return {
            ...state,
            cars: [...state.cars.filter(item => item.id !== action.payload.cars.id), action.payload.cars],
            updateCars: action.payload.updateCars,
            carMessage: action.payload.message,
        }

        case CARS_UPDATE_ERROR: return {
            ...state,
            updateCars: action.payload.updateCars,
            carMessage: action.payload.message,
        }

        // CAR DELETE CASES
        case CARS_DELETE_START: return {
            ...state,
            deleteCars: action.payload.deleteCars,
            carMessage: action.payload.message,
        }

        case CARS_DELETE_SUCCES: return {
            ...state,
            cars: [...state.cars.filter(item => item.id !== action.payload.car.id)],
            deleteCars: action.payload.deleteCars,
            carMessage: action.payload.message,
        }

        case CARS_DELETE_ERROR: return {
            ...state,
            deleteCars: action.payload.deleteCars,
            carMessage: action.payload.message,
        }

        default: return state;
    }
}

export default carReducer;