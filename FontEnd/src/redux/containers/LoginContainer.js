import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actLoginByUser } from '../actions/ActionLogin';

//Import component
import Login from '../../pages/login/login';
import { Redirect } from 'react-router-dom';

class LoginContainer extends Component {
    state = {  }
    render() { 
        var {user, onUserLogin, urlBackend, ownProps} = this.props
        if (user.auth === true) return <Redirect to="/"/> ;
        return ( 
            <Login
            user = {user}
            urlBackend = {urlBackend.urlBackend}
            onUserLogin = {onUserLogin}
            />
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        urlBackend: state.urlBackend,
    }
}
//nếu muốn mua nhiều sản phẩm cùng lúc thì truyền số lượng vào
const mapDispartToProps = (dispatch, props) => {
    return {
        onUserLogin: (user) =>{
            dispatch(actLoginByUser(user));
        },
    }
}
 
export default connect(mapStateToProps,mapDispartToProps)(LoginContainer);