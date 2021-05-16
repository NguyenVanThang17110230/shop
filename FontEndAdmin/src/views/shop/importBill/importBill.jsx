import React, { Component } from 'react';
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
import ProductService from "../../../services/ProductService";
import BrandService from "../../../services/BrandService";
import CategoryService from "../../../services/CategoryService";
import GroupService from "../../../services/GroupService";
import SizesService from '../../../services/SizesService';
import ImportService from '../../../services/ImportService';

import './importBill.css'
import '../importGood/importGood.css'
class ImportBill extends Component {
    state = {
        stateImports: [],       ///state chứa thông tin hóa đơn nhập lấy dưới backend lên
        stateProducts: [],      ///state chứa thông tin 
        stateShowModalInfo: false,      //state để mở/đóng modal

        stateImportOnModal: [],            //chứa 1 import dùng show trong modal


    }
    componentDidMount() {
        this.loadData();
    }
    loadData = () => {
        ImportService.listImport().then(res => {
            this.setState({
                stateImports: res.data.imports
            })
        })

    }
    countQuantityInImport = (importBill) => {
        var quantity = 0;
        for (var i = 0; i < importBill.ImportDetails.length ; i++) {
            quantity += parseInt(importBill.ImportDetails[i].amount);
        }
        return quantity;
    }
    countTotalPriceInImport = (importBill) => {
        var totalPrice = 0;
        for (var i = 0; i < importBill.ImportDetails.length; i++) {
            totalPrice += parseInt(importBill.ImportDetails[i].importPrice)*parseInt(importBill.ImportDetails[i].amount);
        }
        return totalPrice;
    }
    processDateCreate = (date) => {
        var dateProcess;
        // new Date(Date.now()).toLocaleDateString("vi-Vi")
        dateProcess = new Date(date).toLocaleDateString("vi-Vi")
        return dateProcess
    }
    setShowModalInfo = (importBill) => {
        this.setState({ stateShowModalInfo: true })
        this.setState({stateImportOnModal: importBill})
        console.log(importBill)
        console.log(this.state.stateImportOnModal)
    }
    setCloseModalInfo = () => {
        this.setState({ stateShowModalInfo: false })
    }
    render() {
        console.log("state",this.state);
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
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
                                                <p className="fontSizeNameTable">Hóa đơn bán</p>
                                                <p className="fontSizeNameTable">({this.state.stateImportOnModal.importCode})</p>
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
                                                            </tr>
                                                        </thead>

                                                        {/* Show danh sách các sản phẩm */}
                                                        {this.state.stateImportOnModal.ImportDetails !==undefined?
                                                        <tbody>
                                                            {this.state.stateImportOnModal.ImportDetails.map((importDetails, idx) => {
                                                                return (
                                                                    <tr key={idx}>
                                                                        <td>{idx + 1}</td>
                                                                        <td>{importDetails.ProductSize.Product.productCode}</td>
                                                                        <td>{importDetails.ProductSize.Product.name}</td>
                                                                        <td>{importDetails.ProductSize.Product.color}</td>
                                                                        <td>{importDetails.ProductSize.Product.Brand.name}</td>
                                                                        <td>{importDetails.ProductSize.Size.sizeName}</td>
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
                                                                        <td>{formatter.format(importDetails.ProductSize.Product.importPrice)}</td>
                                                                        <td>{formatter.format(importDetails.ProductSize.Product.sellPrice)}</td>
                                                                        <td>{importDetails.amount}</td>
                                                                        {/* <td>{this.processFinalTotalProduct(idx)}</td> */}
                                                                        {/* <td>
                                                                            <i className="fas fa-trash-alt trashIcon" onClick={() => this.deleteProduct(idx)}></i>
                                                                        </td> */}
                                                                    </tr>
                                                                )
                                                            }
                                                            )}
                                                        </tbody>
                                                        :null}
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
                <>
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>
                                    <p className="fontSizeNameTable">Danh sách sản phẩm</p>
                                </CCardHeader>
                                <CCardBody>
                                    <Table striped hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Import code</th>
                                                <th>Publisher Name</th>
                                                <th>Total Quantity Product</th>
                                                <th>Total Price Import</th>
                                                <th>Date import</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        {/* Show danh sách các sản phẩm */}
                                        <tbody>
                                            {this.state.stateImports.map((importList, idx) => {
                                                return (
                                                    <tr key={importList.id}>
                                                        <td>{idx + 1}</td>
                                                        <td>{importList.importCode}</td>
                                                        <td>{importList.publisherName}</td>
                                                        <td>{this.countQuantityInImport(importList)}</td>
                                                        <td>{formatter.format(this.countTotalPriceInImport(importList))}</td>
                                                        <td>{this.processDateCreate(importList.createdAt)}</td>
                                                        <td>
                                                            <i
                                                                className="fas fa-info-circle iconInfo"
                                                                onClick={() => this.setShowModalInfo(importList)}></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </>
            </div>
        );
    }
}

export default ImportBill;