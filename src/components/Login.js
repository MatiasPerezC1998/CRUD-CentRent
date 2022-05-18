import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, logout } from '../redux/actions/loginAction';
import '../Styles.css';

const Login = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        if (props.token !== null && !isNavigating) {
            setIsNavigating(true);
            // disable no-restricted-globals
            navigate("/Page");
        }
    }, [props.token]);

    // EVENTOS
    const handleClick = () => {
        navigate("/Register");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        props.login(username, password);

    }

    // BODY (FORMULARIO)
    return (

        <div>
            <h1 className="title">LOGIN</h1>
            <div>
                <br />
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre" name={"username"}
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                    <br /><br />
                    <input type="password" placeholder="Contraseña" name={"password"}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <br /><br />

                    <button type="submit">Login</button>

                </form>

                <br />
                <button onClick={handleClick}>Go to Register</button>

            </div>


        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        loadLogin: state.loginReducer.loadLogin,
        logged: state.loginReducer.logged,
        message: state.loginReducer.message,
        token: state.loginReducer.token,
        users: state.loginReducer.users,
    }
}

const mapDispatchToProps = {
    login,
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);