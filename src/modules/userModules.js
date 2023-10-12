import mongoose from "mongoose";
const Userschema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
lastname: {
    type: String,
    require: true,
},
email: {
    type: String,
    require: true,
},
password: 
{
    type: String,
    require: true,
},
profile: {
    type: String,
    require: true,
},
role: {
    type: String,
    enum: ["user", "admin"],
default: "user",
},
});
const users = mongoose.model("users", Userschema);
export default users;
