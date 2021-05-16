import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    InputGroup
} from "react-bootstrap";
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react'
import "../products/products.css";
import "../brands/brand.css";
import "./promotion.css";
import PromotionService from "../../../services/PromotionService";
const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const fields = ['promotionCode', 'promotionValue', 'startDate', 'endDate']
class Products extends Component {
    state = {
        showModal: false,
        promotions: [],
        promotion: {},
        listShowBrands: [],
    };
    componentDidMount() {
        this.loadData();

    }
    loadData = () => {
        PromotionService.listPromotion().then((res) => {
            this.setState({ promotions: res.data.promotions });
        });
    }
    InputOnChange = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        if (name === 'promotionValue') {
            if(value <= 100){
                const newPromotion = { ...this.state.promotion, [name]: value / 100 } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
                this.setState({ promotion: newPromotion });
            }
            else{
                const newPromotion = { ...this.state.promotion, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
                this.setState({ promotion: newPromotion });
            }
        }
        else {
            const newPromotion = { ...this.state.promotion, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
            this.setState({ promotion: newPromotion });
        }
        
        console.log(this.state.promotion)
    }
    save = () => {
        PromotionService.createPromotion(this.state.promotion).then(res => {
            alert("Cập nhật thông tin thành công")
            this.loadData();

        }, function (error) {
            alert("Lỗi")
        });
    }
    setShowModal = () => {
        this.setState({ showModal: true });
    }
    setCloseModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div onLoad={this.loadData}>
                {/* <div className="row">
          <div className="col-sm-10"></div> */}
                <div className="container">
                    <button type="button"
                        class="btn btn-sm btnAddProduct"
                        onClick={this.setShowModal}>
                        <p class="fas fa-plus-circle textInBtnAddProduct">
                            Thêm mã giảm giá
                            </p>
                    </button>
                    {/* </div> */}
                </div>
                <>
                    <Modal
                        show={this.state.showModal}
                        onHide={this.setCloseModal}
                        keyboard={false}
                        backdrop="static"
                        dialogClassName="modalMaxWidth"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title " dialogClassName="textCenterModalTitle">
                                Thêm mã giảm giá
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Code giảm giá <div className="notice">(Vui lòng nhập chữ in hoa)</div></Form.Label>
                                    <Form.Control type="text" name="promotionCode" placeholder="Mã giảm giá" name="promotionCode" onChange={this.InputOnChange} />
                                </Form.Group>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Code giảm giá <div className="notice">(Chỉ nhập số)</div></Form.Label>
                                    <Form.Control type="text" name="promotionValue" placeholder="% giảm giá hoặc tiền giảm" name="promotionValue" onChange={this.InputOnChange} />
                                </Form.Group>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Group controlId="startDate">
                                            <Form.Label>Ngày bắt đầu</Form.Label>
                                            <Form.Control type="date" name="promotionValue" name="startDate" onChange={this.InputOnChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-6">
                                        <Form.Group controlId="endDate">
                                            <Form.Label>Ngày kết thúc</Form.Label>
                                            <Form.Control type="date" name="promotionValue" name="endDate" onChange={this.InputOnChange} />
                                        </Form.Group>
                                    </div>

                                </div>
                                <Button variant="primary" type="submit" onClick={this.save}>
                                    Thêm
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
                <>
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>
                                    <p className="fontSizeNameTable">Danh sách mã giảm giá</p>
                                </CCardHeader>
                                <CCardBody>
                                    <CDataTable
                                        items={this.state.promotions}
                                        fields={fields}
                                        hover
                                        striped
                                        bordered
                                        size="lg"
                                        itemsPerPage={3}
                                        pagination
                                        scopedSlots={{
                                            'status':
                                                (item) => (
                                                    <td>
                                                        <CBadge color={getBadge(item.status)}>
                                                            {item.status}
                                                        </CBadge>
                                                    </td>
                                                )
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </>
            </div>

        );
    }
}
export default Products;