const mongoose = require('mongoose');
const MONGODB_URL = "mongodb+srv://pratap:fSYH9QFpsWIhJAmf@cluster0.byrr4td.mongodb.net/?retryWrites=true&w=majority"

const connectDb = () =>{
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() =>{
        console.log("Connection Successful")
    }).catch((e) => console.log(e))
}




module.exports = connectDb;