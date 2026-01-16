import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./utils/db.js";
import authRoutes from "./routes/user.routes.js";
import teamRoutes from "./routes/team.routes.js";
import projectRoutes from "./routes/project.routes.js";
import issueRoutes from "./routes/issues.routes.js";

dotenv.config()

const app = express()

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    credentials: true,
}))
app.use(cookieParser())

app.use("/api/v1/user/auth", authRoutes)
app.use("/api/v1/teams", teamRoutes)
app.use("/api/v1/projects", projectRoutes)
app.use("/api/v1/projects", issueRoutes)


connectDB()

app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
})