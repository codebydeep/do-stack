import mongoose, { Schema } from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamname: {
        type: String,
        required: true
    },
    createdUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema)

export default Team;