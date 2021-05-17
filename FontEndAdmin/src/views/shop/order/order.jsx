import React, { Component } from 'react';
import './order.css'
import {
    Button,
    Modal,
    Form,
    Table,
    Carousel, Tabs, Tab, Dropdown
} from "react-bootstrap";
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CCardFooter
} from '@coreui/react'

import OrderService from '../../../services/OrderService';
import ProductService from "../../../services/ProductService";
import BrandService from "../../../services/BrandService";
import CategoryService from "../../../services/CategoryService";
import GroupService from "../../../services/GroupService";
import SizesService from '../../../services/SizesService';
import './order.css'
class Order extends Component {
    state = {
        //state lưu order
        stateOrder: [],

        realTime: false,

        stateShowModalInfo: false,
        stateOrderOnModal: [],
        stateOderz:[],
        listProduct: [],
        brand: [],
        category: [],
        group: [],
        sizes: [],
        data:[],

    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        OrderService.listOrder().then(async res => {
            this.setState({ stateOrder: res.data.orders })
        })
        this.realTime();
        ProductService.listProduct().then((res) => {
            this.setState({ listProduct: res.data.products.sort((a, b) => a.id - b.id) });
            
        });
        ProductService.listProductSize().then((res) => {
            this.setState({ listProductSize: res.data.productSize});
            
        });
        BrandService.listBrand().then((res) => {
            this.setState({ brand: res.data.brands });
            
        });
        CategoryService.listCategory().then((res) => {
            this.setState({ category: res.data.categories })
            
        });
        GroupService.listGroup().then((res) => {
            this.setState({ group: res.data.Groups })
            
        })
        SizesService.listSize().then((res) => {
            this.setState({ sizes: res.data.sizes });
        });
    }
    viewProCode = code =>{
        const { listProduct } = this.state
        const test = listProduct.find(x=> x.code === code)
        if(test){
            return test.code
        }
    }
    viewProName = code =>{
        const { listProduct } = this.state
        const test = listProduct.find(x=> x.code === code)
        if(test){
            return test.name
        }
    }
    viewProIm = code =>{
        const { listProduct } = this.state
        const test = listProduct.find(x=> x.code === code)
        if(test){
            return test.importPrice
        }
    }
    viewProSe = code =>{
        const { listProduct } = this.state
        const test = listProduct.find(x=> x.code === code)
        if(test){
            return test.sellPrice
        }
    }
    viewColor = code =>{
        const { listProduct } = this.state
        const test = listProduct.find(x=> x.code === code)
        if(test){
            return test.color
        }
    }
    viewBrand = code =>{
        const { listProduct } = this.state
        const { brand } = this.state
        const test = listProduct.find(x=> x.code === code)
        if(test){
            const test2 = brand.find(x=> x.code === test.brandCode)
            if(test2){
                return test2.name
            }
        }
    }
    viewSize = code =>{
        const { sizes } = this.state
        const { category } = this.state
        const { listProductSize } = this.state
        const test = listProductSize.find(x=> x.code === code)
        if(test){
            const test2 = sizes.find(x=> x.code === test.sizeCode)
            if(test2){
                return test2.sizeType + ": " + test2.sizeName
            }
        }
    }
    setShowModalInfo = (order) => {
        OrderService.getOderDetail(order).then((res) => {
            this.setState({ stateOderz: res.data.orderDetails })
        })
        this.setState({ stateShowModalInfo: true })
        this.setState({ stateOrderOnModal: order })
        console.log(order)
        console.log(this.state.stateOrderOnModal)
    }
    setCloseModalInfo = () => {
        this.setState({ stateShowModalInfo: false })
        this.loadData();
    }
    realTime = () => {
        this.setState({ realTime: true })
    }
    processPayment = (payment) => {
        if (payment === 1 || payment === '1') {
            return 'COD';
        }
        if (payment === 2 || payment === '2') {
            return 'PayPal'
        }
        if (payment === 3 || payment === '3') {
            return 'VNPay'
        }
        else return
    }
    processStatus = (status) => {
        if (status === 1 || status === '1') {
            return <span class="badge bg-warning text-dark fontBadges">Pending</span>
        }
        if (status === 2 || status === '2') {
            return <span class="badge bg-primary fontBadges">Processing</span>
        }
        if (status === 3 || status === '3') {
            return <span class="badge bg-success fontBadges">Completed</span>
        }
        else return
    }
    changeStatus = (status, code) => {
        console.log("ahihi",status);
        OrderService.updateStatus({ 'status': status }, code).then(res => {
            console.log("^^",res.data)
        })
        setInterval(this.loadData(), 5000)
        this.componentDidMount()
    }
    processDateOrder = (date) => {
        var dateProcess;
        // new Date(Date.now()).toLocaleDateString("vi-Vi")
        dateProcess = new Date(date).toLocaleDateString("vi-Vi")
        return dateProcess
    }
    returnProduct = (idOrderDetail) => {

        if (window.confirm("Bạn muốn trả món hàng này?")) {
            OrderService.returnOrderDetail(idOrderDetail)
            this.loadData()
            this.loadData()
            this.setCloseModalInfo()
        }
    }
    render() {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        console.log("ggg",this.state);
        return (
            <div>
                <>
                    <Modal
                        show={this.state.stateShowModalInfo}
                        onHide={this.setCloseModalInfo}
                        keyboard={false}
                        backdrop="static"
                        dialogClassName="modalSizeMaxWidth"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <>
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader>
                                                <p className="fontSizeNameTable">Hóa đơn bán hàng</p>
                                                <p className="fontSizeNameTable">({this.state.stateOrderOnModal})</p>
                                            </CCardHeader>
                                            <CCardBody>
                                                <div className="tbl-header">
                                                    <Table striped hover>
                                                        <thead>
                                                            <tr className="trBackGround">
                                                                <th className="th_Sticky">#</th>
                                                                <th className="th_Sticky">Product Code</th>
                                                                <th className="th_Sticky">Name Product</th>
                                                                <th className="th_Sticky">Color</th>
                                                                <th className="th_Sticky">Brand</th>
                                                                <th className="th_Sticky">Size</th>
                                                                <th className="th_Sticky">Price Im</th>
                                                                <th className="th_Sticky">Price Sell</th>
                                                                <th className="th_Sticky">Quantity</th>
                                                                {/* <th className="th_Sticky">Return</th> */}
                                                            </tr>
                                                        </thead>

                                                        {/* Show danh sách các sản phẩm */}
                                                        {this.state.stateOrderOnModal !== undefined ?
                                                            <tbody>
                                                                {this.state.stateOderz.map((orderDetails, idx) => {
                                                                    if (orderDetails.isReturn == null) {
                                                                        return (
                                                                            <tr key={idx}>
                                                                                <td>{idx + 1}</td>
                                                                                <td>{this.viewProCode(orderDetails.productCode)}</td>
                                                                                <td>{this.viewProName(orderDetails.productCode)}</td>
                                                                                <td>{this.viewColor(orderDetails.productCode)}</td>
                                                                                <td>{this.viewBrand(orderDetails.productCode)}</td>
                                                                                <td>{this.viewSize(orderDetails.productSizeCode)}</td>
                                                                                {/* <td>
                                                                            <div className="view" onClick={() => this.setShowModalViewSizeProduct(idx)}>Thêm Size</div>
                                                                            <div className="boxSize">
                                                                                {this.props.productSizes.map((ProductSizes, idxa) => {
                                                                                    if (ProductSizes.productSize.productId === idx) {
                                                                                        for (var i = 0; i < this.state.sizes.length; i++) {
                                                                                            if (this.state.sizes[i].id === parseInt(ProductSizes.productSize.sizeId)) {       //điểu kiện để hiển thị têm size ra
                                                                                                return (
                                                                                                    <div className="displaySizeBox">{this.state.sizes[i].sizeName}</div>
                                                                                                )
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                    else { return }
                                                                                })}

                                                                            </div>
                                                                        </td> */}
                                                                                <td>{formatter.format(this.viewProIm(orderDetails.productCode))}</td>
                                                                                <td>{formatter.format(this.viewProSe(orderDetails.productCode))}</td>
                                                                                <td>{orderDetails.amount}</td>
                                                                                {/* <td><i class="fas fa-undo-alt iconReturn" onClick={() => this.returnProduct(orderDetails.code)}></i></td> */}
                                                                                {/* <td>{this.processFinalTotalProduct(idx)}</td> */}
                                                                                {/* <td>
                                                                            <i className="fas fa-trash-alt trashIcon" onClick={() => this.deleteProduct(idx)}></i>
                                                                        </td> */}
                                                                            </tr>
                                                                        )
                                                                    }
                                                                }
                                                                )}
                                                            </tbody>
                                                            : null}
                                                    </Table>
                                                </div>
                                            </CCardBody>
                                            <CCardFooter>


                                            </CCardFooter>
                                        </CCard>
                                    </CCol>
                                </CRow>
                            </>
                        </Modal.Body>
                    </Modal>
                </>
                <div className="backGroundMain">
                    <div className="containerMain">
                        <div className="titleTable">Danh sách tất cả đơn hàng</div>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Order</th>
                                    <th>Phone</th>
                                    <th>Date</th>
                                    <th>Ship To</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    <th>Total</th>
                                    <th>Info</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.stateOrder.sort((a, b) => a.status - b.status).map((order, idx) => {
                                    if (parseInt(order.totalPrice) !== 0) {
                                        return (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    <div className="parent_infoOrder">
                                                        <div className="infoOrderFirst">
                                                            #{order.code}
                                                        </div>
                                                         by
                                                        <div className="infoOrderEnd">
                                                            {order.fullName}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{order.phone}</td>
                                                <td>{this.processDateOrder(order.createdAt)}</td>
                                                <td>{order.address}</td>
                                                <td>{this.processStatus(order.status)}</td>
                                                <td>{this.processPayment(order.payment)}</td>
                                                <td>{formatter.format(order.totalPrice)}</td>
                                                <td><i class="fas fa-info-circle iconInfo1 " onClick={() => this.setShowModalInfo(order.code)}></i></td>
                                                <td>
                                                    {/* <div class="dropdown">
                                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i class="fas fa-ellipsis-v menuAction"></i>
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <a class="dropdown-item" href="#">Action</a>
                                                            <a class="dropdown-item" href="#">Another action</a>
                                                            <a class="dropdown-item" href="#">Something else here</a>
                                                        </div>
                                                    </div> */}
                                                    <Dropdown>
                                                        <i class="fas fa-ellipsis-v menuAction" variant="info" id="dropdown-basic" ></i>
                                                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item><div onClick={() => this.changeStatus(3, order.code)}>Complete</div></Dropdown.Item>
                                                            <Dropdown.Item><div onClick={() => this.changeStatus(2, order.code)}>Processing</div></Dropdown.Item>
                                                            <Dropdown.Item><div onClick={() => this.changeStatus(1, order.code)}>Pending</div></Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </Table>
                        {/* <Tabs justify defaultActiveKey="orderNotConfirm" transition={false} id="noanim-tab-example">
                        <Tab
                            eventKey="orderNotConfirm"
                            title="Đơn hàng chưa được xác nhận"
                            tabClassName="titleTab">
                            
                        </Tab>
                        <Tab
                            eventKey="orderConfirm"
                            title="Đơn hàng đã xác nhận"
                            tabClassName="titleTab">
                            <div className="titleTable">Bảng đơn hàng đã được xác nhận</div>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td colSpan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab
                            eventKey="orderHaveBeenDelivery"
                            title="Đơn hàng đã vận chuyển xong"
                            tabClassName="titleTab">
                            <div className="titleTable">Bảng đơn hàng đã vận chuyển xong</div>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td colSpan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </Tab>
                    </Tabs> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Order;