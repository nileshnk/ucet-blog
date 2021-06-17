const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require ('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));
//we link the router files to make app.js clean and easy

const PORT = process.env.PORT;



const middleware = (req,res,next) => {
    console.log("Hello my middleware");
    next();
}


/* app.get('/', (req,res)=>{
    res.send('Hello world from the server app.js');
}); */

app.get('/about',middleware, (req,res)=>{
    console.log('hello about');
    res.send('Hello about from the server');

}); 

app.get('/contact', (req,res)=>{
    res.send('Hello contact from the server');
});


app.listen(PORT, ()=>{
    console.log(`Server is running at port no ${ PORT }`);
})
//console.log('subscribe');