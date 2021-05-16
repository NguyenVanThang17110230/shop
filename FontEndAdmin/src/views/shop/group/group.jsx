import React, { Component } from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Modal,
    Form,
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
import GroupService from "../../../services/GroupService";
const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const fields = ['name', 'summary']
class Products extends Component {
    state = {
        showModal: false,
        categories:{},
        group: [],
        listShowGroup:[],
    };
    componentDidMount() {
        this.loadData();
        
    }
    loadData = () => {
        GroupService.listGroup().then((res) => {
            this.setState({ group: res.data.Groups });
            this.setState({ listShowGroup: res.data.Groups });
            console.log(this.state.listShowGroup);

        });
    }
    InputOnChange = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra

        const newGroup = { ...this.state.group, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.setState({ group: newGroup });
        console.log(this.state.group);
    }
    save=()=>{
        GroupService.createGroup(this.state.group).then(res => {
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
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div>
                {/* <div className="row">
          <div className="col-sm-10"></div> */}
                <div className="container">
                    <button type="button" class="btn btn-sm btnAddProduct" onClick={this.setShowModal}>
                        <p class="fas fa-plus-circle textInBtnAddProduct">   Thêm Group</p>
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
                                Thêm thông tin Category
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Tên Group</Form.Label>
                                    <Form.Control type="text" name="nameProduct" placeholder="Tên danh mục" name="name" onChange={this.InputOnChange}/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control as="textarea" type="text" name="summary" rows={2} onChange={this.InputOnChange}/>
                                </Form.Group>
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
                                    <p className="fontSizeNameTable">Danh sách Group</p>
                                </CCardHeader>
                                <CCardBody>
                                    <CDataTable
                                        items={this.state.listShowGroup}
                                        fields={fields}
                                        hover
                                        striped
                                        bordered
                                        size="lg"
                                        itemsPerPage={15}
                                        pagination
                                        scopedSlots={{
                                            'status':
                                                (item,i) => (
                                                    <td key={i}>
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