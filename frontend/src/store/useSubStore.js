import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import axios from "axios";
import { FileOutput } from "lucide-react";

export const useSubStore = create((set, get) => ({
    pendingSubmissions: [],
    submissionDetails: null,
    fileUrl: null,

    submit: async (data) => {
      try {
        const res = await axiosInstance.post("/sub/submit", data); // JSON by default
        if (res.status === 200 || res.status === 201) {
          toast.success("Submission successful");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.log("error in submit", error.message);
      }
    },
    
    uploadFile: async (data) =>{ 
        try {
          const res = await axiosInstance.post("/sub/uploadFile", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.status === 200 || res.status === 201) {
            console.log("file uploaded successfully")
            set({fileUrl: res.data});
            return res.data
          } else {
            console.log("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.log("error in submit", error.message);
        }
      },

      getPendingSubmissions: async () =>{
        try {
          const res = await axiosInstance.get("/sub/submissionlist");
          set({pendingSubmissions: res.data});
        } catch (error) {
          console.log("error in getPendingSubmissions", error.message);
        }
      },
      getSubmissionDetails: async (id) =>{
        try {
          const res = await axiosInstance.get(`sub/submissiondetails/${id}`);
          set({submissionDetails: res.data[0]});
        } catch (error) {
          console.log("error in getSubmissionDetails in authstore", error.message);
        }
      },
      publish: async (id) =>{
        try {
          const res = await axiosInstance.put(`sub/publish/${id}`);
          if (res.status === 200 || res.status === 201) {
            toast.success("Published successful");
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.log("error in reject in authstore", error.message);
        }
      },
      reject: async (id) =>{
        try {
          const res = await axiosInstance.put(`sub/reject/${id}`);
          if (res.status === 200 || res.status === 201) {
            toast.success("Rejected successful");
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.log("error in reject in authstore", error.message);
        }
      },
      createCheckoutSession: async (amount, email, submissionData) => {
        try {
          const res = await axiosInstance.post('/payment/create-checkout-session', {
            amount,
            email,
            metadata: {
              submission: JSON.stringify(submissionData), // optional: include submission data
            },
          });
      
          if (res.data?.url) {
            // Store the submission temporarily in localStorage/sessionStorage
            console.log("tststs")
            console.log("Saving submission data to localStorage:", submissionData);
            localStorage.setItem('pendingSubmission', JSON.stringify(submissionData));
            console.log("Retrieved after return:", localStorage.getItem('pendingSubmission'));
            window.location.href = res.data.url;
          } else {
            toast.error("Failed to initiate payment.");
          }
        } catch (error) {
          console.error("Stripe error:", error.message);
          toast.error("Stripe checkout failed.");
        }
      },

      verifyCheckoutSession: async (sessionId) => {
        try {
          const res = await axiosInstance.get(`/payment/verify-checkout-session/${sessionId}`);
          return res.data?.paid === true;
        } catch (error) {
          console.error("Session verification failed:", error.message);
          return false;
        }
      },      
      
      
      
}));