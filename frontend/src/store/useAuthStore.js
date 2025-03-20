import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set, get) => ({

    authUser: null,
    isSigningUp: false,
    isCheckingAuth: false,
    isCheckingRole: false,
    isCheckingVerified: false,
    isLoggingIn: false,
    role: "",
    verified: false,
    

      checkAuth: async () => {
        set({isCheckingAuth: true});
        try {
          const res = await axiosInstance.get("/auth/check");
    
          set({ authUser: res.data });
        } catch (error) {
          console.log("Error in checkAuth:", error);
          set({ authUser: null });
        }finally{
          set({isCheckingAuth: false});
        }
      },

      checkRole: async () =>{
        set({isCheckingRole: true});
        try {
          const res = await axiosInstance.get("/auth/role");
          set({role:res.data});
        } catch (error) {
          console.log("error in checkRole", error);
          set({role:""})
        }finally{
          set({isCheckingRole: false});
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
          window.location.reload();
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
        set({isCheckingVerified: true});
        try {
          const res = await axiosInstance.get(`auth/verified`)
          set({verified: res.data});
          console.log(res.data);
        } catch (error) {
          console.log("error in verifying email:", error.message)
        }finally{
          set({isCheckingVerified: false});
        }
      },

      resendVerificationEmail: async () =>{
        try {
          await axiosInstance.post(`auth/send-verification-email`)
        } catch (error) {
          console.log("error in sending verification email:", error.message)
        }
      },
      

}));