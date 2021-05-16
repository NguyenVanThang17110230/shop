import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../home/home.css";
import { connect } from 'react-redux';
import ProductService from '../../services/ProductService';
import BrandService from '../../services/BrandService';
import GroupService from '../../services/GroupService';
import CategoryService from '../../services/CategoryService';
import { actLoadBrandsFromAPI, actLoadCategoriesFromAPI, actLoadGroupsFromAPI, actOnloadProductFromApi } from '../../redux/actions/index';
class Home extends Component {
    state = {
        stateBrand: [],
        stateCategory: [],
        stateGroup: [],
        stateProducts: [],
        stateBestSeller: '',
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadData();
    }
    loadData() {
        this.loadProduct();
        this.loadBrand();
        this.loadGroup();
        this.loadCategory();
    }
    async loadProduct() {
        await ProductService.listProduct().then(res => {
            this.props.onLoadProductFromApi(res.data.products)
            this.setState({ stateProducts: res.data.products })
        })
    }
    async loadBrand() {
        await BrandService.listBrand().then(res => {
            this.props.onLoadBrandsFromApi(res.data.brands)
            this.setState({ stateBrand: res.data.brands })
        })
    }
    async loadGroup() {
        await GroupService.listGroup().then(res => {
            this.props.onLoadGroupsFromApi(res.data.Groups)
            //this.setState({ stateGroup: res.data.Groups })
        })
    }
    async loadCategory() {
        await CategoryService.listCategory().then(res => {
            this.props.onLoadCategoriesFromApi(res.data.categories)
            //this.setState({ stateCategory: res.data.categories })
        })
    }
    processPrice = (sellPrice, promotionPrice) => {
        var result = 0;
        if (promotionPrice === null) {
            result = parseFloat(sellPrice)
        }
        else {
            result = parseFloat(sellPrice) - parseFloat(promotionPrice)
        }
        return result;
    }
    render() {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        return (
            <main>
                <div className="slider-area ">
                    {/* <!-- Mobile Menu --> */}
                    <div className="slider-active">
                        <div className="single-slider slider-height data-background-home">
                            <div className="container">
                                <div className="row d-flex align-items-center justify-content-between">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 d-none d-md-block">
                                        <div className="hero__img" data-animation="bounceIn" data-delay=".4s">
                                            <img src={require('../../img/hero/hero_man.png')} />
                                        </div>
                                    </div>
                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-8">
                                        <div className="hero__caption">
                                            <span data-animation="fadeInRight" data-delay=".4s">Up To 25% Discount</span>
                                            <h1 data-animation="fadeInRight" data-delay=".6s">Winter</h1>
                                            <p data-animation="fadeInRight" data-delay=".8s">Best Shoe By 2020!</p>
                                            {/* <!-- Hero-btn --> */}
                                            <div className="hero__btn" data-animation="fadeInRight" data-delay="1s">
                                                <Link to="/productList" className="btn btn1 hero-btn">Shop Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="single-slider slider-height data-background">
                            <div className="container">
                                <div className="row d-flex align-items-center justify-content-between">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 d-none d-md-block">
                                        <div className="hero__img" data-animation="bounceIn" data-delay=".4s">
                                            <img src={require('../../img/hero/hero_man.png')} />
                                        </div>
                                    </div>
                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-8">
                                        <div className="hero__caption">
                                            <span data-animation="fadeInRight" data-delay=".4s">60% Discount</span>
                                            <h1 data-animation="fadeInRight" data-delay=".6s">Winter <br /> Collection</h1>
                                            <p data-animation="fadeInRight" data-delay=".8s">Best Cloth Collection By 2020!</p>

                                            <div className="hero__btn" data-animation="fadeInRight" data-delay="1s">
                                                <Link href="industries.html" className="btn btn1 hero-btn">Shop Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* <!-- slider Area End-->
                    <!-- Category Area Start--> */}
                <section className="category-area section-padding30">
                    <div className="container-fluid">
                        {/* <!-- Section Tittle --> */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-tittle text-center mb-85">
                                    <h2>Shop by Category</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-2">

                            </div>
                            <div className="col-xl-4 col-lg-6">
                                <div className="single-category mb-30">
                                    <div className="category-img text-center">
                                        <img src={require('../../img/categori/cat2.jpg')} />
                                        <div className="category-caption">
                                            <span className="collection">Discount!</span>
                                            <h2>Giày nữ</h2>
                                            <span className="best"><Link to={`/productList/Nữ`}>New Collection</Link></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6">
                                <div className="single-category mb-30">
                                    <div className="category-img">
                                        <img src={require('../../img/categori/cat3.jpg')} />
                                        <div className="category-caption">
                                            <h2>Giày nam</h2>
                                            <span className="best"><Link to={`/productList/Nam`}>Best New Deals</Link></span>
                                            <span className="collection">New Collection</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2">

                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Category Area End-->
                <!-- Latest Products Start --> */}
                <section className="latest-product-area">
                    <div className="container">
                        <div className="row product-btn d-flex justify-content-end align-items-end">
                            {/* <!-- Section Tittle --> */}
                            <div className="col-xl-6 col-lg-5 col-md-5">
                                <div className="section-tittle mb-30">
                                    <h2>Latest Products</h2>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-7 col-md-7">
                                <div className="properties__button f-right">
                                    {/* <!--Nav Button  --> */}
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">All</a>
                                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">New</a>
                                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Featured</a>
                                            <a className="nav-item nav-link" id="nav-last-tab" data-toggle="tab" href="#nav-last" role="tab" aria-controls="nav-contact" aria-selected="false">Offer</a>
                                        </div>
                                    </nav>
                                    {/* <!--End Nav Button  --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- Nav Card --> */}
                        <div className="tab-content" id="nav-tabContent">
                            {/* <!-- card one --> */}
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                {this.props.products ?
                                    <div className="row">
                                        {this.state.stateProducts.map((product, idx) => {
                                            return (
                                                <div className="col-xl-4 col-lg-4 col-md-6">
                                                    <div className="single-product mb-60">
                                                        <div className="product-img">
                                                            <img src={`${product.image}`} />
                                                            <div className="new-product">
                                                                <span>New</span>
                                                            </div>
                                                        </div>
                                                        <div className="product-caption">
                                                            <div className="product-ratting">
                                                                <i className="far fa-star"></i>
                                                                <i className="far fa-star"></i>
                                                                <i className="far fa-star"></i>
                                                                <i className="far fa-star low-star"></i>
                                                                <i className="far fa-star low-star"></i>
                                                            </div>
                                                            <h4><Link to={`/${product.code}`}>{product.name}</Link></h4>
                                                            <div className="price">
                                                                <ul>
                                                                    {/* <li>{formatter.format(this.processPrice(product.importPrice, product.promotion))}</li> */}
                                                                    <li>{product.sellPrice} đ</li>
                                                                    <li className="discount">{product.sellPrice + 50000}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div> :
                                    <div className="row">
                                        {this.props.products.products.map((product, idx) => {
                                            return (
                                                <div className="col-xl-4 col-lg-4 col-md-6">
                                                    <div className="single-product mb-60">
                                                        <div className="product-img">
                                                            <img src={`http://localhost:5000/${product.imagePath}`} />
                                                            <div className="new-product">
                                                                <span>New</span>
                                                            </div>
                                                        </div>
                                                        <div className="product-caption">
                                                            <div className="product-ratting">
                                                                <i className="far fa-star"></i>
                                                                <i className="far fa-star"></i>
                                                                <i className="far fa-star"></i>
                                                                <i className="far fa-star low-star"></i>
                                                                <i className="far fa-star low-star"></i>
                                                            </div>
                                                            <h4><Link to={`/${product.alias}`}>{product.name}</Link></h4>
                                                            <div className="price">
                                                                <ul>
                                                                    <li>{formatter.format(this.processPrice(product.sellPrice, product.promotion))}</li>
                                                                    <li className="discount">{product.sellPrice}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        })}


                                    </div>
                                }
                            </div>
                            {/* <!-- Card two --> */}
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product4.png')} />
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product5.png')} />
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product6.png')} />
                                                <div className="new-product">
                                                    <span>New</span>
                                                </div>
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product2.png')} />
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product3.png')} />
                                                <div className="new-product">
                                                    <span>New</span>
                                                </div>
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product1.png')} />
                                                <div className="new-product">
                                                    <span>New</span>
                                                </div>
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Card three --> */}
                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product2.png')} />
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product3.png')} />
                                                <div className="new-product">
                                                    <span>New</span>
                                                </div>
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product1.png')} />
                                                <div className="new-product">
                                                    <span>New</span>
                                                </div>
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product4.png')} />
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product5.png')} />
                                                <div className="new-product">
                                                    <span>New</span>
                                                </div>
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product5.png')} />
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- card foure --> */}
                            <div className="tab-pane fade" id="nav-last" role="tabpanel" aria-labelledby="nav-last-tab">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product1.png')} />
                                                <div className="new-product">
                                                    <span>New</span>
                                                </div>
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product2.png')} />
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product3.png')} />
                                                <div className="new-product">
                                                    <span>New</span>
                                                </div>
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product4.png')} />
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product5.png')} />
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6">
                                        <div className="single-product mb-60">
                                            <div className="product-img">
                                                <img src={require('../../img/categori/product6.png')} />
                                                <div className="new-product">
                                                    <span>New</span>
                                                </div>
                                            </div>
                                            <div className="product-caption">
                                                <div className="product-ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                    <i className="far fa-star low-star"></i>
                                                </div>
                                                <h4><a href="#">Green Dress with details</a></h4>
                                                <div className="price">
                                                    <ul>
                                                        <li>$40.00</li>
                                                        <li className="discount">$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Nav Card --> */}
                    </div>
                </section>

                {/* <div className="gallery-wrapper lf-padding">
                    <div className="gallery-area">
                        <div className="container-fluid">
                            {this.props.products.brands === undefined ?
                                <div className="row">
                                    {this.props.products.brands.map((brand, idx) => {
                                        if (idx < 5) {
                                            return (
                                                <div className="gallery-items" key={idx}>
                                                    <Link to={`/productList`}><img className="weightImage" src={brand.image} /></Link>
                                                </div>
                                            )
                                        }
                                        else return null
                                    })
                                    }
                                </div> :
                                <div className="row">
                                    {this.state.stateBrand.map((brand, idx) => {
                                        if (idx < 5) {
                                            return (
                                                <div className="gallery-items" key={idx}>
                                                    <Link to={`/productList`}><img className="weightImage" src={brand.image} /></Link>
                                                </div>
                                            )
                                        }
                                        else return null
                                    })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div> */}
            </main>
        );
    }

}
const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        urlBackend: state.urlBackend,
        sizeIsSelect: state.sizeIsSelect,
        wishLists: state.wishLists,
        nameBrandUrl: ownProps.match.params.brandName,
        filterProduct: state.filterProduct,
    }
}
//nếu muốn mua nhiều sản phẩm cùng lúc thì truyền số lượng vào
const mapDispartToProps = (dispatch, props, ownProps) => {
    return {
        onLoadProductFromApi: (product) => {
            dispatch(actOnloadProductFromApi(product));
        },
        onLoadBrandsFromApi: (brands) => {
            dispatch(actLoadBrandsFromAPI(brands));
        },
        onLoadCategoriesFromApi: (categories) => {
            dispatch(actLoadCategoriesFromAPI(categories));
        },
        onLoadGroupsFromApi: (groups) => {
            dispatch(actLoadGroupsFromAPI(groups));
        },
        // onChangeMessage : (message) =>{
        //     dispatch(actChangeMessage(message));
        // }
    }
}


export default connect(mapStateToProps, mapDispartToProps)(Home);