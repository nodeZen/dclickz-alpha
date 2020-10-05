import React, { Component } from 'react';
import {Route,NavLink, Redirect, Switch} from 'react-router-dom';
import Register from '../register/register';
import Login from '../login/login';
import HomePage from '../homepage/homepage';
import {connect} from 'react-redux';

class Landing extends Component {

  
    componentDidMount(){
        console.log(this.props.islogin); 
    }

    render() {        
        return (
            <div>     
                {/* <p>Foo:{this.props.islogin}</p>                                     */}
                    <Switch>                                    
                       {this.props.islogin === 1? <Route exact path="/homepage" component={HomePage}/>:null}  
                       {this.props.islogin === 1? <Redirect path from="/login" to="/homepage"/>:null}                      
                    <Route path = "/login" component = {Login}/> 
                    <Route exact path="/register" component={Register}/>                    
                    <Redirect path from="/" to="/login"/>
                    </Switch>                    
            </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return {
        islogin: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Landing);