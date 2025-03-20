const SearchResultItem = ({ paper }) => {
    return (
        <li className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-2xl font-semibold text-[#ff4081]">{paper.title}</h2>
            <p className="text-gray-400 text-sm">Affiliation: {paper.affiliation}</p>
            <p className="text-gray-300">Authors: {paper.authors.join(", ")}</p>
            <p className="text-gray-300">Keywords: {paper.keywords.join(", ")}</p>
            <p className="text-gray-500 text-sm">Published: {new Date(paper.updatedAt).toLocaleDateString()}</p>
        </li>
    );
};

export default SearchResultItem;