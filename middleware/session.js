const session = require("express-session");
const mongoDbSession = require('connect-mongodb-session')(session);

// saving session data to database................................
const storage = new mongoDbSession({
    uri: serverDB,
    collection: "sessionData",
});
// generatin session and cookie.............................
module.exports = session({
    cookie: {
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: storage,
    name: 'sessioncookie',
});