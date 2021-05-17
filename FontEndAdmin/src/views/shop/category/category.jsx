import React, { Component } from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Modal,
    Form,
    Table,
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
import usersData from '../../users/UsersData';
import "../products/products.css";
import "../brands/brand.css";
import CategoryService from "../../../services/CategoryService";
import GroupService from "../../../services/GroupService";
import { toast,ToastContainer } from 'react-toastify';
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
        categories: {},
        category: [],
        listShowCategory: [],
        group: [],
        showModalEdit: false,
        stateCategory:[],
    };
    componentDidMount() {
        this.loadData();

    }
    loadData = () => {
        CategoryService.listCategory().then((res) => {
            this.setState({ category: res.data.categories });
            this.setState({ listShowCategory: res.data.categories });
            console.log(this.state.listShowCategory);

        });
        GroupService.listGroup().then((res) => {
            this.setState({ group: res.data.Groups });
        });
    }
    InputOnChange = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        const newCategory = { ...this.state.categories, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.setState({ categories: newCategory });
        console.log(this.state.categories);
    }
    InputOnChangeGroup = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        {
            this.state.group.map((group) => {
                if (group.code === value) {
                    const newCategory = { ...this.state.categories, [name]: group.code }
                    this.setState({ categories: newCategory });
                }
            })
        }
        console.log("fff",this.state.categories)
    }
    save = () => {
        CategoryService.createCategory(this.state.categories).then(res => {
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
    async setShowModalEditBrand(id) {
        await CategoryService.get(id).then(res => {
            this.setState({ stateCategory: res.data.categories })
        })
        this.setState({ showModalEdit: true });
    }
    setCloseModalEditBrand = () => {
        this.setState({ showModalEdit: false });
    }
    InputOnChangeEdit = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        const newCategory = { ...this.state.stateCategory, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.setState({ stateCategory: newCategory });
        console.log(this.state.stateBrand)
    }
    InputOnChangeGroupEdit = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        {
            this.state.group.map((group) => {
                if (group.code === value) {
                    const newCategory = { ...this.state.stateCategory, [name]: group.code }
                    this.setState({ stateCategory: newCategory });
                }
            })
        }
    }
    delete = (type) => {
        var result = window.confirm("Bạn chắc chắn muốn xóa loại nhóm này không?")
        if(result){
          CategoryService.deleteService(type)
          .then((res)=>{
            console.log(res);
            if(res.status === 200){
              toast.success("Xóa thành công");
                this.loadData();
            }
            else
            {
              toast.error("Xóa thất bại");
            }
          })
          .catch((err) => toast.error(err.response.data));
        }
        else{
            console.log('jjj');
        }
    }
    saveEdit = async () => {
        const data = {
            name: '',
            summary: '',
            groupCode:'',
        }
        data.name = this.state.stateCategory.name
        data.summary = this.state.stateCategory.summary
        data.groupCode = this.state.stateCategory.groupCode
        await CategoryService.updateCategoryById(this.state.stateCategory.code, {
            name: data.name,
            summary: data.summary,
            groupCode: data.groupCode
        }).then(res => {
            if (res.status === 200) {
                toast.success('Chỉnh sửa thành công!')
            }
            this.loadData()
        }, function (error) {
            toast.error("Lỗi không lưu được!")
        })
        this.setCloseModalEditBrand()
    }
    _viewGroup = code =>{
        const { group } = this.state;
        const test = group.find(x => x.code === code);
        if(test){
            return test.name
        }
    }
    render() {
        console.log("aaa",this.props);
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div onLoad={this.loadData}>
                {/* <div className="row">
          <div className="col-sm-10"></div> */}
                <div className="container">
                    <button type="button" class="btn btn-sm btnAddProduct" onClick={this.setShowModal}><p class="fas fa-plus-circle textInBtnAddProduct">   Thêm Category</p></button>
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
                                Thêm thông tin Category
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Tên Category</Form.Label>
                                    <Form.Control type="text" placeholder="Tên danh mục" name="name" onChange={this.InputOnChange} />
                                </Form.Group>
                                <Form.Group controlId="ControlSelect">
                                    <Form.Label>Nhóm sản phẩm</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="groupCode"
                                        onChange={this.InputOnChangeGroup}
                                    >
                                        <option>Choose....</option>
                                        {this.state.group.map((group, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={group.code}>
                                                    {group.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control as="textarea" type="text" name="summary" rows={2} onChange={this.InputOnChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.save}>
                                    Thêm
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Modal
                        show={this.state.showModalEdit}
                        onHide={this.setCloseModalEditBrand}
                        keyboard={false}
                        backdrop="static"
                        dialogClassName="modalMaxWidth"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title " dialogClassName="textCenterModalTitle">
                                Sửa thông tin Category
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Tên Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tên danh mục"
                                        name="name"
                                        onChange={this.InputOnChangeEdit}
                                        value={this.state.stateCategory.name}
                                    />
                                </Form.Group>
                                <Form.Group controlId="ControlSelect">
                                    <Form.Label>Nhóm sản phẩm</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="groupCode"
                                        onChange={this.InputOnChangeGroupEdit}
                                        defaultValue={this.state.stateCategory.groupCode}
                                    >
                                        <option>Choose....</option>
                                        {this.state.group.map((group, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={group.code}>
                                                    {group.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control 
                                    as="textarea" 
                                    type="text" 
                                    name="summary" 
                                    rows={2} 
                                    onChange={this.InputOnChangeEdit}
                                        value={this.state.stateCategory.summary}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.saveEdit}>
                                Cập nhật
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
                                    <p className="fontSizeNameTable">Danh sách Category</p>
                                </CCardHeader>
                                <CCardBody>
                                    <Table striped hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Group</th>
                                                <th>Summary</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        {/* Show danh sách các sản phẩm */}
                                        <tbody>
                                            {this.state.listShowCategory.map((category, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{category.name}</td>
                                                        <td>{this._viewGroup(category.groupCode)}</td>
                                                        <td>{category.summary}</td>
                                                        <td>
                                                            <Button
                                                                size="sm"
                                                                onClick={() => this.setShowModalEditBrand(category.code)}
                                                                color="success"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    style={{ width: "20px", height: "20px", color: "#fff" }}
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                    />
                                                                </svg>
                                                            </Button>

                                                            <Button
                                                                size="sm"
                                                                className="bv"
                                                                onClick={() => this.delete(category.code)}
                                                                color="danger"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    style={{ width: "20px", height: "20px", color: "#fff" }}
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    ></path>
                                                                </svg>
                                                            </Button>
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
export default Products;