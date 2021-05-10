import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./header.css"
import Cookies from "js-cookie";
import UserService from '../services/UserService';
class Header extends Component {
    state = {
        fullname: "",
        id: "",
        email: "",
        token: "",
        user: [],
        strSearch: ''

    }
    logout = () => {
        Cookies.remove('loginInfo', { path: "/" });
        Cookies.remove('expireAuth', { path: "/" });
        this.props.onUserLogout();
        this.loadData();
    }
    componentDidMount() {
        this.loadData();
        console.log(window.location.pathname)
    }
    loadData = () => {
        UserService.getUser().then((res) => {
            this.setState({ user: res.data.users });
        });
    }
    resultProductInCart = cart => {         //tính số lượng sản phẩm trong cart
        var result = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                result = result + cart[i].quantity;
            }
        }
        return result;
    }
    search = () => {
        var { onSearchByKey, products } = this.props
        // onSearchByKey(value, products);

    }
    inputOnChange = (event) => {
        const { value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        console.log(value)
        var { products } = this.props
        this.props.onSearchByKey(value, products);

    }
    render() {
        var { cart, countInWishList } = this.props;
        return (

            < div onLoad={this.loadData} >
                {/* <div id="preloader-active">
                    <div className="preloader d-flex align-items-center justify-content-center">
                        <div className="preloader-inner position-relative">
                            <div className="preloader-circle"></div>
                            <div className="preloader-img pere-text">
                                <img src={require(process.env.PUBLIC_URL + '../img/logo/ShoeIcon.png')} />
                            </div>
                        </div>
                    </div>
                </div> */}
                <header header >
                    <div className="header-area">
                        <div className="main-header ">
                            <div className="header-top top-bg d-none d-lg-block">
                                <div className="container-fluid">
                                    <div className="col-xl-12">
                                        <div className="row d-flex justify-content-between align-items-center">
                                            <div className="header-info-left d-flex">
                                                <div className="flag">
                                                    <img src={require('../img/ShopShoeOnline/Flag_of_Vietnam.png')} />
                                                </div>

                                                <ul className="contact-now">
                                                    <li>+777 2345 7886</li>
                                                </ul>
                                            </div>
                                            <div className="header-info-right ">
                                                <ul>
                                                    {Cookies.get("loginInfo") ?
                                                        <li className="aBac"><Link to="/profile">Tài Khoản Của Tôi</Link></li>
                                                        : null
                                                    }
                                                    {Cookies.get("loginInfo") ?
                                                        <li><Link to="/wishlist">Sản Phẩm Yêu Thích</Link></li>
                                                        : null
                                                    }
                                                    <li><Link to="/cart">Giỏ Hàng</Link></li>
                                                    <li><Link to="/checkout">Thanh Toán</Link></li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="navPa">
                                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                    <Link className="nav-link" to='/home' ><img src={require('../img/logo/LogoShop11.png')} /></Link>
                                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul class="navbar-nav mr-auto">
                                            {Cookies.get("loginInfo") ?
                                                <li class="nav-item dropdown">
                                                    <a class="nav-link dropdown-toggle nameProfile" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <img className="btnUser" src={require('../img/Shoe/avatar.jpg')}></img>{this.state.user.fullName}
                                                    </a>
                                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <Link class="dropdown-item" to="/">Đơn hàng của tôi</Link>
                                                        <Link class="dropdown-item" to="/profile">Tài khoản của tôi</Link>
                                                        <div class="dropdown-divider"></div>
                                                        <Link class="btn btn-danger btnLogout" to="/" onClick={this.logout}>Đăng xuất</Link>
                                                    </div>
                                                </li> :
                                                <div className="contentLogin">
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <img className="fixImg" src={require('../img/Shoe/Member-Benefits.png')} />

                                                        </div>
                                                        <div className="col-4">
                                                            <Link className="loginPa" to="/login">Đăng nhập</Link>
                                                        </div>
                                                        <div className="col-1">
                                                            |
                                                    </div>
                                                        <div className="col-4">
                                                            <Link className="" to="/register">Đăng ký</Link>
                                                        </div>
                                                    </div>
                                                </div>

                                            }
                                            <li class="nav-item active">
                                                <Link class="nav-link" to="/productlist">Tất cả sản phẩm<span class="sr-only">(current)</span></Link>
                                            </li>
                                            <div className="hrS"></div>
                                            <li class="nav-item active">
                                                <Link class="nav-link" to="/productlist">Nam<span class="sr-only">(current)</span></Link>
                                            </li>
                                            <div className="hrS"></div>
                                            <li class="nav-item active">
                                                <Link class="nav-link" to="/productlist">Nữ<span class="sr-only">(current)</span></Link>
                                            </li>
                                            <div className="hrS"></div>
                                            <li class="nav-item active">
                                                <Link class="nav-link" to="/productlist">Bé trai<span class="sr-only">(current)</span></Link>
                                            </li>
                                            <div className="hrS"></div>
                                            <li class="nav-item active">
                                                <Link class="nav-link" to="/productlist">Bé gái<span class="sr-only">(current)</span></Link>
                                            </li>
                                            <div className="hrS"></div>
                                            <li class="nav-item active">
                                                <Link class="nav-link" to="/productlist">Sale<span class="sr-only">(current)</span></Link>
                                            </li>
                                            <div className="hrS"></div>
                                            <li class="nav-item active">
                                                <Link class="nav-link" to="/productlist">Liên hệ<span class="sr-only">(current)</span></Link>
                                            </li>
                                            <div className="hrS"></div>
                                            <li class="nav-item active">
                                                <Link class="nav-link" to="/productlist">Giới thiệu<span class="sr-only">(current)</span></Link>
                                            </li>
                                        </ul>
                                        <div className="row">
                                            <div className="col-9">
                                                <input class="form-control searchInput mr-sm-2" type="search" placeholder="Tìm kiếm" aria-label="Search" />
                                            </div>
                                            <div className="col-3">
                                                <button class="btn btn-outline-primary searchBtn" type="submit">Tìm kiếm</button>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                            {/* <div className="header-bottom header-sticky"> */}
                            <div className="header-bottom">
                                <div className="container-fluid">
                                    <div className="row align-items-center">
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-3">
                                            <div className="logo img">
                                                <Link className="nav-link" to='/home'><img src={require('../img/logo/LogoShop11.png')} /></Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-8 col-md-8 col-sm-5">
                                            <div className="main-menu f-right d-none d-lg-block">
                                                <nav>
                                                    <ul id="navigation">
                                                        <li><Link to="/productList">TẤT CẢ SẢN PHẨM</Link></li>
                                                        <li ><Link to="/productList/Nam">NAM</Link>
                                                            {/* <ul className="submenu">
                                                                <li><a href="product_list.html"> Product list</a></li>
                                                                <li><a href="single-product.html"> Product Details</a></li>
                                                            </ul> */}
                                                        </li>
                                                        <li><Link to="/productList/Nữ">NỮ</Link>
                                                            {/* <ul className="submenu">
                                                                <li><a href="blog.html">Blog</a></li>
                                                                <li><a href="single-blog.html">Blog Details</a></li>
                                                            </ul> */}
                                                        </li>
                                                        <li><Link to="/productList/BeTrai">BÉ TRAI </Link>
                                                            {/* <ul className="submenu">
                                                                <li><a href="login.html">Login</a></li>
                                                                <li><a href="cart.html">Card</a></li>
                                                                <li><a href="elements.html">Element</a></li>
                                                                <li><a href="about.html">About</a></li>
                                                                <li><a href="confirmation.html">Confirmation</a></li>
                                                                <li><a href="cart.html">Shopping Cart</a></li>
                                                                <li><a href="checkout.html">Product Checkout</a></li>
                                                            </ul> */}
                                                        </li>
                                                        <li><Link href="/productList/BeTrai">BÉ GÁI</Link></li>
                                                        <li className="hot"><a href="/productList">SALE</a></li>
                                                        <li><a href="/productList">LIÊN HỆ</a></li>
                                                        <li><a href="/productList">GIỚI THIỆU</a></li>

                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                        <div className="col-xl-5 col-lg-3 col-md-3 col-sm-3 fix-card">
                                            <ul className="header-right f-right d-none d-lg-block d-flex justify-content-between">
                                                <li className="d-none d-xl-block searchRight">
                                                    <div className="form-box f-right" >
                                                        <input type="text" onChange={this.inputOnChange} name="Search" placeholder="Tìm kiếm.....aaa" />
                                                        <div className="search-icon" onClick={() => this.search()}>
                                                            <i className="fas fa-search special-tag"></i>
                                                        </div>
                                                    </div>
                                                </li>
                                                {Cookies.get("loginInfo") ?
                                                    <div className="marginQuantity">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="quantityFavorit">{countInWishList}</div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="quantityCart">{this.resultProductInCart(cart)}</div>
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <div className="quantityCartNotLogin">{this.resultProductInCart(cart)}</div>
                                                }

                                                {Cookies.get("loginInfo") ?
                                                    <li className="">
                                                        <div className="favorit-items">
                                                            <Link to="/wishlist"><i className="far fa-heart"></i></Link>
                                                        </div>
                                                    </li> : null
                                                }
                                                {Cookies.get("loginInfo") ?
                                                    <li>
                                                        <div className="shopping-card">
                                                            <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>
                                                        </div>
                                                    </li>:
                                                    <li>
                                                    <div className="shopping-card">
                                                        <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>
                                                    </div>
                                                </li>
                                                }


                                                {Cookies.get("loginInfo") ?
                                                    <div className="none-mobile">
                                                        <img className="btnUser" onClick={this.cookieUser} src={require('../img/Shoe/avatar.jpg')} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                                        {/* <div className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-chevron-down btnChevron-down btn"></i></div> */}
                                                        <div class="dropdown-menu dropDownMargin" aria-labelledby="dropdownMenuButton">
                                                            <p class="nameHeader">{this.state.user.fullName}</p>
                                                            <Link class="dropdown-item" to="/profile">Đơn hàng của tôi</Link>
                                                            <Link class="dropdown-item" to="/profile">Tài khoản của tôi</Link>
                                                            <Link class="btn btn-danger btnLogout" to="/" onClick={this.logout}>Đăng xuất</Link>
                                                        </div>
                                                    </div> : <li className="d-none d-lg-block"> <Link className="nav-link btn btn1 header-btn" to='/login'>Đăng nhập</Link></li>
                                                }

                                            </ul>
                                        </div>
                                        <div className="col-12">
                                            <div className="mobile_menu d-block d-lg-none"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header >
                <a id="scrollUp" href="#top" className="popop"><i class="fas fa-arrow-up"></i></a>
            </div >

        );

    }
}
export default Header;