const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },
    email: {
        type: String,
        require: [true, "email must be provided"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must be provided']
    },
    contact: {
        type: Number,
        require: [true, 'contact must be provided']
    },
    // role: {
    //     type: String,
    //     require: true,
    // },
    address: {
        city: String,
        street: String,
        houseNumber: String,
        zip: String,
        state: String,
    },

    otp: {
        type: String,
    }
    // image: {
    //     type: String,
    // }
}, { timestamps: true })

userSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

userSchema.methods.isValid = function (hashPassword) {
    return bcrypt.compareSync(hashPassword, this.password);
}


module.exports = mongoose.model('User', userSchema);