const Redis=require('ioredis');

const redisclient=new Redis({
    host:"redis-18628.c278.us-east-1-4.ec2.redns.redis-cloud.com",
    port:'18628',
    password:"LshiUt5rDH8a2au6TElyBnTm5jHUyfz0"
})
redisclient.on('connect',()=>{
    console.log("redis connected");
})
module.exports=redisclient;