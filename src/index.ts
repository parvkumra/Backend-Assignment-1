import { log } from "console";
import express from "express";
import userRouter from "./routes/userRouter"
import { errorHandler } from "./middlewares/error";

const PORT=3000;
const app=express();
app.use(express.json())
app.use(errorHandler);

app.use("/auth",userRouter)
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
    
})

