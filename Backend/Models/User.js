const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:[6,'email must be 6 charecter'],
    },
    password:{
        type:String
    }
})
module.exports=mongoose.model('user',UserSchema);