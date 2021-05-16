import React, { Component } from 'react';
import { Pagination } from 'antd';
import {
  Button,
  Modal,
  Form,
  Table
} from "react-bootstrap";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import '../products/products.css';
import './user.css';
import UserService from "../../../services/UserService";
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['name', 'amount', 'brandId', 'categoryId', 'description', 'price']
class Products extends Component {
  state = {
    showModal: false,
    user: [],
    listUser: [],
    showModalBlock: false,


  };
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    UserService.listUser().then((res) => {
      this.setState({ listUser: res.data.users.sort((a, b) => a.id - b.id) });
    });
  }
  InputOnChange = (event) => {
    const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra

    const newUser = { ...this.state.user, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
    this.setState({ users: newUser });
    console.log(this.state.user)
  }
  // save = () => {
  //   console.log(this.state.products)
  //   ProductService.createProduct(this.state.products).then(res => {
  //     alert("Cập nhật thông tin thành công")
  //     this.loadData();
  //     this.setCloseModal();

  //   }, function (error) {
  //     alert("Lỗi")

  //   });
  // }
  setShowModal = () => {
    this.setState({ showModal: true });
  }
  setCloseModal = () => {
    this.setState({ showModal: false });
  }
  InputOnChangeCategory = (event) => {
    const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
    // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
    {
      this.state.category.map((category) => {
        if (category.name === value) {
          const newProduct = { ...this.state.products, [name]: category.id }
          this.setState({ products: newProduct });
        }
      })
    }
    console.log(this.state.products)
  }
  InputOnChangeBrand = (event) => {
    const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
    // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
    {
      this.state.brand.map((brand) => {
        if (brand.name === value) {
          const newProduct = { ...this.state.products, [name]: brand.id }
          this.setState({ products: newProduct });
        }
      })
    }
    console.log(this.state.products)
  }
  processGender = (value) => {
    if (value === 1) {
      return (
        <i class="fas fa-male male fa-2x"></i>
      )
    }
    else {
      return (
        <i class="fas fa-female female fa-2x"></i>
      )
    }
  }
  blockUser = () => {
    this.setState({ showModalBlock: true });
    console.log(this.state.showModalBlock)
  }
  setCloseModalBlock = () => {
    this.setState({ showModalBlock: false });
  }
  saveBlockUer = () => {

  }
  processTimesTampToDate = (UNIX_Timestamp) =>{
    var date = new Date(UNIX_Timestamp).toLocaleDateString("vi-Vi")
    return date;
  }

  render() {
    return (
      <div>
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
                Thêm thông tin sản phẩm
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-xl-5">
                  <div className="row">
                    <div className="col-xl-4">
                      <img className="imgSizeUser" src={require('../../../img/user/avatar.jpg')} />
                    </div>
                    <div className="col-xl-8">
                      <div className="nameUserOnModal">Võ Tấn Nguyên</div>
                      <div className="scoreUserAccumulation">Điểm thưởng: 100</div>
                      <div className="scoreUserAccumulation">
                        <div className="row">
                          <div className="col-5">Trạng thái:</div>
                          <CBadge color={getBadge('Active')}>
                            {'Active'}
                          </CBadge>
                        </div>
                      </div>
                      <div className="scoreUserAccumulation">Ngày tham gia: 03-11-2020</div>
                    </div>
                  </div>
                </div>
                <div className="hrS"></div>
                <div className="col-xl-6">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="infoUserOnModal">Số điện thoại:</div>
                      <div className="infoUserOnModal">Email:</div>
                      <div className="infoUserOnModal">Ngày sinh:</div>
                      <div className="infoUserOnModal">Địa chỉ:</div>
                      <div className="infoUserOnModal">Giới tính:</div>
                    </div>
                    <div className="col-lg-8">
                      <div className="infoUserOnModal colorInfo">0962536589</div>
                      <div className="infoUserOnModal colorInfo">votannguyen3006@gmail.com</div>
                      <div className="infoUserOnModal">09-06-1999</div>
                      <div className="infoUserOnModal">Q9, TP.HCM</div>
                      <div className="infoUserOnModal">Nam</div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="container">
                <>
                  <CRow>
                    <CCol>
                      <CCard>
                        <CCardHeader>
                          <p className="fontSizeNameTable">Danh sách đơn hàng</p>
                        </CCardHeader>
                        <CCardBody>
                          <Table striped hover>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Họ Tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Trạng thái</th>
                                <th>Ngày tham gia</th>
                                <th>Hành động</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.listUser.map((listUser, idx) => {
                                return (
                                  <tr>
                                    <td>{idx + 1}</td>
                                    <td className="tableFieldName">{listUser.fullName}</td>
                                    <td>{listUser.email}</td>
                                    <td>{listUser.phone}</td>
                                    <td>{listUser.address}</td>
                                    <td>{this.processGender(listUser.gender)}</td>
                                    <td>{listUser.birthday}</td>
                                    <td>
                                      <CBadge color={getBadge('Active')}>
                                        {'Active'}
                                      </CBadge>
                                    </td>
                                    <td>{this.processTimesTampToDate(listUser.createdAt)}</td>
                                    <td>
                                      <div className="row">
                                        <div className="col-3 info">
                                          <i class="fas fa-info-circle" onClick={this.setShowModal}></i>
                                        </div>
                                        <div className="col-3 delete">
                                          <i class="fas fa-user-minus"></i>
                                        </div>
                                      </div>
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
            </Modal.Body>
          </Modal>
        </>
        {/* Modal block user */}
        <>
          <Modal
            show={this.state.showModalBlock}
            onHide={this.setCloseModalBlock}
            keyboard={false}
            backdrop="static"
            dialogClassName="modalMaxWidthDelete"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton className="backModalDele">
              <Modal.Title id="example-custom-modal-styling-title">
                <div className="textCenterModalTitleUser"><i class="fas fa-3x fa-exclamation-triangle noteIconModal"></i></div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="textCaution">Bạn có chắc chắn muốn khóa tài khoản này?</div>
              <div className="container containerSubModalDel row">
                <div className="col-lg-6">
                  <div className="btn btnModalDelAccept" onClick={this.saveBlockUer}>Đồng ý</div>
                </div>
                <div className="col-lg-6">
                  <div className="btn btnModalDelCancel" onClick={this.setCloseModalBlock}>Hủy</div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div>


              </div>

            </Modal.Footer>
          </Modal>
        </>

        <>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <p className="fontSizeNameTable">Danh sách người dùng</p>
                </CCardHeader>
                <CCardBody>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Họ Tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Trạng thái</th>
                        <th>Ngày tham gia</th>
                        <th>Hành động</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.state.listUser.map((listUser, idx) => {
                        if(listUser.isAdmin === false){
                        return (
                          <tr key={idx}>
                            <td className="tableFieldName">{listUser.fullName}</td>
                            <td>{listUser.email}</td>
                            <td>{listUser.phone}</td>
                            <td>{listUser.address}</td>
                            <td>{this.processGender(listUser.gender)}</td>
                            <td>{listUser.birthday}</td>
                            <td>
                              <CBadge color={getBadge('Active')}>
                                {'Active'}
                              </CBadge>
                            </td>
                            <td>{this.processTimesTampToDate(listUser.createdAt)}</td>
                            <td>
                              <div className="row">
                                <div className="col-3 info">
                                  <i class="fas fa-info-circle" onClick={this.setShowModal}></i>
                                </div>
                                <div className="col-3 delete">
                                  <i class="fas fa-user-minus" onClick={this.blockUser}></i>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                        }
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