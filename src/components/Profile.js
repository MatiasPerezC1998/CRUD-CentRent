import React from 'react';
import { connect } from 'react-redux';

import '../Styles.css';

const Profile = (props) => {

    // HOOKS

    // EVENTS

    // BODY
    return(
        <div className='infoProfile'>
            <b>Nombre:</b> {localStorage.getItem("userLoggedFirstName")}
            <br/><br/>
            <b>Apellido:</b> {localStorage.getItem("userLoggedLastName")}
            <br/><br/>
            <b>Nombre de Usuario:</b> {localStorage.getItem("userLoggedUsername")}
            <br/><br/>
            <b>Correo electrónico:</b> {localStorage.getItem("userLoggedEmail")}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.loginReducer.users,
    }
}

export default connect(mapStateToProps)(Profile);