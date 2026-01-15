import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.jwt;

    if(!token){
        throw new ApiError(400, "No token found!")
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(!decoded){
        throw new ApiError(400, "Invalid credentials!")
    }

    const user = await User.findById(decoded.id).select("-password")

    if(!user){
        throw new ApiError(400, "User not found!")
    }

    req.user = user
    next()
})

export default verifyJwt;