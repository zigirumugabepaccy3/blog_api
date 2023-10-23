import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
    blog_Image: {
        type: String,
        require: false,

    },
    blogTitle: {
        type: String,
        require: true,

    },
    blogContent: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: false,
    },
    authorP: {
        type: String,
        require: false,
    },
    comment: [{
        
        type: String,
        ref: 'comments',
    },
]
});

const BlogeTable = mongoose.model("MyBlog", BlogSchema);

export default BlogeTable;