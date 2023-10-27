import BlogeTable from "../models/blogmodel";
import { uploadToCloud } from "../helper/cloud";
import Comment from "../models/commentModel";

//create blog
export const createBlog = async (req, res) => {
  try {
    const { blog_Image, blogTitle, blogContent } = req.body;
    let answer;
    if (req.file) answer = await uploadToCloud(req.file, res);
    const insertblog = await BlogeTable.create({
      blog_Image: answer?.secure_url,
      blogTitle,
      blogContent,
      author: req.users.lastname,
      authorP: req.users.profile,
    });
    return res.status(200).json({
      message: "your blog has saved",
      data: insertblog,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "failed to create a blog",
      error: error.message,
    });
  }
};

//View All Blogs

export const ViewAllBlogs = async (req, res) => {
  try {
    const result = await BlogeTable.find().populate({path:'comment', select:'user message username'});
    return res.status(200).json({
      status:"200",
      message: "viewblogs :",
      data: result,
    });

  } catch (error) {
    return res.status(500).json({
      statusbar: "500",
      message: "Failed to display Blogs",
      error: error.message,
    });
  }
};

//view blogs by Id
export const ViewBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogId = await BlogeTable.findById(id).populate({path:'comment', select:'user message username userPhoto'});
    if (!blogId) {
      return res.status(404).json({
        statusbar: "404",
        message: "Id Not Found",
        error: error.message,
      });
    } 
    //increment the view count by 1
    blogId.views +=1;
    await blogId.save();
    
      return res.status(200).json({
        statusbar: "200",
        message: "Blog For Entered Id Is Here:",
        data: blogId,
        views: blogId.views,
      });
    
  } catch (error) {
    return res.status(500).json({
      statusbar: "500",
      message: "Faile To Display Blog For Entered Id",
      error: error.message,
    });
  }
};

// Deleting Blog By blog ID

export const DeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const getid = await BlogeTable.findById(id);
    if (!getid)
      return res.status(404).json({
        statusbar: "404",
        message: "blog id not found",
        error: error.message,
      });
    const deleteid = await BlogeTable.findByIdAndDelete(id);
    return res.status(200).json({
      statusbar: "200",
      message: "blog deleted well",
      data: deleteid,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "500",
      message: "failed to delete Blog",
      error: error.message,
    });
  }
};
//update
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const { blog_Image, blogTitle, blogContent } = req.body;
    const getId = await BlogeTable.findById(id);
    if (!getId)
      return res.status(404).json({
        message: "Id not Found",
        error: error.message,
      });

    let result;
    if (req.file) result = await uploadToCloud(req.file, res);
   const update= await BlogeTable.findByIdAndUpdate(id, {
      blog_Image:
        result?.secure_url ||
        "https://res.cloudinary.com/dxitrjcef/image/upload/v1696870762/kazdcipwzwu0ycprzlg6.jpg",
        blogTitle,
      blogContent,
    });

    return res.status(200).json({
      status:"200",
      message: " blog updated Successfully",
      data:update,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Update",
      error: error.message,
    });
  }
};
// create any comment
export const AddComment = async (req, res) => {
  try {
    if (!req.body.message || req.body.message === "") {
      return res.status(400).json({ message: "Comment is required" });
    }
    const { users } = req;
    const { id } = req.params;
    const {message}=req.body;
    const getId = await BlogeTable.findById(id);
    if (!getId) {
      return res.status(404).json({ message: "blog not found!" });
    }
    const newComment = await Comment.create({
      message,
      user: users._id,
      blogId: getId._id,
      username: users.firstname,
      userPhoto: users.profile,   
    });
   // updatePost
    const updatePost = await BlogeTable.findByIdAndUpdate(

      id,{
        $push: {comment:newComment._id}
      },
      {
        new: true
      }
    )
    return res.status(201).json({ message: "comment added successfully" });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};
// Get All comments
export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogeTable.findById(id);
    if (!blog) {
      return res.status(400).json({ message: "Blog is not found" });
    }
    const comments = await Comment.find({
      blog: blog._id,
    }).populate("user", "firstname lastname profile role");
    res.status(200).json({
      message: "comment sent successfully",
      comments,
    });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};
