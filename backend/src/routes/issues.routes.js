import Router from "express";
import { createIssue, deleteIssue } from "../controllers/issues.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const issueRoutes = Router()

issueRoutes.post("/:projectId/issue", verifyJwt, createIssue)
issueRoutes.delete("/:projectId/:issueId", verifyJwt, deleteIssue)

export default issueRoutes;