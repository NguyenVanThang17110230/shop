import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "../productList/productList.css";
import ProductService from '../../services/ProductService'
import BrandService from '../../services/BrandService';
import GroupService from '../../services/GroupService';
import CategoryService from '../../services/CategoryService';
import {
  Form,
  Pagination
} from "react-bootstrap";
class ProductList extends Component {
  state = {
    stateBrand: [],
    stateCategory: [],
    stateGroup: [],
    stateBestSeller: '',
  }
  componentDidMount = () => {
    window.scrollTo(0, 0)
    
  }
  // loadData() {
  //   this.loadProduct();
  //   this.loadBrand();
  //   this.loadGroup();
  //   this.loadCategory();
  // }
  // async loadProduct() {
  //   await ProductService.listProduct().then(res => {
  //     this.props.onLoadProductFromApi(res.data.products)
  //   })
  // }
  // async loadBrand() {
  //   await BrandService.listBrand().then(res => {
  //     this.setState({ stateBrand: res.data.brands })
  //   })
  // }
  // async loadGroup() {
  //   await GroupService.listGroup().then(res => {
  //     this.setState({ stateGroup: res.data.Groups })
  //   })
  // }
  // async loadCategory() {
  //   await CategoryService.listCategory().then(res => {
  //     this.setState({ stateCategory: res.data.categories })
  //   })

