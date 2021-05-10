import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../container/header';
import { actLogoutByUser } from '../actions/ActionLogin';
import { actSearchByKey } from '../actions/ActionFilter'
class HeaderContainer extends Component {
    state = {}
    render() {
        var { cart, user, onUserLogout, wishLists, products, onSearchByKey, isOnUrl } = this.props
        return (
            <Header
                user={user}
                cart={cart}
                onUserLogout={onUserLogout}
                countInWishList={this.countProductInWishList(wishLists)}
                products = {products.products}
                onSearchByKey = {onSearchByKey}
                isOnUrl ={isOnUrl}
            />
        );
    }
    countProductInWishList = (wishLists) => {
        if (wishLists.length > 0) {
            return wishLists.length;
        }
        return 0;
    }
}
HeaderContainer.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        product: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            inventory: PropTypes.number.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired

    })).isRequired
}
const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart,
        user: state.user,
        wishLists: state.wishLists,
        products: state.products,
    }
}
const mapDispartToProps = (dispatch, props) => {
    return {
        onUserLogout: () => {
            dispatch(actLogoutByUser());
        },
        onSearchByKey: (key, products) =>{
            dispatch(actSearchByKey(key, products));
        }
    }
}
export default connect(mapStateToProps, mapDispartToProps)(HeaderContainer);