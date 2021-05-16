import * as Types from '../constants/actTypeProduct';

var initialStateProduct = {
    idProduct: '',

}

const product = (state = initialStateProduct, action) => {
    var {idProduct} = action
    switch (action.type){
        case Types.GET_ID_PRODUCT_AFTER_CREATE_PRODUCT:
            return{
                ...state,
                idProduct: idProduct
            }
        default: return {...state};
    }
}
export default product