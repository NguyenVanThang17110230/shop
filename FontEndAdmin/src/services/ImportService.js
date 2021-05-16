import Api from "./Api";

// const login = (email, password) => {
//     var data = {email, password}
//     return Api.post(Api.url.login, data);
// }
// const register = data => Api.post(Api.url.register, data);
// const getUser = () => Api.get(`${Api.url.userInfo}`);
// const get = (id) => Api.get(`${Api.url.majors}/${id}`);
const createImport = data => Api.post(`${Api.url.import}/addImport`, data)
const createImportDetails = data => Api.post(`${Api.url.import}/addImportDetail`, data)
const listImport = () => Api.get(Api.url.import);
const getImportById = (id) => Api.get(`${Api.url.import}/${id}`);
// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    createImport : createImport,
    createImportDetails : createImportDetails,
    listImport: listImport,
    getImportById: getImportById,
};