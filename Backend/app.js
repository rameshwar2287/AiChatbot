const express=require('express');
const morgan = require('morgan');
const userRoutes=require('./Routes/user.routes')
const cors = require('cors');
const cookieParser=require('cookie-parser')
const app=express();
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',userRoutes);
module.exports = app;