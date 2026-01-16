import mongoose, { Schema } from "mongoose";

const projectIssue = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 100
    },
    category:{
        type: String,
        enum: ["Backlog", "Todo", "Pending", "Completed"],
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issueCreatedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    priority: {
        type: String,
        enum: ["None", "Low", "Medium", "High", "Urgent"],
        default: "None",
    }
  },
  {
    timestamps: true,
  }
);

const ProjectIssue = mongoose.model("ProjectIssue", projectIssue);

export default ProjectIssue;
