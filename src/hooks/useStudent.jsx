import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useStudent = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: isStudent, isLoading: isStudentLoading} = useQuery({
        queryKey:[user?.email, 'isStudent'],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/users/student/${user?.email}`);
            console.log(res.data);
            return res.data?.student;
        }
    })
    return [isStudent,isStudentLoading] 
};

export default useStudent;