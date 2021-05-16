import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import discount from './discount';
import user from './user';
import urlBackend from './urlBackend';
import sizeIsSelect from './sizeIsSelect';
import wishLists from './wishList'
import invoiceDetail from './invoiceDetail';
import filterProduct from './filter'
import imagePath from './imageProductIsSelect';
const appReducers = combineReducers({
    products: products,
    cart: cart,
    discount: discount,
    user: user,
    urlBackend: urlBackend,
    sizeIsSelect: sizeIsSelect,
    wishLists: wishLists,
    invoiceDetail:invoiceDetail,
    filterProduct:filterProduct,
    imagePath:imagePath,
});

export default appReducers;