const express=require('express');
const morgan = require('morgan');
const userRoutes=require('./Routes/user.routes')
const cors = require('cors');
const app=express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',userRoutes);
app.get('/',(req,res)=>{
    res.send('hello world');
})
module.exports = app;