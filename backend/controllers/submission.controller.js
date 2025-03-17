import User from "../models/user.model.js";
import Submission from "../models/submission.model.js";
import uploadFileToS3 from "../lib/uploadSubmission.js"

export const submit = async (req, res) => {

    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const {title, abstract, affiliation, submittedBy} = req.body;
    let { authors, keywords } = req.body;
    const file = req.file;
    try {
        if(!title || !abstract || !keywords || !authors || !affiliation || !file || !submittedBy){
            return res.status(400).json({message: "All fields are required"});
        }
        if (!file || file.mimetype !== "application/pdf") {
            return res.status(400).json({ message: "File must be a PDF" });
          }

        if (typeof authors === "string") authors = JSON.parse(authors);
        if (typeof keywords === "string") keywords = JSON.parse(keywords);

        if(authors.length ==0 || keywords.length == 0){
            return res.status(400).json({message: "All fields are required"});
        }

        const fileUrl = await uploadFileToS3(file);



        const newSubmission = new Submission({
            title,
            abstract,
            keywords,
            authors,
            affiliation,
            file: fileUrl,
            submittedBy,
            status: "pending",

        })

        if(newSubmission){
            await newSubmission.save();
            res.status(200).json({
                _id: newSubmission._id,
                title: newSubmission.title,
                keywords: newSubmission.keywords,
                authors: newSubmission.authors,
                affiliation: newSubmission.affiliation,
                file: newSubmission.file,
                submittedBy: newSubmission.submittedBy,
                status: newSubmission.status,
            });

        }

    } catch (error) {
        console.log("Error in submit controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const listPending = async (req, res) =>{
    try {
        // Fetch all submissions from the database
        const submissions = await Submission.find({status: "pending"});

        // Check if there are no submissions
        if (submissions.length === 0) {
            return res.status(404).json({ message: "No submissions found." });
        }

        // Return the list of submissions
        res.status(200).json(submissions);
    } catch (error) {
        console.error("Error fetching submissions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}