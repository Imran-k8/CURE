import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import axios from "axios";

export const useSubStore = create((set, get) => ({
    pendingSubmissions: [],
    submissionDetails: null,

    submit: async (data) =>{ 
        try {
          const res = await axiosInstance.post("/sub/submit", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.status === 200 || res.status === 201) {
            toast.success("Submission successful");
          } else {
            toast.error("Something went wrong. Please try again.");
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
}));