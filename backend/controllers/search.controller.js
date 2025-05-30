import User from "../models/user.model.js";
import Submission from "../models/submission.model.js";
import mongoose from "mongoose";


export const getSearchResults = async (req, res) =>{
    const { query } = req.query;

    if (!query || query.trim() === '') {
        return res.status(400).json({ message: 'Query parameter is required' });
      }

      try {
        // Use the $text operator to search and retrieve a relevance score
        const submissions = await Submission.aggregate([
          {
            $search: {
              index: "default", // Change this if your search index has a different name
              text: {
                query: query,
                path: ["title", "affiliation", "authors", "keywords", "abstract"]
              }
            }
          },
          {
            $match: { status: "published" } // Only published submissions
          },
          {
            $project: {
              _id: 1,
              title: 1,
              authors: 1,
              affiliation: 1,
              abstract: 1,
              keywords: 1,
              status: 1,
              file: 1,
              score: { $meta: "searchScore" } // Include the relevance score
            }
          },
          {
            $sort: { score: -1 } // Sort by relevance
          }
        ]);
    
        res.json(submissions);
      } catch (error) {
        console.error("error in getSearchResults controller", error);
        res.status(500).json({ message: "Internal server error" });
      }
}

export const getSearchResultsByUserId = async (req, res) =>{
    const {id: id } = req.params;

    try{

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
          }

        const submissions = await Submission.find({submittedBy: id});


        res.status(200).json(submissions);

    } catch (error) {
    console.error("error in getSearchResultsByUserId controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
    

}