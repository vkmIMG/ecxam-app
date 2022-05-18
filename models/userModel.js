const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    mobile: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
    versionKey: false
});

let userModel = mongoose.model("user", userSchema);
module.exports = userModel;