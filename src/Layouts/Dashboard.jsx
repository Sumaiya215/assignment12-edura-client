import { NavLink, Outlet } from "react-router-dom";
import useStudent from "../hooks/useStudent";
import useTutor from "../hooks/useTutor";
import useAdmin from "../hooks/useAdmin";
import { FaBookmark, FaList, FaUsers } from "react-icons/fa";
import { TbNotebook } from "react-icons/tb";
import { FaBook } from "react-icons/fa6";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { SiGoogleclassroom } from "react-icons/si";
import { FaCloudUploadAlt } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";

const Dashboard = () => {
    const [isStudent] = useStudent();
    const [isTutor] = useTutor();
    const [isAdmin] = useAdmin();
    return (
        <div className="md:flex">
            {/* dashboard side bar */}
           <div className="relative min-h-screen bg-base-200">
            <ul className="menu p-4">
                {
                   isStudent && <>
                   <li><NavLink to='/dashboard/view-session'>
                   <FaBookmark /> View Booked Session</NavLink></li>
                   <li><NavLink to='/dashboard/add-note'>
                   <TbNotebook /> Create Note</NavLink></li>
                   <li><NavLink to='/dashboard/manage-notes'>
                   <FaBook/> Manage Personal Notes</NavLink></li>
                   <li><NavLink to='/dashboard/view-materials'>
                    <FaList/> View Study Materials</NavLink></li>
                   </> 
                }
                {
                    isTutor && <>
                   <li><NavLink to='/dashboard/add-session'>
                   <HiSquare3Stack3D /> Create Study Session</NavLink></li>
                    <li><NavLink to='/dashboard/my-sessions'>
                    <SiGoogleclassroom /> My Sessions</NavLink></li>
                    <li><NavLink to='/dashboard/add-materials'>
                    <FaCloudUploadAlt /> Upload Materials</NavLink></li>
                    <li><NavLink to='/dashboard/my-materials'>
                    <HiOutlineViewGrid /> View All Materials</NavLink></li>
                    </>
                }
                {
                    isAdmin && <>
                    <li><NavLink to='/dashboard/users'>
                   <FaUsers/> View All Users</NavLink></li>
                    <li><NavLink to='/dashboard/all-sessions'>
                    <HiOutlineViewGrid /> View All Study Session</NavLink></li>
                    <li><NavLink to='/dashboard/all-materials'>
                    <FaList/> View All Materials</NavLink></li>
                    </>
                }

            </ul>

           </div>

        {/* dashboard content */}
        <div className="flex-1  md:ml:64">
           <div className="p-6">
                <Outlet></Outlet>
           </div>
        </div>
        </div>
    );
};

export default Dashboard;