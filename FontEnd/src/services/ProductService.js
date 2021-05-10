import Api from "./Api";

// const login = (email, password) => {
//     var data = {email, password}
//     return Api.post(Api.url.login, data);
// }
// const register = data => Api.post(Api.url.register, data);
// const getUser = () => Api.get(`${Api.url.userInfo}`);
// const get = (id) => Api.get(`${Api.url.majors}/${id}`);
const createProduct = data => Api.post(Api.url.product, data)
const listProduct = () => Api.get(Api.url.product);
const getProduct = id => Api.get(`${Api.url.product}/${id}`)
const createImage = data => Api.post(Api.url.image, data)
const createProductSize = data => Api.post(`${Api.url.product}createProductSize`, data)
const getImageByProductId = id => Api.get(`${Api.url.product}getImageByProductId/${id}`)
// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    createProduct : createProduct,
    listProduct : listProduct,
    getProduct: getProduct,
    createImage: createImage,
    createProductSize: createProductSize,
    getImageByProductId:getImageByProductId
};