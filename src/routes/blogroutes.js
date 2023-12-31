import express from "express";
import { 
    createBlog,
    ViewAllBlogs,
    ViewBlogById,
    DeleteBlog,
    updateBlog,
    AddComment,
    getComments
 } from "../controllers/blogcontroller";
 import fileUpload from "../helper/multer";
import Authorization from "../middleware/authentication";
import commentAuthanticate from "../middleware/protect";

 const routeInitiator =  express.Router();
//initiation
 routeInitiator.post("/createBlog",Authorization , fileUpload.single("blog_Image"), createBlog);
 routeInitiator.get("/ViewAllBlogs", ViewAllBlogs);
 routeInitiator.get("/ViewBlogById/:id",ViewBlogById);
 routeInitiator.delete("/DeleteBlog/:id",Authorization, DeleteBlog);
 routeInitiator.put("/updateBlog/:id",Authorization,fileUpload.single("blog_Image"), updateBlog);
 routeInitiator.post("/comment/:id",fileUpload.single("files"),commentAuthanticate, AddComment);
 routeInitiator.get("/comment/:id", getComments);
 export default routeInitiator;
