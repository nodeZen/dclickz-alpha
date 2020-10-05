const firstLogInState = {isLoggedIn:0}
const reducer = (state,action)=>{ 

    if(action.type === "LOGIN"){
       let loginState = {
            isLoggedIn : 1,
            email : action.payload.userEmail,
            password: action.payload.userPassword
        }       
       localStorage.setItem('userState',JSON.stringify(loginState));        
    }  

    if(action.type === "LOGOUT"){         
        localStorage.setItem('userState',JSON.stringify(firstLogInState));         
     }         
    if(JSON.parse(localStorage.getItem('userState'))!==null){
        return JSON.parse(localStorage.getItem('userState'));
    }        
    else
    return firstLogInState;
}

export default reducer;


