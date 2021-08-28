require("dotenv").config();
const express= require("express");
const mongoose = require("mongoose");

//API
const BookApi = require("./API/book_api");
const AuthorApi = require("./API/author_api");
const PublicationApi = require("./API/publication_api");

const Database=require("./database");

mongoose.connect(process.env.MONGO_URI).then(()=> console.log("connection established!")).catch((err) => {console.log(err)});

// initialization
const OurAPP=express();
OurAPP.use(express.json());

// Microservices
OurAPP.use("/book",BookApi);
OurAPP.use("/author",AuthorApi);
OurAPP.use("/publication",PublicationApi);

OurAPP.get("/",(request,response)=>{
response.json({message:"server is working!!"});
});

OurAPP.listen(4000,()=> console.log("server is running!!"));
