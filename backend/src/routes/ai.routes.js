import Router from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import { askToAI } from "../controllers/ai.controller.js";

const aiRoutes = Router();

aiRoutes.post("/:projectId/ask-ai", verifyJwt, askToAI)

export default aiRoutes;