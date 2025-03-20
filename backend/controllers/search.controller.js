import User from "../models/user.model.js";
import Submission from "../models/submission.model.js";

export const getSearchResults = async (req, res) =>{
    const { query } = req.query;

    if (!query || query.trim() === '') {
        return res.status(400).json({ message: 'Query parameter is required' });
      }

      try {
        // Use the $text operator to search and retrieve a relevance score
        const submissions = await Submission.find(
          { status: "published",
            $text: { $search: query } },
          { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });
    
        res.json(submissions);
      } catch (error) {
        console.error("error in getSearchResults controller", error);
        res.status(500).json({ message: "Internal server error" });
      }
}