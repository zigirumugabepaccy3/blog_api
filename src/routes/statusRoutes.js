import express from "express";
import { createInfo, deleteInfo, getAll, getOne } from "../controllers/statusController";
const statusRoutes = express.Router();
statusRoutes.post("/create",  createInfo);
statusRoutes.get("/read",getAll);
statusRoutes.get("/read/:id",getOne);
statusRoutes.delete("/delete/:id",deleteInfo);
export default statusRoutes;