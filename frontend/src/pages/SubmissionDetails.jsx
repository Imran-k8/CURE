import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { useSubStore } from '../store/useSubStore';
import { useNavigate } from "react-router-dom";

const SubmissionDetails = () => {
    const {id} = useParams();
    const {submissionDetails, getSubmissionDetails, publish, reject} = useSubStore();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);

    useEffect(() => {
        getSubmissionDetails(id)
      }, [getSubmissionDetails]);


    if (!submissionDetails) {
        return <p className="text-red-500 text-center mt-10">No submission details available.</p>;
    }

    const handleAction = (type) => {
        setActionType(type);
        setModalOpen(true);
    };

    const handleConfirm = () => {
        if(actionType === "Approve"){
          publish(id);
        }
        else if(actionType === "Reject"){
          reject(id);
        }
        setModalOpen(false);
    };

    return (
    <div className="p-8 bg-[#0a192f] min-h-screen text-white flex justify-center items-center relative">
      <div className="max-w-3xl w-full bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 relative">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">Submission Details</h1>
        
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">{submissionDetails.title}</h2>
        <p className="text-gray-400 text-sm mb-4 border-l-4 border-red-500 pl-4">{submissionDetails.abstract}</p>
        <p className="text-gray-300 mb-2"><span className="font-semibold text-red-400">Submitted by:</span> {submissionDetails.submittedBy || "Unknown"}</p>
        <p className="text-gray-300 mb-2"><span className="font-semibold text-red-400">Email:</span> {submissionDetails.email || "Unknown"}</p>
        <p className="text-gray-300 mb-2"><span className="font-semibold text-red-400">Affiliation:</span> {submissionDetails.affiliation || "N/A"}</p>
        <p className="text-gray-300 mb-2"><span className="font-semibold text-red-400">Status:</span> <span className="text-yellow-400 font-medium">{submissionDetails.status}</span></p>
        <p className="text-gray-300 mb-6"><span className="font-semibold text-red-400">Submission Date:</span> {submissionDetails.createdAt ? new Date(submissionDetails.createdAt).toLocaleDateString() : "Unknown"}</p>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-400">Keywords</h3>
          <ul className="list-disc list-inside text-gray-300 pl-4">
            {submissionDetails.keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-400">Authors</h3>
          <ul className="list-disc list-inside text-gray-300 pl-4">
            {submissionDetails.authors.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-400">Research Paper</h3>
          <a
            href={submissionDetails.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 font-medium underline"
          >
            View PDF
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button onClick={() => handleAction('Approve')} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 cursor-pointer">Approve</button>
          <button onClick={() => handleAction('Reject')} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 cursor-pointer">Reject</button>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center border border-gray-700">
            <h2 className="text-2xl text-white mb-4">Confirm {actionType}</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to {actionType.toLowerCase()} this submission?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleConfirm} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-md transition">Confirm</button>
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold shadow-md transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionDetails;
