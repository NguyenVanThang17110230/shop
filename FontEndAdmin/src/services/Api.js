import axios from 'axios';
import Cookies from 'js-cookie';


const url={
    
    baseUrl: "",
    product: "api/product",
    brand: "api/brand",
    user: "api/user/",
    login: "api/user/login/",
    group: "api/group",
    category: "api/category/",
    image: "api/product/createProductImage",
    promotion: "/api/promotion",
    sizes: "/api/size",
    import: "/api/import",
    order : "/api/order",
    
    

};
const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json",
    },
});

instance.interceptors.request.use((request)=>{
    const loginInfoStr = Cookies.get('loginInfoAdmin');
    if(loginInfoStr){
        const authorization = JSON.parse(loginInfoStr);
        request.headers.Authorization = `Bearer ${authorization}`;
        return request;
    }
    return request;
})
export default{
    url: url,
    axios: instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    patch: instance.patch
};