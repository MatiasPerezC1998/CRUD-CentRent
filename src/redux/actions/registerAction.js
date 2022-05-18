// Import de la configuración de JuanPedro (Teams)
import { getFormData, getItemFormData, getQueryString } from '../../config';

const url = 'https://localhost:7295/User/Register';

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCES = "REGISTER_SUCCES";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const register = (firstName, lastName, email, username, password) => (dispatch) => {
    
    dispatch({
        type: REGISTER_START,
        payload: {
            loadRegister: true,
            registered: false,
            message: 'Registrando usuario'
        }
    });

    const postData = async () => {
        try {
            const res = await fetch(url, {
                method: 'POST',
                // headers: {
                //     'Accept': 'multipart/form-data',
                //     'Content-Type': 'application/json'
                // },
                body: getFormData({firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: username,
                    password: password})
            });
            const data = await res.json();

            if (res.status !== 200)
            {
                dispatch({
                    type: REGISTER_ERROR,
                    payload: {
                        loadRegister: false,
                        registered: false,
                        message: 'Error, no se pudo registrar el usuario',
                    }
                });
            } else {
                dispatch({
                    type: REGISTER_SUCCES,
                    payload: {
                        loadRegister: false,
                        registered: true,
                        message: 'Usuario registrado correctamente',
                        users: data
                    }
                });
            }
        } catch (error) {
            console.log("action error: " + error);
        }
    }
    postData();

}