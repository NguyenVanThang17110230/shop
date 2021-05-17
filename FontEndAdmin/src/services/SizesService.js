import Api from "./Api";
const createSize = data => Api.post(Api.url.sizes, data)
const listSize = () => Api.get(Api.url.sizes);
const getSizeByTypeSize = sizeType => Api.get(`${Api.url.sizes}/getSizeByType/${sizeType}`)
const deleteService = id => Api.delete(`${Api.url.sizes}/${id}`)
const updateSize = (id,data) => Api.patch(`${Api.url.sizes}/${id}`, data)
// const getProduct = () => Api.get(`${Api.url.product}/${id}`)
export default{
    createSize : createSize,
    listSize : listSize,
    getSizeByTypeSize: getSizeByTypeSize,
    deleteService: deleteService,
    updateSize:updateSize
};