import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import Project from "../models/project.model.js";

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  if (!name || !description) {
    throw new ApiError(404, "Please provide all the details!");
  }

  const existingProject = await Project.findOne({
    name,
    createdBy: userId,
  });

  if (existingProject) {
    throw new ApiError(404, "Failed to create Project!");
  }

  const project = await Project.create({
    name,
    description,
    createdBy: userId,
  });

  return res.status(201).json(new ApiResponse(201, "Project created", project));
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

export { createProject, deleteProject };
