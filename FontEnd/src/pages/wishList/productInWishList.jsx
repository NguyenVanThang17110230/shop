import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../wishList/wishList.css";
class ProductInWishList extends Component {
    state = {}
    render() {
        var { idProductInWishList, product, sizeIsSelect, urlBackend } = this.props
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        if (idProductInWishList !== -1) {
            return (

                <div className="col-12 col-sm-8 col-md-6 col-lg-4">

                    <Link className="nav-link-card-product aHeart link backgroundRow">
                        <div class="card showSizeBox borderNoneCardProduct">
                            <Link to={`/productdetail/${product.alias}`}>
                                <img
                                    className="card-img-top boderimg_Pro sizeIMG"
                                    src={`${urlBackend}${product.imagePath}`}
                                />
                            </Link>
                            <div class="card-body padding_card_body">
                                <div className="heightBoxSize">
                                    <div className="size-box">
                                        {product.ProductSizes.sort((a, b) => a.Size.sizeName - b.Size.sizeName).map((productSize, idx) => {
                                            if (sizeIsSelect !== undefined) {
                                                if (sizeIsSelect === productSize.id) {
                                                    return (
                                                        <div key={productSize.id}
                                                            className="size_item pcolor sizeOnSelect"
                                                            onClick={() => this.selectSize(productSize, productSize.productId)}>
                                                            {productSize.Size.sizeName}
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <div key={productSize.id}
                                                            className="size_item pcolor"
                                                            onClick={() => this.selectSize(productSize, productSize.productId)}>
                                                            {productSize.Size.sizeName}
                                                        </div>
                                                    )
                                                }
                                            }
                                            else {
                                                return (
                                                    <div key={productSize.id}
                                                        className="size_item pcolor"
                                                        onClick={() => this.selectSize(productSize, productSize.productId)}>
                                                        {productSize.Size.sizeName}
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                                <hr />
                                <Link to={`/productdetail/${product.alias}`}>
                                    <p className="card-title hoverTitleProduct nameProduct">{product.name}</p>
                                </Link>
                                <p className="card-text descriptionProduct">{product.description}</p>
                                <p className="mt-3 p pFontSize">{formatter.format(product.sellPrice)}</p>
                                <div class="row">
                                    <div class="col-5">
                                        <div class="btn btn-primary" onClick={() => this.addToCart(product, sizeIsSelect)}>
                                            <i class="fas fa-cart-plus iPaddingRight">
                                            </i>
                                        Add to cart
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <Link to={`/productdetail/${product.alias}`} class="btn btn-secondary"><i class="fas fa-info-circle iPaddingRight"></i>Detail</Link>
                                    </div>
                                    <div class="col-3">
                                        <div class="btn btn-danger" onClick={this.deleteProductInWishList}><i class="fas fa-trash-alt"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            );
        }
        else {
            return (
                <div></div>
            )
        }
    }
    addToCart = (product, sizeIsSelect) => {
        console.log(sizeIsSelect)
        if (sizeIsSelect === undefined) {
            alert("Vui lòng nhập size theo mong muốn")
        }
        else {
            this.props.addToCart(product, sizeIsSelect);
        }
        // this.props.onChangeMessage(Message.MSG_ADD_TO_CART_SUCCESS)
    }
    deleteProductInWishList = () => {   //thêm sản phẩm vào wishlist
        var { onDeleteProductInWishList, wishLists, product } = this.props;
        onDeleteProductInWishList(product.id, wishLists);
    }
    selectProduct = (product, id) => {

        var { loadProductIsSelect } = this.props
        loadProductIsSelect(product, id)
    }
    selectSize = (sizeProduct, idProduct) => {
        console.log(this.props.sizeIsSelect)
        this.props.onProductIsSelect(sizeProduct, idProduct);
    }
}

export default ProductInWishList;