// Import de la configuración de JuanPedro (Teams)
import { getFormData, getItemFormData, getQueryString } from '../../config';

const url = 'https://localhost:7295/User/Login';

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const login = (username, password) => (dispatch) => {

    dispatch({
        type: LOGIN_START,
        payload: {
            loadLogin: true,
            logged: false,
            message: 'Iniciando sesion'
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
                body: getFormData({ username: username, password: password })
            });
            const data = await res.json();

            if (res.status !== 200) {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: {
                        loadLogin: false,
                        logged: false,
                        message: data.message
                    }
                });
            } else {
                dispatch({
                    type: LOGIN_SUCCES,
                    payload: {
                        loadLogin: false,
                        logged: true,
                        message: 'Sesion iniciada correctamente',
                        token: data.token,
                        users: data,
                    }
                });
                localStorage.setItem("token", data.token);
                localStorage.setItem("userLoggedFirstName", data.firstName);
                localStorage.setItem("userLoggedLastName", data.lastName);
                localStorage.setItem("userLoggedUsername", data.username);
                localStorage.setItem("userLoggedEmail", data.email);
            }

        } catch (error) {
            console.log("action error: " + error);
        }
    }
    postData();

}

export const LOGOUT = "LOGOUT";
export const logout = (props) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLoggedFirstName");
    localStorage.removeItem("userLoggedLastName");
    localStorage.removeItem("userLoggedUsername");
    localStorage.removeItem("userLoggedEmail");
    return {
        type: LOGOUT,
        payload: {
            users: [],
            logged: false,
            message: 'Sesion cerrada',
            token: null
        }
    }
}