import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    role: "",

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
          console.log(res.data);
        } catch (error) {
          console.log("error in verifying email:", error.message)
        }
      },

}));