import React, { Component, Redirect } from 'react'
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import '../register/register.css'
class Register extends Component {
    state = {
        users: [],
        user: {},
        message: "",
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    save = () => {
        // console.log(this.data.errorCode);
        if (this.state.user.password === this.state.user.confirmPassword) {


            UserService.register(this.state.user).then(res => {
                this.props.history.push('/login')

            }, function (error) {
                //Do something with response error
                if (error.response.status === 422) {
                    alert("Email đã tồn tại");
                }
                console.log("ssss",error.response);
                return Promise.reject(error.response);
                
            });
        }
        else {
            alert("Mật khẩu và mật khẩu xác nhận không trung khớp! Vui lòng thử lại");
        }
    }
    InputOnChange = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        const newUser = { ...this.state.user, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.setState({ user: newUser });
    }
    render() {
        return (
            <div className="backgroundRegister">
                {/* <!-- Register Section Begin --> */}
                <div class="slider-area ">
                    <div class="single-slider slider-height2 d-flex align-items-center data-background-register">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="hero-cap text-center">
                                        <h2>Register</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="register-login-section spad ">
                    <div class="container shadowContainer backgrounsColorRegisterForm">
                        <div class="row">
                            <div class="col-lg-6 offset-lg-3">
                                <div class="register-form">
                                    <form1>
                                        <div className="">
                                            <div class="group-input">
                                                <label for="username">Họ và tên<i className="redStar">*</i></label>
                                                <input type="text" id="username" name="fullName" placeholder="Họ và tên" className="backgroundColorInput" onChange={this.InputOnChange} value={this.state.user.fullName || ''} />
                                            </div>
                                            <div class="group-input">
                                                <label for="username">Địa chỉ email <i className="redStar">*</i></label>
                                                <input type="email" id="username" name="email" placeholder="Email" className="backgroundColorInput" onChange={this.InputOnChange} value={this.state.user.email || ''} />
                                            </div>
                                            <div class="group-input">
                                                <label for="pass">Mật khẩu <i className="redStar">*</i></label>
                                                <input type="password" id="pass" name="password" placeholder="Mật khẩu" className="backgroundColorInput" onChange={this.InputOnChange} value={this.state.user.password || ''} />
                                            </div>
                                            <div class="group-input">
                                                <label for="con-pass">Xác nhận mật khẩu <i className="redStar">*</i></label>
                                                <input type="password" id="con-pass" name="confirmPassword" placeholder="Confirm Password" onChange={this.InputOnChange} className="backgroundColorInput" value={this.state.user.confirmPassword || ''} />
                                            </div>
                                            <button type="submit" class="btn_3 register-btn" onClick={this.save}>Đăng ký</button>
                                        </div>
                                        <div class="switch-login">
                                            <Link className="nav-link" to="/login" class="or-login">Or Login</Link>
                                        </div>
                                    </form1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Register Form Section End -->
    
    <!-- Partner Logo Section Begin --> */}
                {/* <div class="partner-logo">
                    <div class="container">
                        <div class="logo-carousel owl-carousel">
                            <div class="logo-item">
                                <div class="tablecell-inner">
                                    <img src={require('../..')} />
                                </div>
                            </div>
                            <div class="logo-item">
                                <div class="tablecell-inner">
                                    <img src={require('../..')} />
                                </div>
                            </div>
                            <div class="logo-item">
                                <div class="tablecell-inner">
                                    <img src={require('../..')} />
                                </div>
                            </div>
                            <div class="logo-item">
                                <div class="tablecell-inner">
                                    <img src={require('../..')} />
                                </div>
                            </div>
                            <div class="logo-item">
                                <div class="tablecell-inner">
                                    <img src={require('../..')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <!-- Partner Logo Section End --></div> */}
            </div>
        );
    }
}

export default Register;