const express = require('express');
const port = 3001||process.env.PORT
const app = express();
const mongoose = require('mongoose');
const mongoURL = require('./connections/mongodb/config');
// Body Parser to parse user requests
const bodyParser = require('body-parser');
// Session for creating sessions
const session = require('express-session');
// For configuring initiating mongo DB to store sessions
const MongoDBStore = require('connect-mongodb-session')(session);
const userRoute = require('./routes/user');

// Configuring our DB to store sessions
const store = new MongoDBStore({
    uri:mongoURL,
    collection:'sessions'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.use(session({secret:"qazwsxedcrfvtgbyhnujmikolp",
                resave:false,
                saveUninitialized:false,
                store:store}));

app.use('/user',userRoute);

app.use('/', express.static('../client/build/'));

mongoose.connect(mongoURL).then(()=>{
    console.log("Connected!!!");
    app.listen(port,()=>{
        console.log("Connected on Port",port);
    }); 
}).catch(err=>{
    console.log(err);
});









