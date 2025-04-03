const dotenv = require('dotenv');
dotenv.config();
const http=require('http');
const mongoConnect=require('./db')
const app=require('./app')
mongoConnect();
const port=process.env.PORT || 3000;
 
const server=http.createServer(app);
server.listen(port,()=>{
    console.log(`server is running at ${port} `)
})
