const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required:true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    }

})

module.exports = mongoose.model('User', userShema)


