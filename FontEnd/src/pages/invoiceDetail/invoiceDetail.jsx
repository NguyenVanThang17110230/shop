import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./invoiceDetail.css";
import UserService from '../../services/UserService';
import OrderService from '../../services/OrderService';
import PromotionService from '../../services/PromotionService'
class InvoiceDetail extends Component {
    state = {
        closeForm: false,
        users: {},
        user: [],
        male: false,
        female: true,
        gender: '',
        check: '',
        stateListOrder: [],
        statePromotion: []      ///state giảm giá
    }
    loadData = () => {
        UserService.getUser().then((res) => {
            this.setState({ user: res.data.users });
        });
        OrderService.listOrder().then(res => {
            this.setState({ stateListOrder: res.data.orders })
        })
        PromotionService.listPromotion().then(res => {
            this.setState({ statePromotion: res.data.promotions })
        })
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadData();
        this.loadData();
        console.log(this.state.statePromotion)
    }
    processCOD = (payment) => {
        if (payment === 1 || payment === '1') {
            return 'Thanh toán tiền mặt khi nhận hàng'
        }
        if (payment === 1 || payment === '2') {
            return 'Thanh toán bằng PayPal'
        }
        if (payment === 1 || payment === '3') {
            return 'Thanh toán bằng VNPay'
        }
    }
    processDiscount = (promotionCode) => {
        var { statePromotion } = this.state
        if (promotionCode === null) {
            return 0
        }
        else {
            for (var i = 0; i < statePromotion.length; i++) {
                if (statePromotion[i].promotionCode === promotionCode) {
                    return statePromotion[i].promotionValue
                }
            }
        }
    }

    render() {
        var { idOrderOnRedux, orders, urlBackend } = this.props

        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        return (
            <div className="backGroundLayoutInvoiceDetail">
                <div>
                    <div className="container paddingContainerMain">
                        <h3>Chi tiết đơn hàng ({orders[idOrderOnRedux].orderCode})</h3>
                        <div className="row">
                            <div className="col-lg-6">
                                <p className="pAddress">ĐỊA CHỈ NHẬN HÀNG</p>
                                <div className="container backgroundContainerMain">
                                    <p className="pNameReceiver">{orders[idOrderOnRedux].fullName}</p>
                                    <p className="pAddressReceiver">{orders[idOrderOnRedux].address}</p>
                                    <p className="pPhoneReceiver">Số điện thoại: {orders[idOrderOnRedux].phone}</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <p className="pAddress">HÌNH THỨC THANH TOÁN</p>
                                <div className="container backgroundContainerMain">
                                    <p className="pPaymentReceiver">{this.processCOD(orders[idOrderOnRedux].payment)}</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="container backgroundContainerExtra">
                            <div className="row th_Sticky">
                                <div className="col-lg-6">
                                    <p className="pProduct">Sản phẩm</p>
                                </div>
                                <div className="col-lg-1">
                                    <p className="pProductPrice">Giá</p>
                                </div>
                                <div className="col-lg-1">
                                    <p className="pProductQuantity">Số lượng</p>
                                </div>
                                <div className="col-lg-2">
                                    <p className="pProductDiscount">Giảm giá</p>
                                </div>
                                <div className="col-lg-2">
                                    <p className="pProductRight">Tạm tính</p>
                                </div>
                            </div>
                            <hr className="sizeHR"></hr>
                            <div className="tbl-header">
                                {orders[idOrderOnRedux].OrderDetails.map((orderDetail, idx) => {
                                    return (
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <img
                                                                id=""
                                                                class="card-img-top boderimg_Pro imgThumbnailProductDetail"
                                                                src={`${urlBackend}${orderDetail.ProductSize.Product.imagePath}`} />

                                                        </div>
                                                        <div className="col-lg-9">
                                                            <p className="pProductCell">{orderDetail.ProductSize.Product.name}</p>
                                                            <p>Thương hiệu: <Link className="linkColor">{orderDetail.ProductSize.Product.Brand.name}</Link></p>
                                                            <p>Mã SP: {orderDetail.ProductSize.Product.productCode}</p>
                                                            <p>Size giày: {orderDetail.ProductSize.Size.sizeName}</p>
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <div className="buttonReturns"><Link className="">Trả hàng</Link></div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="buttonReturns"><Link className="">Mua lại</Link></div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-lg-1">
                                                    <p className="pProductPriceCell">{formatter.format(orderDetail.ProductSize.Product.sellPrice)}</p>
                                                </div>
                                                <div className="col-lg-1">
                                                    <p className="pProductQuantityCell">{orderDetail.unitAmount}</p>
                                                </div>
                                                <div className="col-lg-2">
                                                    <p className="pProductDiscountCell">{formatter.format((parseFloat(this.processDiscount(orders[idOrderOnRedux].promotionCode)) * parseFloat(orderDetail.ProductSize.Product.sellPrice)))}</p>
                                                </div>
                                                <div className="col-lg-2">
                                                    <p className="pProductRightCell">{formatter.format(orderDetail.ProductSize.Product.sellPrice - (this.processDiscount(orders[idOrderOnRedux].promotionCode) * orderDetail.ProductSize.Product.sellPrice))}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <hr className="sizeHR"></hr>
                            <div className="row">
                                <div className="col-lg-6">

                                </div>
                                <div className="col-lg-1">

                                </div>
                                <div className="col-lg-1">

                                </div>
                                <div className="col-lg-2">
                                    <p className="pProductRight marginBottomCalculator">Tạm tính</p>
                                    <p className="pProductRight marginBottomCalculator">Giảm giá</p>
                                    <p className="pProductRight marginBottomCalculator">Phí vận chuyển</p>
                                    <p className="pProductRight">Tổng cộng</p>
                                </div>
                                <div className="col-lg-2">
                                    <p className="pProductRight marginBottomCalculator">{formatter.format(orders[idOrderOnRedux].totalPrice)}</p>
                                    <p className="pProductRight marginBottomCalculator">{formatter.format((parseFloat(this.processDiscount(orders[idOrderOnRedux].promotionCode)))*parseFloat(orders[idOrderOnRedux].totalPrice))}</p>
                                    <p className="pProductRight marginBottomCalculator">{formatter.format(0)}</p>
                                    <p className="pProductRight priceHightlight">{formatter.format(parseFloat(orders[idOrderOnRedux].totalPrice) - (parseFloat(this.processDiscount(orders[idOrderOnRedux].promotionCode)))*parseFloat(orders[idOrderOnRedux].totalPrice))}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default InvoiceDetail;