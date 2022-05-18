import { Action } from 'history';
import { connect } from 'react-redux';
import { useNavigate, Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes(props) {
    return (
        <>
        {props.token !== "" ? <Outlet/> : <Navigate to="/Login"/>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.loginReducer.token
    }
}

export default connect(mapStateToProps)(PrivateRoutes);