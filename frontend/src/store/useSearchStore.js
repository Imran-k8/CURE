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
          console.log(res.data);
          set({searchResults: res.data});
          console.log(searchResults);
        } catch (error) {
          console.log("error in getSearchResults", error.message);
        }finally{
          set({searchLoading: false})
        }
      },

      getSearchResultsByUserId: async (id) =>{
        try {
          const res = await axiosInstance.get(`/search/getSearchResultsByUserId/${id}`);
          console.log(res.data);
          set({mySubmissions: res.data});
          console.log(mySubmissions);
        } catch (error) {
          console.log("error in getSearchResultsByUserIdStore", error.message);
        }
      },

}));