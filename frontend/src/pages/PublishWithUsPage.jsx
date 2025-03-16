import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Verified } from "lucide-react";

const PublishWithUs = () => {
  const { authUser, verified, checkVerified, resendVerificationEmail } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      checkVerified();
    }
  }, [authUser]); // Only re-run if authUser changes

  console.log("verified:", verified);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-[#3a0d2e]">Publish with CURE</h1>
      <p className="mb-4 text-gray-700">
        Welcome to CURE's publishing platform. Here’s everything you need to know about submitting your research:
      </p>
      
      {/* Submission Guidelines */}
      <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-3">
          <li>
              <strong>Eligibility Criteria:</strong><br/>  
              - Papers must be original research in any academic field.  <br/>
              - At least one author must have an institutional affiliation (university, research lab, etc.).  <br/>
              - Submissions from independent researchers are allowed but may require additional verification.  <br/>
          </li>

          <li>
              <strong>Formatting & Manuscript Requirements:</strong>  <br/>
              - Papers must be submitted in PDF format. <br/>
              - File name should NOT include spaces (" ") <br/>
              - The document must include title, author names, abstract, methodology, results, and references.  <br/>
              - The submission should follow the CURE Citation & Formatting Style (based on APA or MLA).  <br/>
          </li>

          <li>
              <strong>Review & Acceptance Policy:</strong>  <br/>
              - All submissions are reviewed for quality, originality, and relevance.  <br/>
              - Papers may be rejected if they contain plagiarism, insufficient evidence, poor structure, or lack of clarity.  <br/>
              - If rejected, the submission fee is non-refundable.  <br/>
          </li>

          <li>
              <strong>Publication Timeline & Expectations:</strong> <br/> 
              - Initial screening & review process typically takes 2 to 4 weeks.  <br/>
              - If accepted, the paper will be published on the CURE platform and indexed accordingly.  <br/>
              - Authors will be contacted via email in any case.  <br/>
          </li>
      </ul>

      {/* Useful Links */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#3a0d2e]">Useful Links</h2>
        <ul className="list-disc pl-6 text-blue-600">
          <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a></li>
        </ul>
      </div>

      {/* Submission Access */}
      <div className="mt-6 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4 text-[#3a0d2e]">Submit Your Paper</h2>

        {authUser ? (
          verified ? (
            <button 
              onClick={() => navigate("/submit-paper")} 
              className="btn bg-[#ff4081] text-white px-6 py-2 rounded-lg hover:bg-[#d1366b]"
            >
              Go to Submission Form
            </button>
          ) : (
            <div>
              <p className="text-red-600 mb-2">Please verify your email to submit a paper.</p>
              <button 
                onClick={resendVerificationEmail} 
                className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Resend Verification Email
              </button>
            </div>
          )
        ) : (
          <div>
            <p className="text-gray-700 mb-2">
              Please <span 
                className="cursor-pointer text-inherit font-inherit hover:text-[#ff4081] transition-colors" 
                onClick={() => navigate("/login")}
              >
                Log In
              </span> to submit a paper.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishWithUs;
