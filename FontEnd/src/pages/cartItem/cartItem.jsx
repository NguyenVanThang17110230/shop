import React, { Component } from 'react';
import '../cart/cart.css';
import { Link } from 'react-router-dom';
import * as Message from '../../redux/constants/Message';
import './cartItem.css';


class CartItem extends Component {
    state = {
        quantity: '',
        caution: false,
    }
    onDelete = (product) => {
        var { onDeleteProductInCart } = this.props;
        onDeleteProductInCart(product);
        // onChangeMessage(Message.MSG_DELETE_PRODUCT_IN_CART_SUCCESS)

    }
    onChangeQuantity = (product, check, idSizeProduct) => {
        var { onChangQuantityProductInCart } = this.props;
        onChangQuantityProductInCart(product, check, idSizeProduct);
    }
    plusQuantity = (product, quantity, idSizeProduct) => {
        if (this.state.caution === true) {
            this.setState({ caution: false });
        }
        else {
            if (quantity >= 20) {
                this.setState({ caution: true });
            }
        }
        this.onChangeQuantity(product, 1, idSizeProduct) // 1 là cộng
    }
    minusQuantity = (product, idSizeProduct) => {
        if (this.state.caution === true) {
            this.setState({ caution: false });
        }
        this.onChangeQuantity(product, 0, idSizeProduct)   //0 là trừ
    }
    render() {
        var { item, urlBackend, sizeName } = this.props;
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        return (
            <div class="card boderCard">
                <div class="card-body">
                    <div className="row">
                        <div className="col-3">
                            <Link to={`/productdetail/${item.product.id}`}>
                                <img class="card-img-top resizeImage" src={`${urlBackend}${item.product.imagePath}`} />
                            </Link>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <div className="col-6">
                                    <Link to={`/productdetail/${item.product.id}`}>
                                        <a className="fontSize_a">
                                            {item.product.name}
                                            <br />
                                        </a>
                                    </Link>

                                    <p className="pCart textSize">
                                        <span>
                                            Size:  {sizeName}
                                        </span>
                                    </p>
                                    <p className="pCart fontSize_p_span">
                                        <span>
                                            Nhóm:
                                                        </span>
                                        <Link className="defaultLink" to="/">{item.product.Category.Group.name}</Link>
                                    </p>
                                    <p className="pCart fontSize_p_span">
                                        <span>
                                            Hãng sản xuất:
                                                        </span>
                                        <Link className="defaultLink" to="/">{item.product.Brand.name}</Link>
                                    </p>
                                    <p className="pCart fontSize_p_span">
                                        <div
                                            className="defaultDelete"
                                            onClick={() => this.onDelete(item.product)}
                                        >Xóa</div>

                                    </p>

                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-6">
                                            {item.product.promotion === null?
                                            <p className="fontFamilyPriveCardProduct">{formatter.format(item.product.sellPrice)}</p>:
                                            <p className="fontFamilyPriveCardProduct">{formatter.format(parseFloat(item.product.sellPrice) - parseFloat(item.product.promotion))}</p>
                                            }
                                        </div>
                                        <div className="col-6">
                                            <p className="textQuantity">Số lượng:</p>
                                            <div className="inlineChangeQuantity">
                                                <div className="minusButton minusText" onClick={() => this.minusQuantity(item.product, this.props.idSizeProduct)}><i class="fas fa-minus"></i></div>
                                                <input type="text" className="form-control textBoxSize" id="quantityProduct" value={item.quantity} disabled />
                                                <div className="plusButton plusText" onClick={() => this.plusQuantity(item.product, item.quantity, this.props.idSizeProduct)}><i class="fas fa-plus"></i></div>
                                            </div>
                                            {this.state.caution ? <div>Xin lỗi số lượng tối đa mua được là 20 sản phẩm</div> : null}
                                        </div>

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

export default CartItem;