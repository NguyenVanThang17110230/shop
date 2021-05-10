import * as Types from '../constants/actTypeWishList';
var crypto = require('crypto-js');
var data;
if (localStorage.getItem('Wslcv_azct')) {
    var bytes = crypto.AES.decrypt(localStorage.getItem('Wslcv_azct'), '300699NguyenTanVo');
    // // Chuyển sang chuỗi gốc
    var message_decode = bytes.toString(crypto.enc.Utf8);

    // var data = JSON.parse(localStorage.getItem('CART'));
    data = JSON.parse(message_decode);
}
else data = JSON.parse(localStorage.getItem('Wslcv_azct'));;


var initialStateWishList = data ? data : [];

const wishLists = (state = initialStateWishList, action) => {
    var { idProduct } = action;
    var index = -1;     //Không tìm thấy thì index = -1
    switch (action.type) {
        case Types.ADD_PRODUCT_TO_WISH_LIST:
            index = state.findIndex(x => x.idProduct === idProduct)       //tìm mã sản phẩm
            if(index !== -1){

            }
            else{
                state.push({
                    idProduct: idProduct
                })
            }
            localStorage.setItem('Wslcv_azct', crypto.AES.encrypt(JSON.stringify(state), '300699NguyenTanVo').toString());
            return [...state];
        case Types.DELETE_PRODUCT_IN_WISH_LIST:
            index = state.findIndex(x => x.idProduct === idProduct)  
            if(index !== -1){
                state.splice(index, 1)
            }
            localStorage.setItem('Wslcv_azct', crypto.AES.encrypt(JSON.stringify(state), '300699NguyenTanVo').toString());
            return [...state];

        default: return [...state];
    }
}
export default wishLists;
