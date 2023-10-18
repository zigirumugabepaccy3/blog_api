import statusInfo from "../models/statusModel";
// create
export const createInfo = async (req, res) => {
    const {fname,lname} = req.body;
    try{
        const make = await statusInfo.create ({
        fname,
        lname,
         });
return res.status(200).json({
    statusbar: "Success",
    message: "Congz you made it",
    data:make,
});
    }
    catch (error) {
        return res.status(500).json({
            statusbar:"failed",
            message:"cant create info",
           error:error.message,
        });
    }
};

// get all data
export const getAll = async (req,res) => {
    try{ 
        const getAll = await statusInfo.find();
        return res.status(200).json({
            statusbar:"success",
    message:"Good",
    data:getAll,
        });
        
    }
    catch (error){
return res.status(200).json({
    statusbar:"Failed",
    message:"Ashwii",
    error:error.message,
});
    }
};

// getOne
export const getOne = async (req,res) => {
    try{
        const { id }= req.params
        const getAll = await statusInfo.findById(id);
        return res.status(200).json({
            statusbar:"success",
    message:"you made it",
    data:getAll,
        });
    }
    catch{
        return res.status(200).json({
            statusbar:"Failed",
            message:"Ashwii",
            error:error.message,
        });
    }
};

// delete
export const deleteInfo = async(req, res) => {
    try{
        const { id }= req.params;
        const getId = await statusInfo.findById(id);
        if(!getAll) return res.status(404).json({
            message: " Id Not FOUND",
        });
        const DelId = await statusInfo.findByIdAndDelete(id);
        return res.status(200).json({
            statusbar:"success",
    message:"Your Record Have Been Deleted",
    data:DelId,
        });

    }
    catch{
        return res.status(200).json({
            statusbar:"Failed",
            message:"Ashwii",
            error:error.message,
        });
    }
}

