const express = require("express");
const cors=require("cors")
const app=express();
app.use(cors())
app.use(express.json())
//import all requests
const rootRouter=require("./routes/index");

app.use("/api/v1",rootRouter)
app.listen(3000);