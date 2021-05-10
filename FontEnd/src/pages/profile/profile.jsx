import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../profile/profile.css";
import UserService from '../../services/UserService';
import OrderService from '../../services/OrderService';
import {
    Button,
    Modal,
    Form,
    Table,
    Dropdown
} from "react-bootstrap";
class Profile extends Component {
    state = {
        closeForm: false,
        users: {},
        user: [],
        male: false,
        female: true,
        gender: '',
        check: '',
        stateListOrder: [],
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.loadData();
    }
    loadData = () => {
        UserService.getUser().then((res) => {
            this.setState({ user: res.data.users });
        });
        OrderService.getMyOrder().then(res => {
            this.setState({ stateListOrder: res.data.orders })
            this.props.onLoadOrderFromApi(res.data.orders)
        })
        
    }
    // closeFormResetPassword(){
    //     this.setState({closeForm: false});
    // }
    showFormResetPassword(value) {
        if (value === false) {
            this.setState({ closeForm: true });
        }
        else {
            this.setState({ closeForm: false });
        }
    }
    InputOnChange = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra

        const newUser = { ...this.state.user, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.setState({ user: newUser });
        console.log(name, value);
        console.log(this.state.user);

        //Có thể viết là trung tên major được phép bỏ luôn biến ngoài sau ':'
        // const major = {...this.state.major, [name]: value} // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        // this.setState({major});
        // console.log(name, value);
    }
    changeInfo = () => {
        UserService.updateUser(this.state.user).then(res => {
            alert("Cập nhật thông tin thành công")
            this.loadData();

        }, function (error) {

        });
    }
    checkGenderFemale = (event) => {        //biến index để check là nam hay nữ
        const newUser = { ...this.state.user, gender: '0' } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.setState({ user: newUser });
        return (
            <div class="col-sm-10">
                <div class="form-check form-check-inline">
                    <input className="form-check-input mt-2" name="gender" type="radio" id="inlineRadio1" value="option1" onClick={this.genderCheck} />
                    <label class="form-check-label mt-2" for="inlineRadio1">Nam</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input mt-2" name="gender" type="radio" id="inlineRadio2" value="option2" checked />
                    <label class="form-check-label mt-2" for="inlineRadio2">Nữ</label>
                </div>
            </div>
        )
    }
    checkGenderMale = (event) => {        //biến index để check là nam hay nữ
        const newUser = { ...this.state.user, gender: '1' } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.setState({ user: newUser });
        return (
            <div class="col-sm-10">
                <div class="form-check form-check-inline">
                    <input className="form-check-input mt-2" name="gender" type="radio" id="inlineRadio1" value="option1" checked />
                    <label class="form-check-label mt-2" for="inlineRadio1">Nam</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input mt-2" name="gender" type="radio" id="inlineRadio2" value="option2" onClick={this.genderCheck} />
                    <label class="form-check-label mt-2" for="inlineRadio2">Nữ</label>
                </div>
            </div>
        )
    }
    genderCheck = () => {
        if (this.state.user.gender === 1 || this.state.user.gender === '1') {
            return (
                <div class="col-sm-10">
                    <div class="form-check form-check-inline">
                        <input className="form-check-input mt-2" name="gender" type="radio" id="inlineRadio1" value="option1" checked />
                        <label class="form-check-label mt-2" for="inlineRadio1">Nam</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input mt-2" name="gender" type="radio" id="inlineRadio2" value="option2" onClick={this.checkGenderFemale} />
                        <label class="form-check-label mt-2" for="inlineRadio2">Nữ</label>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div class="col-sm-10">
                    <div class="form-check form-check-inline">
                        <input className="form-check-input mt-2" name="gender" type="radio" id="inlineRadio1" value="option1" onClick={this.checkGenderMale} />
                        <label class="form-check-label mt-2" for="inlineRadio1">Nam</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input mt-2" name="gender" type="radio" id="inlineRadio2" value="option2" checked />
                        <label class="form-check-label mt-2" for="inlineRadio2">Nữ</label>
                    </div>
                </div>
            )
        }
    }
    // onClickGenderMale=()=>{
    //     return (
    //         <div class="col-sm-10">
    //             <div class="form-check form-check-inline">
    //                 <input className="form-check-input mt-2" name="gender" type="radio" id="inlineRadio1" value="option1" checked />
    //                 <label class="form-check-label mt-2" for="inlineRadio1">Nam</label>
    //             </div>
    //             <div class="form-check form-check-inline">
    //                 <input class="form-check-input mt-2" name="gender" type="radio" id="inlineRadio2" value="option2" onClick={this.checkGenderFemale} />
    //                 <label class="form-check-label mt-2" for="inlineRadio2">Nữ</label>
    //             </div>
    //         </div>
    //     )

