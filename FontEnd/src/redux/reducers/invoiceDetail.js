import * as TypesOrder from '../constants/actTypeOrder';
var crypto = require('crypto-js');
// Lấy danh sách byte đã mã hóa
var data
if (localStorage.getItem('Oross_acst')) {
    var bytes = crypto.AES.decrypt(localStorage.getItem('Oross_acst'), '300699NguyenTanVo');
    // // Chuyển sang chuỗi gốc
    var message_decode = bytes.toString(crypto.enc.Utf8);

    // var data = JSON.parse(localStorage.getItem('CART'));
    data = JSON.parse(message_decode);
}
else data = JSON.parse(localStorage.getItem('Oross_acst'));;


var initialStateProduct = data ? {
    orders: data,
} : {
        orders: [],
    };

const invoiceDetail = (state = initialStateProduct, action) => {
    var { order } = action
    switch (action.type) {
        // case Types.ON_LOAD_PRODUCT_IS_SELECT:
        //     if(product.length > 0){
        //         for(var i = 0; i < product.length;i++){
        //             if(id === product.id){
        //                 state.push({
        //                     productSelect : product[i]
        //                 })
        //                 break
        //             }
        //         }
        //     }
        //     localStorage.setItem('PRODUCT_SELECT', JSON.stringify(product));
        case TypesOrder.LOAD_DATA_ORDER_FROM_API:
            localStorage.setItem('Oross_acst', crypto.AES.encrypt(JSON.stringify(order), '300699NguyenTanVo').toString());
            return {
                ...state,
                orders: order
            }

        default: return { ...state };

    }
}

export default invoiceDetail;