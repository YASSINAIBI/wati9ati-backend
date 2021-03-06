const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuid } = require('uuid')

const userSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Identity: {
        type: String,
        required: true,
        unique: true
    },
    Telephone: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

userSchema.virtual('Password')
.set(function(password) {
    this._password = password
    this.salt = uuid()
    this.hashed_password = this.cryptPassword(password)
})
.get(function() {
    return this._password
})

userSchema.methods = {
    authenticate: function(plainText) {
        return this.cryptPassword(plainText) === this.hashed_password;
    },
    cryptPassword: function(password) {
        if(!password) return "";

        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }catch(error) {
            return ""
        }
    }
}

module.exports = mongoose.model('User', userSchema)
