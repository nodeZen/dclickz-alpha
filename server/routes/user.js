const express = require('express');
const userController = require('../controllers/user');
const cors = require('cors');
const authRoute = require('./auth');

const user = express.Router();


user.use(cors());

user.post('/register',userController.userRegister);

user.post('/login',userController.userLogin);

user.post('/logout',userController.userLogout);

module.exports = user;