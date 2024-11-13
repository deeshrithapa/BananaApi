const express= require("express");
const { model } = require("mongoose");
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());

const port = process.env.port;
app.use(cors());

const conectDb = require("./src/Config/db");
const UserRouter = require('./src/Routes/UserRouter')
const ProfileRouter = require('./src/Routes/ProfileRouter')
const rankRoutes = require('./src/Routes/RankRouter');
const userRoutes = require('./src/Routes/UserRouter');

conectDb();   

    app.use('/api/auth',UserRouter)
    app.use('/api/auth',ProfileRouter)
    app.use('/api/rank', rankRoutes);
    app.use('/api/user', userRoutes); // User routes  


    app.listen(port,()=>{
      console.log(`Server is running on ${port}`)
 })