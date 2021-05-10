import * as Types from '../constants/ActionType';
var crypto = require('crypto-js');
// Lấy danh sách byte đã mã hóa
var data
if (localStorage.getItem('Catzct_txns')) {
    var bytes = crypto.AES.decrypt(localStorage.getItem('Catzct_txns'), '300699NguyenTanVo');
    // // Chuyển sang chuỗi gốc
    var message_decode = bytes.toString(crypto.enc.Utf8);

    // var data = JSON.parse(localStorage.getItem('CART'));
    data = JSON.parse(message_decode);
}
else data = JSON.parse(localStorage.getItem('Catzct_txns'));;

var initialState = data ? data : [];

const cart = (state = initialState, action) => {
    var { product, quantity, total, check, discount, inputDiscount, totalDiscount, cart, sizeProduct, idSizeProduct } = action;
    var index = -1;     //Không tìm thấy thì index = -1
    var indexSize = -1;
    switch (action.type) {
        case Types.ADD_TO_CART:
            //index = findProductInCart(state, product);
            index = state.findIndex(x => x.product.id === product.id)       //tìm mã sản phẩm

            indexSize = state.findIndex(x => x.idProductSize === sizeProduct)   //tìm index của sản phẩm bằng idSizeProduct
            var promotionProduct =0;
            if(product.promotion == null){
                promotionProduct =0
            }
            else {
                promotionProduct = parseFloat(product.promotion)
            }
            // indexSize = state.findIndex(x => x.product.ProductSizes.id === sizeProduct.id)
            totalDiscount = 0;
            if (index !== -1 && indexSize !== -1) {
                if (state[indexSize].quantity >= 20) {      //Giới hạn số lượng mua là 20 sp một lần mua
                    state[indexSize].quantity = 20;
                }
                else {
                    state[indexSize].quantity += quantity;
                    for (var idx = 0; idx < state.length; idx++) {
                        state[indexSize].totalDiscount = 0;
                    }
                }

            }
            else {
                state.push({
                    product: product,
                    quantity: quantity,
                    total: (product.sellPrice - promotionProduct) * quantity,
                    idProductSize: sizeProduct,
                    totalDiscount,
                })
            }
            // crypto.AES.encrypt('Nội dung cần mã hóa', 'itsasecret123').toString();
            localStorage.setItem('Catzct_txns', crypto.AES.encrypt(JSON.stringify(state), '300699NguyenTanVo').toString());
            return [...state];
        case Types.DELETE_PRODUCT_IN_CART:
            index = findProductInCart(state, product);
            if (index !== -1) {
                state.splice(index, 1)
            }
            // localStorage.setItem('CART', JSON.stringify(state));
            localStorage.setItem('Catzct_txns', crypto.AES.encrypt(JSON.stringify(state), '300699NguyenTanVo').toString());
            return [...state];
        case Types.CHANGE_QUANTITY_PRODUCT_IN_CART:

            index = state.findIndex(x => x.product.id === product.id)
            indexSize = state.findIndex(x => x.idProductSize === idSizeProduct)         //tìm index của sản phẩm bằng idSizeProduct
            if (check === 1) {
                if (indexSize !== -1) {
                    if (state[indexSize].quantity >= 20) {
                        state[indexSize].quantity = 20;
                    }
                    else {
                        state[indexSize].quantity += 1;
                        //state[indexSize].total = state[indexSize].quantity * state[indexSize].product.sellPrice
                        if (state[indexSize].product.promotion === null) {
                            state[indexSize].total = state[indexSize].quantity * state[indexSize].product.sellPrice
                        }
                        else {
                            state[indexSize].total = state[indexSize].quantity * (parseFloat(state[indexSize].product.sellPrice) - parseFloat(state[indexSize].product.promotion))
                        }
                        for (var idxs = 0; idxs < state.length; idxs++) {
                            state[indexSize].totalDiscount = 0;
                        }
                    }
                }
                else {
                    state.push({
                        product: product,
                        quantity: quantity
                    })
                }
            } else {
                if (indexSize !== -1) {
                    if (state[indexSize].quantity <= 1) {
                        state[indexSize].quantity = 1;
                    }
                    else {
                        state[indexSize].quantity -= 1;
                        if (state[indexSize].product.promotion === null) {
                            state[indexSize].total = state[indexSize].quantity * state[indexSize].product.sellPrice
                        }
                        else {
                            state[indexSize].total = state[indexSize].quantity * (parseFloat(state[indexSize].product.sellPrice) - parseFloat(state[indexSize].product.promotion))
                        }
                        for (var index = 0; index < state.length; index++) {
                            state[indexSize].totalDiscount = 0;
                        }
                    }
                }
                else {
                    state.push({
                        product: product,
                        quantity: quantity,
                        total: total
                    })
                }
            }

            // localStorage.setItem('CART', JSON.stringify(state));
            localStorage.setItem('Catzct_txns', crypto.AES.encrypt(JSON.stringify(state), '300699NguyenTanVo').toString());
            return [...state];
        case Types.CHANGE_DISCOUNT_IN_CART:
            var isDiscount = 0;
            if (cart.length > 0) {
                for (var i = 0; i < discount.promotion.length; i++) {
                    if (discount.promotion[i].promotionCode === inputDiscount) {
                        isDiscount = discount.promotion[i].promotionValue;
                        break;
                    }
                }
                for (var j = 0; j < cart.length; j++) {
                    cart[j].totalDiscount = (cart[j].total * isDiscount);
                }
            }
            // localStorage.setItem('CART', JSON.stringify(state));
            localStorage.setItem('Catzct_txns', crypto.AES.encrypt(JSON.stringify(state), '300699NguyenTanVo').toString());
            return [...state]
        case Types.ON_LOAD_PAGE_CART:
            for (var i = 0; i < cart.length; i++) {
                state[i].totalDiscount = 0;
            }
            // localStorage.setItem('CART', JSON.stringify(state));
            localStorage.setItem('Catzct_txns', crypto.AES.encrypt(JSON.stringify(state), '300699NguyenTanVo').toString());
            return [...state]
        default: return [...state];
    }
}
var findProductInCart = (cart, product) => {
    var index = -1;     //nguyên tắt -1 là không tìm thấy
    if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product.id === product.id) {
                index = i;
                break;
            }
        }
    }
    return index;
}
export default cart;