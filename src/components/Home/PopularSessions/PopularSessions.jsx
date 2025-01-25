import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PopularSessionCard from "../../Card/PopularSessionCard";


const PopularSessions = () => {
    const axiosPublic = useAxiosPublic();

    const { data: popularSessions = [] , isLoading} = useQuery({
        queryKey: ['popularSessions'],
        queryFn: async () => {
            const { data } = await axiosPublic('/study-sessions')
            // console.log(data)
            return data;
        }
    });
    if (isLoading) return <span className="loading loading-bars loading-md"></span>
    console.log(popularSessions);

    return (
        <div className="w-11/12 mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-4">Popular Sessions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    popularSessions.map(sessionInfo =>
                        <PopularSessionCard key={sessionInfo._id} sessionInfo={sessionInfo}>

                        </PopularSessionCard> 

                        
                    )
                }
            </div>
        </div>
    );
};

export default PopularSessions;