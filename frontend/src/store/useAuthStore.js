import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import axios from "axios";


export const useAuthStore = create((set, get) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    role: "",
    verified: false,
    pendingSubmissions: [],

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
    
          set({ authUser: res.data });
        } catch (error) {
          console.log("Error in checkAuth:", error);
          set({ authUser: null });
        }
      },

      checkRole: async () =>{
        try {
          const res = await axiosInstance.get("/auth/role");
          set({role:res.data});
        } catch (error) {
          console.log("error in checkRole", error);
          set({role:""})
        }
      },

      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
      verifyEmail: async (token) =>{
        try {
          const res = await axiosInstance.get(`auth/verify-email/${token}`)
          set({verified: true});
          console.log(res.data);
        } catch (error) {
          console.log("error in verifying email:", error.message)
        }
      },

      checkVerified: async () =>{
        try {
          const res = await axiosInstance.get(`auth/verified`)
          set({verified: res.data});
          console.log(res.data);
        } catch (error) {
          console.log("error in verifying email:", error.message)
        }
      },

      resendVerificationEmail: async () =>{
        try {
          await axiosInstance.post(`auth/send-verification-email`)
        } catch (error) {
          console.log("error in sending verification email:", error.message)
        }
      },
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

}));