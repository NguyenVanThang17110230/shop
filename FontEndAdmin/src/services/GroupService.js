import Api from "./Api";

// const login = (email, password) => {
//     var data = {email, password}
//     return Api.post(Api.url.login, data);
// }
// const register = data => Api.post(Api.url.register, data);
// const getUser = () => Api.get(`${Api.url.userInfo}`);
const get = (id) => Api.get(`${Api.url.group}/${id}`);
const createGroup = data => Api.post(Api.url.group, data)
const listGroup = () => Api.get(Api.url.group);
const updateGroupById = (id, data) => Api.patch(`${Api.url.group}/${id}`, data)
const deleteService = code => Api.delete(`${Api.url.group}/${code}`)
// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    createGroup : createGroup,
    listGroup : listGroup,
    get: get,
    updateGroupById: updateGroupById,
    deleteService: deleteService
};