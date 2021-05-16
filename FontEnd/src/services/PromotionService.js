import Api from "./Api";
const createPromotion = data => Api.post(Api.url.promotion, data)
const listPromotion = () => Api.get(Api.url.promotion);
const getPromotion = id => Api.get(`${Api.url.promotion}/${id}`)

// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    createPromotion : createPromotion,
    listPromotion : listPromotion,
    getPromotion: getPromotion
};