import * as Types from '../constants/ActionType';
export const actAddToCart = (product, quantity, total, totalDiscount) =>{
    return{
        type: Types.ADD_TO_CART,
        product,
        quantity,
        total,
        totalDiscount
    }
}
export const actChangeMessage = (message) =>{
    return{
        type : Types.CHANGE_MASAGE,
        message
    }
}
export const actDeleteProductInCart = (product) =>{
    return {
        type : Types.DELETE_PRODUCT_IN_CART,
        product
    }
}
export const actChangeQuantityProductInCart = (product, check) =>{
    return {
        type : Types.CHANGE_QUANTITY_PRODUCT_IN_CART,
        product,
        check
    }
}
export const actChangeDiscountInCart = (discount, inputDiscount, cart)=>{
    return {
        type : Types.CHANGE_DISCOUNT_IN_CART,
        discount,
        inputDiscount, 
        cart
    }
}
export const actOnLoadThisPage = cart =>{
    return {
        type: Types.ON_LOAD_PAGE_CART,
        cart
    }
}
export const actOnLoadProductIsSelect = (product, index) =>{
    return{
        type: Types.ON_LOAD_PRODUCT_IS_SELECT,
        product, 
        index

    }
}
export const actOnAddProductToWishList = (product) => {
    return{
        type: Types.ADD_TO_WISH_LIST,
        product
    }
}
export const actOnDeleteProductInWishList = (product) => {
    return{
        type: Types.ADD_TO_WISH_LIST,
        product
    }
}