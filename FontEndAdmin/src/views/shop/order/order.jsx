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
import './order.css'
class Order extends Component {
    state = {
        //state lưu order
        stateOrder: [],

        realTime: false,

        stateShowModalInfo: false,
        stateOrderOnModal: []

    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        OrderService.listOrder().then(async res => {
            this.setState({ stateOrder: res.data.orders })
        })
        this.realTime();

    }
    setShowModalInfo = (order) => {
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
        OrderService.updateOrder({ 'status': status }, code).then(res => {
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
                                                <p className="fontSizeNameTable">Hóa đơn nhập hàng</p>
                                                <p className="fontSizeNameTable">({this.state.stateOrderOnModal.code})</p>
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
                                                                <th className="th_Sticky">Return</th>
                                                            </tr>
                                                        </thead>

                                                        {/* Show danh sách các sản phẩm */}
                                                        {this.state.stateOrderOnModal.OrderDetails !== undefined ?
                                                            <tbody>
                                                                {this.state.stateOrderOnModal.OrderDetails.sort((a,b)=>a.id - a.id).map((orderDetails, idx) => {
                                                                    if (orderDetails.isReturn == null) {
                                                                        return (
                                                                            <tr key={idx}>
                                                                                <td>{idx + 1}</td>
                                                                                <td>{orderDetails.ProductSize.Product.productCode}</td>
                                                                                <td>{orderDetails.ProductSize.Product.name}</td>
                                                                                <td>{orderDetails.ProductSize.Product.color}</td>
                                                                                <td>{orderDetails.ProductSize.Product.Brand.name}</td>
                                                                                <td>{orderDetails.ProductSize.Size.sizeName}</td>
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
                                                                                <td>{formatter.format(orderDetails.ProductSize.Product.importPrice)}</td>
                                                                                <td>{formatter.format(orderDetails.ProductSize.Product.sellPrice)}</td>
                                                                                <td>{orderDetails.unitAmount}</td>
                                                                                <td><i class="fas fa-undo-alt iconReturn" onClick={() => this.returnProduct(orderDetails.id)}></i></td>
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
                                                <td><i class="fas fa-info-circle iconInfo1 " onClick={() => this.setShowModalInfo(order)}></i></td>
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