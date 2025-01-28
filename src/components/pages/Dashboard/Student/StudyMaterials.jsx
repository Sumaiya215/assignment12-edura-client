import { useQuery} from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";



const StudyMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedSession, setSelectedSession] = useState(null);
    const { data: bookedSessions = [], isLoading: loadingSessions } = useQuery({
        queryKey: ['bookedSessions', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-bookings/${user?.email}`)
            return data;
        }
    })

    const handleSessionClick = (sessionId) => {
        setSelectedSession(sessionId)
    }

    // study materials
    const { data: materials = [], isLoading: loadingMaterials } = useQuery({
        queryKey: ['materials', selectedSession],
        queryFn: async () => {
            if (!selectedSession) return [];
            const { data } = await axiosSecure(`/my-materials/${selectedSession}`)
            // console.log("response", data)
            return data;
            
        },

        enabled: !!selectedSession,

    })
   

   
    if (loadingSessions ) return <span className="loading loading-bars loading-md"></span>
    if(loadingMaterials) return <span className="loading loading-bars loading-md"></span>
    
    return (
        <>
            <Helmet>
                <title>View All Study Materials</title>
            </Helmet>
            <div className="w-11/12 mx-auto mt-12 mb-22">
                <h1 className="text-xl font-semibold mb-6 mt-6">All Study Materials</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <h2 className="text-lg font-medium">Booked Sessions</h2>
                        <ul className="border rounded-md p-2">
                            {
                                
                                    bookedSessions.map(session => <li key={session._id}
                                        onClick={() => handleSessionClick(session.sessionId)}> {session.sessionTitle}
                                    </li>)

                              
                            }
                        </ul>
                    </div>
                </div>

                {/* study Materials */}
                <div className="md:col-span-2">
                    <h2 className="text-lg font-semibold">
                        {selectedSession ? "Study Materials" : " Select a session to view materials"}
                    </h2>
                    <div className="grid gap-4">
                        {
                            materials?.map((material) => (
                                <div key={material._id}
                                    className="border rounded-md p-4 flex items-start justify-between">
                                    <div>
                                        <img src={material.image} alt={material.title}
                                            className="w-8 h-8 rounded-md object-cover" />
                                        <h3 className="font-bold mt-2">{material.title}</h3>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <Link to={material.link} target="_blank"
                                            className="btn btn-sm bg-blue-500 text-white my-1">
                                            View On Drive
                                        </Link>
                                        <a href={material.image} download
                                            className="btn btn-sm bg-green-500 text-white">
                                            Download Image
                                        </a>
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                </div>

            </div>
        </>
    );
};

export default StudyMaterials;