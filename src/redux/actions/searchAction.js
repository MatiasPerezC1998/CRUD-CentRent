// Import de la configuración de JuanPedro (Teams)
import { getFormData, getItemFormData, getQueryString } from '../../config';

const url = 'https://localhost:7295/';

export const SEARCH_CUSTOMER_START = "SEARCH_CUSTOMER_START";
export const SEARCH_CUSTOMER_SUCCES = "SEARCH_CUSTOMER_SUCCES";
export const SEARCH_CUSTOMER_ERROR = "SEARCH_CUSTOMER_ERROR";
export const searchCustomer = (email) => (dispatch) => {

    dispatch({
        type: SEARCH_CUSTOMER_START,
        payload: {
            customerSearch: true,
            customerFound: false,
            message: 'Buscando cliente'
        }
    });

    const getCustomerData = async () => {
        try {
            const res = await fetch(url + `Customer/Email/${email}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: SEARCH_CUSTOMER_ERROR,
                    payload: {
                        customerSearch: false,
                        customerFound: false,
                        message: 'Error, no se pudo encontrar el cliente'
                    }
                });
            } else {
                dispatch({
                    type: SEARCH_CUSTOMER_SUCCES,
                    payload: {
                        customer: data,
                        customerSearch: false,
                        customerFound: true,
                        message: 'Cliente encontrado correctamente'
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error);
        }
    }
    getCustomerData();
}

export const SEARCH_CAR_START = "SEARCH_CAR_START";
export const SEARCH_CAR_SUCCES = "SEARCH_CAR_SUCCES";
export const SEARCH_CAR_ERROR = "SEARCH_CAR_ERROR";
export const searchCar = (registration) => (dispatch) => {

    dispatch({
        type: SEARCH_CAR_START,
        payload: {
            carSearch: true,
            carFound: false,
            message: 'Buscando coche'
        }
    });

    const getCarData = async () => {
        try {
            const res = await fetch(url + `Car/Registration/${registration}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: SEARCH_CAR_ERROR,
                    payload: {
                        carSearch: false,
                        carFound: false,
                        message: 'Error, no se pudo encontrar el coche'
                    }
                });
            } else {
                dispatch({
                    type: SEARCH_CAR_SUCCES,
                    payload: {
                        car: data,
                        carSearch: false,
                        carFound: true,
                        message: 'Coche encontrado correctamente'
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error);
        }
    }
    getCarData();
}