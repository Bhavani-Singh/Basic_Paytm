const mongoose = require("mongoose");
const { Schema } = require("zod");
require("dotenv").config()

mongoose.connect(process.env.DB_URL);

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },

    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },

    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },

    password: {
        type: String,
        require: true,
        minLength: 6
    }
});

const accountSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    balance: {
        type: Number,
        required: true
    }

});

const Account = mongoose.model("Account", accountSchema);

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    Account
};

