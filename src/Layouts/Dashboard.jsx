import { NavLink, Outlet } from "react-router-dom";
import useStudent from "../hooks/useStudent";
import useTutor from "../hooks/useTutor";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [isStudent] = useStudent();
    const [isTutor] = useTutor();
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            {/* dashboard side bar */}
           <div className="w-64 min-h-screen bg-base-200">
            <ul className="menu p-4">
                {
                   isStudent && <>
                   <li><NavLink to='/dashboard/view-session'>View Booked Session</NavLink></li>
                   <li><NavLink to='/dashboard/add-note'>Create Note</NavLink></li>
                   <li><NavLink to='/dashboard/manage-notes'>Manage Personal Notes</NavLink></li>
                   <li><NavLink to='/dashboard/view-materials'>View Study Materials</NavLink></li>
                   </> 
                }
                {
                    isTutor && <>
                    <li><NavLink to='/dashboard/add-session'>Create Study Session</NavLink></li>
                    <li><NavLink to='/dashboard/my-sessions'>My Sessions</NavLink></li>
                    <li><NavLink to='/dashboard/add-materials'>Upload Materials</NavLink></li>
                    <li><NavLink to='/dashboard/my-materials'>View All Materials</NavLink></li>
                    </>
                }
                {
                    isAdmin && <>
                    <li><NavLink to='/dashboard/users'>View All Users</NavLink></li>
                    <li><NavLink to='/dashboard/all-sessions'>View All Study Session</NavLink></li>
                    <li><NavLink to='/dashboard/all-materials'>View All Materials</NavLink></li>
                    </>
                }

            </ul>

           </div>

        {/* dashboard content */}
           <div className="flex-1 p-8">
                <Outlet></Outlet>
           </div>
        </div>
    );
};

export default Dashboard;