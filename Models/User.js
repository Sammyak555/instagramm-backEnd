import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        min : 2,
        max : 30
    },
    lastName : {
        type : String,
        required : true,
        min : 2,
        max : 30
    },
    email : {
        type : String,
        required : true,
        max : 40,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 5
    },
    picturePath : {
        type : String,
        default : ''
    },
    friends : {
        type : Array,
        default : []
    },
    
    location : {
        type : String,
        
    },
    occupation : String,
    viewedProfile : Number,
    impressions : Number
},{timestamps : true})
//timestamps === date of update

const User = mongoose.model('User',userSchema)

export default User