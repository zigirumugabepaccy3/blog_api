import Jwt from "jsonwebtoken";
import users from "../models/userModel";

commentAuth = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.commentAuth &&
      req.headers.commentAuth.startsWith("Bearer ")
    ) {
      token = req.headers.commentAuth.split(" ")[1];
    }

    if (!token) {
      return res.status(404).json({
        status: "404",
        message: "You Are Not Logged In Please login",
      });
    }

    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const User = await users.findById(decoded.id);

    if (!User) {
      return res.status(403).json({
        status: "403",
        message: "Token has Expired Please login Again",
      });
    }

    if (User) {
      req.logedinUser = User;
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};

export default commentAuth;
