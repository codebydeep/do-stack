import mongoose, { Schema } from "mongoose"

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 100,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required :true
    }
},
{
    timestamps: true
})

const Project = mongoose.model("Project", projectSchema)

export default Project;