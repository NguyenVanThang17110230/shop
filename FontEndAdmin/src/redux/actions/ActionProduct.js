import * as Types from '../constants/actTypeProduct';

export const actGetIdProductAfterCreateProduct = (idProduct) =>{
    return{
        type: Types.GET_ID_PRODUCT_AFTER_CREATE_PRODUCT,
        idProduct
    }
}