import users from "../modules/userModules";
import { uploadToCloud } from "../helper/cloud";
import Jwt  from "jsonwebtoken";
import bcrypt, {genSalt,hash} from "bcrypt";
 // create user
 const validatePassword = (password) => {
  // Add your password validation rules here
  // For example, at least 8 characters with a mix of letters, numbers, and special characters
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateEmail = (email) => {
  // Add your email validation rules here
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const signup = async (req, res) => {
  try {
      const { firstname, lastname, email, password, profile } = req.body;

      if (!validateEmail(email)) {
          return res.status(400).json({
              status: "400",
              message: "Invalid email address format.",
          });
      }

      const userEmail = await users.findOne({
          email: req.body.email,
      });

      if (userEmail) {
          return res.status(500).json({
              status: "500",
              message: "Email Already Exists",
          });
      }

      if (!validatePassword(password)) {
          return res.status(400).json({
              status: "400",
              message: "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.",
          });
      }

      let answer;
      if (req.file) answer = await uploadToCloud(req.file, res);

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const newUser = await users.create({
          firstname,
          lastname,
          email,
          password: hashedPass, // Use the hashed password
          profile: answer?.secure_url,
      });

      return res.status(201).json({
          status: "201",
          message: "User Created Successfully",
          data: newUser,
      });
  } catch (error) {
      return res.status(500).json({
          status: "500",
          message: "Failed To Create User",
          error: error.message,
      });
  }
};
 // login

 export const login = async (req, res) => {
    try {
      const userLogin = await users.findOne({
        email: req.body.email,
      });
      if (!userLogin) {
        return res.status(404).json({
          status: "404",
          message: "User Not Found",
        });
      }
  
      const isMatch = await bcrypt.compare(req.body.password, userLogin.password);
      if (!isMatch) {
        return res.status(404).json({
          status: "404",
          message: "Password Incorect",
        });
      }
  
      const token = await Jwt.sign(
        { id: userLogin._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRE_DATE }
      );
      return res.status(200).json({
        status: "200",
        message: "logedin Sucess",
        users: userLogin,
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        status: "500",
        message: "Failed To Login",
        error: error.message,
      });
    }
  };
  //update user
  export const updateUser = async (req, res) =>{
    const { id } = req.params;
    try {
    const {firstname, lastname, email, password, profile, role} = req.body;
    const getId = await users.findById(id);
    if (!getId)
      return res.status(404).json({
        message: "Id not Found",
        error: error.message,
      });
      const checkemail = await users.findOne({
        email: req.body.email,
      });
      if(checkemail){
        return res.status(404).json({
          status: "404",
          message: "Email Already Exist In Database",

        });
      }
      let result;
      const passecryption = await bcrypt.genSalt(10);
      const hashmypass = await bcrypt.hash(password,passecryption);
      if(req.file) result = await uploadToCloud(req.file, res);
      // const salt = await bcrypt.genSalt(10);
      // const hashedPass = await bcrypt.hash(password,salt)

 const mine = await users.findByIdAndUpdate(id, {
        firstname,
        lastname,
        email, 
        password: hashmypass,
        profile:  result?.secure_url || "https://res.cloudinary.com/dxitrjcef/image/upload/v1696870762/kazdcipwzwu0ycprzlg6.jpg",
        role,
      })
 
 
      return res.status(200).json({
        status: "200",
       message: "Success",
       data: mine,

     });

    
   
  } catch (error) {
   return res.status(500).json({
      status: "500",
      message: "Failded to Update",
      error: error.message
   });
  }
};
//delete user
export const DeleteUser = async (req, res) =>{
  try {
     const {id} = req.params;
     const getid = await users.findById(id);
     if(!getid)
     return res.status(404).json({
  statusbar: "404",
message: " user not found",
error: error.message,
});
const deleteid = await users.findByIdAndDelete(id);
return res.status(200).json({
  statusbar: "200",
  message: "user deleted well",
  data: deleteid,
});
  } catch (error) {
  return res.status(500).json({
      statusbar: "500",
      message: "failed to delete user",
      error: error.message,

  });   
  }
};

//  view all users/read
export const GetUsers = async (req, res) => {
  try {
    const Users = await users.find();
    return res.status(200).json({
      statusbar: "200",
      message: "here are all users",
      data: Users,
    })
  }
  catch (error) {

    return res.status(500).json({
     statusbar: "500",
     message: "failed to display users",
     error: error.message, 
    })
  }
}

//view users by id
export const GetUserid = async(req,res) => {
  try{
    const {id} = req.params;
    const Users = await users.findById(id);
    if(!Users)
    {
      return res.status(404).json({
        status:"404",
        message:"Id Not found",
      })
    }
    return res.status(200).json({
      statusbar: "200",
      message: "these are users",
      data: Users,
    })
  } catch (error){
    return res.status(500).json({
      statusbar: "500",
      message: "failed to display the users",
      error: error.message,
    })
  }
}