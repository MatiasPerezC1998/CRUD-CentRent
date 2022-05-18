// Import de la configuración de JuanPedro (Teams)
import { getFormData, getItemFormData, getQueryString } from '../../config';

const url = 'https://localhost:7295/Customer/';

export const CUSTOMERS_GET_START = "CUSTOMERS_GET_START";
export const CUSTOMERS_GET_SUCCES = "CUSTOMERS_GET_SUCCES";
export const CUSTOMERS_GET_ERROR = "CUSTOMERS_GET_ERROR";
export const customersData = () => (dispatch) => {
    
    dispatch({
        type: CUSTOMERS_GET_START,
        payload: {
            getCustomers: false,
            message: 'Cargando clientes'
        }
    });

    const getData = async () => {
        try {
            const res = await fetch(url + "getAll");
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: CUSTOMERS_GET_ERROR,
                    payload: {
                        getCustomers: false,
                        message: 'Error, no se pudieron cargar los clientes'
                    }
                });
            } else {
                dispatch({
                    type: CUSTOMERS_GET_SUCCES,
                    payload: {
                        customers: data,
                        getCustomers: true,
                        message: 'Clientes cargados correctamente'
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error)
        }
    }
    getData();
}

export const CUSTOMERS_POST_START = "CUSTOMERS_POST_START";
export const CUSTOMERS_POST_SUCCES = "CUSTOMERS_POST_SUCCES";
export const CUSTOMERS_POST_ERROR = "CUSTOMERS_POST_ERROR";
export const  customerAdded = (name, surname, email, phone, dni, carRentedId) => (dispatch) => {

    dispatch({
        type: CUSTOMERS_POST_START,
        payload: {
            postCustomers: false,
            message: 'Enviando cliente'
        }
    });

    const postData = async () => {
        try {
            const res = await fetch (url + "create", {
                method: 'POST',
                // headers: {
                //     'Accept': 'multipart/form-data',
                //     'Content-Type': 'application/json'
                // },
                body: getFormData({ name: name, surname: surname, email: email, phone: phone, dni: dni, carRentedId: carRentedId })
            });
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: CUSTOMERS_POST_ERROR,
                    payload: {
                        postCustomers: false,
                        message: 'Error, no se pudo enviar el cliente'
                    }
                });
            } else {
                dispatch({
                    type: CUSTOMERS_POST_SUCCES,
                    payload: {
                        customers: data,
                        postCustomers: true,
                        message: 'Cliente enviado correctamente'
                    }
                });
            }

            
            
        } catch (error) {
            console.log("action error: " + error);
        }
    }
    postData();
}

export const CUSTOMERS_UPDATE_START = "CUSTOMERS_UPDATE_START";
export const CUSTOMERS_UPDATE_SUCCES = "CUSTOMERS_UPDATE_SUCCES";
export const CUSTOMERS_UPDATE_ERROR = "CUSTOMERS_UPDATE_ERROR";
export const customerUpdated = (id, name, surname, email, phone, dni, carRentedId) => (dispatch) => {
    
    dispatch({
        type: CUSTOMERS_UPDATE_START,
        payload: {
            updateCustomers: false,
            message: 'Modificando cliente'
        }
    });

    const updateData = async () => {
        try {
            const res = await fetch(url + 'update', {
                method: 'POST',
                body: getFormData({ id, name, surname, email, phone, dni, carRentedId })
            });
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: CUSTOMERS_UPDATE_ERROR,
                    payload: {
                        updateCustomers: false,
                        message: 'Error, no se pudo modificar el cliente'
                    }
                });
            } else {
                dispatch({
                    type: CUSTOMERS_UPDATE_SUCCES,
                    payload: {
                        customers: data,
                        updateCustomers: true,
                        message: 'Cliente modificado correctamente'
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error);
        }
    }
    updateData();
}

export const CUSTOMERS_DELETE_START = "CUSTOMERS_DELETE_START";
export const CUSTOMERS_DELETE_SUCCES = "CUSTOMERS_DELETE_SUCCES";
export const CUSTOMERS_DELETE_ERROR = "CUSTOMERS_DELETE_ERROR";
export const customerDeleted = (id) => (dispatch) => {
    
    dispatch({
        type: CUSTOMERS_DELETE_START,
        payload: {
            deleteCustomers: false,
            message: 'Eliminando cliente'
        }
    });
    
    const deleteData = async () => {
        try {
            const res = await fetch(url + "delete", {
                method: 'POST',
                body: getFormData({ id: id }),
            });

            if (res.status !== 200)
            {
                dispatch({
                    type: CUSTOMERS_DELETE_ERROR,
                    payload: {
                        deleteCustomers: false,
                        message: 'Error, no se pudo eliminar al cliente'
                    }
                });
            } else {
                dispatch({
                    type: CUSTOMERS_DELETE_SUCCES,
                    payload: {
                        customer: {id},
                        deleteCustomers: true,
                        message: 'Cliente eliminado correctamente'
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error);
        }
    }
    deleteData();
}