import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import Team from "../models/team.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import TeamInvite from "../models/teamInvite.model.js";
import { sendEmail } from "../utils/send-mail.js";

const createTeam = asyncHandler(async (req, res) => {
  const { teamname } = req.body;
  const userId = req.user._id;

  if (!teamname) {
    throw new ApiError(400, "Team must have a name..");
  }

  const existingTeam = await Team.findOne({
    teamname,
    createdUser: userId,
  });

  if (existingTeam) {
    throw new ApiError(400, "Team already exists");
  }

  const team = await Team.create({
    teamname,
    createdUser: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Team created successfully!", team));
});

const getAllTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, "Teams fetched successfully!", teams));
});

const getTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.params;

  const team = await Team.findById(teamId);

  if (!team) {
    throw new ApiError(404, "No team found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Team fetched successfully!", team));
});

const deleteTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const userId = req.user._id;

  const team = await Team.findOne({
    _id: teamId,
    createdUser: userId,
  });

  if (!team) {
    throw new ApiError(404, "Team not found!");
  }

  await team.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, "Team deleted successfully!"));
});

const inviteMember = asyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const { email } = req.body;

  const team = await Team.findOne({
    _id: teamId,
    createdUser: req.user._id,
  });

  if (!team) {
    throw new ApiError(404, "Team not found!");
  }

  // generate token -
  const token = crypto.randomBytes(20).toString("hex");

  await TeamInvite.create({
    team: teamId,
    email,
    invitedBy: req.user._id,
    token,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });

  // send email -
  const html = `<h1>Welcome to doStack!</h1>
  <p>Thanks for signing up.</p>`;

  // await sendEmail({email, "Welcome to dostack", html})
  await sendEmail({
    to: [email],
    subject: "Welcome to dostack",
    html: html,
  });
  console.log(`Email Send`);

  return res
    .status(200)
    .json(new ApiResponse(200, "Invitation Send Successfully!"));
});

const acceptInvite = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const invite = await TeamInvite.findOne({
    token,
    status: "pending",
    expiresAt: { $gt: new Date() },
  });

  if (!invite) {
    throw new ApiError(404, "Invalid Invite!");
  }

  const team = await Team.findById(invite.team);

  if (!team.members.includes(req.user._id)) {
    team.members.push(req.user._id);
    await team.save();
  }

  ((invite.status = "accepted"), await invite.save());

  return res.status(200).json(new ApiResponse(200, "Invitation Accepted!"));
});

export { createTeam, getAllTeams, getTeam, deleteTeam, inviteMember, acceptInvite };
