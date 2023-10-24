import mongoose from "mongoose";
const statusSchema = new mongoose.Schema({
    fname: {
    type: String,
    require:true,
    },
    lname: {
        type:String,
        require:true,
        },
});
const statusInfo = mongoose.model("information",statusSchema);
export default statusInfo;