import Router from "express"
import { getMe, userLogin, userLogout, userRegister } from "../controllers/user.controller.js"
import verifyJwt from "../middlewares/auth.middleware.js"

const authRoutes = Router()

authRoutes.post("/register", userRegister);
authRoutes.post("/login", userLogin);
authRoutes.get("/logout", verifyJwt, userLogout);
authRoutes.get("/me", verifyJwt, getMe);

export default authRoutes;