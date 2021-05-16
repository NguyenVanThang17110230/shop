import * as TypesProduct from '../constants/actTypeProduct';
var initialStateSizeIsSelect={
    sizeIsSelect:[]
}

const sizeIsSelect = (state = initialStateSizeIsSelect, action) => {
    var { product, sizeProduct, idProduct } = action
    console.log("test1",sizeProduct);
    console.log("test2",idProduct);
    var indexIdProSize= -1;
    switch(action.type){
        case TypesProduct.SELECT_SIZE_ON_PRODUCT:
            indexIdProSize = state.sizeIsSelect.findIndex(x => x.sizeProduct.productCode === idProduct )
            if(indexIdProSize !== -1){
                console.log("vào");
                state.sizeIsSelect[indexIdProSize].sizeProduct = sizeProduct
                return {
                    ...state
                };
            }
            else {
                console.log("vào 1");
                state.sizeIsSelect.push({
                    sizeProduct
                })
                return {...state};
            }
        default : return{...state};
    }
}

export default sizeIsSelect;