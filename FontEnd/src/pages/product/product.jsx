import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import {
  Form,
} from "react-bootstrap";
import '../productList/productList.css';
import './product.css';
class Product extends Component {
  state = {}

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
  selectProduct = (product, id) => {

    var { loadProductIsSelect } = this.props
    loadProductIsSelect(product, id)
  }
  selectSize = (sizeProduct, idProduct) => {
    console.log(this.props.sizeIsSelect)
    this.props.onProductIsSelect(sizeProduct, idProduct);
  }
  wishListProcess = (id) => {   ///xử lý icon wishlist in product
    var { idProductInWishList } = this.props
    if (idProductInWishList !== -1) {
      return (<i className="fas fa-heart fa-2x mt-2 iconHeart" onClick={this.deleteProductInWishList}></i>)
    }
    else {
      if (Cookies.get("loginInfo") === undefined) {
        return (<Link to="/login" className="far fa-heart fa-2x mt-2 iconHeart"></Link>)
      }
      else {
        return (<i className="far fa-heart fa-2x mt-2 iconHeart" onClick={this.addProductInWishList}></i>)
      }
    }

    // return()
    // <i className="fas fa-heart"></i>
    // <i className="far fa-heart fa-2x mt-2"></i>
  }
  deleteProductInWishList = () => {   //Xóa sản phẩm ra khỏi wishlist
    var { onDeleteProductInWishList, wishLists, product } = this.props;
    onDeleteProductInWishList(product.id, wishLists);
  }
  addProductInWishList = () => {    //thêm sản phẩm vào wishlist
    var { onAddProductToWishList, wishLists, product } = this.props;
    onAddProductToWishList(product.id, wishLists);
  }
  onChangeSize = (event) => {
    const { value } = event.target;
    var productSize = JSON.parse(value);
    console.log(productSize)
    if (value !== null) {
      this.selectSize(productSize, productSize.productId)
    }

  }
  render() {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    })
    var { product, urlBackend, sizeIsSelect } = this.props;
    return (
      <div className="col-12 col-sm-8 col-md-6 col-lg-3 cardPaddingBottom cardMarginTop ">
        <div className="nav-link-card-product aHeart link backgroundRow sizeCard">
          <div className="card showSizeBox  borderNoneCardProduct">
            <Link to={`/productdetail/${product.alias}`}>
              <img
                className="card-img-top boderimg_Pro sizeIMG"
                src={`${urlBackend}${product.imagePath}`} />
            </Link>
            <div className="card-body padding_card_body">
              <div className="heightBoxSize">
                <div className="size-box">
                  <div className="form-group">
                    <select className="form-control displaySelectBox" id="exampleFormControlSelect1" onChange={this.onChangeSize}>
                    <option value='null'>Choose....</option>
                      {product.ProductSizes.sort((a, b) => a.Size.sizeName - b.Size.sizeName).map((productSize, idx) => {
                        return (
                          <option
                            key={idx}
                            value={JSON.stringify(productSize)}
                          >
                            {productSize.Size.sizeName}
                          </option>
                        )
                      })
                      }
                    </select>

                  </div>
                  {/* <Form.Group controlId="ControlSelect">
                    <Form.Control
                      required
                      as="select"
                      name="typeSize"
                      onChange={this.onChangeSize}
                    >
                      <option value='null'>Choose....</option>
                      {product.ProductSizes.sort((a, b) => a.Size.sizeName - b.Size.sizeName).map((productSize, idx) => {
                        return (
                          <option
                            key={idx}
                            value={JSON.stringify(productSize)}
                          >
                            {productSize.Size.sizeName}
                          </option>
                        )
                      })}
                    </Form.Control>
                  </Form.Group> */}

                  {/* {product.ProductSizes.sort((a, b) => a.Size.sizeName - b.Size.sizeName).map((productSize, idx) => {
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
                  }
                  )} */}
                  {/* <span className="size_item pcolor">41</span>
                <span className="size_item pcolor">42</span>
                <span className="size_item pcolor">43</span>
                <span className="size_item pcolor">44</span>
                <span className="size_item pcolor">45</span>
                <span className="size_item pcolor">46</span> */}
                </div>
              </div>
              <hr />
              <Link to={`/productdetail/${product.alias}`}>
                <div className="card-title hoverTitleProduct nameProduct">{product.name}</div>
              </Link>
              {/* <p className="card-text descriptionProduct">{product.description}</p> */}
              {product.promotion === null ?
                <div className="mt-3 p pFontSize">{formatter.format(parseFloat(product.sellPrice))}</div> :
                <div className="mt-3 p pFontSize">{formatter.format(parseFloat(product.sellPrice) - parseFloat(product.promotion))}</div>
              }
              <div className="row">
                <div className="col-4">
                  {/* <i className="far fa-heart fa-2x mt-2"></i> */}
                  {this.wishListProcess(product.id)}
                </div>
                <div className="col-8">
                  <div
                    className="btn btn-success btn-block mt-2 button1"
                    onClick={() => this.addToCart(product, sizeIsSelect)}>
                    Add to cart
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Product;