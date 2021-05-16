import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductDetail from '../../pages/productDetail/productDetail';
import { actAddToCart, actSelectSizeOnProduct, actOnloadProductFromApi, actSelectImageShowToProductDetail } from '../actions/index';
class ProductDetailContainer extends Component {
    render() {
        var { 
            products, 
            idOnUrl, 
            addToCart, 
            urlBackend, 
            onProductIsSelect, 
            onLoadProductFromApi, 
            onSelectImageShowToProductDetail, 
            imagePath,
            cart
        } = this.props
        console.log("rrrr",this.props);
        console.log("Dddd",idOnUrl);
        var index = this.findIdProOnState(idOnUrl);
        console.log("test",index);
        console.log("ssss",products.products[index]);
        return (
            <ProductDetail
                idProduct={products.products[index].code}
                urlBackend={urlBackend.urlBackend}
                product={products.products[index]}
                addToCart={addToCart}
                sizeIsSelect={this.findIdPro(products.products[index].code)}
                onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                onLoadProductFromApi={onLoadProductFromApi}
                onSelectImageShowToProductDetail ={onSelectImageShowToProductDetail}
                imagePath = {imagePath.imagePathSelect}
                cart = {cart}           //state redux giỏ hàng
            />
        );
    }
    findIdProOnState = (idOnUrl) => {
        var { products } = this.props.products
        console.log(products)
        if (products.length > 0) {
            for (var i = 0; i < products.length; i++) {
                if (String(products[i].code) === String(idOnUrl)) {
                    return i;
                }
            }
        }
    }
    findIdPro = (id) => {
        var { sizeIsSelect } = this.props.sizeIsSelect
        console.log("uuu",sizeIsSelect);
        if (sizeIsSelect.length > 0) {
            
            for (var i = 0; i < sizeIsSelect.length; i++) {
                console.log("hihi",sizeIsSelect[i].sizeProduct);
                if (sizeIsSelect[i].sizeProduct.productCode === id) {
                    console.log("sss1",sizeIsSelect)
                    return ({ productSize: sizeIsSelect[i].sizeProduct })
                }
            }
        }
        else return
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        idOnUrl: ownProps.match.params.alias,
        // id: props.computedMatch.params.id,
        urlBackend: state.urlBackend,
        sizeIsSelect: state.sizeIsSelect,
        imagePath : state.imagePath,
        cart: state.cart,
    }
}
const mapDispartToProps = (dispatch, props) => {
    return {
        addToCart: (product, quantity, sizeIsSelect) => {
            dispatch(actAddToCart(product, quantity, product.price, sizeIsSelect));
        },
        onProductIsSelect: (sizeProduct, idProduct) => {
            dispatch(actSelectSizeOnProduct(sizeProduct, idProduct))
        },
        onLoadProductFromApi: (product) => {
            dispatch(actOnloadProductFromApi(product));
        },
        onSelectImageShowToProductDetail: (image) =>{
            dispatch(actSelectImageShowToProductDetail(image))
        }

        // loadProductIsSelect: (product, id) => {
        //     dispatch(actOnLoadProductIsSelect(product, id));
        // },
    }
}
export default connect(mapStateToProps, mapDispartToProps)(ProductDetailContainer);