const mongoose = require("mongoose");

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.ATLAS_URL)
        console.log("atlas cloud is connected");

    }catch(err){
        console.log(err.message);

    }

};
module.exports = connectdb
