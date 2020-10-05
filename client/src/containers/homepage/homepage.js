import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import Cookies from "js-cookie";

class HomePage extends Component {

    

    logoutHandler = () => {

        var userCreds = {
            email: this.props.userState.email,
            password: this.props.userState.password
        }
        
        var config = {
            method: 'post',
            url: '/user/logout',                                 
            data : JSON.stringify(userCreds),            
          };

        axios(config).then(res => {            
                        this.props.onUserLogout();
                        console.log(res.data);              
                        Cookies.remove("sid");
            }
        );
    }

    render() {
        return (
            <div className="homepage">
                <header>
                    <h1>Home Page...!!!</h1>
                    <button onClick={this.logoutHandler}>Logout</button>
                </header>
            </div>
        );
    }
}

const matchStateToProps = (state) => {
    return {
        userState: state
    }
}

const mapDispatcherToProps = dispatch => {
    return {
        onUserLogout: () => dispatch({ type: "LOGOUT" })
    }
}

export default connect(matchStateToProps, mapDispatcherToProps)(HomePage);