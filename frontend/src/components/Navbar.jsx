import { useAuthStore } from '../store/useAuthStore'
import { Link } from "react-router-dom";
import { FaSearch, FaUserPlus, FaSignInAlt, FaUpload, FaSignOutAlt } from "react-icons/fa";



const Navbar = () => {
    const {authUser, role, logout} = useAuthStore();
    const imageLink = "https://res.cloudinary.com/dlokrrvf0/image/upload/v1741728626/CURE_onsf0e.png"

  return (
    <>
    <nav className="bg-black bg-opacity-80 shadow-lg p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={imageLink} alt="CURE Logo" className="h-15 w-15 rounded-full"/>
        <Link to="/" className="text-2xl font-bold text-white">CURE Network</Link>
      </div>
      
      {/* Search Box */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full text-black placeholder-gray-500 bg-white rounded-lg px-4 py-2"
        />
        <FaSearch className="absolute right-3 top-3 text-black" />
      </div>
      
      {/* Links */}
      <div className="flex gap-4">
        <Link to="/publish" className="group btn btn-primary flex items-center gap-2 text-white transition-colors duration-300 hover:text-red-500">
          <FaUpload className="text-white transition-colors duration-300 group-hover:text-red-500" /> Publish with Us!
        </Link>
        {authUser && role.role==="Admin"  ? (<> <Link onClick={logout} className="group btn btn-outline btn-primary flex items-center gap-2 text-white transition-colors duration-300 hover:text-red-500">
          <FaSignOutAlt className="text-white transition-colors duration-300 group-hover:text-red-500" /> Submissions
        </Link></>):<></>}
        {authUser?(<> <Link onClick={logout} className="group btn btn-outline btn-primary flex items-center gap-2 text-white transition-colors duration-300 hover:text-red-500">
          <FaSignOutAlt className="text-white transition-colors duration-300 group-hover:text-red-500" /> Logout
        </Link>
        </>):(<><Link to="/signup" className="group btn btn-outline btn-primary flex items-center gap-2 text-white transition-colors duration-300 hover:text-red-500">
          <FaUserPlus className="text-white transition-colors duration-300 group-hover:text-red-500" /> Sign Up
        </Link>
        <Link to="/login" className="group btn btn-outline btn-secondary flex items-center gap-2 text-white transition-colors duration-300 hover:text-red-500">
          <FaSignInAlt className="text-white transition-colors duration-300 group-hover:text-red-500" /> Login
        </Link></>)}
          
        
      </div>
    </nav>
        </>
  )
}

export default Navbar