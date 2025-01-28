import { Link } from "react-router-dom";


const BookingCard = ({ booking }) => {
    const { _id,sessionTitle, tutorName, price } = booking || {}
    return (
        <div>
            <div className="card card-compact bg-base-100 w-86 shadow-xl">
                <div className="card-body">
                    <p className="font-medium">Session Title: {sessionTitle}</p>
                    <p className="font-medium">Tutor Name: {tutorName}</p>
                    <p className="font-medium">Registration Fee: {price}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/dashboard/bookingDetails/${_id}`}>
                            <button className="btn btn-sm btn-primary">View Detail</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;