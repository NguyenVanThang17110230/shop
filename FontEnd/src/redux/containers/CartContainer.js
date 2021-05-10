import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cart from '../../pages/cart/cart';
import CartItem from '../../pages/cartItem/cartItem';
import CartResult from '../../pages/cartResult/cartResult';

import * as Message from '../constants/Message';

import { actChangeDiscountInCart, actChangeQuantityProductInCart, actDeleteProductInCart, actOnloadProductFromApi, actOnLoadPromotionInState, actOnLoadThisPage, actSelectDiscountInCart } from '../actions/index';

class CartContainer extends Component {
    state = {}
    render() {
        var { cart, discount, onLoadThisPage, onLoadPromotionInState, onLoadProductFromApi } = this.props;
        return (
            <Cart
                cart={cart}
                cartItem={this.showCartItem(cart)}
                cartResult={this.showTotalResult(cart, discount)}
                onLoadThisPage={onLoadThisPage}
                onLoadPromotionInState={onLoadPromotionInState}
                onLoadProductFromApi={onLoadProductFromApi}
            />
        );
    }
    showCartItem = (cart) => {
        var { onDeleteProductInCart, onChangQuantityProductInCart, onChangeDiscountInCart, urlBackend, onSelectDiscountInCart } = this.props;
        var result = <tr>
            <td>
                {Message.MSG_CART_EMPTY}
            </td>
        </tr>;
        if (cart.length > 0) {
            result = cart.map((item, index) => {
                return (
                    <CartItem
                        key={index}
                        item={item}
                        index={index}
                        urlBackend={urlBackend.urlBackend}
                        onDeleteProductInCart={onDeleteProductInCart}
                        onChangQuantityProductInCart={onChangQuantityProductInCart}
                        onChangeDiscountInCart={onChangeDiscountInCart}
                        onSelectDiscountInCart ={onSelectDiscountInCart}
                        sizeName={this.findNameSize(item.product.id, item.idProductSize)}
                        idSizeProduct = {this.findIdSizeProduct(item.product.id, item.idProductSize)}
                    />
                );
            });
        }
        return result;
    }
    findNameSize = (idPro, idSizePro) => {
        var { products } = this.props.products
        var idexProduct=0;
        if (products.length > 0) {
            for (var i = 0; i < products.length; i++) {         //tìm vị trí của product cần lấy
                if (products[i].id === idPro) {

                    idexProduct = i;        //lưu vị trí
                    
                    break;
                }
            }
            if (products[idexProduct].ProductSizes.length > 0) {
                for (var j = 0; j < products[idexProduct].ProductSizes.length; j++) {         //tìm size
                    if (idSizePro === products[idexProduct].ProductSizes[j].id) {
                        return(products[idexProduct].ProductSizes[j].Size.sizeName)
                    }
                }
            }
        }
        else return
    }
    findIdSizeProduct = (idPro, idSizePro) => {
        var { products } = this.props.products
        var idexProduct=0;
        if (products.length > 0) {
            for (var i = 0; i < products.length; i++) {         //tìm vị trí của product cần lấy
                if (products[i].id === idPro) {

                    idexProduct = i;        //lưu vị trí
                    
                    break;
                }
            }
            if (products[idexProduct].ProductSizes.length > 0) {
                for (var j = 0; j < products[idexProduct].ProductSizes.length; j++) {         //tìm size
                    if (idSizePro === products[idexProduct].ProductSizes[j].id) {
                        return(products[idexProduct].ProductSizes[j].id)
                    }
                }
            }
        }
        else return
    }
    showTotalResult = (cart, discount) => {
        var result = null;
        var { onChangeDiscountInCart, onSelectDiscountInCart } = this.props;
        if (cart.length > 0) {
            return (
                <CartResult
                    cart={cart}
                    discount={discount}
                    onChangeDiscountInCart={onChangeDiscountInCart}
                    processTotal={this.processTotal(cart)}
                    showTotalAmount={this.showTotalAmount(cart)}
                    onSelectDiscountInCart = {onSelectDiscountInCart}
                />
            )
        }
        return result;
    }
    //Xử ý tổng tiền
    processTotal = (cart) => {
        var totalDiscount = 0;
        var total = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                totalDiscount += cart[i].totalDiscount;
                total += cart[i].total;
            }
        }
        if (totalDiscount === 0) {
            return this.showTotalAmount(cart)
        }
        else {
            return total - totalDiscount;
        }
    }
    showTotalAmount = (cart) => {
        var total = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                total += cart[i].total;
            }

        }
        console.log(this.props.discount.promotion[0])
        return total;
    }

}
CartContainer.propTypes = {
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
        discount: state.discount,
        urlBackend: state.urlBackend,
        products: state.products

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteProductInCart: (product) => {
            dispatch(actDeleteProductInCart(product));
        },
        onChangQuantityProductInCart: (product, check, idSizeProduct) => { // check là check cộng hay trừ
            dispatch(actChangeQuantityProductInCart(product, check, idSizeProduct));
        },
        onChangeDiscountInCart: (discount, inputDiscount, cart) => {
            dispatch(actChangeDiscountInCart(discount, inputDiscount, cart));
        },
        onSelectDiscountInCart: (discount, inputDiscount) =>{
            dispatch(actSelectDiscountInCart(discount, inputDiscount));
        },
        onLoadThisPage: cart => {
            dispatch(actOnLoadThisPage(cart));
        },
        onLoadPromotionInState: (promotion) => {
            dispatch(actOnLoadPromotionInState(promotion));
        },
        onLoadProductFromApi: (product) => {
            dispatch(actOnloadProductFromApi(product));
        },
        // onChangeMessage : (message) => {
        //     dispatch(actChangeMessage(message));
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
