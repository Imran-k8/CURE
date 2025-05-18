import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import axios from "axios";

export const useSearchStore = create((set, get) => ({
    searchLoading: false,
    searchResults: [],
    mySubmissions: [],

    getSearchResults: async (searchTerm) =>{
        set({searchLoading: true})
        try {
          const res = await axiosInstance.get(`/search/getSearchResults?query=${encodeURIComponent(searchTerm)}`);
          set({searchResults: res.data});
        } catch (error) {
          console.log("error in getSearchResults", error.message);
        }finally{
          set({searchLoading: false})
        }
      },

      getSearchResultsByUserId: async (id) =>{
        try {
          const res = await axiosInstance.get(`/search/getSearchResultsByUserId/${id}`);
          set({mySubmissions: res.data});
        } catch (error) {
          console.log("error in getSearchResultsByUserIdStore", error.message);
        }
      },

}));