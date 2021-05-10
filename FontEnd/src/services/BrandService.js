import Api from "./Api";

// const login = (email, password) => {
//     var data = {email, password}
//     return Api.post(Api.url.login, data);
// }
// const register = data => Api.post(Api.url.register, data);
// const getUser = () => Api.get(`${Api.url.userInfo}`);
// const get = (id) => Api.get(`${Api.url.majors}/${id}`);
const createBrand = data => Api.post(Api.url.brand, data)
const listBrand = () => Api.get(Api.url.brand);
// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    createBrand : createBrand,
    listBrand : listBrand,
};