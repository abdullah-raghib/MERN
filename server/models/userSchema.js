const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

    messages: [{
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        message: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }
    ]
})


// bcrypting/hashing password

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})


// AUTHENTICATION TOKEN 

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.MY_KEY);  //_id is a field from database and this._id is the id related to the user data in database
        this.tokens = this.tokens.concat({ token: token });  // left hand side token is schema tokens k andar wla token while token iS From above line
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

// store the message

userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message });
        await this.save();
        return this.messages;

    } catch (error) {
        console.log(error);

    }
}


const User = mongoose.model('USER', userSchema);
module.exports = User;