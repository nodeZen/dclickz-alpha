const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.userRegister = (req, res, next) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    });    
    User.findOne({ email: newUser.email }).then(user => {
        if (user) {
            res.send({ newUser: false});
        } else {
            bcrypt.hash(newUser.password, 13, (err, hash) => {
                newUser.password = hash
                newUser.save().then(
                    res.send({ newUser:true })
                ).catch(err => {
                    console.log(err)
                });
            });
        }
    });
}

exports.userLogin = (req,res,next)=>{
        const userCreds = {
            email:req.body.email,
            password:req.body.password
        }
        User.findOne({email:userCreds.email}).then(user=>{
            bcrypt.compare(userCreds.password,user.password,(err,result)=>{
               if(result){
                //    Setting session properties
                req.session.isLoggedIn = true;                
                req.session.user = user;
                res.send(req.session);
               }               
               else
               res.send({isLoggedIn:false});                     
            })
        }).catch(err=>{
            res.send({userExists:false});
        });
}

exports.userLogout = (req,res,next)=>{     
   req.session.destroy(()=>{
       res.send({isLoggedIn:false})
   });
   
}


