import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import { Schema } from "mongoose";
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
  BlogId: {
    type: ObjectId,
    ref: "myblogs",
    require: true,
  },
  message: {
    type: String,
    require: true,
  
  },
  username:
  {
type: String,
ref:"users",
require: true,
  },
  userPhoto:
  {
type: String,
ref:"users",
require: true,
  },
});
const commentModel = mongoose.model("comments", CommentSchema);
export default commentModel;
