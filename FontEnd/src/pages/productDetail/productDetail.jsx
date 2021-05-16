import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './productDetail.css';
import ReactImageMagnify from 'react-image-magnify';
import ProductService from '../../services/ProductService';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Modal,
    Form,
    Table,
    Carousel
} from "react-bootstrap";
import BrandService from '../../services/BrandService';
import SizeService from '../../services/SizeService';
class ProductDetail extends Component {
    state = {
        quantity: 1,
        resultID: "resultID",
        imgID: "imgID",
        hideContainer: true,
        listImgThumbnail: [],
        realTime: '',
        showModalViewImage: false,
        descriptionText: [],
        listBrand: [],
        productSize:[],
        listSize:[],
    };
    plusQuantity = () => {
        if (this.state.quantity < 20) {
            this.setState({ quantity: this.state.quantity + 1 });
        }
        else {
            this.setState({ quantity: this.state.quantity });
        }
    }
    minusQuantity = () => {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        }
        else {
            this.setState({ quantity: 1 });
        }

    }
    hideContainer = () => {
        if (this.hideContainer === true) {
            this.setState({ hideContainer: false })
        }
        else {
            this.setState({ hideContainer: true })
        }

    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadThumbnailImage();
        this.loadBrand();
        this.getProductsize();
        this.loadSize();
        this.getDataSizeName();
    }
    async loadThumbnailImage() {
        await ProductService.getImageByProductId(this.props.idProduct).then(res => {
            this.setState({ listImgThumbnail: res.data.productImage })
        })
    }
    async loadBrand() {
        await BrandService.listBrand().then(res => {
            this.setState({listBrand:res.data.brands});
        })
    }
    async loadSize() {
        await SizeService.listSize().then(res =>{
            this.setState({listSize:res.data.sizes})
        })
    }
    // async
    async getProductsize (){
        const { product } = this.props;
        await ProductService.getProductSizeByProductCode(product.code).then(res =>{
            console.log("test67",res.data);
            this.setState({productSize:res.data.productSizes});
        })
    }
    // async
    getDataSizeName = () => {
        const {listSize} = this.state;
        console.log("ds",this.state.listSize);
        // const test = listSize.find(x => x.code === code)
        // if(test){
        //     return listSize.sizeName
        // }
    }
    //
    viewBrand = brandCode =>{
        const test = this.state.listBrand.find(x=>x.code === brandCode)
        if(test){
            return test.name
        }
        else{
            return "không"
        }
    }
    setShowModalViewImage = (id) => {
        this.setState({ showModalViewImage: true })
        // this.getImgByIdPro(id);
    }
    setCloseModalViewImage = () => {
        this.setState({ showModalViewImage: false })
    }
    selectImageShow = (imagePath) => {
        this.props.onSelectImageShowToProductDetail(imagePath);
    }
    render() {
        var { product,brand, urlBackend, sizeIsSelect } = this.props
        console.log("$$$",this.props);
        console.log("state",this.state);
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        return (
            <div className="backGroundLayoutProDetail">
                <ToastContainer />
                <div class="slider-area ">
                    <div class="single-slider slider-height2 d-flex align-items-center data-background-profile">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="hero-cap text-center">
                                        <h2>Thông tin sản phẩm</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container paddingTopAndBottomContainerMain backGroundContainerMain">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="">
                                <div className="row">
                                    <div className="col-lg-2 colmaginProDe backGroundContainerMain marginContainerLeft ">
                                        <div className="thumbnailImgProductDetail colmaginThumbail" >
                                            <img
                                                class="card-img-top boderimg_Pro cursorThumbnailImage"
                                                src={product.image}
                                                onClick={() => this.selectImageShow(product.image)}
                                            />
                                        </div>
                                        {this.state.listImgThumbnail.map((listImgThumbnail, idx) => {
                                            if (idx < 3) {
                                                return (
                                                    <div className="thumbnailImgProductDetail colmaginThumbail" >
                                                        <img key={idx}
                                                            id=""
                                                            class="card-img-top boderimg_Pro cursorThumbnailImage"
                                                            src={`${urlBackend}${listImgThumbnail.imagePath}`}
                                                            onClick={() => this.selectImageShow(listImgThumbnail.imagePath)}
                                                        />
                                                    </div>

                                                )
                                            }
                                            else { return (<div></div>) }
                                        })}

                                        {/* <div className="view" onClick={() => this.setShowModalViewImage()}>View All</div> */}
                                        <div className="thumbnailImgProductDetail colmaginThumbail">
                                            <p
                                                className="cursorThumbnailImageMore cursorThumbnailImage"
                                                data-toggle="modal"
                                                data-target=".bd-example-modal-lg"
                                                data-backdrop="static"
                                                data-keyboard="false"
                                                onClick={() => this.setShowModalViewImage()}
                                            >Xem thêm hình ảnh</p>
                                        </div>
                                        <>
                                            <Modal
                                                show={this.state.showModalViewImage}
                                                onHide={this.setCloseModalViewImage}
                                                keyboard={false}
                                                backdrop="static"
                                                dialogClassName="modalImageMaxWidth"
                                                aria-labelledby="example-custom-modal-styling-title"
                                            >
                                                <Modal.Header closeButton>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Carousel>
                                                            {this.state.listImgThumbnail.map((listImgThumbnail, idx) => {
                                                                return (
                                                                    <Carousel.Item>
                                                                        <img
                                                                            key={idx}
                                                                            className="d-block w-100"
                                                                            src={`${urlBackend}${listImgThumbnail.imagePath}`}
                                                                        />
                                                                    </Carousel.Item>
                                                                )
                                                            })}
                                                        </Carousel>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={this.setCloseModalViewImage}>Close</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="container containerRectangleVertical img-zoom-container marginContainerLeft" onMouseMove={this.hideContainer}>
                                            {this.props.imagePath === '' ?
                                                <ReactImageMagnify {...{
                                                    smallImage: {
                                                        // alt: 'Wristwatch by Ted Baker London',
                                                        isFluidWidth: true,
                                                        src: `${product.image}`,
                                                    },
                                                    largeImage: {
                                                        src: `${product.image}`,
                                                        width: 1000,
                                                        height: 1000,
                                                        enlargedImageClassName: 'backGroundZoomImg'

                                                    }
                                                }} /> :
                                                <ReactImageMagnify {...{
                                                    smallImage: {
                                                        // alt: 'Wristwatch by Ted Baker London',
                                                        isFluidWidth: true,
                                                        src: `${urlBackend}${this.props.imagePath}`,
                                                    },
                                                    largeImage: {
                                                        src: `${urlBackend}${this.props.imagePath}`,
                                                        width: 1000,
                                                        height: 1000,
                                                        enlargedImageClassName: 'backGroundZoomImg'

                                                    }
                                                }} />

                                            }
                                            {/* <img class="card-img-top boderimg_Pro" id={this.state.imgID} src={(require('../../img/Shoe/vans.png'))} /> */}
                                            {/* <InnerImageZoom src={(require('../img/Shoe/vans.png'))} zoomSrc={(require('../img/Shoe/vans.png'))} /> */}
                                            {/* <div id="myresult" class="img-zoom-result"></div> */}
                                            {/* <div id={this.state.resultID} class="img-zoom-result"></div> */}
                                        </div>
                                        <p className="textCenter" data-toggle="modal"><i class="fas fa-search-plus zoomDefine"></i>Rê chuột để phóng to</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="vertical-lineHR" />
                        <div className="col-lg-6 paddingLeftContainerRight">
                            {/* <div className="ratingProductPacing">
                                <i class="fas fa-trophy yellowAward"></i>
                                Đứng thứ X trong
                                <Link className="LinkHoverReview">
                                    Top 30 đôi giày bán chạy nhất shop
                                </Link>
                            </div> */}
                            <div className="nameProductPacing">{product.name}</div>
                            <div className="linePacing">
                                <i class="fas fa-star yellowStar"></i>
                                <i class="fas fa-star yellowStar"></i>
                                <i class="fas fa-star yellowStar"></i>
                                <i class="fas fa-star yellowStar"></i>
                                <i class="fas fa-star-half yellowStar"></i>
                                <Link className="LinkHoverReview">
                                    (Xem x nhận xét)
                                </Link>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 positionR">
                                    <div className="">Thương hiệu: <Link className="LinkHoverReview ">{this.viewBrand(product.brandCode)}</Link></div>
                                </div>
                                <div className="col-lg-8 positionR">
                                    <div className="pColorMaSP">Mã SP: {product.productCode}</div>
                                </div>
                            </div>
                            <hr className="paddingDivHR" />
                            <div className="container colorBackContainerShip">
                                <p className="pColorShip"><i class="fas fa-truck iconShip"></i>Miễn phí ship cho đơn hàng trên 1.000.000 vnđ</p>
                            </div>
                            <div className="container containerPrice">
                                {product.promotion !== null ?
                                    <div className="pPriceProduct">{formatter.format(parseFloat(product.sellPrice))}</div> :
                                    <div className="inlinePromotion">
                                        <div className="pPriceProduct">{formatter.format(parseFloat(product.sellPrice) - parseFloat(product.promotion))}</div>
                                        <div className="infoBeforePromotion">{formatter.format(parseFloat(product.sellPrice))}</div>
                                        <div className="percentPromotion">
                                            {/* hàm làm tròn số */}
                                            -{Math.round((100 - (parseFloat(parseFloat(product.sellPrice) - parseFloat(product.promotion)) / parseFloat(product.sellPrice)) * 100) * 100) / 100}%
                                        </div>
                                    </div>

                                }
                            </div>

                            {/* <p className="pSave">Tiết kiệm: 10% ({formatter.format(product.price * 0.1)})</p>
                            <p className="pSave">Giá thị trường: {formatter.format((product.price + (product.price * 0.1)))} </p> */}
                            <hr className="paddingDivHR" />
                            <p>Màu sắc:
                                        <div className="containerChildColor pInline">{product.color}</div>
                            </p>
                            <p>kích thước:
                            {this.state.productSize.map((productSize, idx) => {
                                if (productSize.productCount > 0) {
                                    if (sizeIsSelect !== undefined) {
                                        if (sizeIsSelect.productSize.code === productSize.code) {
                                            return (
                                                <div
                                                    className="sizeShoe pInline sizeShoeSelect"
                                                    onClick={() => this.selectSize(productSize, productSize.productCode
                                                        )}
                                                >
                                                    {productSize.sizeCode}
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div
                                                    className="sizeShoe pInline"
                                                    onClick={() => this.selectSize(productSize, productSize.productCode
                                                        )}
                                                >
                                                    {productSize.sizeCode}
                                                </div>
                                            )

                                        }
                                    }
                                    else {
                                        return (
                                            <div
                                                className="sizeShoe pInline"
                                                onClick={() => this.selectSize(productSize, productSize.productCode)}
                                            >
                                                {productSize.sizeCode}
                                            </div>
                                        )
                                    }
                                }
                            })}
                                {/* <div className="sizeShoe pInline">40</div>
                                <div className="sizeShoe pInline">41</div>
                                <div className="sizeShoe pInline">42</div>
                                <div className="sizeShoe pInline">43</div>
                                <div className="sizeShoe pInline">44</div> */}
                            </p>
                            <p>Số lượng còn lại: <span className="spanQuantity">{sizeIsSelect ? sizeIsSelect.productSize.productCount : '0'}</span>  sản phẩm</p>
                            <hr className="paddingDivHR" />
                            <div className="container containerBuyWish">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p className="textQuantity">Số lượng:</p>
                                        <div className="inlineChangeQuantity">
                                            <div className="minusButton minusText" onClick={this.minusQuantity}><i class="fas fa-minus minusText"></i></div>
                                            <input type="text" className="form-control textBoxSize" id="quantityProduct" value={this.state.quantity} disabled />
                                            <div className="plusButton plusText" onClick={this.plusQuantity}><i class="fas fa-plus plusText"></i></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="btn btn-danger buyButton" onClick={() => this.addToCart(product, this.state.quantity)}>
                                            <i class="fas fa-cart-plus paddingRightCart"></i>
                                        Chọn mua
                                    </div>
                                        <div className="btn btn-primary buyButton">
                                            <i class="fas fa-heart paddingRightCart"></i>
                                        Thêm vào yêu thích
                                    </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container ">
                    <p className="pDicription">Mô tả sản phẩm</p>
                </div>
                <div className="container paddingTopAndBottomContainerMain backGroundContainerMain descriptionProductDetail">
                    <pre>{product.description}</pre>

                </div>
            </div>
        );
    }
    selectSize = (sizeProduct, idProduct) => {
        console.log("test54",sizeProduct);
        console.log("test55",idProduct);
        this.props.onProductIsSelect(sizeProduct, idProduct);
        
    }
    addToCart = (product, quantity) => {
        var { addToCart, sizeIsSelect, cart } = this.props;
        if (sizeIsSelect === undefined) {
            toast.error("Vui lòng chọn size trước khi mua!")
        }
        else {
            console.log("ss3",sizeIsSelect);
            console.log("ss4",this.findIdProAndIdSize(product.code, sizeIsSelect.productSize.code))
            if (this.findIdProAndIdSize(product.code, sizeIsSelect.productSize.code) === -1) {
                if (sizeIsSelect.productSize.productCount >= quantity) {
                    addToCart(product, quantity, sizeIsSelect.productSize.code)
                    toast.success("Sản phẩm đã được thêm vào giỏ hàng!")
                }
                else {
                    toast.error("Số lượng hàng trong kho không đủ!")
                }
            }
            else {
                console.log(cart)
                var i = this.findIdProAndIdSize(product.code, sizeIsSelect.productSize.code)
                if (sizeIsSelect.productSize.productCount >= parseFloat(quantity) + parseFloat(cart[i].quantity)) {
                    addToCart(product, quantity, sizeIsSelect.productSize.code)
                }
                else {
                    toast.error("Số lượng hàng trong kho không đủ!")
                }
            }
        }

    }
    findIdProAndIdSize = (idPro, idSize) => {
        var { cart } = this.props
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].product.code === idPro && cart[i].idProductSize === idSize) {
                    return i;
                }
            }
        }
        else {
            return -1;
        }
        return -1;

    }
}

export default ProductDetail;