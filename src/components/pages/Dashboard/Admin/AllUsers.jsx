import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import UserDataRow from "../../../Table/UserDataRow";




const AllUsers = () => {
    const [search, setSearch] = useState('');
    const [newSearch, setNewSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    // const [isOpen, setIsOpen] = useState(false);
    const {user} = useAuth();

    const { data: users = [], isLoading , refetch} = useQuery({
        queryKey: ['users', {search,newSearch, email:user?.email}],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users?search=${search}&newSearch=${newSearch}&email=${user?.email}`)
            console.log(data)

            return data;
        }
    })

    if(isLoading) return <span className="loading loading-bars loading-md"></span>

    return (
        <>
            <Helmet>
                <title>AllUsers </title>
            </Helmet>
            <div className="w-[80%] mx-auto">
                <div className="flex gap-8 justify-center items-center mb-8 ">
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={(e) => setSearch(e.target.value)} type="text" className="grow" placeholder="Search Name" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={(e) => setNewSearch(e.target.value)} type="text" className="grow" placeholder="Search Email" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="table">
                      
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {
                                users.map(userData =><UserDataRow  key={userData._id}
                              userData={userData} refetch={refetch} >

                                </UserDataRow>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllUsers;