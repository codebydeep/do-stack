import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import ProjectIssue from "../models/issues.model.js";
import User from "../models/user.model.js";

const createIssue = asyncHandler(async (req, res) => {
  const { title, description, category, assignee } = req.body;
  const { projectId } = req.params;
  const userId = req.user._id;

  if (!title || !description || !category) {
    throw new ApiError(404, "All the fields are required!");
  }

  const assignedUser = await User.findById(assignee);
  // console.log(`Assigned User: ${assignedUser.fullname}`);

  const issue = await ProjectIssue.create({
    title,
    description,
    category,
    assignee: assignedUser,
    project: projectId,
    issueCreatedBy: userId,
  });

  return res.status(201).json(new ApiResponse(201, "Issue created", issue));
});

const deleteIssue = asyncHandler(async (req, res) => {
  const { projectId, issueId } = req.params;
  const userId = req.user._id;

  const issue = await ProjectIssue.findOneAndDelete({
    _id: issueId,
    project: projectId,
    issueCreatedBy: userId,
  });

  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  return res.status(200).json(new ApiResponse(200, "Issue deleted"));
});

export { createIssue, deleteIssue };
