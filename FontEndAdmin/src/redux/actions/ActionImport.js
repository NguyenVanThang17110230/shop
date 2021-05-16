import * as Types from '../constants/actTypeImportGood';
export const actAddProductToImport = (product, idProductOnApi)=>{
    return {
        type: Types.ADD_PRODUCT_TO_IMPORTS,
        product, 
        idProductOnApi
    }
}
export const actDeleteProductInImport = (idProduct) =>{
    return{
        type: Types.DELETE_PRODUCT_IN_iMPORTS,
        idProduct,
    }
}

export const actAddProductSizeInImport = (productSize) =>{
    return{
        type: Types.ADD_PRODUCT_SIZE_TO_IMPORT,
        productSize,
    }
}
export const actDeleteProductSizeInImport = (indexProductSize) =>{
    return{
        type: Types.DELETE_PRODUCT_SIZE_IN_IMPORT,
        indexProductSize
    }
}