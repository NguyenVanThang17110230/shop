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
        stateImportDetail: [],
        stateImportOnModal: [],
        stateImportDetailZ: [],
        listProduct: [],
        brand: [],
        category: [],
        group: [],
        sizes: [],
        data:[],
        stateImportDetail:[],
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

        ImportService.getAllImprtDetail().then(res => {
            console.log("dd", res.data);
            this.setState({
                stateImportDetail: res.data.importDetails
            })
        })

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
    countQuantityInImport = (importBill) => {
        const { stateImportDetail } = this.state;
        console.log("ds", stateImportDetail);
        // const a = stateImportDetail.filter(x => x.importCode === importBill)
        // console.log("vao day",a);
        // if(a.length>0){
        //     var quantity = 0;
        //     for (var i = 0; i < a.length; i++) {
        //         quantity += parseInt(a[i].amount);
        //     }
        //     console.log("d",quantity);
        //     return quantity;
        // }

    }
    countTotalPriceInImport = (importBill) => {
        // ImportService.getImportById(importBill).then(res => {
        //     var totalPrice = 0;
        //     for (var i = 0; i < res.data.importDetail.length; i++) {
        //         totalPrice += parseInt(res.data.importDetail[i].importPrice) * parseInt(res.data.importDetail[i].amount);
        //     }
        //     return totalPrice;
        // })
        // var totalPrice = 0;
        // for (var i = 0; i < importBill.ImportDetails.length; i++) {
        //     totalPrice += parseInt(importBill.ImportDetails[i].importPrice)*parseInt(importBill.ImportDetails[i].amount);
        // }
        // return totalPrice;
    }
    processDateCreate = (date) => {
        var dateProcess;
        // new Date(Date.now()).toLocaleDateString("vi-Vi")
        dateProcess = new Date(date).toLocaleDateString("vi-Vi")
        return dateProcess
    }
    setShowModalInfo = (importBill) => {
        ImportService.getImportById(importBill).then((res) => {
            this.setState({ stateImportDetailZ: res.data.importDetail })
        })
        this.setState({ stateShowModalInfo: true })
        this.setState({ stateImportOnModal: importBill })
        console.log(importBill)
        console.log(this.state.stateImportOnModal)
       
    }
    viewData = () => {
        const { stateImportDetailZ } = this.state
        const { listProduct } = this.state
        const { brand } = this.state
        const { category } = this.state
        const { sizes } = this.state
        const test = listProduct.find(x=> x.code === stateImportDetailZ[0].productCode)
        if(test){
            console.log("cb",test);
            this.setState({data:test})
        }
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
    viewCate = code =>{
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
    setCloseModalInfo = () => {
        this.setState({ stateShowModalInfo: false })
    }
    render() {
        console.log("state", this.state);
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
                                                <p className="fontSizeNameTable">Hóa đơn nhập</p>
                                                <p className="fontSizeNameTable">({this.state.stateImportOnModal})</p>
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
                                                        {this.state.stateImportOnModal !== undefined ?
                                                            <tbody>
                                                                {this.state.stateImportDetailZ.map((importDetails, idx) => {
                                                                    return (
                                                                        <tr key={idx}>
                                                                            <td>{idx + 1}</td>
                                                                            <td>{this.viewProCode(importDetails.productCode)}</td>
                                                                            <td>{this.viewProName(importDetails.productCode)}</td>
                                                                            <td>{this.viewColor(importDetails.productCode)}</td>
                                                                            <td>{this.viewBrand(importDetails.productCode)}</td>
                                                                            <td>{this.viewCate(importDetails.productSizeCode)}</td>
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
                                                                            <td>{formatter.format(this.viewProIm(importDetails.productCode))}</td>
                                                                            <td>{formatter.format(this.viewProSe(importDetails.productCode))}</td>
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
                <>
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>
                                    <p className="fontSizeNameTable">Danh sách hóa đơn nhập</p>
                                </CCardHeader>
                                <CCardBody>
                                    <Table striped hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Import code</th>
                                                <th>Publisher Name</th>
                                                
                                                <th>Date import</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        {/* Show danh sách các sản phẩm */}
                                        <tbody>
                                            {this.state.stateImports.map((importList, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{importList.code}</td>
                                                        <td>{importList.publisherName}</td>
                                                        <td>{this.processDateCreate(importList.createdAt)}</td>
                                                        <td>
                                                            <i
                                                                className="fas fa-info-circle iconInfo"
                                                                onClick={() => this.setShowModalInfo(importList.code)}></i>
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