import * as Types from '../constants/actProcessFilterProduct';

var discountCodes = {
    productFilter: [],
    code:''
}
const stateFilter = (state = discountCodes, action) => {
    var { product } = action;
    var codeFilter = -1;     // {0 là bestSeller, 1 là bán chạy, 2 là giá tăng dần, 3 là giá giảm dần}   
    var productTemp = product;
    switch (action.type) {
        case Types.FILTER_BEST_SELLER:
            codeFilter = 0;
            return {
                ...state,
                productFilter: productTemp.sort((a,b)=>b.promotion - a.promotion),
                code: 0
            }
        case Types.DELETE_FILTER:
            return {
                ...state,
                productFilter: product.sort((a,b)=>a.id - b.id),
                code: ''
            }
        case Types.FILTER_PRICE_DECREASE:
            codeFilter = 3;
            return {
                ...state,
                productFilter: productTemp.sort((a,b)=>parseInt(b.sellPrice - b.promotion) - parseInt(a.sellPrice - a.promotion)),
                code: codeFilter
            }
        case Types.FILTER_PRICE_INCREASE:
            codeFilter = 2;
            return {
                ...state,
                productFilter: productTemp.sort((a,b)=>parseInt(a.sellPrice - a.promotion) - parseInt(b.sellPrice - b.promotion)),
                code: codeFilter
            }
        default: return { ...state };
    }
}

export default stateFilter;