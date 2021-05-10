import React, { Component } from 'react';
import '../cart/cart.css';
import { Link } from 'react-router-dom';

class CartResult extends Component {
    state = {
        discount: '',
        nameDiscount: '',
        nameTagDiscount: ''
    }
    
    InputOnChange = (event) => {
        const { value } = event.target;
        this.setState({ discount: value })
        this.setState({ nameDiscount: '' })
    }
    applyDiscount = (discountCurrent, discountState, cart) => {
        // var discountMoney = 0;
        // var totalResult =0;
        // for (var i = 0; i < cart.length; i++) {
        //     totalResult+=cart[i].total;
        // }   
        // for (var j = 0; j < discountState.length; j++) {
        //     if (discountcurrent === discountState[j].code) {
        //         discountMoney = discountState[j].action * totalResult;
        //         break;
        //     }
        //     else discountMoney = 0;
        // }
        // this.setState({discountMo:discountMoney});
        // this.setState({totalResult:totalResult});

        this.processNameDiscount(discountState, discountCurrent);
        var { onChangeDiscountInCart, onSelectDiscountInCart } = this.props;
        if(this.processNameDiscount(discountState, discountCurrent) === true){
            onChangeDiscountInCart(discountState, discountCurrent, cart);
            onSelectDiscountInCart(discountState, discountCurrent)
        }
    }
    
    //xử lý giảm giá
    processDiscount = cart => {
        var totalDiscount = 0;
        for (var i = 0; i < cart.length; i++) {
            totalDiscount += cart[i].totalDiscount;
        }
        return totalDiscount;
    }
    processNameDiscount = (discount, inputDiscount) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        var nameDiscount = -1;
        for (var i = 0; i < discount.promotion.length; i++) {
            if (inputDiscount === discount.promotion[i].promotionCode) {
                if (discount.promotion[i].promotionValue <= 1) {
                    nameDiscount = `Bạn đã sử dụng mã giảm giá ${discount.promotion[i].promotionValue * 100} %`;
                    this.setState({ nameDiscount: nameDiscount })
                    this.setState({ nameTagDiscount: 'nameTagSuccessDiscount' })
                    return true;
                }
                else{
                    nameDiscount = `Bạn đã sử dụng mã giảm giá ${formatter.format(discount.promotion[i].promotionValue)}`;
                    this.setState({ nameDiscount: nameDiscount })
                    this.setState({ nameTagDiscount: 'nameTagSuccessDiscount' })
                    break
                }


            }
        }
        if (inputDiscount !== '' && nameDiscount === -1) {
            nameDiscount = 'Mã bạn nhập không đúng đã hoặc đã sử dụng'
            this.setState({ nameDiscount: nameDiscount })
            this.setState({ nameTagDiscount: 'nameTagFailDiscount' })
            return false
        }

    }
    render() {
        var { cart, discount } = this.props;
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        return (
            <div className="container fixedResult">
                <div class="card cardMagin">
                    <div class="card-body">
                        <h5 class="card-title fontTitleCardCoupon">Mã giảm giá   <i className="fas fa-tags colorTagCoupon"></i></h5>
                        <input
                            className="text textBoxCoupon"
                            id="Coupon"
                            placeholder="Nhập mã giảm giá"
                            onChange={this.InputOnChange}
                        ></input>
                        <div className={this.state.nameTagDiscount}>
                            {this.state.nameDiscount}
                        </div>
                        <div className="rightButton">
                            <button
                                type="submit"
                                value="submit"
                                class="btn_3 btn_3-submit-coupon"
                                id="submitDiscount"
                                onClick={() => this.applyDiscount(this.state.discount, discount, cart)}
                            >
                                Áp dụng
                        </button>
                        </div>
                    </div>
                </div>
                <div class="card borderCardPriceParent">
                    <div class="card borderCardPriceChild ">
                        <div class="card-body ">
                            <div class="row">
                                <div className="col-6">
                                    <span>
                                        Tạm tính
                                </span>
                                </div>
                                <div className="col-6 alignmentRightPrice">
                                    <span
                                        id="provisional"
                                    >
                                        {formatter.format(this.props.showTotalAmount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4><hr /></h4>
                    <div class="card borderCardPriceChild">
                        <div class="card-body">
                            <div class="row">
                                <div className="col-6">
                                    <span>
                                        Giảm giá
                                </span>
                                </div>
                                <div className="col-6 alignmentRightPrice">
                                    <span>
                                        {formatter.format(this.processDiscount(cart))}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4><hr /></h4>
                    <div class="card borderCardPriceChild">
                        <div class="card-body ">
                            <div class="row">
                                <div className="col-4">
                                    <span>
                                        Thành tiền
                                    </span>
                                </div>
                                <div className="col-8 alignmentRightPrice">
                                    <span className="colorTextTotal">
                                        {formatter.format(this.props.processTotal)}
                                    </span>
                                    <div class="w-100"></div>
                                    <span className="vatTextFontSize">(Đã bao gồm thuế VAT)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card borderCardPriceChild">
                        <div class="card-body ">
                            <div class="row">
                                <div className="col-4">

                                </div>
                                <div className="col-8 alignmentRightPrice">
                                    <Link to="/checkout"><button className="btn btn-info">Thanh toán</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartResult;