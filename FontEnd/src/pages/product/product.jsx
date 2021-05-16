import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import {
  Form,
} from "react-bootstrap";
import '../productList/productList.css';
import './product.css';
import ProductService from '../../services/ProductService';
class Product extends Component {
  state = {
    productSize: []
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
  selectProduct = (product, id) => {

    var { loadProductIsSelect } = this.props
    loadProductIsSelect(product, id)
  }
  componentDidMount() {
    this.getProductsize();
  }
  async getProductsize() {
    const { product } = this.props;
    await ProductService.getProductSizeByProductCode(product.code).then(res => {
      this.setState({ productSize: res.data.productSizes });
    })
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
    onDeleteProductInWishList(product.code, wishLists);
    toast.success("Đã xóa khỏi danh sách yêu thích!")
  }
  addProductInWishList = () => {    //thêm sản phẩm vào wishlist
    var { onAddProductToWishList, wishLists, product } = this.props;
    onAddProductToWishList(product.code, wishLists);
    toast.success("Đã thêm vào danh sách yêu thích!")
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
    console.log("abc", this.state);
    return (
      <div className="col-12 col-sm-8 col-md-6 col-lg-3 cardPaddingBottom cardMarginTop ">
        <ToastContainer />
        <div className="nav-link-card-product aHeart link backgroundRow sizeCard">
          <div className="card showSizeBox  borderNoneCardProduct">
            <Link to={`/${product.code}`}>
              <img
                className="card-img-top boderimg_Pro sizeIMG"
                src={product.image} />
            </Link>
            <div className="card-body padding_card_body">
              <hr />
              <Link to={`/${product.code}`}>
                <div className="card-title hoverTitleProduct nameProduct">{product.name}</div>
              </Link>
              {/* <p className="card-text descriptionProduct">{product.description}</p> */}
              {product.promotion === null ?
                <div className="mt-3 p pFontSize">{formatter.format(parseFloat(product.sellPrice))}</div> :
                <div className="mt-3 p pFontSize">{formatter.format(parseFloat(product.sellPrice + 50000))}</div>
              }
              <div className="row">
                <div className="col-4">
                  {/* <i className="far fa-heart fa-2x mt-2"></i> */}
                  {this.wishListProcess(product.code)}
                </div>
                <div className="col-8">
                  <Link to={`/${product.code}`}>
                    <div
                      className="btn btn-success btn-block mt-2 button1"
                    >
                      Add to cart
                    </div>
                  </Link>
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