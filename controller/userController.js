const userServices = require("../services/userServices");

class userController {
    constructor() {
        return {
            signup: this.signup.bind(this),
            signin: this.signin.bind(this),
        }
    }

    //signup  .....
    async signup(req, res, next) {
        try {
            if (!req.body.name || req.body.name == " ") {
                return res.status(400).json({
                    message: "Name is required",
                    status: false,
                    data: {}
                })
            };
            if (!req.body.email || req.body.email == " ") {
                return res.status(400).json({
                    message: "Email is required",
                    status: false,
                    data: {}
                })
            };
            if (!req.body.mobile || req.body.mobile == " ") {
                return res.status(400).json({
                    message: "Mobile No is required",
                    status: false,
                    data: {}
                })
            };
            if (!req.body.password || req.body.password == " ") {
                return res.status(400).json({
                    message: "Password  is required",
                    status: false,
                    data: {}
                })
            };
            if (!req.body.cnfpassword || req.body.cnfpassword == " ") {
                return res.status(400).json({
                    message: "Confirm Password is required",
                    status: false,
                    data: {}
                })
            };
            let result = await userServices.signup(req);
            if (result.status) {
                res.status(200).json(result);
            }else{
                res.status(400).json(result)
            }
        } catch (error) {
            res.status(400).json(error);;
        }
    };

    //signin .....
    async signin(req, res, next) {
        try {
            if (!req.body.email || req.body.email == " ") {
                return res.status(400).json({
                    message: "Email is required",
                    status: false,
                    data: {}
                })
            };
            if (!req.body.password || req.body.password == " ") {
                return res.status(400).json({
                    message: "Password  is required",
                    status: false,
                    data: {}
                })
            };
            let result = await userServices.signin(req);
            if (result.status) {
                res.status(200).json(result);
            }else{
                res.status(400).json(result);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    };

}

module.exports = new userController();