import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSubStore } from '../store/useSubStore';
import { useAuthStore } from '../store/useAuthStore';

const PaymentSuccess = () => {
  const { verifyCheckoutSession, submit } = useSubStore();
  const { authUser } = useAuthStore();
  const [verified, setVerified] = useState(null);
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');

  useEffect(() => {
    const processPayment = async () => {
      if (!sessionId) return;

      const isPaid = await verifyCheckoutSession(sessionId);
      if (isPaid) {
        const submissionData = JSON.parse(localStorage.getItem('pendingSubmission'));
        if (submissionData && !verified) {
            await submit({
                title: submissionData.title,
                abstract: submissionData.abstract,
                affiliation: submissionData.affiliation,
                submittedBy: submissionData.submittedBy,
                email: submissionData.email,
                keywords: submissionData.keywords,
                authors: submissionData.authors,
                file: submissionData.file, 
              });
              
              localStorage.removeItem('pendingSubmission');
        }
        setVerified(true);
      } else {
        setVerified(false);
      }
    };

    processPayment();
  });

  if (verified === null) return <p>Verifying payment...</p>;
  if (verified === true) return <p>✅ Payment verified! Your submission has been received.</p>;
  return <p>❌ Payment could not be verified.</p>;
};

export default PaymentSuccess;
