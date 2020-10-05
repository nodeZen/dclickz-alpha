import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import {NavLink} from 'react-router-dom';
import './register.css';

class Register extends Component {
 
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        formValid:null,
        newUser:null
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });        
    }

    submitHandler = (event) => {        
        event.preventDefault();        
        if(this.isValid()){
            const userDetails = {
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                password:this.state.password
            }
            this.setState({formValid:true});
            axios.post('/user/register',userDetails).then(res => {
                this.setState({newUser:res.data.newUser});
                console.log(this.state.newUser);
            });
        }else
        this.setState({formValid:false});        
    }

    isValid=(callback)=>{
        const validators = {
        isValidEmail:true,
        isValidPassword: true,
        isValidFirstName:true,
        isValidLastName:true
        }
        // Checking for password validity
        const pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        pwdRegex.test(this.state.password)?validators.isValidPassword = true:validators.isValidPassword = false;
        // Checking for email validity
        validator.isEmail(this.state.email)?validators.isValidEmail = true:validators.isValidEmail = false;
        // Checking first name has greater than three Characters
        this.state.firstName.length < 3 ? validators.isValidFirstName = false : validators.isValidFirstName = true
        // Checking first name has greater than three Characters
        this.state.lastName.length < 3 ? validators.isValidLastName = false : validators.isValidLastName = true
        const isFormValid = (validators.isValidEmail&&validators.isValidPassword&&validators.isValidFirstName&&validators.isValidLastName)        
        return isFormValid
    }  

    render() {  
        return (            
            <div className="Register">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>                
                {this.state.formValid === false?
                <div className = "InvalidForm">
                    <h2>Invalid details..!!!</h2>                    
                    <p>First Name and Last Name should have atleast 3 letters in each</p>
                    <p>Password should contain 8 charecters with atleast one capital, one special and one numeric</p>
                    <p>Please make sure You have entered a valid email Address</p>
                </div>                
                :null}
            <h1>Registration Form</h1>
            <form className="RegistrationForm" onSubmit={this.submitHandler}>
                <input placeholder="First Name" name="firstName" value={this.state.firstName} onChange={this.changeHandler} />
                <br></br>
                <input placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={this.changeHandler} />
                <br></br>
                <input placeholder="email" name="email" value={this.state.email} onChange={this.changeHandler} />
                <br></br>
                <input placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.changeHandler} />
                <br></br>
                <button type="submit">Register</button>
            </form>
            {this.state.newUser === true?<p>Successfully registered..!!!!</p>:null}
            {this.state.newUser === false?<p>User exists...!!!</p>:null}
            </div>
            );
    }
}

export default Register;