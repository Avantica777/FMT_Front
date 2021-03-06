import React, { Component } from 'react';
import Axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { actionSignIn, actionSignOn } from '../../actions/index';
import FacebookLogin from 'react-facebook-login';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import APIPath from '../../components/api.js';


import {
  LogInCard,
  Form,
  Button
} from "../../Shared/styles.js";
import { NavLink } from "react-router-dom";


class LoginPage extends Component {
  state = {
    username:'',
    password: '',
    error:'',
    showPassword:false
  };



  submitForm(e){
    e.preventDefault();

    const { username, password } = this.state;

    console.log(username, password);
    Axios({
      method: 'POST',
      url: APIPath + '/users/login ',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username:username,
        password:password
      }
    })
      .then(res => {
        console.log(res.data);
        if(res.data === 'Login success!') {
          this.props.actionSignIn({username});
          this.props.history.push('/profile');
        }
        else
          NotificationManager.error(res.data,'Error',5000);
        
      })
      .catch(err => {
        console.log(err);
        NotificationManager.error('Authentication Failed','Error',5000);
      });
  }
  handleUsernameChanged(event){
    this.setState({ username: event.target.value });

  }
  handlePasswordChanged(event){
    this.setState({ password: event.target.value });

  }
  showPassword(){
    this.setState({showPassword : true})
  }
  hidePassword(){
    
    this.setState({showPassword : false})
  }

/*        --------FACEBOOK LOGIN---------      */
  
  responseFacebook = user => {
    console.log(user);
    
    const url = 'https://b41f6da9.ngrok.io/users/register';

    Axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: user.name,
      }
    })
      .then(res => {
        console.log(res.data);
        this.props.history.push('/profile');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {

    return (
      <div className="loginContainer">
        <LogInCard>
          <Form className="p-3" onSubmit={this.submitForm.bind(this)}>
            <p style={{color:'black',fontSize:'44px',textAlign:'center',fontWeight:'bold'}}>Sign In</p>
            <div className="input-group mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="material-icons">account_circle</i>
                </span>
              </div>
              <input
                type="username"
                className="form-control"
                value={this.state.username}
                onChange={this.handleUsernameChanged.bind(this)}
                placeholder="Username"
                required
            />
            </div>

            <div className="input-group mb-4">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="material-icons">vpn_key</i>
                </div>
              </div>
              <input
        type={!this.state.showPassword?"password":"text"}
                className="form-control"
                value={this.state.password}
                name="password"
                placeholder="Password"
                onChange={this.handlePasswordChanged.bind(this)}
                required
            />
            { !this.state.showPassword ?(
                    <div className="input-group-apppend">
                    <div className="input-group-text passwordbug">
                    <a href="javascript:;" onClick={this.showPassword.bind(this)}>
                    <i className="material-icons">visibility</i>
                    </a>
                    </div>
                    </div>):
              (<div className="input-group-apppend">
               <div className="input-group-text passwordbug">
               <a href="javascript:;" onClick={this.hidePassword.bind(this)}>
               <i className="material-icons">visibility_off</i>
               </a>
               </div>
               </div>)}
        
        </div>
            <Button className="btn btn-lg btn-primary" style={{background:'#597bd9'}} type="submit">
              Sign In
            </Button>
            
            <FacebookLogin
              appId="277762109835166"
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-lg btn-primary pvCaS facebookbtn"/>

            <p className="text-center" style={{ fontSize: "24px" }}>
              <NavLink to="/signup">Yet to Signup?</NavLink>
            </p>
          </Form>
          <svg
            className="rocks"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              className="svg--sm"
              fill="red"
              points="0,0 30,100 65,21 90,100 100,75 100,100 0,100"
            />
            <polygon
              className="svg--lg"
              fill="red"
              points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100"
            />
          </svg>
          <svg className="gradient">
            <defs>
              <linearGradient id="grad">
                <stop offset="0" stopColor="#97ABFF" />
                <stop offset="1" stopColor="#123597" />
              </linearGradient>
            </defs>
          </svg>
        </LogInCard>
        <NotificationContainer/>
      </div>
      
      // <div className="template-light">
      //   {/* Login  */}
      //   <div className="wrapper wrapper-content--- overflow-hidden">
      //     <div className="container-login">
      //       {/* <div className="wpay-logo text-center">
      //         <img src={'/assets/img/core-img/wpay-logo.png'} alt="" />
      //       </div> */}

      //       {/* Card Area Start */}
      //       <div className="card-login-area">
      //         <h1 className="title text-center">Sign In</h1>
      //         <div className="input-container">
      //           <label htmlFor="req" className="labelCss">
      //             Email
      //           </label>
      //           <input
      //             type="email"
      //             id="req"
      //             value={email}
      //             onChange={this.onChangeEmail}
      //             required
      //           />
      //         </div>
      //         <div className="input-container">
      //           <label htmlFor="pass" className="labelCss">
      //             Password
      //           </label>
      //           <input
      //             type="password"
      //             id="pass"
      //             name="password"
      //             value={password}
      //             onChange={this.onChangePassword}
      //             required
      //           />
      //         </div>
      //         <div className="input-container">
      //           <div className="row">
      //             <div className="col-sm-6">
      //               <div className="check-field">
      //                 <input type="checkbox" id="remember" name="horns" />
      //                 {/* <input type="checkbox" id="remember" /> */}
      //                 <label htmlFor="remember" className="rememberMe">
      //                   Remember me
      //                 </label>
      //               </div>
      //             </div>
      //             <div className="col-sm-6 text-right">
      //               <a href="/forget-password" className="foget-pwd">
      //                 Forget Password?
      //               </a>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="button-container">
      //           <button onClick={e => this.signIn(e)}>
      //             <span>Sign In</span>
      //           </button>
      //         </div>

      //         <SocialButton
      //           provider="facebook"
      //           appId="799512287069582"
      //           onLoginSuccess={this.handleSocialLogin}
      //           onLoginFailure={this.handleSocialLoginFailure}
      //         >
      //           Login with Facebook
      //         </SocialButton>
      //         <div className="not-account mt-2">
      //           Don't have an account? <a href="/signup">SignUp Here</a>
      //         </div>
      //       </div>
      //       {/* Card Area End */}
      //     </div>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ actionSignIn, actionSignOn }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginPage)
);