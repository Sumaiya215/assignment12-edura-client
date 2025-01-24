import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SessionDataRow from "../../../Table/SessionDataRow";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const AllSessions = () => {
    const axiosSecure = useAxiosSecure();
    const { data: sessions = [], isLoading , refetch} = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const { data } = await axiosSecure('/all-sessions')
            // console.log(data)
            return data;
        }
    });

    console.log(sessions);
  

    // Approve session
    const handleApprove = async(id, fee) => {
        try{
            await axiosSecure.patch(`/sessions/approve/${id}`, {registrationFee: fee});
            toast.success('Session approved successfully');
            refetch();
        } catch(error){
            console.error(error)
            toast.error('Failed to approve session');
        }
    }

    // Reject Session
    const handleReject = async (id) => {
        try{
            await axiosSecure.patch(`/sessions/reject/${id}`);
            toast.success("Session rejected and moved to reject collection successfully");
            refetch();
        } catch (error) {
            console.error(error);
            toast.error('Failed to reject session')
        }
    }


    // Delete Session
    const handleDelete = async (id) => {
        try{
            await axiosSecure.delete(`/sessions/delete/${id}`);
            toast.success('Session deleted successfully!')
            refetch();
        } catch(error){
            console.error(error);
            toast.error('Failed to delete session')
        }
    };

    if (isLoading) return <span className="loading loading-bars loading-md"></span>

    return (
        <>
        <Helmet>
            <title>View All Sessions</title>
        </Helmet>
        <div>
            <h2 className="text-xl font-semibold text-center mb-6">View All Sessions</h2>
            <div className="overflow-x-auto">
                <table className="table  table-xs">
                   
                    <thead>
                        <tr>
                            <th></th>
                            <th>Session Title</th>
                            <th>Tutor Name</th>
                            <th>Tutor Email</th>
                            <th>Session Duration</th>
                            <th>Registration Start Date</th>
                            <th>Registration End Date</th>
                            <th>Class Start Date</th>
                            <th>Class End Date</th>
                            <th>Registration Fee</th>
                            <th>Status</th>
                            <th>Session Description</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sessions.map(sessionData =>
                            <SessionDataRow key={sessionData._id}
                            sessionData={sessionData}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onDelete={handleDelete}
                            >
                            </SessionDataRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default AllSessions;