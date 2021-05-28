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
        dataView: [],
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
            this.setState({ stateCategory: res.data.categories })
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
    _setView = (code) =>{
        const { stateProducts } = this.state
        const data = stateProducts.filter(x => x.categoryCode === code)
        if(data && data.length>0){
            this.setState({
                dataView:data
            })
        }
    }
    render() {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        console.log("state", this.state);
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
                                    <div class="btn-group">
                                        <button type="button"
                                            class="btn btn-danger dropdown-toggle th-89"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            style={{
                                                background: "#fff",
                                                color: "black",
                                                border: "none",
                                                borderBottom: "1px solid #000",
                                                borderRadius: 0,
                                                fontSize: "22px",
                                                opacity: "1",
                                                fontWeight:'bold'
                                            }}
                                        >
                                            Thể loại
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            {this.state.stateCategory.map((data, index) => {
                                                return (
                                                    <button
                                                        class="dropdown-item"
                                                        type="button"
                                                        key={index}
                                                        onClick={()=>this._setView(data.code)}
                                                    >
                                                        {data.name}
                                                    </button>
                                                )
                                            })}
                                            {/* <button class="dropdown-item" type="button">Action</button>
                                            <button class="dropdown-item" type="button">Another action</button>
                                            <button class="dropdown-item" type="button">Something else here</button> */}
                                        </div>
                                    </div>
                                    {/* <!--End Nav Button  --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- Nav Card --> */}
                        <div className="tab-content" id="nav-tabContent">
                            {/* <!-- card one --> */}
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                {this.state.dataView.length < 1 ?
                                    <div className="row">
                                        {this.state.stateProducts.map((product, idx) => {
                                            return (
                                                <div className="col-xl-4 col-lg-4 col-md-6" key={idx}>
                                                    <div className="single-product mb-60">
                                                        <div className="product-img">
                                                            <img src={`${product.image}`} />
                                                            <div className="new-product">
                                                                <span>New</span>
                                                            </div>
                                                        </div>
                                                        <div className="product-caption">
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
                                        {this.state.dataView.map((product, idx) => {
                                            return (
                                                <div className="col-xl-4 col-lg-4 col-md-6" key={idx}>
                                                    <div className="single-product mb-60">
                                                        <div className="product-img">
                                                            <img src={product.image} />
                                                            <div className="new-product">
                                                                <span>New</span>
                                                            </div>
                                                        </div>
                                                        <div className="product-caption">
                                                            <div className="product-ratting">
                                                            </div>
                                                            <h4><Link to={`/${product.code}`}>{product.name}</Link></h4>
                                                            <div className="price">
                                                                <ul>
                                                                    <li>{product.sellPrice} đ</li>
                                                                    {/* <li className="discount">{product.sellPrice}</li> */}
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