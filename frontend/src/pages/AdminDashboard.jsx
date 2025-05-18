import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import SubmissionItem from "../components/SubmissionItem";
import { useAuthStore } from '../store/useAuthStore'
import { useSubStore } from '../store/useSubStore'

const AdminDashboard = () => {
    const {pendingSubmissions, getPendingSubmissions} = useSubStore();
    const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const navigate = useNavigate();
      useEffect(() => {
        getPendingSubmissions();
      }, [getPendingSubmissions]);
    
      // Calculate pagination
      const totalPages = Math.ceil(pendingSubmissions.length / itemsPerPage);
      const paginatedSubmissions = pendingSubmissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
          <h1 className="text-3xl font-semibold mb-4">Admin Dashboard - Pending Submissions</h1>
    
          {pendingSubmissions.length === 0 ? (
            <p className="text-gray-400">No pending submissions found.</p>
          ) : (
            <div className="space-y-4">
              {paginatedSubmissions.map((pendingSubmissions, index) => (
              (  <SubmissionItem key={pendingSubmissions._id} submission={pendingSubmissions} />)
              ))}
            </div>
          )}
    
          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      );
    };
    
    export default AdminDashboard;
    