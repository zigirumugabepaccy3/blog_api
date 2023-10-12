import express from "express";
import { 
    createBlog,
    ViewAllBlogs,
    ViewBlogById,
    DeleteBlog,
    updateBlog,
 } from "../controllers/blogcontroller";
 import fileUpload from "../helper/multer";
import Authorization from "../middleware/authentication"

 const routeInitiator =  express.Router();

 routeInitiator.post("/createblog",Authorization , fileUpload.single("blog_Image"), createBlog);
 routeInitiator.get("/ViewAllBlogs", ViewAllBlogs);
 routeInitiator.get("/ViewBlogById/:id",ViewBlogById);
 routeInitiator.delete("/DeleteBlog/:id", DeleteBlog);
 routeInitiator.put("/updateblog/:id",Authorization,fileUpload.single("blog_Image"), updateBlog);
 export default routeInitiator;