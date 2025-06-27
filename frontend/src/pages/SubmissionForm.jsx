import { useState } from "react";
import { FiFileText, FiUser, FiBriefcase, FiTag, FiUpload, FiBook } from "react-icons/fi";

import { useAuthStore } from "../store/useAuthStore";
import { useSubStore } from "../store/useSubStore";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";





const SubmissionForm = () => {
    const navigate = useNavigate();
    
    const {authUser} = useAuthStore();
    const {submit} = useSubStore();
    const [formData, setFormData] = useState({
      title: "",
      abstract: "",
      authors: "",
      affiliation: "",
      keywords: "",
      file: null,
      submittedBY: authUser?._id,
      email: authUser?.email,
    });

    const handleFileChange = (e) => {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    };

    const validateForm = () => {
      if (!formData.title.trim()) return toast.error("title is required");
      if (!formData.abstract.trim()) return toast.error("abstract is required");
      if (!formData.affiliation.trim()) return toast.error("affiliation is required");

    // Ensure keywords is converted to an array before filtering
    const keywordsArray = formData.keywords.split(",").map(k => k.trim());
    const authorsArray = formData.authors.split(",").map(a => a.trim());

    // Validate array length
    if (keywordsArray.filter(k => k !== "").length === 0) 
      return toast.error("Keywords required");

    if (authorsArray.filter(a => a !== "").length === 0) 
      return toast.error("Authors required");

    return { keywords: keywordsArray, authors: authorsArray }; // ✅ Return formatted arrays
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedValues = validateForm();
    if (!formattedValues) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("abstract", formData.abstract);
    formDataToSend.append("affiliation", formData.affiliation);
    formDataToSend.append("submittedBy", authUser?._id); // Ensure user ID is included
    formDataToSend.append("email", authUser?.email); // Ensure user email is included

    // ✅ Send each array value separately
    formattedValues.keywords.forEach((keyword) => formDataToSend.append("keywords[]", keyword));
    formattedValues.authors.forEach((author) => formDataToSend.append("authors[]", author));

    if (formData.file) {
      formDataToSend.append("file", formData.file); // File must be appended as a binary object
    } else {
      console.error("❌ No file selected");
    }

    console.log("📤 Submitting FormData:");
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}:`, pair[1]); // Logs each field
    }

    submit(formDataToSend);

    navigate("/")
  };

  return (
    <div className="bg-[#0a192f] min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto p-10 bg-gray-900 text-white shadow-2xl rounded-2xl border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-center text-red-500">Submit Your Research</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="flex items-center space-x-2 text-gray-300">
            <FiBook />
            <span>Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter your paper title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          
          <label className="flex items-center space-x-2 text-gray-300">
            <FiFileText />
            <span>Abstract</span>
          </label>
          <textarea
            name="abstract"
            placeholder="Enter a brief abstract of your paper"
            value={formData.abstract}
            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
            required
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          ></textarea>
          
          <label className="flex items-center space-x-2 text-gray-300">
            <FiUser />
            <span>Authors</span>
          </label>
          <input
            type="text"
            name="authors"
            placeholder="Enter author names"
            value={formData.authors}
            onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
            required
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          
          <label className="flex items-center space-x-2 text-gray-300">
            <FiBriefcase />
            <span>Affiliation</span>
          </label>
          <input
            type="text"
            name="affiliation"
            placeholder="Enter your institution or organization"
            value={formData.affiliation}
            onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
            required
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          
          <label className="flex items-center space-x-2 text-gray-300">
            <FiTag />
            <span>Keywords</span>
          </label>
          <input
            type="text"
            name="keywords"
            placeholder="Enter keywords separated by commas"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            required
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          
          <label className="flex items-center space-x-2 text-gray-300">
            <FiUpload />
            <span>Upload File (PDF)</span>
          </label>
          <div className="p-4 border border-gray-700 rounded-lg bg-gray-800 flex flex-col items-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full cursor-pointer text-white"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-lg transition duration-300 shadow-md hover:text-black cursor-pointer"
          >
            Complete Submission
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
