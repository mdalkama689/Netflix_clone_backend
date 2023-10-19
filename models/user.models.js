import { Schema, model } from "mongoose"
const userSchema = new Schema ({
username: {
    type: String,
    required: true,
    unique: true 
},
email: {
    type: String,
    required: true,
    unique: true 
},
password: {
    type: String,
    required: true,
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
otp: {
    type: Number,
    required: true,
},
createdAt: {
    type: Date,
    default: Date.now()
},
isUsed: {
    type: Boolean,
    default: false
}
}, {
    timestamps: true
})
const User = model('user', userSchema)

export default User