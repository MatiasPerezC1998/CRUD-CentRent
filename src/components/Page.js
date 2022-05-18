import React from 'react';
import { connect } from 'react-redux';

import store from '../redux/store';

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