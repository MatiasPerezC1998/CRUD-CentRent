import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

import logo from '../logo.jpg';
import { logout } from "../redux/actions/loginAction";
import store from "../redux/store";

function Navbar(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (props.token === null && !isNavigating) {
      setIsNavigating(true);
      navigate('/Login');
    }
  }, [props.token, isNavigating]);

  const handleClick = () => {
    dispatch(logout());
  }

  return (

    <div className="app-navbar">
      {console.log(store.getState())}
            
      <button className="link" onClick={handleClick}>Log out</button>

      <span className="link">
        Bienvenido a Centauro #{localStorage.getItem("userLoggedFirstName")}_{localStorage.getItem("userLoggedLastName")}!
      </span>

      <img src={logo} className="logo" alt="logo"/>

      <Link className="link" to="/Search">Search</Link>
      <Link className="link" to="/Profile">Profile</Link>
      <Link className="link" to="/Car">Cars</Link>
      <Link className="link" to="/Customer">Customers</Link>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.loginReducer.users,
    token: state.loginReducer.token
  }
}

export default connect(mapStateToProps)(Navbar);