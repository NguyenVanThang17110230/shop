import * as Types from '../constants/ActionType';
import * as TypesProduct from '../constants/actTypeProduct';
import * as TypesSearch from '../constants/actProcessFilterProduct';
var crypto = require('crypto-js');
// Lấy danh sách byte đã mã hóa
var data
if (localStorage.getItem('Pross_acst')) {
    var bytes = crypto.AES.decrypt(localStorage.getItem('Pross_acst'), '300699NguyenTanVo');
    // // Chuyển sang chuỗi gốc
    var message_decode = bytes.toString(crypto.enc.Utf8);

    // var data = JSON.parse(localStorage.getItem('CART'));
    data = JSON.parse(message_decode);
}
else data = JSON.parse(localStorage.getItem('Pross_acst'));

var dataBrands
if (localStorage.getItem('Bross_acst')) {
    var bytesBrands = crypto.AES.decrypt(localStorage.getItem('Bross_acst'), '300699NguyenTanVo');
    // // Chuyển sang chuỗi gốc
    var message_decode_brands = bytesBrands.toString(crypto.enc.Utf8);

    // var data = JSON.parse(localStorage.getItem('CART'));
    dataBrands = JSON.parse(message_decode_brands);
}
else dataBrands = JSON.parse(localStorage.getItem('Bross_acst'));


var dataCategories
if (localStorage.getItem('Caross_acst')) {
    var bytesCategories = crypto.AES.decrypt(localStorage.getItem('Caross_acst'), '300699NguyenTanVo');
    // // Chuyển sang chuỗi gốc
    var message_decode_categories = bytesCategories.toString(crypto.enc.Utf8);

    // var data = JSON.parse(localStorage.getItem('CART'));
    dataCategories = JSON.parse(message_decode_categories);
}
else dataCategories = JSON.parse(localStorage.getItem('Caross_acst'));


var dataGroups
if (localStorage.getItem('Grross_acst')) {
    var bytesGroups = crypto.AES.decrypt(localStorage.getItem('Grross_acst'), '300699NguyenTanVo');
    // // Chuyển sang chuỗi gốc
    var message_decode_groups = bytesGroups.toString(crypto.enc.Utf8);

    // var data = JSON.parse(localStorage.getItem('CART'));
    dataGroups = JSON.parse(message_decode_groups);
}
else dataGroups = JSON.parse(localStorage.getItem('Grross_acst'));



var initialState = [
    // {
    //     id : 1,
    //     code: 'UEDFPOH9Y',
    //     name : "Biti's Hunter Layered Upper",
    //     image: 'https://product.hstatic.net/1000230642/product/02800den__2__de8f6da25a2049b2be1cfc583326bc2f_1024x1024.jpg',
    //     description : 'Sản phẩm do Bitis sản xuất',
    //     price: 899000,
    //     inventory : 100,
    //     color: 'ĐEN',
    //     brand: "Biti's",
    //     group: 'Thời trang'
    // },
    // {
    //     id : 2,
    //     code: 'SHSNYMFQK',
    //     name : 'VANS CLASSIC OLD SKOOL NAVY/WHITE',
    //     image: 'https://bizweb.dktcdn.net/100/140/774/products/vans-classic-old-skool-navy-white-vn000d3hnvy1-1.png?v=1526461229607',
    //     description : 'Sản phẩm do Vans sản xuất',
    //     price: 1750000,
    //     inventory : 150,
    //     color : 'NAVI',
    //     brand: 'Vans',
    //     group: 'Thời trang'
    // },
    // {
    //     id : 3,
    //     code: 'C12J9E5AH',
    //     name : 'ADIDAS PUREBOOST DPR LTD',
    //     image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/00cf481f99ee48598c76a84f00dc5073_9366/PureBOOST_DPR_LTD_Mau_xam_BB6304_01_standard.jpg',
    //     description : 'Sản phẩm do Adidas sản xuất',
    //     price: 3400000,
    //     inventory : 200,
    //     color : 'WHITE',
    //     brand: 'Adidas',
    //     group: 'Thời trang'
    // },
    // {
    //     id : 4,
    //     code: '0V2UPF79G',
    //     name : 'ADIDAS 4D RUN 1.0 PARLEY',
    //     image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/ea74c4d3280c4eeda6f6ab5601508eb2_9366/Giay_4D_RUN_1.0_Parley_trang_FW1229_01_standard.jpg',
    //     description : 'Sản phẩm do Adidas sản xuất',
    //     price: 5500000,
    //     inventory : 200,
    //     color : 'WHITE',
    //     brand: 'Adidas',
    //     group: 'Thời trang'
    // },
    // {
    //     id : 5,
    //     code: 'C5Z3BN8RQ',
    //     name : 'REEBOK HYDRORUSH TR',
    //     image: 'https://www.reebok.com.vn/media/catalog/product/cache/904d6804a1cf5e49cefbd10ffda28c58/c/n/cn4794_fsl_ecom.jpg',
    //     description : 'Sản phẩm do Reebok sản xuất',
    //     price: 2690000,
    //     inventory : 200,
    //     color : 'RED',
    //     brand: 'Reebok',
    //     group: 'Thời trang'
    // },
    // {
    //     id : 6,
    //     code: 'LY2TLJMP2',
    //     name : 'VANS CLASSIC SK8-HI BLACK/WHITE VANS CLASSIC SK8-HI BLACK/WHITE VANS CLASSIC SK8-HI BLACK/WHITE VANS ',
    //     image: 'https://bizweb.dktcdn.net/100/140/774/products/vans-classic-sk8-hi-black-white-vn000d5ib8c-1.png?v=1522140382387',
    //     description : 'Sản phẩm do Vans sản xuất',
    //     price: 1850000,
    //     inventory : 200,
    //     color : 'white',
    //     brand: 'Vans',
    //     group: 'Thời trang'
    // },
    // {
    //     id : 7,
    //     code: '01IMM8EUC',
    //     name : 'REEBOK LIQUIFECT LS AP',
    //     image: 'https://www.reebok.com.vn/media/catalog/product/cache/904d6804a1cf5e49cefbd10ffda28c58/r/e/reebok_0581_4.jpg',
    //     description : 'Sản phẩm do Reebok sản xuất',
    //     price: 2190000,
    //     inventory : 200,
    //     color : 'black/white/humble blue',
    //     brand: 'Reebok',
    //     group: 'Thời trang'
    // },
    // {
    //     id : 8,
    //     code: 'XTIGQ3QKP',
    //     name : "Biti's Hunter Street",
    //     image: 'https://product.hstatic.net/1000230642/product/dsmh04300xnh-2_943c5cd4e8a741928b4f39af1b4e0257_1024x1024.jpg',
    //     description : "Sản phẩm do Bitis's sản xuất",
    //     price: 699000,
    //     inventory : 200,
    //     color : 'white/blue',
    //     brand: "Biti's",
    //     group: 'Thời trang'
    // }
];

