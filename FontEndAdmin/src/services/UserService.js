import Api from "./Api";

// const login = (email, password) => {
//     var data = {email, password}
//     return Api.post(Api.url.login, data);
// }
// const register = data => Api.post(Api.url.register, data);
// const getUser = () => Api.get(`${Api.url.userInfo}`);
// const get = (id) => Api.get(`${Api.url.majors}/${id}`);
const getUser = () => Api.get(Api.url.user);
const listUser = () => Api.get(Api.url.user);
const updateUser = data =>Api.patch(Api.url.user);
const login = (email, password) => {
    var data = {email, password}
    return Api.post(Api.url.login, data);
}
// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    listUser : listUser,
    updateUser : updateUser,
    login : login,
    getUser:getUser,
};