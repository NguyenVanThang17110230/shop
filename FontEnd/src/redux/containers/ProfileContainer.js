import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Profile from '../../pages/profile/profile'
import { actOnloadOrderFromApi } from '../actions/index'
class ProfileContainer extends Component {
    state = {}
    render() {
        var { onLoadOrderFromApi } = this.props
        return (
            <Profile 
            onLoadOrderFromApi = {onLoadOrderFromApi}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user,
        wishLists: state.wishLists

    }
}
const mapDispartToProps = (dispatch, props) => {
    return {
        onLoadOrderFromApi: (order) => {
            dispatch(actOnloadOrderFromApi(order))
        }
        // onUserLogout: () => {
        //     dispatch(actLogoutByUser());
        // }
    }
}
export default connect(mapStateToProps, mapDispartToProps)(ProfileContainer);