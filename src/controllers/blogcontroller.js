import BlogeTable from "../modules/blogmodules";
import { uploadToCloud } from "../helper/cloud";


//create blog
export const createBlog = async (req, res) =>{
    try {
   const {blog_Image,BlogTitle, blogContent} = req.body;
   let answer;
   if(req.file) answer = await uploadToCloud(req.file, res);
   const insertblog = await BlogeTable.create({
    blog_Image: answer?.secure_url,
    BlogTitle,
    blogContent,
    author:req.users.lastname,
    authorP:req.users.profile
   });
   return res.status(200).json({
    message: "your blog has saved",
    data: insertblog,
   });


    } catch (error) {
  return res.status(500).json({
    statusbar: "500",
    message: "failed to create a blog",
    error: error.message,
  })      
    }
};


//View All Blogs

export const ViewAllBlogs = async (req, res) =>{
    try {
        const allblogs = await BlogeTable.find();
        return res.status(200).json({
            statusbar: "200",
            message: "Here Are All Created Blogs",
            data: allblogs,

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
export const ViewBlogById = async (req, res) =>{
    try {
        const {id} = req.params;
        const blogId = await BlogeTable.findById(id);
        if(!blogId){
            return res.status(404).json({
                statusbar: "404",
                message: "Id Not Found",
                error: error.message,
                
            });
        }else{
            return res.status(200).json({
                statusbar: "200",
                message: "Blog For Entered Id Is Here:",
                data: blogId,
            })
        }
    } catch (error) {
        return res.status(500).json({
            statusbar: "500",
            message: "Faile To Display Blog For Entered Id",
            error: error.message,
        })
    }
};

// Deleting Blog By blog ID

export const DeleteBlog = async (req, res) =>{
    try {
       const {id} = req.params;
       const getid = await BlogeTable.findById(id);
       if(!getid)
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
export const updateBlog = async (req, res) =>{
    const { id } = req.params;
    try {
    const {blog_Image, BlogTitle, blogContent} = req.body;
    const getId = await BlogeTable.findById(id);
    if (!getId)
      return res.status(404).json({
        message: "Id not Found",
        error: error.message,
      });
 
      let result;
      if(req.file) result = await uploadToCloud(req.file, res);
 await BlogeTable.findByIdAndUpdate(id, {
        blog_Image:  result?.secure_url || "https://res.cloudinary.com/dxitrjcef/image/upload/v1696870762/kazdcipwzwu0ycprzlg6.jpg",
       BlogTitle,
       blogContent, 
       
      })
 
 
      return res.status(201).json({
       message: "Success",

     });
   
  } catch (error) {
   return res.status(500).json({
     message: "Failded to Update",
     error: error.message
   })
  }
};