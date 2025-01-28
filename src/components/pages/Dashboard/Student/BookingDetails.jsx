import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";


const BookingDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { data: booking = {}, isLoading } = useQuery({
        queryKey: ['booking', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/bookingDetails/${id}`)
            return data;
        }
    })
    if (isLoading) return <span className="loading loading-bars loading-md"></span>
    const {
        sessionId,
        sessionTitle,
        tutorName,
        tutorEmail,
        sessionDescription,
        classStartDate,
        classEndDate,
        sessionDuration
    } = booking
    return (
        <>
            <Helmet>
                <title>{sessionTitle}</title>
            </Helmet>
            <div className="w-3/4 mx-auto mt-6 mb-12">
                <div className="card bg-base-100 w-82 shadow-xl">
                    <div className="card-body ml-12">
                        <h2 className="card-title text-2xl justify-center mb-4">{sessionTitle}</h2>
                        <p className="font-medium" >SessionId: {sessionId}</p>
                        <p className="font-medium">Tutor: {tutorName}</p>
                        <p className="font-medium">Tutor Email: {tutorEmail}</p>
                        <p className="font-medium">Description: {sessionDescription}</p>
                        <p className="font-medium">Class Start Date: {classStartDate}</p>
                        <p className="font-medium">Class End Date: {classEndDate}</p>
                        <p className="font-medium">Session Duration: {sessionDuration}</p>
                        
                    </div>
                </div>

                
                <div className="mt-12">
                    review section

                </div>
            </div>
        </>
    );
};

export default BookingDetails;