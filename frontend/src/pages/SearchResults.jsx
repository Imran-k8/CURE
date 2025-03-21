import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../store/useSearchStore.js';
import SearchResultItem from '../components/SearchResultItem.jsx';

const SearchResults = () => {
    const { searchLoading, searchResults, getSearchResults } = useSearchStore();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('query') || '';
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        getSearchResults(searchTerm);
    }, [searchTerm, getSearchResults]);

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (searchLoading) {
        return <div className="text-center text-white text-lg mt-10">Loading Search Results...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0a192f] py-12 px-4">
            <div className="max-w-6xl mx-auto bg-[#111827] p-10 rounded-xl shadow-xl border border-gray-800">
                <h1 className="text-3xl font-semibold text-white text-center mb-6">Search Results for "{searchTerm}"</h1>

                {currentResults.length === 0 ? (
                    <p className="text-center text-gray-400">No results found.</p>
                ) : (
                    <ul className="space-y-4">
                        {currentResults.map((paper, index) => (
                            <li
                                key={index}
                                onClick={() => navigate(`/paper/${paper._id}`)}
                                className="cursor-pointer bg-[#1f2937] hover:bg-[#374151] p-5 rounded-lg border border-gray-700 transition duration-200 shadow-sm hover:shadow-md"
                            >
                                <SearchResultItem paper={paper} />
                            </li>
                        ))}
                    </ul>
                )}

                {searchResults.length > resultsPerPage && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: Math.ceil(searchResults.length / resultsPerPage) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
                                    currentPage === index + 1
                                        ? 'bg-[#ff4081] text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;