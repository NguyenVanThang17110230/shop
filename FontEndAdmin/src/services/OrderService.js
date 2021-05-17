import Api from "./Api";
const createOrder = data => Api.post(`${Api.url.order}/addOrder`, data)
const createOrderDetail = data => Api.post(`${Api.url.order}/addOrderDetail`,data)
const returnOrderDetail = idOrderDetail => Api.patch(`${Api.url.order}/returnOrderDetail/${idOrderDetail}`)
const updateOrder = (data,code) => Api.patch(`${Api.url.order}/updateOrder/${code}`, data)
const updateStatus = (status,code) => Api.patch(`${Api.url.order}/updateStatus/${code}`, status)
const listOrder = () => Api.get(Api.url.order)
const getOderDetail = (id) => Api.get(`${Api.url.order}/${id}`)
export default{
    createOrder : createOrder,
    createOrderDetail : createOrderDetail,
    returnOrderDetail: returnOrderDetail,
    updateOrder: updateOrder,
    listOrder: listOrder,
    updateStatus:updateStatus,
    getOderDetail:getOderDetail,
};
