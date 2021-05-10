import * as TypesProduct from '../constants/actTypeProduct';
var initialStateSizeIsSelect={
    sizeIsSelect:[]
}

const sizeIsSelect = (state = initialStateSizeIsSelect, action) => {
    var { product, sizeProduct, idProduct } = action
    var indexIdProSize= -1;
    switch(action.type){
        case TypesProduct.SELECT_SIZE_ON_PRODUCT:
            indexIdProSize = state.sizeIsSelect.findIndex(x => x.sizeProduct.productId === idProduct )
            if(indexIdProSize !== -1){
                state.sizeIsSelect[indexIdProSize].sizeProduct = sizeProduct
                return {
                    ...state
                };
            }
            else {
                state.sizeIsSelect.push({
                    sizeProduct
                })
                return {...state};
            }
        default : return{...state};
    }
}

export default sizeIsSelect;