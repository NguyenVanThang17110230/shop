import * as Types from '../constants/actTypeImportGood';

// var initialStateImportProductGood = {
//     products:{
//         product: [],
//         productSize: []
//     }
// }
var data = JSON.parse(localStorage.getItem('STATE_IMPORT'));
var initialStateImportProductGood = data ? data : {
    products: [],
    productSizes: [],
};


const stateImportProductGood = (state = initialStateImportProductGood, action) => {
    var { idProduct, product, idProductOnApi , productSize, indexProductSize } = action
    var indexCode = -1;
    var indexName = -1;
    var indexCategory = -1;
    switch (action.type) {
        case Types.ADD_PRODUCT_TO_IMPORTS:
            indexCode = state.products.findIndex(x => x.product.productCode === product.productCode)
            indexName = state.products.findIndex(x => x.product.name === product.name)
            indexCategory = state.products.findIndex(x=>x.product.groupId === product.groupId)
            console.log(indexCategory)
            if (indexCode !== -1 || indexName !== -1) {
                if(indexCategory!==-1){

                }
                else{
                    state.products.push({
                        product
                    })
                }

            }
            else {
                state.products.push({
                    product
                })
            }
            localStorage.setItem('STATE_IMPORT', JSON.stringify(state));
            return {
                ...state
            }
        case Types.ADD_PRODUCT_SIZE_TO_IMPORT:
            state.productSizes.push({
                productSize
            })
            localStorage.setItem('STATE_IMPORT', JSON.stringify(state));
            return {
                ...state
            }
        // localStorage.setItem('StateImport'(state));
        case Types.DELETE_PRODUCT_IN_iMPORTS:
            for (var j = 0; j < state.productSizes.length; j++) {
                if (parseInt(state.productSizes[j].productSize.productId) === parseInt(idProduct)) {
                    state.productSizes.splice(j, 1);
                    j -= 1; /// khi gặp thì trả về vị trí đó để xét tiếp tránh trường hợp là nó bị dồn về xóa thiếu
                }

            }
            for (var i = 0; i < state.products.length; i++) {
                if (i === idProduct) {
                    state.products.splice(idProduct, 1);
                }
            }
            // localStorage.setItem('CART', JSON.stringify(state));
            localStorage.setItem('STATE_IMPORT', JSON.stringify(state));
            return {
                ...state
            }
        case Types.DELETE_PRODUCT_SIZE_IN_IMPORT:
            state.productSizes.splice(indexProductSize, 1)
            localStorage.setItem('STATE_IMPORT', JSON.stringify(state));
            return {
                ...state
            }
        default: return { ...state };
    }
}
export default stateImportProductGood