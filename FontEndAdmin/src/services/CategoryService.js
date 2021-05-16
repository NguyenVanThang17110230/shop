import Api from "./Api";

// const login = (email, password) => {
//     var data = {email, password}
//     return Api.post(Api.url.login, data);
// }
// const register = data => Api.post(Api.url.register, data);
// const getUser = () => Api.get(`${Api.url.userInfo}`);
const get = (id) => Api.get(`${Api.url.category}/${id}`);
const createCategory = data => Api.post(Api.url.category, data)
const listCategory = () => Api.get(Api.url.category);
const deleteService = code => Api.delete(`${Api.url.category}/${code}`)
// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    createCategory : createCategory,
    listCategory : listCategory,
    get: get,
    deleteService:deleteService,
};