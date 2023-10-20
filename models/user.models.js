import { Schema, model } from "mongoose"
const userSchema = new Schema ({
username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true 
},
email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true 
},
password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
},
profilePic:{
    type: String,
    default: ''
},
isAdmin: {
    type: Boolean,
    default: false
},
}, {

    timestamps: true
})
const User = model('user', userSchema)

export default User