  // }
  bestSeller = () => {
    this.props.onFilterBestSeller(this.props.products)
    this.processPaging(this.props.numPageSelect);
  }
  deleteBestSeller = () => {
    this.props.deleteFilter(this.props.products)
    this.processPaging(this.props.numPageSelect);
  }
  filterIncrease = () => {
    this.props.onFilterPriceIncrease(this.props.products);
    this.processPaging(this.props.numPageSelect);
  }
  deleteFilterIncrease = () => {
    this.props.deleteFilter(this.props.products)
    this.processPaging(this.props.numPageSelect);
  }
  filterDecrease = () => {
    this.props.onFilterPriceDecrease(this.props.products);
    this.processPaging(this.props.numPageSelect);
  }
  deleteFilterDecrease = () => {
    this.props.deleteFilter(this.props.products)
    this.processPaging(this.props.numPageSelect);
  }
  render() {
    var {categories, groups, brands} = this.props
    return (
      <div className="backGroundProductList">
        <div className="slider-area ">
          <div className="single-slider slider-height2 d-flex align-items-center data-background-productlist">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap text-center">
                    {this.props.nameBrandUrl === undefined ?
                      <h2>Tất cả sản phẩm</h2> :
                      <h2>{this.props.nameBrandUrl}</h2>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container backgroundContainer radiusDelivery">
          <div id="carouselExampleControls" className="carousel slide " data-ride="carousel">
            <div className="carousel-inner ">
              <div className="carousel-item active ">
                <p className="textCenter color-text p1"><i className="fas fa-truck truck_s"></i><strong className="paddingLeftStrong">Giao hàng miễn phí</strong>: Miễn phí giao hàng cho đơn trên 1.000.000đ của Shoes Shop</p>
              </div>
              <div className="carousel-item textCenter">
                <p className=" color-text p1"><i className="fas fa-truck truck_s"></i><strong className="paddingLeftStrong">Giao hàng miễn phí</strong>: Miễn phí giao hàng cho đơn trên 1.000.000đ của Shoes Shop</p>
              </div>
              <div className="carousel-item">
                <p className="textCenter color-text p1"><i className="fas fa-truck truck_s"></i><strong className="paddingLeftStrong">Giao hàng miễn phí</strong>: Miễn phí giao hàng cho đơn trên 1.000.000đ của Shoes Shop</p>
              </div>
            </div>
            {/* <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a> */}
          </div>
        </div>
        {/* <div className="header-services">
        <div className="ps-services owl-slider" data-owl-auto="true" data-owl-loop="true" data-owl-speed="7000" data-owl-gap="0" data-owl-nav="true" data-owl-dots="false" data-owl-item="1" data-owl-item-xs="1" data-owl-item-sm="1" data-owl-item-md="1" data-owl-item-lg="1" data-owl-duration="1000" data-owl-mousedrag="on">
          <p className="ps-service"><i className="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Sky Store</p>
          <p className="ps-service"><i className="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Sky Store</p>
          <p className="ps-service"><i className="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Sky Store</p>
        </div>
      </div> */}
        <div className="container containerMainMarginTop">
          <div className="row">
            <div className="col-2 backgroundLeftCategory">
              <div className="tagFilter">Danh mục</div>
              {categories.map((Category, idx) => {
                if (this.props.nameBrandUrl === Category.name) {
                  return (
                    <div className="filterCategoryEffect" key={idx}>
                      <Link to={`/productList/${Category.name}`}>{Category.name}</Link>
                    </div>
                  )
                } else {
                  return (
                    <div className="filterCategory" key={idx}>
                      <Link to={`/productList/${Category.name}`}>{Category.name}</Link>
                    </div>
                  )
                }
              })}
              <div className="tagFilter">Nhóm</div>
              {groups.map((Group, idx) => {
                if (this.props.nameBrandUrl === Group.name) {
                  return (
                    <div className="filterCategoryEffect" key={idx}>
                      <Link to={`/productList/${Group.name}`}>{Group.name}</Link>
                    </div>
                  )
                }
                else {
                  return (
                    <div className="filterCategory" key={idx}>
                      <Link to={`/productList/${Group.name}`}>{Group.name}</Link>
                    </div>
                  )
                }
              })}

              {/* <div className="filterCategory">
                <Link to="product-listing.html">Giày đá banh <i className="">(21)</i></Link>
              </div>
              <div className="filterCategory">
                <Link to="product-listing.html">Giày thời trang <i className="">(105)</i></Link>
              </div>
              <div className="filterCategory">
                <Link to="product-listing.html">Giày tây <i className="">(105)</i></Link>
              </div> */}

              <div className="tagFilter">Thương hiệu</div>
              {brands.map((Brand, idx) => {
                if (this.props.nameBrandUrl === Brand.name) {
                  return (
                    <div className="filterBrandEffect" key={idx}>
                      <Link to={`/productList/${Brand.name}`}>
                        <img
                          className="filterImgBrand"
                          src={`${this.props.urlBackend}${Brand.imagePath}`} />
                      </Link>
                    </div>
                  )
                }
                else {
                  return (
                    <div className="filterBrand" key={idx}>
                      <Link to={`/productList/${Brand.name}`}>
                        <img
                          className="filterImgBrand"
                          src={`${this.props.urlBackend}${Brand.imagePath}`} />
                      </Link>
                    </div>
                  )
                }
              })}


              {/* <div className="filterBrand">
                <Link to="product-listing.html">
                  <img 
                    className="filterImgBrand" 
                    src="https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"/>
                </Link>
              </div>
              <div className="filterBrand">
                <Link to="product-listing.html">
                  <img className="filterImgBrand" 
                  src="https://i.pinimg.com/originals/83/dd/1a/83dd1aa03d73812fcbd5a3d18a181aeb.png"/>
                </Link>
              </div>
              <div className="filterBrand">
                <Link to="product-listing.html">
                  <img className="filterImgBrand" 
                    src="https://181ge72mb8rnbx7z1k119thi-wpengine.netdna-ssl.com/wp-content/uploads/2018/03/vans-logo-2-300x240.png"/>
                </Link>
              </div>
              <div className="filterBrand">
                <Link to="product-listing.html">
                  <img className="filterImgBrand" 
                    src="https://preview.thenewsmarket.com/Previews/RBOK/StillAssets/800x600/321447.jpg"/>
                </Link>
              </div>
              <div className="filterBrand">
                <Link to="product-listing.html">
                  <img className="filterImgBrand" 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/1200px-Converse_logo.svg.png"/>
                </Link>
              </div> */}


              {/* <div className="ps-sidebar" data-mh="product-listing">
                <aside className="ps-widget--sidebar ps-widget--category">
                  <div className="ps-widget__header">
                    <div className="tagFilter">Danh mục</div>
                  </div>
                  <div className="ps-widget__content">
                    <ul className="ps-list--checked ">
                      <li className="current"><a href="product-listing.html">Life(521)</a></li>
                      <li><Link to="product-listing.html">Giày chạy(76)</Link></li>
                      <li><Link to="product-listing.html">Giày đá banh(21)</Link></li>
                      <li><Link to="product-listing.html">Giày thời trang(105)</Link></li>
                      <li><Link to="product-listing.html">More</Link></li>
                    </ul>
                  </div>
                </aside> */}
              {/* <aside className="ps-widget--sidebar ps-widget--filter">
                <div className="ps-widget__header">
                  <h3>Category</h3>
                </div>
                <div className="ps-widget__content">
                  <div className="ac-slider" data-default-min="300" data-default-max="2000" data-max="3450" data-step="50"
                    data-unit="$"></div>
                  <p className="ac-slider__meta">Price:<span className="ac-slider__value ac-slider__min"></span>-<span
                    className="ac-slider__value ac-slider__max"></span></p><a className="ac-slider__filter ps-btn"
                      href="#">Filter</a>
                </div>
              </aside> */}



              {/* <aside className="ps-widget--sidebar ps-widget--category">
                  <div className="ps-widget__header">
                    <div className="tagFilter">Thương hiệu</div>
                  </div>
                  <div className="ps-widget__content">
                    <ul className="ps-list--checked">
                      <li className="current"><a href="product-listing.html">Nike(521)</a></li>
                      <li><Link to="product-listing.html">Adidas(76)</Link></li>
                      <li><Link to="product-listing.html">Vans(36)</Link></li>
                      <li><Link to="product-listing.html">Converse(108)</Link></li>
                      <li><Link to="product-listing.html">Puma(108)</Link></li>
                      <li><Link to="product-listing.html">Bitis(47)</Link></li>
                      <li><Link to="product-listing.html">Reebok‎(47)</Link></li>
                    </ul>
                  </div>
                </aside> */}

              {/* </div> */}
            </div>
            <div className="col-10 rightList">
              <div className="container backgroundRow boderRaFilter">
                <div className="row">
                  <div className="col-2">
                    <div className="nameFilter">Sắp xếp theo</div>
                  </div>
                  <div className="col-2">
                    {this.props.codeFilter === 0 ?
                      <div className="btn btnFilter selectFilter" onClick={() => this.deleteBestSeller()}>Khuyến mãi tốt nhất</div> :
                      <div className="btn btnFilter" onClick={() => this.bestSeller()}>Khuyến mãi tốt nhất</div>
                    }
                  </div>
                  <div className="col-2">
                    <div className="btn btnFilter marginSelling">Bán chạy</div>
                  </div>
                  <div className="col-2">
                    {this.props.codeFilter === 2 ?
                      <div className="btn btnFilter marginIncrease selectFilter" onClick={() => { this.deleteFilterIncrease() }}>Giá tăng dần</div> :
                      <div className="btn btnFilter marginIncrease" onClick={() => { this.filterIncrease() }}>Giá tăng dần</div>
                    }
                  </div>
                  <div className="col-2">
                    {this.props.codeFilter === 3 ?
                      <div className="btn btnFilter marginDecrease selectFilter" onClick={() => { this.deleteFilterDecrease() }}>Giá giảm dần</div> :
                      <div className="btn btnFilter marginDecrease" onClick={() => { this.filterDecrease() }}>Giá giảm dần</div>
                    }
                  </div>
                  <div className="col-2">
                    <div className="displayInput">
                      <input type="text" className="form-control marginInputLeft" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Giá thấp nhất" />
                      <div className="marginInputAAA"> - </div>
                      <input type="text" className="form-control marginInputRight" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Giá cao nhất" />
                      <div className="btn btnSearchPrice">Tìm</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  {this.props.showProduct}
                </div>
                <div className="pagingDisplay">
                  <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                      <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        {this.props.products.map((product, idx) => {
                          if (idx < this.pagingShow()) {
                            if(idx+1 === this.props.numPageSelect){
                              return (
                                <Pagination.Item active onClick={() => this.processPaging(idx + 1)}>{idx + 1}</Pagination.Item>
                              )
                            }else{
                            return (
                              <Pagination.Item onClick={() => this.processPaging(idx + 1)}>{idx + 1}</Pagination.Item>
                            )}
                          }
                          else return null
                        })
                        }
                        <Pagination.Next />
                        <Pagination.Last />
                      </Pagination>
                    </div>
                    <div className="col-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  processPaging = (idPaging) => {
    console.log(this.props.location.pathname);
    // if(this.props.location.pathname === '/productList'){
      this.props.onSelectPagingProduct(this.props.products, idPaging)
    
    // else{
    //   this.props.onSelectPagingProduct(this.props.filterProduct, idPaging)
    // }
    window.scrollTo(0, 400)
  }
  pagingShow = () => {
    var numOfPagingSelect;
      numOfPagingSelect = Math.floor(this.props.products.length / 12) + 1
    
    // else{
    //   numOfPagingSelect = Math.floor(this.props.filterProduct.length / 12) + 1
    // }
    // var numOfPagingSelect = Math.floor(this.props.products.length / 12) + 1
    return numOfPagingSelect;
  }
}
export default withRouter(ProductList);
