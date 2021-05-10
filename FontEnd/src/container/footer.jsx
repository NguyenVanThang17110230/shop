import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Footer extends Component {
    state = {}
    render() {
        return (
            <div>
                <br />
                <br />

                <footer>
                    <div className="footer-area footer-padding2 " >
                        <div className="container back">
                            <div className="row d-flex justify-content-between">
                                <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                                    <div className="single-footer-caption mb-50">
                                        <div className="single-footer-caption mb-30">
                                            <div className="footer-logo">
                                                <a href="index.html"><img src={require('../img/logo/LogoShop11.png')} /></a>
                                            </div>
                                            <div className="footer-tittle">
                                                <div className="footer-pera">
                                                    <div>Địa chỉ: 1, Võ Văn Ngân, Quận Thủ Đức, HCM</div>
                                                    <div>Sđt: (028) 38 753 443</div>
                                                    <div>Email : shopShoe@gmail.com.vn</div>
                                                    <div>Thời gian làm việc: Từ 07h30 đến 12h15, 13h15 đến 21h30 các ngày trong tuần ( Trừ ngày Lễ, Tết)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-5">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>Link Nhanh</h4>
                                            <ul>
                                                <li><a href="#">About</a></li>
                                                <li><a href="#"> Offers & Discounts</a></li>
                                                <li><a href="#"> Get Coupon</a></li>
                                                <li><a href="#">  Contact Us</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-7">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>Sản Phẩm Mới</h4>
                                            <ul>
                                                <li><a href="#">Giày Nam</a></li>
                                                <li><a href="#">Giầy Nữ</a></li>
                                                <li><a href="#">Giầy Bé Trai</a></li>
                                                <li><a href="#">Giày Bé Gái</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-5 col-sm-7">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>Trợ Giúp</h4>
                                            <ul>
                                                <li><Link to="/">Trạng thái đơn hàng</Link></li>
                                                <li><Link to="/">Hình thức giao hàng</Link></li>
                                                <li><Link to="/">Hình thức thanh toán</Link></li>
                                                <li><Link to="/">Chính sách đổi trả</Link></li>
                                                <li><Link to="/">Chính sách bảo hành</Link></li>
                                                <li><Link to="/">Chính sách khách hàng thân thiết</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-7 col-lg-7 col-md-7">
                                    <div className="footer-copy-right">
                                        <p>
                                            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="ti-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                        </p>                </div>
                                </div>
                                <div className="col-xl-5 col-lg-5 col-md-5">
                                    <div className="footer-copy-right f-right">
                                        <div className="footer-social">
                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                                            <a href="#"><i className="fab fa-behance"></i></a>
                                            <a href="#"><i className="fas fa-globe"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;