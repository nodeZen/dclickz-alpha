import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './login.css';
import Cookies from "js-cookie";

class Login extends Component {

    state = {
        email: "",
        password: "",
        userExists: null,
        wrongPassword: null,
        session: null
    }

    loginSubmitHandler = (event) => {

        event.preventDefault();

        var userCreds = {
            email: this.state.email,
            password: this.state.password
        }
        var config = {
            method: 'post',
            url: '/user/login',  
            headers: { 
                'Content-Type': 'application/json',                 
              },          
            data :JSON.stringify(userCreds)
          };

        axios(config).then(res => {
            if (res.data.isLoggedIn === true) {                
                    this.setState({session:res.data});                

                    this.props.onUserLogin(this.state.email,this.state.password);                                      

                    this.props.history.push("/homepage");

                    Cookies.set("sid",res.data.cookie);

            } else if (res.data.isLoggedIn === false) {

                this.setState({ wrongPassword: true, userExists: true });
            }
            else
                this.setState({ wrongPassword: null, userExists: false });
            
        }).catch(err => {
            console.log(err);
        });
    }

    onChangeHandler = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        return (         
            <div className="Login">              
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
                <h1>Login Form</h1>
                <form onSubmit={this.loginSubmitHandler}>
                    <input placeholder="email" type="text" name="email" value={this.state.email} onChange={this.onChangeHandler} />
                    <br></br>
                    <input placeholder="password" type="password" name="password" value={this.state.password} onChange={this.onChangeHandler} />
                    <br></br>
                    <button type="submit">Login</button>
                    {this.state.userExists === false ? <p>User does not exist...!!!</p> : null}
                    {this.state.wrongPassword === true ? <p>Wrong Password..!!!</p> : null}
                </form>
            </div>
          
        );
    }

}
const mapStateToProps = (state) => { 

    return { 

        isLogin: state.isLoggedIn

    }
}

const mapDispatcherToProps = dispatch => {

    return {

        onUserLogin: (email,password) => dispatch({

            type: "LOGIN", payload: {

                userEmail : email,
                userPassword: password

            }
        })
    }
}


export default connect(mapStateToProps, mapDispatcherToProps)(withRouter(Login));