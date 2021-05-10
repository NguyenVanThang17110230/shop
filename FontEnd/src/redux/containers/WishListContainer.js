import React, { Component } from 'react'
import { connect } from 'react-redux';
import WishList from '../../pages/wishList/wishList';
import ProductInWishList from '../../pages/wishList/productInWishList';
//import các props action
import { actAddProductToWishList, actDeleteProductInWishList } from '../actions/ActionWishList';
import { actAddToCart, actSelectSizeOnProduct } from '../actions';
class WishListContainer extends Component {
    state = {}
    render() {
        var { products } = this.props;
        return (
            <WishList
                showProduct={this.showProductInWishList(products.products)}
            />
        );
    }
    showProductInWishList = (products) => {
        var result = null;
        var { addToCart, loadProductIsSelect, urlBackend, onProductIsSelect, onAddProductToWishList, onDeleteProductInWishList } = this.props;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return <ProductInWishList
                    key={index}
                    product={product}
                    urlBackend={urlBackend.urlBackend}
                    addToCart={addToCart}
                    loadProductIsSelect={loadProductIsSelect}
                    onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                    sizeIsSelect={this.findIdPro(product.id)}
                    onAddProductToWishList={onAddProductToWishList}
                    onDeleteProductInWishList={onDeleteProductInWishList}
                    idProductInWishList = {this.finIdProInWishList(product.id)}
                />

            });
        
        }
        return result;
    }
    finIdProInWishList = (idProduct) => {
        var { wishLists } = this.props;
        if (wishLists.length > 0) {
            for (var i = 0; i < wishLists.length; i++) {
                if (wishLists[i].idProduct === idProduct) {
                    return idProduct;
                }
            }
            return -1 ; // nếu trừ 1 thì k tìm thấy
        }
        return -1 ; // nếu trừ 1 thì k tìm thấy
    }
    findIdPro = (id) => {
        var { sizeIsSelect } = this.props.sizeIsSelect
        if (sizeIsSelect.length > 0) {
            for (var i = 0; i < sizeIsSelect.length; i++) {
                if (sizeIsSelect[i].sizeProduct.productId === id) {
                    console.log(sizeIsSelect)
                    return (sizeIsSelect[i].sizeProduct.id)
                }
            }
        }
        else return
    }

}
const mapStateToProps = state => {
    return {
        products: state.products,
        urlBackend: state.urlBackend,
        sizeIsSelect: state.sizeIsSelect,
        wishLists: state.wishLists
    }
}
//nếu muốn mua nhiều sản phẩm cùng lúc thì truyền số lượng vào
const mapDispartToProps = (dispatch, props) => {
    return {
        addToCart: (product, sizeProduct) => {
            dispatch(actAddToCart(product, 1, product.price, sizeProduct));
        },
        onAddProductToWishList: (idProduct, wishLists) => {
            dispatch(actAddProductToWishList(idProduct, wishLists))
        },
        onDeleteProductInWishList: (idProduct, wishLists) => {
            dispatch(actDeleteProductInWishList(idProduct, wishLists))
        },
        onProductIsSelect: (sizeProduct, idProduct) => {
            dispatch(actSelectSizeOnProduct(sizeProduct, idProduct))
        },
        // onChangeMessage : (message) =>{
        //     dispatch(actChangeMessage(message));
        // }
    }
}
export default connect(mapStateToProps, mapDispartToProps)(WishListContainer);