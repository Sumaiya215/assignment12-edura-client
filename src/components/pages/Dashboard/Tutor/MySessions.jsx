import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const MySessions = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: approvedSessions = [], isLoading } = useQuery({
        queryKey: ['approvedSessions', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/sessions/approved/${user?.email}`)
            return data;
        }
    })

    // rejected sessions
    const { data: rejectedSessions = [], refetch } = useQuery({
        queryKey: ['rejectedSessions', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/sessions/rejected/${user?.email}`)
            return data;
        }
    })

    const resendApprovalRequest = async sessionId => {
        try {
            const { data } = await axiosSecure.post(`/sessions/resend/${sessionId}`)
            if (data.insertedId) {
                toast.success('Approval request resent successful!')
            }
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Failed to resend approval request')
        }

    }



    if (isLoading) return <span className="loading loading-bars loading-md"></span>
    console.log(approvedSessions);
    console.log(rejectedSessions);

    return (
        <>
        <Helmet>
            <title>My Sessions</title>
        </Helmet>
            <div>
                <div className="mb-12 lg:w-[90%] mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Approved Sessions</h2>
                    {
                        approvedSessions?.length ? <>
                            <div className="overflow-x-auto">
                                <table className="table table-xs">

                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Session Title</th>
                                            <th>Session Duration</th>
                                            <th>Registration Fee</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            approvedSessions.map(approvedSession => <tr key={approvedSession._id} >
                                                <th></th>
                                                <td>{approvedSession.sessionTitle}</td>
                                                <td>{approvedSession.sessionDuration}</td>
                                                <td>{approvedSession.registrationFee}</td>
                                                <td>{approvedSession.status}</td>
                                                <td>
                                                    <Link to='/dashboard/add-materials' state={{ approvedSession }}>
                                                        <button

                                                            className="btn btn-xs btn-outline btn-accent">Upload Materials</button>
                                                    </Link>

                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </> : <p className=" font-medium text-center"> Sessions not available</p>
                    }

                </div>

                <div className="lg:w-[90%] mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Rejected Sessions</h2>
                    {
                        rejectedSessions?.length ? <>
                            <div className="overflow-x-auto">
                                <table className="table table-xs">

                                    <thead>
                                        <tr>
                                            <th>Session Title</th>
                                            <th>Session Duration</th>
                                            <th>Registration Dates</th>
                                            <th>Class Dates</th>
                                            <th>Registration Fee</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rejectedSessions.map(rejectedSession => <tr key={rejectedSession._id}>
                                                <td>{rejectedSession.sessionTitle}</td>
                                                <td>{rejectedSession.sessionDuration}</td>
                                                <td>{`${rejectedSession.registrationStartDate} - ${rejectedSession.registrationEndDate}`}</td>
                                                <td>{`${rejectedSession.classStartDate} - ${rejectedSession.classEndDate}`}</td>
                                                <td>{rejectedSession.registrationFee}</td>
                                                <td>{rejectedSession.status}</td>
                                                <td>
                                                    <button onClick={() => resendApprovalRequest(rejectedSession._id)}
                                                        className="btn btn-xs btn-outline btn-accent">Resend Request</button>
                                                </td>
                                            </tr>)
                                        }



                                    </tbody>
                                </table>
                            </div>

                        </> : <p className=" font-medium text-center">Rejected Sessions not available </p>
                    }
                </div>
            </div>
        </>
    );
};

export default MySessions;