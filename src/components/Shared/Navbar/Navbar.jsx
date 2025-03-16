import { Link } from "react-router-dom";
import logo from '../../../assets/logo .png'
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();

    return (
        <div className='sticky top-0 z-30 bg-base-100 shadow-md mt-4'>
            <nav className="navbar bg-base-100 w-full  px-4 md:px-10 ">
                <div className="navbar-start">
                    <Link to='/' className="flex items-center space-x-2">
                        <img src={logo} alt="Logo" className="w-8" />
                        <span className="text-xl font-bold">EDURA</span>
                    </Link>
                </div>

                <div className="hidden md:flex navbar-end space-x-4">
                    {
                        !user ? (<>
                            <Link to="/login" className="btn btn-ghost btn-sm font-bold">
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-ghost btn-sm font-bold">
                                Sign Up
                            </Link>
                        </>
                        ) : (
                            <>
                                <Link to='/dashboard' className="btn btn-outline btn-sm">
                                    Dashboard
                                </Link>
                                <button onClick={logOut} className="btn btn-outline btn-ghost btn-sm">Logout</button>
                                <div className="avatar online ml-4">
                                    <div className="w-10 rounded-full">
                                        <img className="w-6 h-6 rounded-full" src={user?.photoURL} alt="profile"
                                        referrerPolicy="no-referrer" />
                                    </div>
                                </div>

                            </>
                        )}
                </div>

                {/* mobile dropdown menu */}
                <div className="md:hidden navbar-end">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block h-6 w-6 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content  right-0 mt-3 z-[1] p-2 shadow 
                             bg-base-100 rounded-box w-28 absolute">
                            {
                                !user ? <>
                                    <li>
                                        <Link to="/login" className="btn btn-sm mb-2">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className="btn btn-sm  btn-ghost mb-3">Sign Up</Link>
                                    </li>
                                </> :
                                    <>
                                        <li>
                                            <Link to='/dashboard' className="btn btn-sm mb-2">Dashboard</Link>
                                        </li>
                                        <li>
                                            <button onClick={logOut} className="btn btn-sm  btn-ghost">Logout</button>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;