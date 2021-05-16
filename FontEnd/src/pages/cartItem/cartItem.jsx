import React, { Component } from 'react';
import '../cart/cart.css';
import { Link } from 'react-router-dom';
import * as Message from '../../redux/constants/Message';
import './cartItem.css';
import ProductService from '../../services/ProductService';
import BrandService from '../../services/BrandService';
import CategoryService from '../../services/CategoryService';


class CartItem extends Component {
    state = {
        quantity: '',
        caution: false,
        productSize:[],
        listBrand:[],
        listCategory:[],
    }
    onDelete = (product) => {
        console.log("test",product);
        var { onDeleteProductInCart } = this.props;
        onDeleteProductInCart(product);
        // onChangeMessage(Message.MSG_DELETE_PRODUCT_IN_CART_SUCCESS)

    }
    componentDidMount() {
        this.getProductsize();
        this.loadCategory();
        this.loadBrand();
    }
    async getProductsize (){
        const { item } = this.props;
        console.log("thiss",this.props);
        await ProductService.getProductSizeByProductCode(item.product.code).then(res =>{
            this.setState({productSize:res.data.productSizes});
        })
    }
    async loadBrand() {
        await BrandService.listBrand().then(res => {
            this.setState({listBrand:res.data.brands})
        })
    }
    async loadCategory() {
        await CategoryService.listCategory().then(res => {
        this.setState({ listCategory: res.data.categories })
        })
    }
    getName = code => {
        const {productSize} = this.state;
        const test = productSize.find(x => x.code === code);
        if(test){
            return test.sizeCode
        }
    }
    getNameBrand = code =>{
        const {listBrand} = this.state;
        const test = listBrand.find(x => x.code === code)
        if(test){
            return test.name
        }
    }
    getNameCategory = code =>{
        const {listCategory} = this.state;
        const test = listCategory.find(x => x.code === code)
        if(test){
            return test.name
        }
    }
    onChangeQuantity = (product, check, idSizeProduct) => {
        var { onChangQuantityProductInCart } = this.props;
        console.log("ddd",idSizeProduct);
        onChangQuantityProductInCart(product, check, idSizeProduct);
    }
    plusQuantity = (product, quantity, idSizeProduct) => {
        console.log("t1",product);
        console.log("t2",quantity);
        console.log("t3",idSizeProduct);
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
    minusQuantity = (product, quantity , idSizeProduct) => {
        if (this.state.caution === true) {
            this.setState({ caution: false });
        }
        this.onChangeQuantity(product, 0, idSizeProduct)   //0 là trừ
    }
    render() {
        var { item, urlBackend, sizeName } = this.props;
        console.log("gg",this.props);
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
                            <Link to={`/${item.product.code}`}>
                                <img class="card-img-top resizeImage" src={item.product.image} />
                            </Link>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <div className="col-6">
                                    <Link to={`/${item.product.code}`}>
                                        <a className="fontSize_a">
                                            {item.product.name}
                                            <br />
                                        </a>
                                    </Link>

                                    <p className="pCart textSize">
                                        <span>
                                            Size:  {this.getName(item.idProductSize)}
                                        </span>
                                    </p>
                                    <p className="pCart fontSize_p_span">
                                        <span>
                                            Nhóm:
                                                        </span>
                                        <Link className="defaultLink" to="/">{this.getNameCategory(item.product.categoryCode)}</Link>
                                    </p>
                                    <p className="pCart fontSize_p_span">
                                        <span>
                                            Hãng sản xuất:
                                                        </span>
                                        <Link className="defaultLink" to="/">{this.getNameBrand(item.product.brandCode)}</Link>
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
                                            <p className="fontFamilyPriveCardProduct">{formatter.format(parseFloat(item.product.sellPrice))}</p>
                                            }
                                        </div>
                                        <div className="col-6">
                                            <p className="textQuantity">Số lượng:</p>
                                            <div className="inlineChangeQuantity">
                                                <div className="minusButton minusText" onClick={() => this.minusQuantity(item.product, item.quantity, item.idProductSize)}><i class="fas fa-minus"></i></div>
                                                <input type="text" className="form-control textBoxSize" id="quantityProduct" value={item.quantity} disabled />
                                                <div className="plusButton plusText" onClick={() => this.plusQuantity(item.product, item.quantity, item.idProductSize)}><i class="fas fa-plus"></i></div>
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