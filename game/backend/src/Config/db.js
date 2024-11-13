const mongoose = require('mongoose');

require ('dotenv').config();
const mongo_uri=process.env.mongo_uri;


const conectDb = async ()=>{
    try{
        await mongoose.connect(mongo_uri );
        console.log('Connected!');
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};

module.exports = conectDb;
