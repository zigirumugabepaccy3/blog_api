import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
// importing routes
import statusRoutes from "./routes/statusRoutes";
import routeInitiator from "./routes/blogroutes";
import userRoutes from "./routes/userRoutes";

//import docrouter from "./documentation/swagger";
// configuration
const app = express();
dotenv.config();

//import documentation routes
const options = {
    definition:{
        openapi: '3.0.1',
        info: {
          title: 'this is the backend APIs(documentation) for my klab projects',
          version: '1.0.0',
          description:
            'Blogs.',
        },
        servers:[{
            url:'https://zigirumugabe-pacifique.onrender.com',
            // url:'http://localhost:5300/',
        }],
        security: [
            {
              BearerAuth: [],
            },
          ],
          components: {
            securitySchemes: {
              BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
    

    },
    apis:['./src/documentation/*.js']
    
}
//swagger
const swaggerSpec = swaggerJSDoc(options);
app.use('/documentation',SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));


app.use (cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
//routes
app.use("/api/Klab/info",statusRoutes);
app.use("/api/klab/blog",routeInitiator);
app.use("/api/Klab/user",userRoutes);
//app.use("/api/doc",docrouter);
app.get("/",(req, res)=>{
    res.status(200).json({
        status: "Success",
        Author: "zigirumugabe",
        message: "welcome",
    });
});
export default app;