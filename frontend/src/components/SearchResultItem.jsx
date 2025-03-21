const SearchResultItem = ({ paper }) => {
    return (
        <li className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h2 className="text-2xl font-semibold text-[#ff4081] mb-2">{paper.title}</h2>
                <p className="text-gray-400 text-sm mb-1">Affiliation: {paper.affiliation}</p>
                <p className="text-gray-300 mb-1">Authors: {paper.authors.join(", ")}</p>
                <p className="text-gray-300 mb-1">Keywords: {paper.keywords.join(", ")}</p>
                <p className="text-gray-500 text-sm">Published: {new Date(paper.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col items-end justify-between text-right">
                <button className="cursor-pointer text-sm bg-[#ff4081] text-white px-4 py-2 rounded-md hover:bg-pink-600 transition">View Details</button>
                <p className="text-xs text-gray-500 mt-4">Paper ID: {paper._id.slice(0, 8)}...</p>
            </div>
        </li>
    );
};

export default SearchResultItem;