import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import BookingCard from "../../../Card/BookingCard";


const BookedSession = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-bookings/${user?.email}`)
            return data;
        }
    })

    console.log(bookings)
    if (isLoading) return <span className="loading loading-bars loading-md"></span>
    return (
        <>
            <Helmet>
                <title>View Booked Session</title>
            </Helmet>
            <div className="w-11/12 mx-auto mt-12 mb-22">
                <h1 className="text-xl font-semibold mb-6 mt-6">Booked Sessions {bookings.length}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        bookings?.length ? (
                            bookings.map(booking => <BookingCard key={booking._id}
                                booking={booking}>
                            </BookingCard>)

                        ) : <p className="text-gray-600 text-center">No bookings found</p>
                    }
                </div>

               

            </div>
        </>
    );
};

export default BookedSession;