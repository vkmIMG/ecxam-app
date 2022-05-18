const jwt = require("jsonwebtoken");

let auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            token = {
                message: "Invalid Token",
                status: false,
                data: {}
            }
            return res.status(401).json(token);
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log("token not Verified..");
        token = {
            message: "Invalid Token",
            status: false,
            data: {}
        }
        return res.status(401).json(token);
    }
};

module.exports = auth;