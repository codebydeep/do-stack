import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import Project from "../models/project.model.js";
import Team from "../models/team.model.js";

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { teamId } = req.params;
  const userId = req.user._id;

  if (!name || !description) {
    throw new ApiError(404, "Please provide all the details!");
  }

  const team = await Team.findById(teamId)

  if(!team){
    throw new ApiError(404, "Team not found!")
  }

  const existingProject = await Project.findOne({
    name,
    team: teamId,
    createdBy: userId,
  });

  if (existingProject) {
    throw new ApiError(404, "Failed to create Project!");
  }

  const project = await Project.create({
    name,
    description,
    team: teamId,
    createdBy: userId,
  });

  return res.status(201).json(new ApiResponse(201, "Project created", project));
});

const getAllProjects = asyncHandler(async (req, res) => {
  const { teamId } = req.query;
  const userId = req.user._id;

  const team = await Team.findOne({
    _id: teamId,
    $or: [{ createdUser: userId }, { "members.user": userId }],
  });

  if (!team) {
    throw new ApiError(404, "Not authorized for this team");
  }

  const projects = await Project.find({
    team: teamId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched", projects));
});

const getProject = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { projectId } = req.params;

  const project = await Project.find({
    _id: projectId,
    createdBy: userId,
  });

  if (!project) {
    throw new ApiError(404, "Team not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Project fetched successfully!", project));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id;

  const project = await Project.findOne({
    _id: projectId,
    createdBy: userId,
  });

  if (!project) {
    throw new ApiError(404, "No Project found!");
  }

  await Project.deleteOne();

  return res.status(200).json(new ApiResponse(200, "Project deleted"));
});

export { createProject, getAllProjects, getProject, deleteProject };
