import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    constructor(props){
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeValueImage = this.onChangeValueImage.bind(this);
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
            imagePath:'',
            name:'',
            description:'',
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
        console.log("addd",this.state.brand)
        console.log("DDDD",this.state.brand.name);
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
            name:this.state.name,
            summary:this.state.description,
            image:this.state.imagePath
        }).then(res => {
            alert("Cập nhật thông tin thành công")
            this.loadData();
        }, function (error) {
        });
    }
    saveEdit = async () => {
        var data = new FormData();
        console.log(this.state.avatarProductSaveAPI)
        if (this.state.avatarProductSaveAPI !== '') {
            data.append("imagePath", this.state.avatarProductSaveAPI);
        }

        data.append("name", this.state.stateBrand.name);
        data.append("summary", this.state.stateBrand.summary);
        await BrandService.updateBrandById(this.state.stateBrand.code, data).then(res => {
            if (res.status === 200) {
                alert('Update Brand thành công!')
            }
            this.loadData()
        }, function (error) {
            alert("Lỗi không lưu được!")
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
    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        console.log("@@@@",this.state);
        return (
            <div onLoad={this.loadData}>
                {/* <div className="row">
          <div className="col-sm-10"></div> */}
                <div className="container">
                    <button type="button" class="btn btn-sm btnAddProduct" onClick={this.setShowModal}><p class="fas fa-plus-circle textInBtnAddProduct">   Thêm thương hiệu</p></button>
                    {/* </div> */}
                </div>
                <>
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
                                Thêm thông tin thương hiệu
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
                                    {this.state.stateBrand.imagePath ?
                                        <div>
                                            {this.state.avatarProduct === '' ? 
                                                <img className="borderImgSizeBrand" src={`${this.props.urlBackend.urlBackend}${this.state.stateBrand.imagePath}`} />:<img className="borderImgSizeBrand" src={this.state.avatarProduct} />
                                            }
                                        </div> :
                                        <div>
                                            {this.state.avatarProduct === '' ? null :
                                                <img className="borderImgSizeBrand" src={this.state.avatarProduct} />
                                            }
                                        </div>}
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
                                                                            <td>{i+1}</td>
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
                                                                            <td className="infoIconOnBrand" onClick={() => this.setShowModalEditBrand(brand.code)}><i class="fas fa-info-circle"></i></td>
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
                                    {/* <CDataTable
                                        items={this.state.listShowBrands}
                                        fields={fields}
                                        hover
                                        striped
                                        bordered
                                        size="lg"
                                        itemsPerPage={10}
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
                                    /> */}
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </>
            </div>

        );
    }
    imageAvatarProductHandler = (event) => {
        const reader1 = new FileReader()
        reader1.onload = () => {
            if (reader1.readyState === 2) {
                this.setState({ avatarProduct: reader1.result })
                this.realTime();    //Cập nhật state ngay lập tức
            }
        }
        this.setState({ avatarProductSaveAPI: event.target.files[0] })
        //this.state.avatarProductSaveAPI.push(event.target.files[0])
        this.realTime();
        this.setState({ imagePath:this.state.avatarProductSaveAPI})    //Cập nhật state ngay lập tức
        console.log(this.state.avatarProductSaveAPI)
        reader1.readAsDataURL(event.target.files[0])
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
export default connect(mapStateToProps,null)(Brand);