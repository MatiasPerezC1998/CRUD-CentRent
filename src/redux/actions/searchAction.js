// Import de la configuración de JuanPedro (Teams)
import { getFormData, getItemFormData, getQueryString } from '../../config';

const url = 'https://localhost:7295/Customer/';

export const SEARCH_GET_START = "SEARCH_GET_START";
export const SEARCH_GET_SUCCES = "SEARCH_GET_SUCCES";
export const SEARCH_GET_ERROR = "SEARCH_GET_ERROR";
export const searchCustomer = (email) => (dispatch) => {

    dispatch({
        type: SEARCH_GET_START,
        payload: {
            loadSearch: true,
            searched: false,
            message: 'Buscando cliente'
        }
    });

    const getData = async () => {
        try {
            const res = await fetch(url + `Email/${email}`);
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: SEARCH_GET_ERROR,
                    payload: {
                        loadSearch: false,
                        searched: false,
                        message: 'Error, no se pudo encontrar al cliente'
                    }
                });
            } else {
                dispatch({
                    type: SEARCH_GET_SUCCES,
                    payload: {
                        customer: data,
                        loadSearch: false,
                        searched: true,
                        message: 'Cliente encontrado correctamente'
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error);
        }
    }
    getData();
}