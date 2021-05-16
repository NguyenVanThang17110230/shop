import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Checkout from '../../pages/checkout/checkout';
import CheckoutItem from '../../pages/checkout/checkoutItem';
import * as Message from '../constants/Message';
class CheckoutContainer extends Component {
    state = {  }
    render() { 
        var { cart, user, discount, urlBackend } = this.props;
        return ( 
            <Checkout
                cart = { cart }
                checkoutItem = {this.showCheckoutItem(cart)}
                user = {user}
                discount = {discount}
                urlBackend = {urlBackend}
            />
        );
    }
    showCheckoutItem = (cart) => {
        var result;
        // var result = <tr>
        //     <td>
        //         {Message.MSG_CART_EMPTY}
        //     </td>
        // </tr>;
        if (cart.length > 0) {
            result = cart.map((checkoutItem, index) => {
                return (
                    <CheckoutItem
                        key={index}
                        checkoutItem={checkoutItem}
                    />
                );
            });
        }
        return result;
    }
}
CheckoutContainer.propTypes = {
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
const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user,
        discount: state.discount,
        urlBackend: state.urlBackend,
    }
}
export default connect(mapStateToProps,null)(CheckoutContainer);