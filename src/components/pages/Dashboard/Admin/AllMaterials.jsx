import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";


const AllMaterials = () => {
    const axiosSecure = useAxiosSecure();

    const { data: materials = [], isLoading, refetch } = useQuery({
        queryKey: ['materials'],
        queryFn: async () => {
            const { data } = await axiosSecure('/all-materials')
            return data;
        }
    })

    const handleDelete = async (id) => {
        try{
            const {data} = await axiosSecure.delete(`/delete-material/${id}`)
            console.log(data)
            toast.success('Material successfully deleted!')
            refetch()
        } catch(err){
            console.log(err)
            toast.error('Failed to delete material')
        }
       
    }

    if (isLoading) return <span className="loading loading-bars loading-md"></span>

    return (
        <>
            <Helmet>
                <title>All Materials</title>
            </Helmet>
            <div className="mb-12 lg:w-[90%] mx-auto mt-12">
                <h2 className="text-xl font-medium text-center mb-6">All Materials </h2>
                <div className="overflow-x-auto">
                    <table className="table table-xs  ">
                      
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>SessionId</th>
                                <th>Tutor Email</th>
                                <th>Link</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                materials.map(material =><tr key={material._id}>
                                    <th>{material.title}</th>
                                    <td>{material.sessionId}</td>
                                    <td>{material.tutorEmail}</td>
                                    <td>
                                        <a href={material.link} className="text-blue-500 hover:underline" 
                                        target="_blank">{material.link}</a>     
                                    </td>
                                    <td>
                                        <img src={material.image} className="w-16 h-6" alt="image" />
                                    </td>
                                    <td >
                                        <button 
                                        onClick={() => handleDelete(material._id)}
                                        className="btn btn-xs bg-red-500 text-white">
                                            <FaTrash/>
                                       </button>
                                    </td>
                                </tr>
                               )
                            }    
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default AllMaterials;