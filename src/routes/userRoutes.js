import express from "express";
import fileUpload from "../helper/multer";
import {signup, login, updateUser,DeleteUser,GetUsers,GetUserid} from "../controllers/usercontroller"
const userRoutes = express.Router();
userRoutes.post("/signup",fileUpload.single("profile"), signup);
userRoutes.post("/login",fileUpload.single("profile"), login);
userRoutes.put("/update/:id",fileUpload.single("profile"),updateUser);
userRoutes.delete("/delete/:id",DeleteUser);
userRoutes.get("/read",GetUsers);
userRoutes.get("/read/:id",GetUserid);
export default userRoutes;
