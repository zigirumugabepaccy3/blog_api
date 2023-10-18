import mongoose from "mongoose";
import { ObjectId } from "mongoose";
const CommentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "users",
    require: true,
  },
  time: {
    type: String,
    default: new Date(),
  },
  blog: {
    type: ObjectId,
    ref: "MyBlog",
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
});
const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
