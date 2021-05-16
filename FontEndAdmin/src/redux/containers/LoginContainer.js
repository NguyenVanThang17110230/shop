import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actLoginByUser } from '../actions/ActionLogin';

//Import component
import Login from '../../views/pages/login/Login';
import { Redirect } from 'react-router-dom';

class LoginContainer extends Component {
    state = {  }
    render() { 
        var {user, onUserLogin} = this.props
        
        return ( 
            <Login
            user = {user}
            onUserLogin = {onUserLogin}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
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