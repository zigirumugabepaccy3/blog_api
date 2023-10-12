import app from "./app";
import mongoose from "mongoose";
mongoose.set("strictQuery",false);

mongoose
.connect(process.env.Dbconnection)
.then(()=>{
    console.log("Db connection Successful");
})
.catch((error)=> console.log(error));
const PORT = process.env.PORT || 4300;
app.listen( process.env.PORT,()=> {
console.log(`sever running on port: http://localhost:${PORT}`);
});