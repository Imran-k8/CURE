import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import axios from "axios";

export const useSearchStore = create((set, get) => ({
    searchLoading: true,
    searchResults: [],

    getSearchResults: async (searchTerm) =>{
        try {
          const res = await axiosInstance.get("");
          set({searchResults: res.data});
        } catch (error) {
          console.log("error in getSearchResults", error.message);
        }
      },
}));