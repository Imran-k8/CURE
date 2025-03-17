import { useNavigate } from "react-router-dom";

const SubmissionItem = ({ submission }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition cursor-pointer" 
         onClick={() => navigate(`/submission/${submission._id}`)}>
      <h2 className="text-xl font-semibold text-red-400 hover:underline">
        {submission.title}
      </h2>
      <p className="text-gray-400">Submitted by: {submission.submittedBy}</p>
      <p className="text-gray-400">Affiliation: {submission.affiliation}</p>
      <p className="text-gray-400">Submission Date: {new Date(submission.createdAt).toLocaleDateString()}</p>
      <p className="text-yellow-400 font-medium">Status: {submission.status}</p>
    </div>
  );
};

export default SubmissionItem;
