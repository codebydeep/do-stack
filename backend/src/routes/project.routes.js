import Router from "express";
import { createProject, deleteProject, getAllProjects, getProject } from "../controllers/project.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js"
const projectRoutes = Router()

projectRoutes.post("/:teamId/create-project", verifyJwt, createProject)
projectRoutes.get("/", verifyJwt, getAllProjects)
projectRoutes.get("/:projectId", verifyJwt, getProject)
projectRoutes.delete("/delete-project/:projectId", verifyJwt, deleteProject)

export default projectRoutes;