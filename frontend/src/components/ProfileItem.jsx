import React from 'react';
import { FileText } from 'lucide-react';
import { useSubStore } from "../store/useSubStore";
import { useAuthStore } from "../store/useAuthStore";


const ProfileItem = ({ submission }) => {

    const {createCheckoutSession} = useSubStore();
    const {authUser} = useAuthStore();

  const handleCompletePayment = async () => {
    await createCheckoutSession(1000, authUser?.email, submission._id);

};

  return (
    <li className="border border-gray-600 rounded-md p-4 bg-[#0f172a] hover:border-pink-500 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{submission.title}</p>
          <p className="text-sm text-gray-300">
            Status: <span className="text-pink-400 font-medium">{submission.status}</span>
          </p>
          <p className="text-sm text-gray-400">
            Submitted: {new Date(submission.updatedAt).toLocaleDateString()}
          </p>
        </div>
        {submission.status === 'pending payment' && (
          <button
            onClick={handleCompletePayment}
            className="ml-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            Complete Payment
          </button>
        )}
      </div>
    </li>
  );
};

export default ProfileItem;
