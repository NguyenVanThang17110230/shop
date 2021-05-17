import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
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
import "./brand.css";
import BrandService from "../../../services/BrandService";

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const fields = ['id', 'name', 'summary', 'imagePath']
class Brand extends Component {
    constructor(props) {
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeValueImage = this.onChangeValueImage.bind(this);
        this.imageAvatarProductHandler = this.imageAvatarProductHandler.bind(this);
        this.state = {
            showModal: false,
            showModalEdit: false,
            brands: {},
            brand: [],
            listShowBrands: [],
            avatarProduct: '',
            avatarProductSaveAPI: '',
            updateDaily: '',
            stateBrand: [],
            imagePath: '',
            name: '',
            description: '',
            imagePathEdit: '',
        };
    }

    componentDidMount() {
        this.loadData();
        console.log(this.props.urlBackend)
        console.log(this.props.user)

    }
    loadData = async () => {
        await BrandService.listBrand().then((res) => {
            this.setState({ brand: res.data.brands });
            this.setState({ listShowBrands: res.data.brands });
        });
    }
    InputOnChange = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        const newBrand = { ...this.state.brand, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.setState({ brand: newBrand });
    }
    InputOnChangeEdit = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        const newBrand = { ...this.state.stateBrand, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.setState({ stateBrand: newBrand });
        console.log(this.state.stateBrand)
    }
    onChangeValue(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value,
        });
    }
    onChangeValueImage(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            var a = document.querySelector(".borderImgSizeBrand");

            reader.onload = function (e) {
                this.setState({
                    imagePath: e.target.result,
                });
                a.src = e.target.result;
            }.bind(this);
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    save = async () => {
        await BrandService.createBrand({
            name: this.state.name,
            summary: this.state.description,
            image: this.state.imagePath
        }).then(res => {
            toast.success("Thêm thông tin thương hiệu thành công!")
            this.loadData();
        }, function (error) {
            console.log(error.response);
            toast.error("Thêm thông tin thương hiệu thất bại!")
        });
        this.setCloseModal();
    }
    saveEdit = async () => {
        const data = {
            name: '',
            summary: '',
            image: ''
        }
        if (this.state.imagePathEdit === '') {
            data.image = this.state.stateBrand.image
        }
        else {
            data.image = this.state.imagePathEdit
        }
        data.name = this.state.stateBrand.name
        data.summary = this.state.stateBrand.summary
        await BrandService.updateBrandById(this.state.stateBrand.code, {
            name: data.name,
            summary: data.summary,
            image: data.image,
        }).then(res => {
            if (res.status === 200) {
                toast.success('Chỉnh sửa thương hiệu thành công!')
            }
            this.loadData()
        }, function (error) {
            toast.error("Lỗi không lưu được!")
        })
        this.setCloseModalEditBrand()
    }
    setShowModal = () => {
        this.setState({ showModal: true });
    }
    setCloseModal = () => {
        this.setState({ showModal: false });
        this.setState({ avatarProduct: '' });
    }
    async setShowModalEditBrand(id) {
        await BrandService.getBrandById(id).then(res => {
            this.setState({ stateBrand: res.data.brands })
        })
        this.setState({ showModalEdit: true });

    }
    setCloseModalEditBrand = () => {
        this.setState({ showModalEdit: false });
        this.setState({ avatarProduct: '' });
    }
    delete = (type) => {
        var result = window.confirm("Bạn chắc chắn muốn xóa loại thương hiệu này không?")
        if (result) {
            BrandService.deleteBrand(type)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success("Xóa thành công!!!");
                        this.loadData();
                    }
                    else {
                        toast.error("Xóa thất bại");
                    }
                })
            //   .catch((err) => toast.error(err.response.data));
        }
        else {
            console.log('jjj');
        }
    }
    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        console.log("@@@@", this.state);
        return (
            <div onLoad={this.loadData}>
                {/* <div className="row">
          <div className="col-sm-10"></div> */}
                <div className="container">
                    <button type="button" class="btn btn-sm btnAddProduct" onClick={this.setShowModal}><p class="fas fa-plus-circle textInBtnAddProduct">   Thêm thương hiệu</p></button>
                    {/* </div> */}
                </div>
                <>
                    <ToastContainer />
                    {/* Modal add */}
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
                                Thêm thông tin thương hiệu
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Tên thương hiệu</Form.Label>
                                    <Form.Control type="text" placeholder="Tên sản phẩm" name="name" onChange={this.onChangeValue} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control as="textarea" type="text" name="description" rows={2} onChange={this.onChangeValue} />
                                </Form.Group>
                                <Form>
                                    <div>Ảnh của nhãn hiệu</div>
                                    <div className="borderImgSizeIcon">
                                        <label for="upload-avatar-photo" className="iconOnImgBorder"><i className="fas fa-image fa-3x"></i></label>
                                        <Form.Control
                                            id="upload-avatar-photo"
                                            type="file"
                                            accept=".png, .jpg, .svg, .jfif"
                                            onChange={this.onChangeValueImage}
                                            name="imagePath"
                                            oninput="pic.src=window.URL.createObjectURL(this.files[0])"
                                        />
                                    </div>
                                    <img className="borderImgSizeBrand" src="#" />

                                </Form>
                                <Button variant="primary" onClick={this.save}>
                                    Thêm
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    {/* Modal Edit */}
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
                                Sửa thông tin thương hiệu
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Tên thương hiệu</Form.Label>
                                    <Form.Control type="text" placeholder="Tên sản phẩm" name="name" onChange={this.InputOnChangeEdit} value={this.state.stateBrand.name} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control as="textarea" type="text" name="summary" rows={2} onChange={this.InputOnChangeEdit} value={this.state.stateBrand.summary ? this.state.stateBrand.summary : null} />
                                </Form.Group>
                                <Form>
                                    <div>Ảnh của nhãn hiệu</div>
                                    <div className="borderImgSizeIcon">
                                        <label for="upload-avatar-photo" className="iconOnImgBorder"><i className="fas fa-image fa-3x"></i></label>
                                        <Form.Control
                                            id="upload-avatar-photo"
                                            type="file"
                                            accept=".png, .jpg, .svg, .jfif"
                                            onChange={this.imageAvatarProductHandler}
                                            name="imagePath"
                                            oninput="pic.src=window.URL.createObjectURL(this.files[0])"
                                        />
                                    </div>
                                    {this.state.stateBrand.image ?
                                        <div>
                                            {this.state.imagePathEdit === '' ?
                                                <img className="borderImgSizeBrand" src={this.state.stateBrand.image} /> : <img className="borderImgSizeBrand" src={this.state.imagePathEdit} />
                                            }
                                        </div> :
                                        <div>
                                            {this.state.imagePathEdit === '' ? null :
                                                <img className="borderImgSizeBrand" src={this.state.imagePathEdit} />
                                            }
                                        </div>
                                    }
                                </Form>
                                <Button variant="primary" onClick={this.saveEdit}>
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
                                    <p className="fontSizeNameTable">Danh sách thương hiệu</p>
                                </CCardHeader>
                                <CCardBody>
                                    <>
                                        <CRow>
                                            <CCol>
                                                <CCard>
                                                    <CCardBody>
                                                        <Table striped hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Name</th>
                                                                    <th>Summary</th>
                                                                    <th>Image</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>

                                                            {/* Show danh sách các sản phẩm */}
                                                            <tbody>
                                                                {this.state.listShowBrands.map((brand, i) => {
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td>{i + 1}</td>
                                                                            <td>{brand.name}</td>
                                                                            <td>{brand.summary}</td>
                                                                            {brand.image !== null ?
                                                                                <td>
                                                                                    <img
                                                                                        className="borderImgSizeAvatar"
                                                                                        src={brand.image}
                                                                                    />
                                                                                    {/* <div className="view" onClick={() => this.setShowModalViewImage(listProduct.id)}>View all</div> */}
                                                                                </td> :
                                                                                <td>
                                                                                    Null
                                                                                </td>
                                                                            }
                                                                            <td>
                                                                                <Button
                                                                                    size="sm"
                                                                                    onClick={() => this.setShowModalEditBrand(brand.code)}
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
                                                                                    onClick={() => this.delete(brand.code)}
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
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </>
            </div>

        );
    }
    imageAvatarProductHandler = (event) => {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            const a = document.querySelector(".borderImgSizeBrand6");
            reader.onload = function (e) {
                this.setState({
                    imagePathEdit: e.target.result,
                });
            }.bind(this);
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    realTime = () => {
        this.setState({ updateDaily: '1' });
    }
}
const mapStateToProps = state => {
    return {
        urlBackend: state.urlBackend,
        user: state.user
    }
}
export default connect(mapStateToProps, null)(Brand);