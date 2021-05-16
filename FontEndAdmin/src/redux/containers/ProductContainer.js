import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from './../../views/shop/products/products';
import { actGetIdProductAfterCreateProduct } from '../actions/ActionProduct';
class ProductContainer extends Component {
    state = {}
    render() {
        var { product, onGetIdProductAfterCreateProduct } = this.props
        return (
            <Product
                onGetIdProductAfterCreateProduct={onGetIdProductAfterCreateProduct}
                product={product}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        product: state.product,

    }
}
//nếu muốn mua nhiều sản phẩm cùng lúc thì truyền số lượng vào
const mapDispartToProps = (dispatch, props) => {
    return {
        onGetIdProductAfterCreateProduct: (idProduct) => {
            dispatch(actGetIdProductAfterCreateProduct(idProduct));
        },
    }
}
export default connect(mapStateToProps, mapDispartToProps)(ProductContainer);