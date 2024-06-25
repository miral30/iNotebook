const mongoose = require("mongoose");
const DB= "mongodb://127.0.0.1:27017/inotebook2";

const connectToMongo = ()=>{
    mongoose.connect(DB).then(
        console.log("Connected to mongo successfully"));
    
}

module.exports = connectToMongo;