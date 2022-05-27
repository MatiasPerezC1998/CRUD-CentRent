// Import de la configuración de JuanPedro (Teams)
import { getFormData, getItemFormData, getQueryString } from '../../config';

const url = 'https://localhost:7295/Car/';

export const CARS_GET_START = "CARS_GET_START";
export const CARS_GET_SUCCES = "CARS_GET_SUCCES";
export const CARS_GET_ERROR = "CARS_GET_ERROR";
export const carsData = () => (dispatch) => {

    dispatch({
        type: CARS_GET_START,
        payload: {
            getCars: false,
            message: 'Cargando coches'
        }
    });

    const getData = async () => {
        try {
            const res = await fetch(url + "getAll", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: CARS_GET_ERROR,
                    payload: {
                        getCars: false,
                        message: 'Error, no se pudieron cargar los coches'
                    }
                });
            } else {
                dispatch({
                    type: CARS_GET_SUCCES,
                    payload: {
                        cars: data,
                        getCars: true,
                        message: 'Coches cargados correctamente'
                    }
                });
            }

        } catch (error) {
            console.log("action error: " + error);
        }
    }
    getData();
}

export const CARS_POST_START = "CARS_POST_START";
export const CARS_POST_SUCCES = "CARS_POST_SUCCES";
export const CARS_POST_ERROR = "CARS_POST_ERROR";
export const carAdded = (registration, carTypeId) => (dispatch) => {

    dispatch({
        type: CARS_POST_START,
        payload: {
            postCars: false,
            message: 'Enviando coche'
        }
    });

    const postData = async () => {
        try {
            const res = await fetch(url + "create", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                body: getFormData({ registration: registration, carTypeId: carTypeId })
            });
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: CARS_POST_ERROR,
                    payload: {
                        postCars: false,
                        message: 'Error, no se pudo enviar el coche'
                    }
                });
            } else {
                dispatch({
                    type: CARS_POST_SUCCES,
                    payload: {
                        cars: data,
                        postCars: true,
                        message: 'Coche enviado correctamente'
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error);
        }
    }
    postData();
}

export const CARS_UPDATE_START = "CARS_UPDATE_START";
export const CARS_UPDATE_SUCCES = "CARS_UPDATE_SUCCES";
export const CARS_UPDATE_ERROR = "CARS_UPDATE_ERROR";
export const carUpdated = (id, registration, carTypeId) => (dispatch) => {

    dispatch({
        type: CARS_UPDATE_START,
        payload: {
            updateCars: false,
            message: 'Modificando coche'
        }
    });

    const updateData = async () => {
        try {
            const res = await fetch(url + 'update', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                body: getFormData({ id, registration, carTypeId })
            });
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: CARS_UPDATE_ERROR,
                    payload: {
                        updateCars: false,
                        message: 'Error, no se pudo modificar el coche'
                    }
                });
            } else {
                dispatch({
                    type: CARS_UPDATE_SUCCES,
                    payload: {
                        cars: data,
                        updateCars: true,
                        message: 'Coche modificado correctamente'
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error);
        }
    }
    updateData();
}

export const CARS_DELETE_START = "CARS_DELETE_START";
export const CARS_DELETE_SUCCES = "CARS_DELETE_SUCCES";
export const CARS_DELETE_ERROR = "CARS_DELETE_ERROR";
export const carDeleted = (id) => (dispatch) => {

    dispatch({
        type: CARS_DELETE_START,
        payload: {
            deleteCars: false,
            message: 'Eliminando coche'
        }
    });
    
    
    const deleteData = async () => {
        try {
            const res = await fetch(url + "delete", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                body: getFormData({ id: id }),
            });

            if (res.status !== 200)
            {
                dispatch({
                    type: CARS_DELETE_ERROR,
                    payload: {
                        deleteCars: false,
                        message: 'Error, no se pudo eliminar el coche'
                    }
                });
            } else {
                dispatch({
                    type: CARS_DELETE_SUCCES,
                    payload: {
                        car: { id },
                        deleteCars: true,
                        message: 'Coche eliminado correctamente'
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error)
        }
    }
    deleteData();
}