const { default: mongoose } = require('mongoose');

//connect mongoosedb
const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to db');
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnect;
