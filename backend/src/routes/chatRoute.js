import { Router } from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoute } from "../middleware/protectroute.js";

const router = Router();
router.get("/token", protectRoute, getStreamToken);
export default router;
