import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginUser from "../../../services/UserService";
import Cookies from "js-cookie";
import './login.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class Login extends Component {
  
  state = {}
  emailRef = React.createRef();
  passwordRef = React.createRef();
  login = () => {
    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;
    console.log("email",email);
    console.log("password",password);
    var seft = this;
    LoginUser.login(email, password).then(res => {
      if(res.data.isAdmin === true){
        Cookies.set('loginInfoAdmin', JSON.stringify(res.data.token), { expires: 1 / 24 });
        LoginUser.getUser().then((res) => {
          var userInfo = res.data.users;
          console.log(userInfo)
          this.props.onUserLogin(userInfo);
        });
        
      }
      else {
        alert('Bạn không phải admin vui lòng thử lại!');
      }
    },function (error) {
      console.log('do day');
      // Do something with response error
      if (error.response.status === 401) {
        seft.isErrorTrue();
        document.getElementById("errModal").click();

      }
      else {
        console.log(error.response.status);
      }
    })
    
  }
  render() {
    
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" autoComplete="username" innerRef={this.emailRef} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" autoComplete="current-password" innerRef={this.passwordRef} />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" className="px-4" onClick={this.login}>Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    {/* <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                      
                    </div> */}
                    <img className="imgLogoShop" src={require('../../../img/LogoShop.jpg')}/>
                  </CCardBody>
                </CCard>

              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}
export default Login;

