import * as Types from '../constants/actTypeWishList';
export const actAddProductToWishList = (idProduct, wishList)=>{
    return {
        type: Types.ADD_PRODUCT_TO_WISH_LIST,
        idProduct,
        wishList
    }
}
export const actDeleteProductInWishList = (idProduct, wishList) =>{
    return{
        type: Types.DELETE_PRODUCT_IN_WISH_LIST,
        idProduct,
        wishList

    }
}