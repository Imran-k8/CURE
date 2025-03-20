import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {useSearchStore} from "../store/useSearchStore.js"

function SearchResults() {
    const {searchLoading, searchResults, getSearchResults} = useSearchStore();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('query') || '';
    useEffect(() => {
       getSearchResults(searchTerm);
      }, [getSearchResults]);

    if(searchLoading){
        return(
            <div>Loading Search Results...</div>
        );
    }

    return (
        <div className="search-results">
            
        </div>
    );
}

export default SearchResults;