// var initialStateProduct={
//     products:[],
//     sizeIsSelect:[]
// }
// var data = JSON.parse(localStorage.getItem('Pross_acst'));

var initialStateProduct = data ? {
    products: data,
    sizeIsSelect: [],
    productPaging: "",
    listProductPaging: [],
    numPageSelect: "",
    brands: dataBrands,
    categories: dataCategories,
    groups: dataGroups
} : {
        products: [],
        sizeIsSelect: [],
        productPaging: "",
        listProductPaging: [],
        numPageSelect: "",
        brands: [],
        categories: [],
        groups: []
    };

const products = (state = initialStateProduct, action) => {
    var {
        product, //dánh sách sản phẩm
        key,  //key dung
        idPaging, //số trang cần tới
        products, // danh sách product xử lý paging
        brands,
        categories,
        groups
    } = action
    switch (action.type) {
        // case Types.ON_LOAD_PRODUCT_IS_SELECT:
        //     if(product.length > 0){
        //         for(var i = 0; i < product.length;i++){
        //             if(id === product.id){
        //                 state.push({
        //                     productSelect : product[i]
        //                 })
        //                 break
        //             }
        //         }
        //     }
        //     localStorage.setItem('PRODUCT_SELECT', JSON.stringify(product));
        case TypesProduct.LOAD_DATA_PRODUCT_FROM_API:
            var numOfPaging = Math.floor(product.length / 12) + 1
            var listPro = [];
            if (numOfPaging <= 1) {
                for (var i = 0; i < product.length; i++) {
                    listPro.push(product[i])
                }
            } else {
                for (var j = 0; j < 12; j++) {
                    listPro.push(product[j])
                }
            }
            localStorage.setItem('Pross_acst', crypto.AES.encrypt(JSON.stringify(product), '300699NguyenTanVo').toString());
            return {
                ...state,
                products: product,
                productPaging: numOfPaging,
                listProductPaging: listPro,
                numPageSelect: 1
            }
        case Types.LOAD_DATA_BRAND_FROM_API:
            localStorage.setItem('Bross_acst', crypto.AES.encrypt(JSON.stringify(brands), '300699NguyenTanVo').toString());
            return {
                ...state,
                brands: brands
            }
        case Types.LOAD_DATA_CATEGORY_FROM_API:
            localStorage.setItem('Caross_acst', crypto.AES.encrypt(JSON.stringify(categories), '300699NguyenTanVo').toString());
            return {
                ...state,
                categories: categories
            }
        case Types.LOAD_DATA_GROUP_FROM_API:
            localStorage.setItem('Grross_acst', crypto.AES.encrypt(JSON.stringify(groups), '300699NguyenTanVo').toString());
            return {
                ...state,
                groups: groups
            }
        case TypesSearch.SEARCH_BY_KEY:
            var productFilter = state.products;
            productFilter = productFilter.filter(productFilter => productFilter.name === key);
            localStorage.setItem('Pross_acst', crypto.AES.encrypt(JSON.stringify(productFilter), '300699NguyenTanVo').toString());
            return {
                ...state,
                products: productFilter
            }
        case Types.ON_SELECT_PAGE_PRODUCT:
            var numOfPagingSelect = Math.floor(products.length / 12) + 1
            var listProSelect = [];
            if (numOfPagingSelect < 1) {
                for (var iNS = 0; iNS < products.length; iNS++) {
                    listProSelect.push(products[iNS])
                }
            } else {
                for (var jNS = (12 * idPaging - 12); jNS < 12 * idPaging; jNS++) {
                    listProSelect.push(products[jNS])
                }
            }
            return {
                ...state,
                productPaging: numOfPagingSelect,
                listProductPaging: listProSelect,
                numPageSelect: idPaging
            }
        case Types.PAGING_PRODUCT:
        default:return { ...state };
    }
}

export default products;