import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    InputGroup,
    Table
} from "react-bootstrap";
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react';
import { toast, ToastContainer } from 'react-toastify';
import "../products/products.css";
import "../brands/brand.css";
import "../promotion/promotion.css";
import "./sizes.css";
import SizesService from '../../../services/SizesService';
const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const fields = ['sizeName', 'sizeType']
class Sizes extends Component {
    state = {
        showModal: false,
        sizes: [],
        size: {},
        SizeType: [
            {
                id: 1,
                name: "VN"
            },
            {
                id: 2,
                name: "US"
            },
            {
                id: 3,
                name: "UK"
            },
        ],
        sizeVN: [],
        sizeUS: [],
        sizeUK: [],
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        await SizesService.listSize().then((res) => {
            this.setState({ sizes: res.data.sizes });
        });
        await SizesService.getSizeByTypeSize('VN').then((res) => {
            console.log("*****", res.data.listSize);
            this.setState({ sizeVN: [].slice.call(res.data.listSize).sort((a, b) => a.sizeName - b.sizeName) })
            console.log("&&&&&&", this.state.sizeVN[0]);
        });
        await SizesService.getSizeByTypeSize('US').then((res) => {
            this.setState({ sizeUS: [].slice.call(res.data.listSize).sort((a, b) => a.sizeName - b.sizeName) })
        });
        await SizesService.getSizeByTypeSize('UK').then((res) => {
            this.setState({ sizeUK: [].slice.call(res.data.listSize).sort((a, b) => a.sizeName - b.sizeName) })
        });
    }
    InputOnChange = (event) => {
        const { name, value } = event.target; // ?????t bi???n ????? ph??n r?? c??c thu???c t??nh trong iout ra
        const newSize = { ...this.state.size, [name]: value } // ... l?? clone tat ca thuoc tinh cua major c?? qua thu???c t??nh m???i, [name] l???y c??i name ???? l??n name c???a t???n t???i n???u k c?? th?? th??nh 1 c??i field m???i
        this.setState({ size: newSize });
        console.log(this.state.size);
    }
    async save() {
        for (var i = 0; i < this.state.sizes.length; i++) {         //ki???m tra xem c?? trong c?? s??? d??? li???u ch??a
            if (this.state.size.sizeName === this.state.sizes[i].sizeName && this.state.size.sizeType === this.state.sizes[i].sizeType) {
                toast.info("Size v???a nh???p ???? t???n t???i vui l??ng nh???p Size v?? Size Type kh??c");
                return
            }
        }
        await SizesService.createSize(this.state.size).then(res => {
            toast.success("Th??m th??nh c??ng")
            this.loadData();
        }, function (error) {
            toast.error("th??m l???i r???i")
        });
        this.setCloseModal();
    }
    setShowModal = () => {
        this.setState({ showModal: true });
    }
    setCloseModal = () => {
        this.setState({ showModal: false });
    }
    delete = (type) => {
        var result = window.confirm("B???n ch???c ch???n mu???n x??a size n??y kh??ng?")
        if (result) {
            SizesService.deleteService(type)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success("X??a th??nh c??ng");
                        this.loadData();
                    }
                    else {
                        toast.error("X??a th???t b???i");
                    }
                })
                .catch((err) => toast.error(err.response.data));
        }
        else {
            console.log('jjj');
        }
    }
    render() {
        console.log("%%%%%", this.state);
        return (
            <div onLoad={this.loadData}>
                {/* <div className="row">
          <div className="col-sm-10"></div> */}
                <div className="container">
                    <button type="button"
                        className="btn btn-sm btnAddProduct"
                        onClick={this.setShowModal}>
                        <p className="fas fa-plus-circle textInBtnAddProduct">
                            Th??m k??ch th?????c
                        </p>
                    </button>
                    {/* </div> */}
                </div>
                <>
                    <ToastContainer />
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
                                Th??m k??ch th?????c
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>S??? Size<div className="notice">(Vui l??ng nh???p s???)</div></Form.Label>
                                    <Form.Control type="text" name="sizeName" placeholder="S??? k??ch th?????c" onChange={this.InputOnChange} />
                                </Form.Group>
                                <Form.Group controlId="ControlSelect">
                                    <Form.Label>Lo???i size</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="sizeType"
                                        onChange={this.InputOnChange}
                                    >
                                        <option>Choose....</option>
                                        {this.state.SizeType.map((sizeType, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={sizeType.name}>
                                                    {sizeType.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" onClick={() => this.save()}>
                                    Th??m
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
                                    <p className="fontSizeNameTable">Danh s??ch c??c k??ch th?????c</p>
                                </CCardHeader>
                                <CCardBody>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="titleTableSize">Size chu???n vi???t nam (VN)</div>
                                            <div className="tbl-header">
                                                <Table striped hover>
                                                    <thead>
                                                        <tr>
                                                            <th className="th_Sticky">#</th>
                                                            <th className="th_Sticky">Size Type Name</th>
                                                            <th className="th_Sticky">Size</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.sizeVN.map((sizeVN, idx) => {
                                                            return (
                                                                <tr onClick={() => this.delete(sizeVN.code)} key={idx}>
                                                                    <td>{idx + 1}</td>
                                                                    <td>{sizeVN.sizeType}</td>
                                                                    <td>{sizeVN.sizeName}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="titleTableSize">Size chu???n ch??u ??u (UK)</div>
                                            <div className="tbl-header">
                                                <Table striped hover>
                                                    <thead>
                                                        <tr>
                                                            <th className="th_Sticky">#</th>
                                                            <th className="th_Sticky">Size Type Name</th>
                                                            <th className="th_Sticky">Size</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.sizeUK.map((sizeUK, idx) => {
                                                            return (
                                                                <tr key={idx} onClick={() => this.delete(sizeUK.code)}>
                                                                    <td>{idx + 1}</td>
                                                                    <td>{sizeUK.sizeType}</td>
                                                                    <td>{sizeUK.sizeName}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="titleTableSize">Size chu???n m??? (US)</div>
                                            <div className="tbl-header">
                                                <Table striped hover>
                                                    <thead>
                                                        <tr>
                                                            <th className="th_Sticky">#</th>
                                                            <th className="th_Sticky">Size Type Name</th>
                                                            <th className="th_Sticky">Size</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.sizeUS.map((sizeUS, idx) => {
                                                            return (
                                                                <tr key={idx} onClick={() => this.delete(sizeUS.code)}>
                                                                    <td>{idx + 1}</td>
                                                                    <td>{sizeUS.sizeType}</td>
                                                                    <td>{sizeUS.sizeName}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>

                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </>
            </div>
        );
    }
}

export default Sizes;