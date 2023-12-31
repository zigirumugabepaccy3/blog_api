import Jwt from "jsonwebtoken";
import users from "../models/userModel";
const Authorization = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(404).json({
        status: "404",
        message: "You Are Not Logged In Please login",
      });
    }

    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const logedUser = await users.findById(decoded.id);

    if (!logedUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has Expired Please login Again",
      });
    }

    if (logedUser.role !== "admin") {
      return res.status(404).json({
        status: "404",
        message: "this is only accessed by admin",
      });
    } else {
      req.users = logedUser;
      // ggg
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};

export default Authorization;
