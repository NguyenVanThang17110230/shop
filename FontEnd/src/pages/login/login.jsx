import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Cookies from "js-cookie";
import LoginUser from "../../services/UserService";
import axios from 'axios';

import history from "../history.js";
import "../login/login.css";
import { toast,ToastContainer } from 'react-toastify';
class Login extends Component {
    state = {
        message: " ",
        isLogin: false,
        isError: false,
        realTime: "",
        redirect: false
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    emailRef = React.createRef();
    passwordRef = React.createRef();
    login = () => {
        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;
        var seft = this;
        if(email!=="" && password!==""){
            LoginUser.login(email, password).then(res => {
                Cookies.set('loginInfo', JSON.stringify(res.data.token), { expires: 1 / 24 });
                toast.success("Đăng nhập thành công!")
                LoginUser.getUser().then((res) => {
                    var userInfo = res.data.users;
                    this.props.onUserLogin(userInfo);
                    console.log("aaaaa");
                }).catch((err)=>{
                    console.log('dddd');
                    console.log(err.response);
                })
                setTimeout(() => {
                    history.push("/");
                }, 2000);
                
            }, function (error) {
                toast.error("Sai tài khoản hoặc mật khẩu!")
            });
        }
        else{
            toast.info("Vui lòng nhập đầy đủ thông tin trước khi đăng nhập!")
        }
        
        

    }
    LoginGoogle = () => {
        var { urlBackend } = this.props;
        window.open(`${urlBackend}api/user/auth/google`, "mywindow", "top=50,left=500,location=1,status=1,scrollbars=1, width=800,height=800");
        let listener = window.addEventListener('message', (message) => {
            //message will contain facebook user and details
            console.log(message)
            Cookies.set('loginInfo', JSON.stringify(message.data.token), { expires: 1 / 24 });
            LoginUser.getUser().then((res) => {
                var userInfo = res.data.users;
                this.props.onUserLogin(userInfo);   
            });

        });

    }
    LoginFacebook = () =>{
        var { urlBackend } = this.props;
        window.open(`${urlBackend}api/user/auth/facebook`, "mywindow", "top=50,left=500,location=1,status=1,scrollbars=1, width=800,height=800");
        let listener = window.addEventListener('message', (message) => {
            //message will contain facebook user and details
            console.log(message)
            Cookies.set('loginInfo', JSON.stringify(message.data.token), { expires: 1 / 24 });
            LoginUser.getUser().then((res) => {
                var userInfo = res.data.users;
                this.props.onUserLogin(userInfo);
            });

        });
    }
    // LoginGoogle = () => {
    //     this.setState({
    //          redirect: true
    //     })
    //  }
    // doRedirect = () => {
    //     var { urlBackend } = this.props
    //      if(this.state.redirect === true){
    //          return window.location.assign(`${urlBackend}api/user/auth/google`)
    //      } 
    //  }
    isErrorFalse = () => {
        this.setState({ isError: false });

    }
    isErrorTrue = () => {
        this.setState({ isError: true });

    }
    render() {
        return (
            <div className="loginbackground">
                <ToastContainer />
                <section class="login_part section_padding ">
                    <div class="container">
                        <div class="row align-items-center formRightbackground radiusFormLogin">
                            <div class="col-lg-6 col-md-6">
                                <div class="login_part_text text-center">
                                    <div class="login_part_text_iner">
                                        <h2>Bạn là khách hàng mới?</h2>
                                        <p>Hãy nhanh tay đăng ký tài khoản ngay để nhận được ưu đãi cho người mới và nhiều ưu đãi khác</p>
                                        <Link to="/register" class="btn_3">Create an Account</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="login_part_form">
                                    <div class="login_part_form_iner">
                                        <h3>Chào mừng bạn trở lại ! <br />
                                            Vui lòng đăng nhập ngay bây giờ</h3>
                                        <div class="row contact_form ">
                                            <div className="text-center text-danger">{this.state.message}</div>
                                            <br />
                                            <div class="col-md-12 form-group p_star">
                                                <input type="email" class="form-control withTextBox" id="name" name="name" ref={this.emailRef}
                                                    placeholder="email" />
                                            </div>
                                            <div class="col-md-12 form-group p_star">
                                                <input type="password" class="form-control withTextBox" id="password" name="password" ref={this.passwordRef}
                                                    placeholder="Password" />
                                            </div>
                                            <div class="col-md-12 form-group">
                                                <div class="creat_account d-flex align-items-center">
                                                    <input type="checkbox" id="f-option" name="selector" />
                                                    <label for="f-option">Remember me</label>
                                                </div>
                                                <button type="submit" onClick={this.login} id="login" className="btn_3">
                                                    log in
                                                </button>
                                                <a class="lost_pass" href="#">forget password?</a>
                                                <br />
                                                <br />
                                                <div id="login" className="btn btnGoogle" onClick={()=>this.LoginGoogle()}>
                                                    <i class="fab fa-google-plus fa-3x iconGoogle"><div className="textOnIconGoogle">Đăng nhập bằng Google</div></i>
                                                </div>
                                                <br />
                                                <div id="login" className="btn btnFacebook" onClick={()=>this.LoginFacebook()}>
                                                    <i class="fab fa-facebook fa-3x iconFacebook"><div className="textOnIconGoogle">Đăng nhập bằng Facebook</div></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <button type="button" class="btn" id="errModal" data-toggle="modal" data-target="#exampleModal">
                </button>
                {this.state.isError ?
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal- backGroundIconFailded">
                                    <div className="iconFailed"><i class="fas fa-exclamation-circle fa-8x"></i></div>
                                </div>
                                <div class="modal-body">
                                    <p className="pSorry">Xin lỗi</p>
                                    <p className="pDetailSorry">Email đăng nhập hoặc mật khẩu không đúng!</p>
                                    <p className="pDetailSorry">Vui lòng đăng nhập lại</p>
                                    <button type="button" class="btn btnReturn" data-dismiss="modal" onClick={this.isErrorFalse}>Thử lại</button>

                                </div>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        );
    }
}

export default Login;