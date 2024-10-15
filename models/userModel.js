import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    avathar:String,
    name:String,
    email:String,
    password:String,
    role:{type:String,required:true,default:2}
});

const User = mongoose.model("users",userSchema);

export default User;