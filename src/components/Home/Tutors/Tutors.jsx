import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import TutorCard from "../../Card/TutorCard";


const Tutors = () => {
    const axiosPublic = useAxiosPublic()
    const {data:tutors=[], isLoading} = useQuery({
        queryKey:['tutors'],
        queryFn: async() => {
            const {data} = await axiosPublic('/tutors')
            return data
        }
    })

    if (isLoading) return <span className="loading loading-bars loading-md"></span>
    console.log(tutors);

    return (
        <div className="w-11/12 mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-4">Our Tutors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {
                    tutors.map(tutor =>
                        <TutorCard key={tutor._id} tutor={tutor}>

                        </TutorCard>
                    )
                }
            </div>
        </div>
    );
};

export default Tutors;