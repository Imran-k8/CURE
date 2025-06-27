import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSubStore } from '../store/useSubStore';
import { useAuthStore } from '../store/useAuthStore';

const PaymentSuccess = () => {
  const { verifyCheckoutSession, finalApproval } = useSubStore();
  const { authUser } = useAuthStore();
  const [verified, setVerified] = useState(null);
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const initialized = useRef(false)
const processPayment = async () => {
      if (!sessionId) return;

      const isPaid = await verifyCheckoutSession(sessionId);
      if (isPaid && !initialized.current) {
        initialized.current = true;
        const submissionid = JSON.parse(localStorage.getItem('pendingSubmission'));
        if (submissionid && !verified) {
            await finalApproval(submissionid);
              
            localStorage.removeItem('pendingSubmission');
        }
        setVerified(true);
      } else {
        setVerified(false);
      }
    };
  useEffect(() => {
    processPayment();
  }, []);

  if (verified === null) return <p>Verifying payment...</p>;
  if (verified === true) return <p>✅ Payment verified! Your submission has been received.</p>;
  return <p>❌ Payment could not be verified.</p>;
};

export default PaymentSuccess;
