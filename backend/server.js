const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const cors = require("cors");
const mainRoute = require("./routes/index");
const port = 5000;
const logger = require("morgan");

dotenv.config();

const connect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)

        console.log("Connected to MongoDb")
    }
    catch(err){
        throw err;
    }
}

app.use(logger("dev"));

app.use(express.json());

app.use(cors());

app.use("/api",mainRoute);

app.listen(port,()=>{
    connect();
    console.log(`Sunucu ilgili portta çalşıyor.`);
})