import Router from "express";
import { createProject, deleteProject } from "../controllers/project.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js"
const projectRoutes = Router()

projectRoutes.post("/create-project", verifyJwt, createProject)
projectRoutes.delete("/delete-project/:projectId", verifyJwt, deleteProject)

export default projectRoutes;