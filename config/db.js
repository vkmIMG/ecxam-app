const mongoose = require('mongoose');

mongoose.connect(process.env.cloudServerDB, (req, res) => {
    mongoose.set('debug', true);
    console.log("DB connected Successfully");
});