//packages.............
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Model .................
const userModel = require("../models/userModel");
const questionModel = require("../models/questionModel");

class userServices {
    constructor() {
        return {
            signup: this.signup.bind(this),
            signin: this.signin.bind(this),
        }
    }

    // user signup funcation ...........
    async signup(req) {
        try {
            let { name, email, mobile, password, cnfpassword } = req.body;
            if (password == cnfpassword) {
                let uniqEmail = await userModel.findOne({ email: email });
                if (uniqEmail && uniqEmail !== {}) {
                    return {
                        message: "Email ID already Exists",
                        status: false,
                        data: uniqEmail,
                    }
                }

                let salt = await bcrypt.genSalt(10)
                let hashPassword = await bcrypt.hash(password, salt);
                let user = new userModel({ name, email, mobile, password: hashPassword });
                let data = await user.save();
                if (data && data !== {}) {
                    return {
                        message: "Signup Successfully",
                        status: true,
                        data: data,
                    }
                }
            }
            else {
                return {
                    message: "Password and Confirm Password didn't match",
                    status: false,
                    data: {}
                }
            };
        } catch (error) {
            return {
                message: "Error!!",
                status: false,
                data: error,
            };
        };
    };

    // user signin function ..........................
    async signin(req) {
        try {
            let { email, password } = req.body;
            let data = await userModel.findOne({ email: email });
            if (data && data !== {}) {
                let isMatch = await bcrypt.compare(password, data.password);
                if (isMatch) {
                    var token = jwt.sign({ id: data._id }, process.env.SECRET_KEY,);
                    console.log("token >> ", token);
                    let tk = {
                        token
                    }
                    return {
                        message: "Signin Successfull",
                        status: true,
                        data: { ...data._doc, ...tk }
                    }
                } else {
                    return {
                        message: "Invalid credentials",
                        status: false,
                        data: {}
                    }
                }
            } else {
                return {
                    message: "Invalid credentials",
                    status: false,
                    data: {}
                }
            };

        } catch (error) {
            return {
                message: "Error!!",
                status: false,
                data: error,
            };
        };
    };

}

module.exports = new userServices();