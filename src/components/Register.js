import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { register } from '../redux/actions/registerAction';
import store from '../redux/store';
import '../Styles.css';

const Register = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // EVENTOS
    const handleClick = () => {
        navigate("/Login");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        props.register(firstName, lastName, email, username, password);

        if (props.users) {

            navigate("/Login");
        }
    }

    // BODY (FORMULARIO)
    return (
        <div>
            <h1 className="title">REGISTER</h1>
            <div>
                <br/>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre" name={"firstName"}
                        value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    />
                    <br/><br/><input type="text" placeholder="Apellido" name={"lastName"}
                        value={lastName} onChange={(e) => setLastName(e.target.value)}
                    />
                    <br/><br/><input type="text" placeholder="Correo Electrónico" name={"email"}
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <br/><br/>
                    <input type="text" placeholder="Nombre de usuario" name={"username"}
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/><br/>
                    <input  type="password" placeholder="Contraseña" name={"password"}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/><br/>
                    <button type="submit">
                        Register
                    </button>
                </form>

                <br/>
                <button onClick={handleClick}>Go to Login</button>

            </div>

        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        loadRegister: state.registerReducer.loadRegister,
        registered: state.registerReducer.registered,
        message: state.registerReducer.message,
        users: state.registerReducer.users
    }
}

const mapDispatchToProps = {
    register
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);