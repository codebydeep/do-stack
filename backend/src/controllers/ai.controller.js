import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import Project from "../models/project.model.js";
import ProjectIssue from "../models/issues.model.js";

import { buildContext } from "../utils/context.js";
import { askAIService } from "../services/ai-service.js";
import Team from "../models/team.model.js";

const askToAI = asyncHandler(async (req, res) => {
  const { question } = req.body;
  const { projectId } = req.params;
  const userId = req.user._id;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  const team = await Team.findById(project.team).populate(
    "members",
    "fullname email",
  );

  if(!team){
    throw new ApiError(404, "Team not found for this project!")
  }

  const isMember =
    team.createdUser.toString() === userId.toString() ||
    team.members.some((m) => m.id.toString() === userId.toString());

  if (!isMember) {
    throw new ApiError(404, "Access Denied!");
  }

  const issues = await ProjectIssue.find({
    project: projectId,
  })
    .limit(15)
    .populate("assignee", "fullname");

  const context = buildContext({
    project,
    team,
    issues,
  });

  const aiResponse = await askAIService(context, question);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "AI Response fetched successfully!", aiResponse),
    );
});

export { askToAI };
