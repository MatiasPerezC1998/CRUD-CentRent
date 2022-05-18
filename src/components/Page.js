import React from 'react';
import { connect } from 'react-redux';

const Page = (props) => {

    return(
        <div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.loginReducer.token
    }
}

export default connect(mapStateToProps)(Page);