    // }
    // onClickGenderFemale=()=>{
    //     return (
    //         <div class="col-sm-10">
    //             <div class="form-check form-check-inline">
    //                 <input className="form-check-input mt-2" name="gender" type="radio" id="inlineRadio1" value="option1" onClick={this.checkGenderMale}  />
    //                 <label class="form-check-label mt-2" for="inlineRadio1">Nam</label>
    //             </div>
    //             <div class="form-check form-check-inline">
    //                 <input class="form-check-input mt-2" name="gender" type="radio" id="inlineRadio2" value="option2" onClick={this.checkGenderFemale} checked/>
    //                 <label class="form-check-label mt-2" for="inlineRadio2">Nữ</label>
    //             </div>
    //         </div>
    //     )

    // }
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
    changeStatus = (status, id) => {
        OrderService.updateOrder({ 'status': status }, id).then(res => {
            console.log(res.data.orders)
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
    render() {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        return (
            <div className="backGroundLayoutProfile" onLoad={this.componentDidMount}>
                <div class="slider-area ">
                    <div class="single-slider slider-height2 d-flex align-items-center data-background-profile">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="hero-cap text-center">
                                        <h2>Thông tin tài khoản</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container alignContainerMain">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="container backGroundCol containerTopANdBottomLeft">
                                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a class="nav-link active backGroundNavLink" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true">Thông tin cá nhân</a>
                                    <a class="nav-link backGroundNavLink" id="v-pills-order-tab" data-toggle="pill" href="#v-pills-order" role="tab" aria-controls="v-pills-order" aria-selected="false">Quản lý đơn hàng</a>
                                    <a class="nav-link backGroundNavLink" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Payment</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="container backGroundCol containerTopANdBottomRight">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <h3>Thông tin tài khoản</h3>

                                        <div class="form-group row">
                                            <label for="staticEmail" class="col-sm-2 col-form-label">Họ tên</label>
                                            <div class="col-sm-10">
                                                <input type="text" name="fullName" readonly class="form-control form-control-Profile inputTemp" id="staticName" onChange={this.InputOnChange} value={this.state.user.fullName || ''} />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputPassword" class="col-sm-2 col-form-label">Số điện thoại</label>
                                            <div class="col-sm-10">
                                                <input type="text" name="phone" class="form-control form-control-Profile " id="inputPassword" placeholder="Số điện thoại" onChange={this.InputOnChange} value={this.state.user.phone || ''} />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control form-control-Profile " id="inputPassword" placeholder="" onChange={this.InputOnChange} value={this.state.user.email || ''} disabled />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputPassword" class="col-sm-2 col-form-label">Giới tính</label>
                                            <div class="col-sm-10">
                                                {/* <div class="form-check form-check-inline">
                                                    <input className="form-check-input mt-2" name="gender" type="radio" id="inlineRadio1" value="option1" onClick={this.checkGenderMale} />
                                                    <label class="form-check-label mt-2" for="inlineRadio1">Nam</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input mt-2" name="gender" type="radio" id="inlineRadio2" value="option2" onClick={this.checkGenderFemale} />
                                                    <label class="form-check-label mt-2" for="inlineRadio2">Nữ</label>
                                                </div> */}
                                                {this.genderCheck()}
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputPassword" class="col-sm-2 col-form-label">Ngày sinh</label>
                                            <div class="col-sm-10">
                                                <Form.Control type="date" name="birthday" className="form-control form-control-Profile" onChange={this.InputOnChange} value={this.state.user.birthday || ''} />
                                                {/* <input type="date" name="birthday" class="form-control form-control-Profile" id="inputDatetime" onChange={this.InputOnChange} value={this.state.user.birthday || ''} /> */}
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputPassword" class="col-sm-2 col-form-label">Địa chỉ</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control form-control-Profile" name="address" id="inputAddress" placeholder="" onChange={this.InputOnChange} value={this.state.user.address || ''} />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div className="col-sm-2"></div>
                                            <div class="col-sm-10">
                                                <div className="btn btn-primary" onClick={this.changeInfo}>Lưu thông tin</div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="inputPassword" class="col-sm-2 col-form-label"></label>
                                            <div class="col-sm-10">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="defaultCheck1" onClick={() => this.showFormResetPassword(this.state.closeForm)} />
                                                    <label class="form-check-label" for="defaultCheck1">
                                                        Đổi mật khẩu
                                                        </label>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            this.state.closeForm ?
                                                <form className="resetPassword" id="resetPassword">
                                                    <div class="form-group row">
                                                        <label for="staticEmail" class="col-sm-2 col-form-label">Mật khẩu cũ</label>
                                                        <div class="col-sm-10">
                                                            <input type="password" readonly class="form-control form-control-Profile inputTemp" id="staticName" placeholder="Mật khẩu cũ" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-2 col-form-label">Mật khẩu mới</label>
                                                        <div class="col-sm-10">
                                                            <input type="password" class="form-control form-control-Profile" id="inputPassword" placeholder="Mật khẩu mới" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-2 col-form-label">Nhập lại</label>
                                                        <div class="col-sm-10">
                                                            <input type="password" class="form-control form-control-Profile" id="inputPassword" placeholder="Nhập lại mật khẩu mới" />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-2">

                                                        </div>
                                                        <div className="col-sm-10">
                                                            <div className="btn btn-primary">
                                                                Cập nhật
                                                            </div>
                                                        </div>

                                                    </div>

                                                </form> : null
                                        }
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-order" role="tabpanel" aria-labelledby="v-pills-order-tab">
                                        <div className="titleTable">Danh sách tất cả đơn hàng</div>
                                        <div className="row paddingRow">
                                            <div className="col-md-2">
                                                <p>Mã đơn hàng</p>
                                            </div>
                                            <div className="col-md-2 PaddingCol-1">
                                                <p>Ngày mua</p>
                                            </div>
                                            
                                            <div className="col-md-2">
                                                <p>Tổng tiền</p>
                                            </div>
                                            <div className="col-md-2">
                                                <p className="pMarginStatusOder">Trạng thái đơn</p>
                                                <p className="pPaddingRight">hàng</p>
                                            </div>
                                        </div>
                                        <hr className="paddingHr" />
                                        {this.state.stateListOrder.filter((a) => a.userId = this.state.user.id).sort((a, b) => a.status - b.status).map((order, idx) => {
                                            if (parseInt(order.totalPrice) !== 0) {
                                            return(
                                            <div className="row paddingRow paddingRow">
                                                <div className="col-md-2">
                                                    <Link className=" fontTextOder LinkColor" to={`/invoicedetail/${order.id}`}>{order.orderCode}</Link>
                                                </div>
                                                <div className="col-md-2 PaddingCol-1">
                                                    <p className=" fontTextOder">{this.processDateOrder(order.createdAt)}</p>
                                                </div>
                                                

                                                <div className="col-md-2">
                                                    <p className=" fontTextOder">{formatter.format(order.totalPrice)}</p>
                                                </div>
                                                <div className="col-md-2">
                                                    <p className="pMarginStatusOder fontTextOder">{this.processStatus(order.status)}</p>
                                                </div>
                                            </div>
                                        )
                                            }
                                    })}
                                        <hr className="paddingHr" />
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;