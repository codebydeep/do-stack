import Router from "express";
import { acceptInvite, createTeam, deleteTeam, getAllTeams, getTeam, inviteMember } from "../controllers/team.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const teamRoutes = Router()

teamRoutes.post("/create-team", verifyJwt, createTeam)
teamRoutes.get("/", verifyJwt, getAllTeams)
teamRoutes.get("/:teamId", verifyJwt, getTeam)
teamRoutes.delete("/delete-team/:teamId", verifyJwt, deleteTeam)
teamRoutes.post("/send-invite/:teamId", verifyJwt, inviteMember)
teamRoutes.post("/invite/:token/accept", verifyJwt, acceptInvite)

export default teamRoutes;