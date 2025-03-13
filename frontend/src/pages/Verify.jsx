import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Verify = () => {
    const {token} = useParams();
    const {verifyEmail} = useAuthStore();
    useEffect(() => {
        verifyEmail(token);
      }, [verifyEmail]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
    <div className="bg-gray-900 text-center p-10 rounded-lg border border-gray-700 shadow-lg max-w-lg">
      <h1 className="text-4xl font-bold text-green-500">Email Verified!</h1>
      <p className="text-lg text-gray-300 mt-4">
        Thank you for verifying your email. Your account is now completly active, and you can start exploring the CURE Network.
      </p>
    </div>
  </div>
  )
}

export default Verify