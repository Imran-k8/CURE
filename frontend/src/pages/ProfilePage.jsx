import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useSearchStore } from '../store/useSearchStore';
import { User, BadgeCheck, Mail, ShieldCheck, FileText } from 'lucide-react';

const ProfilePage = () => {
  const { id } = useParams();
  const { authUser, checkAuth } = useAuthStore();
  const { getSearchResultsByUserId, mySubmissions } = useSearchStore();

  useEffect(() => {
    checkAuth();
    if (id) getSearchResultsByUserId(id);
  }, [checkAuth, id, getSearchResultsByUserId]);

  return (
    <div className="min-h-screen w-full bg-[#0b1120] text-gray-100">
      <div className="max-w-5xl mx-auto p-8 space-y-12">
        {/* User Info */}
        <div className="border border-gray-700 rounded-lg p-6 bg-[#1a2238] shadow-md">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
            <User className="w-6 h-6 text-pink-500" /> Profile
          </h1>
          <div className="mt-4 space-y-2 text-gray-300">
            <p><span className="font-semibold text-white">Name:</span> {authUser?.fullName || 'N/A'}</p>
            <p><span className="font-semibold text-white">Email:</span> {authUser?.email || 'N/A'}</p>
            <p><span className="font-semibold text-white">Role:</span> {authUser?.role || 'N/A'}</p>
            <p><span className="font-semibold text-white">Affiliation:</span> {authUser?.affiliation || 'N/A'}</p>
            <p>
              <span className="font-semibold text-white">Verification Status:</span>{' '}
              {authUser?.verified ? (
                <span className="inline-flex items-center gap-1 text-green-400">
                  <BadgeCheck className="w-4 h-4" /> Verified
                </span>
              ) : (
                <span className="text-yellow-400">Pending</span>
              )}
            </p>
            <p><span className="font-semibold text-white">Last Updated:</span> {new Date(authUser?.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Submissions List */}
        <div className="border border-gray-700 rounded-lg p-6 bg-[#1a2238] shadow-md">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-white">
            <FileText className="w-5 h-5 text-pink-500" /> My Submissions
          </h2>
          {mySubmissions.length === 0 ? (
            <p className="text-gray-400">No submissions found.</p>
          ) : (
            <ul className="space-y-4">
              {mySubmissions.map((submission) => (
                <li
                  key={submission._id}
                  className="border border-gray-600 rounded-md p-4 bg-[#0f172a] hover:border-pink-500 transition"
                >
                  <p className="text-lg font-semibold text-white">{submission.title}</p>
                  <p className="text-sm text-gray-300">Status: <span className="text-pink-400 font-medium">{submission.status}</span></p>
                  <p className="text-sm text-gray-400">Submitted: {new Date(submission.updatedAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
