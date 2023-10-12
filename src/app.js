import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
// importing routes
import statusRoutes from "./routes/statusRoutes";
import routeInitiator from "./routes/blogroutes";
import userRoutes from "./routes/userRoutes";
//import documentation routes

import docrouter from "./documentation/swagger";
// configuration
const app = express();
dotenv.config();

app.use (cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
//routes
app.use("/api/Klab/info",statusRoutes);
app.use("/KlabCohort4/Blog/Api",routeInitiator);
app.use("/api/Klab/user",userRoutes);
app.use("/api/doc",docrouter);

//
app.get("/",(req, res)=>{
    res.status(200).json({
        status: "Success",
        Author: "zigirumugabe",
        message: "welcome",

    });
});
export default app