import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MaterialRows from "../../../Table/MaterialRows";
import { Helmet } from "react-helmet-async";

const MyMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: materials = [], isLoading , refetch} = useQuery({
        queryKey: ['materials', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/materials/${user?.email}`)
            return data;
        }
    })

    if (isLoading) return <span className="loading loading-bars loading-md"></span>
    return (
        <>
       <Helmet>
            <title>My Materials</title>
       </Helmet>
        <div className="mb-12 lg:w-[80%] mx-auto mt-12">
            {/* <h2> My Materials {materials.length}</h2> */}
            {
                materials?.length ? <>
                    <div className="overflow-x-auto">
                        <table className="table table-xs">
                          
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Link</th>
                                    <th>Image</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                 materials.map(material =>
                                 <MaterialRows key={material._id} 
                                 material={material} refetch={refetch}>
                                 </MaterialRows> )
                               }       
                               
                            </tbody>
                        </table>
                    </div>

                </> : <p className=" font-medium text-center">Materials not added</p>
            }
        </div>
        </>
    );
};

export default MyMaterials;