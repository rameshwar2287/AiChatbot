const mongoose=require('mongoose')

const mongoConnect= async()=>{
    mongoose.connect("mongodb+srv://rameshwarahir22:banti1234@banticluster.rfgsugw.mongodb.net/aichatbot?retryWrites=true&w=majority").then(()=>{
        console.log("databse connected")
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports=mongoConnect