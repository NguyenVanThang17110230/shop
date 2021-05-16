import Api from "./Api";
const createOrder = data => Api.post(`${Api.url.order}/addOrder`, data)
const createOrderDetail = data => Api.post(`${Api.url.order}/addOrderDetail`,data)
const returnOrderDetail = idOrderDetail => Api.patch(`${Api.url.order}/returnOrderDetail/${idOrderDetail}`)
const updateOrder = idOrder => Api.patch(`${Api.url.order}/updateOrder/${idOrder}`)
const listOrder = () => Api.get(Api.url.order)
const paypal = (itemsList) => Api.post(`${Api.url.order}/paypal/pay`, itemsList)
const paypalSuccess = () => Api.get(`${Api.url.order}/paypal/pay/success`)
const getMyOrder = ()=> Api.get(`${Api.url.order}/myOrder`)
// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    createOrder : createOrder,
    createOrderDetail : createOrderDetail,
    returnOrderDetail: returnOrderDetail,
    updateOrder: updateOrder,
    listOrder:listOrder,
    paypal: paypal,
    paypalSuccess: paypalSuccess,
    getMyOrder:getMyOrder

};
