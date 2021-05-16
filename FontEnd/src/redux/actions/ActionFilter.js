import * as Types from  '../constants/actProcessFilterProduct';

//Xử lý lọc giá giảm sâu nhất
export const actFilterBestPromotion = (product)=>{
    return {
        type: Types.FILTER_BEST_PROMOTION,
        product
    }
}

//Xử ý lọc bán chạy nhất
export const actFilterBestSeller = (product)=>{
    return {
        type: Types.FILTER_BEST_SELLER,
        product
    }
}

//Xử lý lọc Giá tăng dần
export const actFilterPriceIncrease = (product)=>{
    return {
        type: Types.FILTER_PRICE_INCREASE,
        product
    }
}

//Xử lý lọc giá giảm dần
export const actFilterPriceDecrease = (product)=>{
    return {
        type: Types.FILTER_PRICE_DECREASE,
        product
    }
}

//Xử lý lọc giá trong khoản x đến y
export const actFilterLowestPriceToHighestPrice = (product, inputPriceHead, inputPriceEnd)=>{
    return {
        type: Types.FILTER_LOWEST_PRICE_TO_HIGHEST_PRICE,
        product,
        inputPriceHead,
        inputPriceEnd
    }
}

//Xử lý lọc theo hãng
export const actFilterByBrand = (product, idBrand)=>{
    return {
        type: Types.FILTER_BY_BRAND,
        product,
        idBrand
    }
}

//Xử lý lọc theo category
export const actFilterByCategory = (product, idCategory)=>{
    return {
        type: Types.FILTER_BY_CATEGORY,
        product,
        idCategory

    }
}
//Xóa filter
export const actDeleteFilter = (product)=>{
    return {
        type: Types.DELETE_FILTER,
        product
    }
}

//Tìm kiếm theo ký tự
export const actSearchByKey = (key, products) =>{
    return {
        type: Types.SEARCH_BY_KEY,
        key, products
    }
}