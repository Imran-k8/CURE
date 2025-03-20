import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../store/useSearchStore.js';
import SearchResultItem from '../components/SearchResultItem.jsx';

const SearchResults = () => {
    const { searchLoading, searchResults, getSearchResults } = useSearchStore();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('query') || '';
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10; // Number of results per page
    const navigate = useNavigate();

    useEffect(() => {
        getSearchResults(searchTerm);
    }, [searchTerm, getSearchResults]);

    // Pagination logic
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (searchLoading) {
        return <div className="text-center text-white text-lg">Loading Search Results...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto p-10 bg-gray-900 text-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-[#ff4081] text-center">Search Results for "{searchTerm}"</h1>
                
                {currentResults.length === 0 ? (
                    <p className="text-center text-gray-400">No results found.</p>
                ) : (
                    <ul className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700">
                        {currentResults.map((paper, index) => (
                            <li key={index} onClick={() => navigate(`/paper/${paper._id}`)} className="cursor-pointer hover:bg-gray-800 p-4 rounded-lg transition duration-300">
                                <SearchResultItem paper={paper} />
                            </li>
                        ))}
                    </ul>
                )}
                
                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: Math.ceil(searchResults.length / resultsPerPage) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                                currentPage === index + 1 ? 'bg-[#ff4081] text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;