import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessage, getuserForSidar, sendMessage } from "../controllers/message.control.js";
const router = express.Router();

router.get("/users",protectRoute,getuserForSidar)
router.get("/:id"/protectRoute,getMessage)
router.post("/send/:id",protectRoute,sendMessage)
export default router