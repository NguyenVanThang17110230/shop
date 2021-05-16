import Cookies from "js-cookie";
var isLogin;
if (Cookies.get('loginInfo') !== undefined) {
    isLogin = false;
}
else {
    isLogin = true;
}
export default isLogin;
