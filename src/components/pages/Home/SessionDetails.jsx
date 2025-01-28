import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import useTutor from "../../../hooks/useTutor";
import useAdmin from "../../../hooks/useAdmin";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useSession } from "../../../providers/SessionProvider";


const SessionDetails = () => {
    const axiosSecure = useAxiosSecure();
    const [isTutor] = useTutor();
    const [isAdmin] = useAdmin();
    const {user} = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const {setSessionData} = useSession();
    const { sessionId } = useParams();
    //session
    const { data: session = {}, isLoading: loadingSession } = useQuery({
        queryKey: ['session', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/sessionDetails/${id}`)
            return data;
        }
    })

    // reviews
    const { data: reviewsData = [], isLoading: loadingReviews } = useQuery({
        queryKey: ['reviewsData', sessionId],
        queryFn: async () => {
            const { data } = await axiosSecure(`/reviews/${sessionId}`)
            return data
        }
    })

    if (loadingSession || loadingReviews) return <span className="loading loading-bars loading-md"></span>
    const {
        _id,
        sessionTitle,
        tutorName,
        tutorEmail,
        sessionDescription,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        sessionDuration,
        registrationFee
    } = session;

    const { averageRating, reviews } = reviewsData;
    const isRegistrationOpen = new Date(registrationEndDate) >=new Date()
    && new Date(registrationStartDate) <= new Date() ;

    const handleBookNow = async () => {
        const paymentInfo = {
            sessionId: session._id,
            sessionTitle: session. sessionTitle,
            tutorName: session.tutorName,
            tutorEmail: session.tutorEmail,
            sessionDescription: session.sessionDescription,
            registrationStartDate: session.registrationStartDate,
            registrationEndDate: session.registrationEndDate,
            classStartDate: session.classStartDate,
            classEndDate: session.classEndDate,
            sessionDuration: session.sessionDuration,
            studentEmail: user?.email,    
            price: session.registrationFee,
            date: new Date()
        }
        if (registrationFee === 0){
            try{
                const {data} = axiosSecure.post('/bookings', {
                   paymentInfo
                })
                toast.success('Session Booked Successfully!');
                navigate('/dashboard/view-session');

            }catch(err){
                console.log(err)
                toast.error('Failed to book session!')
            }
        }
        else {
            setSessionData(session);
            navigate(`/payment?sessionId=${_id}&amount=${registrationFee}`);
        }
    }

    return (
        <>
        <Helmet>
            <title>{sessionTitle}</title>
        </Helmet>
        <div className="w-3/4 mx-auto mt-6 mb-12">
            <div className="card bg-base-100 w-82 shadow-xl">
                <div className="card-body ml-12">
                    <h2 className="card-title text-2xl justify-center mb-4">{sessionTitle}</h2>
                    <p className="font-medium">Tutor: {tutorName}</p>
                    <p className="font-medium">Average Rating: {averageRating.toFixed(1)}</p>
                    <p className="font-medium">Description: {sessionDescription}</p>
                    <p className="font-medium">Registration Start Date: {registrationStartDate}</p>
                    <p className="font-medium">Registration End Date: {registrationEndDate}</p>
                    <p className="font-medium">Class Start Date: {classStartDate}</p>
                    <p className="font-medium">Class End Date: {classEndDate}</p>
                    <p className="font-medium">Duration: {sessionDuration}</p>
                    <p className="font-medium">Fee: 
                        {
                            registrationFee === 0? ' Free': `$${registrationFee}`
                        }
                    </p>
                    <h2 className="text-xl font-medium underline">Reviews</h2>
                    {
                        reviews?.length>0 ? (
                            reviews.map((reviews, idx) =>(
                                <div key={idx}>
                                    <p>{reviews.comment}</p>
                                    <p>Rating: {reviews.rating}</p>
                                </div>
                            )
                        )): <p className="font-medium text-red-500"> No reviews yet</p>
                    }
                    <div className="card-actions justify-end">
                        <button 
                        onClick={handleBookNow}
                        disabled= {!isRegistrationOpen ||  isAdmin ||  isTutor}
                        className="btn btn-primary">
                            {isRegistrationOpen? "Book Now": "Registration Closed"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default SessionDetails;