import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const ManageNotes = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: notes = [], isLoading, refetch } = useQuery({
        queryKey: ['notes', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/notes/${user?.email}`)
            return data;
        }
    })

    const handleDelete = async (id) => {
        try{
            const {data} = await axiosSecure.delete(`/delete-note/${id}`)
            console.log(data)
            toast.success('Note successfully deleted!')
            refetch()
        } catch(err){
            console.log(err)
            toast.error('Failed to delete note')
        }
       
    }

    console.log(notes)
    if (isLoading) return <span className="loading loading-bars loading-md"></span>
    return (
        <>
            <Helmet>
                <title>Manage Notes</title>
            </Helmet>
            <div className="w-11/12 mb-12 lg:w-[80%] mx-auto mt-12">
                <h2 className=" font-medium text-center mb-6">Manage Notes </h2>
                <div className="overflow-x-auto">
                    <table className="table table-xs  ">

                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                notes.map(note => <tr key={note._id}>
                                    <th>{note.title}</th>
                                    <td>{note.description}</td>
                                    <td>
                                        <Link to={`/dashboard/myNotes/${note._id}`}>
                                            <button className="btn btn-xs btn-outline btn-accent ">
                                                Update
                                            </button>
                                        </Link>
                                    </td>
                                   
                                    <td>
                                        <button
                                            onClick={() => handleDelete(note._id)}
                                            className="btn btn-xs btn-outline btn-error">
                                            Delete
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

export default ManageNotes;