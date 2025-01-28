import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";


const BookingDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const {user} = useAuth();
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

    // save review and rating
    const handleSubmit = async e =>{
        e.preventDefault();
        const form = e.target;
        const name = user?.displayName;
        const email = user?.email;
        const review = form.review.value;
        const rating = parseFloat(form.rating.value);
        console.log(name, email, review, sessionId, rating);

        const formData = {
            name, email, sessionId, review, rating
        }


        try{
            const {data} = await axiosSecure.post('/reviews', {formData})
            toast.success('Review & Rating added successfully');
            form.reset();
           
        }catch(err){
            console.log(err)
            toast.error('Error adding review & rating')
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
                    <div className="card bg-base-200 w-11/12 lg:w-3/5 mx-auto  shadow-2xl">
                        <h3 className="text-lg font-medium text-center mt-3 h-0">Add Review and Rating</h3>
                        <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Student Name</span>
                                </label>
                                <input type="text" defaultValue={user?.displayName} className="input input-bordered" readOnly />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Student Email</span>
                                </label>
                                <input type="email" defaultValue={user?.email} className="input input-bordered" readOnly />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Review</span>
                                </label>
                                <textarea name="review" className="textarea textarea-bordered" required placeholder="review">

                                </textarea>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Rating</span>
                                </label>
                                <input type="number" name="rating" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn text-white bg-fuchsia-500">Add Review & Rating</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default BookingDetails;