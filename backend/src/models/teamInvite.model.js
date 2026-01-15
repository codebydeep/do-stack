import mongoose, { Schema } from "mongoose";

const teamInvite = new mongoose.Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    invitedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    token: {
        type: String,
        required: true
    }, 
    expiresAt: {
        type: Date,
    }
}, {
    timestamps: true
})

const TeamInvite = mongoose.model("TeamInvite", teamInvite)

export default TeamInvite