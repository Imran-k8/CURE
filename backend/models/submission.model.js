import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    title:{
        type: String,
        requred: true,
    },
    abstract:{
        type: String,
        requred: true,
    },
    keywords:{
        type: [String],
        requred: true,
    },
    authors:{
        type: [String],
        requred: true,
    },
    affiliation:{
        type: String,
        required: false,
    },
    file:{
        type: String,
        required: true,
    },
    submittedBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    email:{
        type: String, 
        required: true,
    },
    status:{
        type: String,
        requred: true,
    },
  },
  { timestamps: true }
);
const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;