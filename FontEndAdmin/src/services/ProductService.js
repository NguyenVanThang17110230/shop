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
const listProductSize = () => Api.get(`${Api.url.product}/productSize`);
const getProduct = id => Api.get(`${Api.url.product}/${id}`)
const createImage = data => Api.post(Api.url.image, data)
const createProductSize = data => Api.post(`${Api.url.product}/createProductSize`, data)
const getImageByProductId = id => Api.get(`${Api.url.product}/getImageByProductId/${id}`)
const updateProduct = (id , data) => Api.patch(`${Api.url.product}/${id}`, data)
const getProductSizeByProductCode = productCode => Api.get(`${Api.url.product}/productSize/${productCode}`)
const get = id => Api.get(`${Api.url.product}/productSize/size/${id}`)
const deleteService = code => Api.delete(`${Api.url.product}/${code}`)
const deletePrSizeService = code => Api.delete(`${Api.url.product}/productSize/${code}`)

// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    createProduct : createProduct,
    listProduct : listProduct,
    getProduct: getProduct,
    createImage: createImage,
    createProductSize: createProductSize,
    getImageByProductId:getImageByProductId,
    updateProduct: updateProduct,
    getProductSizeByProductCode:getProductSizeByProductCode,
    deleteService:deleteService,
    get:get,
    listProductSize:listProductSize,
    deletePrSizeService:deletePrSizeService
};