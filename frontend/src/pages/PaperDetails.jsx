import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSubStore } from '../store/useSubStore';
import { FileText } from 'lucide-react'; // Icon

const PaperDetails = () => {
  const { id } = useParams();
  const { submissionDetails, getSubmissionDetails } = useSubStore();

  console.log(submissionDetails)

  useEffect(() => {
    if (id) {
      getSubmissionDetails(id);
    }
  }, [getSubmissionDetails, id]);

  if (!submissionDetails) {
    return (
      <p className="text-red-500 text-center mt-10">
        No submission details available.
      </p>
    );
  }

  const getInitials = (name) => {
    const words = name.trim().split(/\s+/);
    const firstInitial = words[0]?.[0].toUpperCase() || "";
    const lastInitial = words.length > 1 ? words[words.length - 1][0].toUpperCase() : "";
    return lastInitial ? `${firstInitial}. ${lastInitial}.` : `${firstInitial}.`;
  };  

  const {
    title,
    authors,
    affiliation,
    keywords,
    abstract,
    updatedAt,
    file,
    _id,
  } = submissionDetails;

  const handleDownload = () => {
    if (file) {
      window.open(file, '_blank', 'noopener,noreferrer');
    } else {
      alert('No file available to download.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0b1120] text-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDE - PAPER INFO */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-400 uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                Journal Article
              </div>
              <h1 className="text-4xl font-serif font-bold text-white mt-2">{title}</h1>
              <p className="text-pink-500 font-medium mt-2">{authors?.join(', ')}</p>
              <p className="italic text-gray-300 mt-1">{affiliation}</p>
              <p className="mt-4 text-gray-300">
                <span className="font-semibold">Keywords:</span> {keywords?.join(', ')}
              </p>
              <p className="mt-2 text-gray-300">
                <span className="font-semibold">Abstract:</span> {abstract}
              </p>
              <p className="mt-2 text-gray-300">
                <span className="font-semibold">Published Date:</span> {new Date(updatedAt).toLocaleDateString()}
              </p>
            </div>

            <hr className="border-gray-700" />

            {/* CITATIONS */}
            <div className="border border-gray-700 rounded-lg p-5 bg-[#1a2238]">
              <h2 className="text-xl font-serif font-semibold text-white mb-3">Citations</h2>
              <p className="text-sm text-gray-300"><span className="font-semibold">APA:</span> {authors.map((name, index) => (
                            <span key={index}>
                                {name}, {getInitials(name)}
                                {index !== authors.length - 1 && ", "}
                            </span> ))} ({new Date(updatedAt).getFullYear()}). {title}. <i>CURE NETWORK</i>, cure.com/paper/{_id}</p>
              <p className="text-sm text-gray-300"><span className="font-semibold">MLA:</span> {authors.map((name, index) => (
                            <span key={index}>
                                {name},&nbsp;
                            </span> ))} "{title}". CURE NETWORK, {new Date(updatedAt).getFullYear()}.</p>
              <p className="text-sm text-gray-300"><span className="font-semibold">Chicago:</span> Citation Currently Unavailable</p>
            </div>

            {/* TERMS & COPYRIGHT */}
            <div className="border border-gray-700 rounded-lg p-5 bg-[#1a2238] mt-4">
              <h2 className="text-xl font-serif font-semibold text-white mb-3">Terms and Copyright</h2>
              <p className="text-sm text-gray-300">
                This paper is published under the terms and conditions of the CURE journal platform.
                Redistribution, reproduction, or reuse of this content without proper citation may violate copyright laws.
                Please contact the journal administration for further permissions.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - PDF VIEWER */}
          <div className="w-full lg:w-[65%] flex flex-col items-center gap-4">
            {/* Download Button at Top Right */}
            <div className="w-full flex justify-end">
              <button
                onClick={handleDownload}
                className="px-5 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
              >
                Download Paper
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="w-full h-[900px] border border-gray-700 rounded-lg shadow-md overflow-hidden bg-[#1a2238]">
              {file ? (
                <iframe
                  src={file}
                  title="PDF Viewer"
                  width="100%"
                  height="100%"
                  className="rounded-lg"
                  style={{ border: 'none' }}
                ></iframe>
              ) : (
                <p className="text-center py-4 text-gray-400">No PDF file available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetails;