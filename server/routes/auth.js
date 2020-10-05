const authRoute = (req,res,next)=>{
    if(req.session.isLoggedIn === true)
    next();
    else
    res.redirect('/');
}

module.exports = authRoute;