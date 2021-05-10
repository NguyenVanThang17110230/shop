import Api from "./Api";

const login = (email, password) => {
    var data = { email, password }
    return Api.post(Api.url.login, data);
}
const register = data => Api.post(Api.url.register, data);
const getUser = () => Api.get(Api.url.userInfo);
const updateUser = data => Api.patch(Api.url.updateUser, data);
const loginGoogle = () => Api.get(`${Api.url.userGoogle}/auth/google`);
const loginFacebook = () => Api.get(`${Api.url.userGoogle}/auth/google`);
// const getUserById = email => Api.get(`${Api.url.instructors}/${email}`)

export default {
    login: login,
    register: register,
    getUser: getUser,
    updateUser: updateUser,
    loginGoogle: loginGoogle,
    loginFacebook:loginFacebook
    // getUserById : getUserById,
};
