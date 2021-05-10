import React, { Component } from "react";
import "../cart/cart.css";
import PromotionService from '../../services/PromotionService';
import ProductService from '../../services/ProductService'
class Cart extends Component {
    state = {};
    componentDidMount(){
        window.scrollTo(0, 0)
        ProductService.listProduct().then(res =>{
            this.props.onLoadProductFromApi(res.data.products)
        })
        this.loadDiscount();
    }
    loadDiscount = ()=>{
        PromotionService.listPromotion().then((res) => {
            this.props.onLoadPromotionInState(res.data.promotions);
        });
    }
    onLoad = (cart)=>{
        var { onLoadThisPage } = this.props
        onLoadThisPage(cart);
    }
    resultProductInCart = cart=>{
        var result=0;
        if(cart.length > 0){
            for(var i = 0 ; i < cart.length;i++){
                result = result + cart[i].quantity;
            }
        }
        return result;
    }
    render() {
        var { cartItem, cartResult, cart } = this.props;
        return (
            <div className="backgrColor" onLoad={()=>this.onLoad(cart)}>
                <br />
                <br />
                <h4 className="paddingLeftTitleCart">GIỎ HÀNG <span className="colorSpan">({this.resultProductInCart(cart)} sản phẩm)</span></h4>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {cartItem}
                        </div>
                        <div className="col-lg-4">
                            {cartResult}
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </div>
        );
    }
}

export default Cart;
