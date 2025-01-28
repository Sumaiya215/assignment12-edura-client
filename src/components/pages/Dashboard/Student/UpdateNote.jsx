import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";


const UpdateNote = () => {
    const { id } = useParams();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    const { data: note = [], isLoading } = useQuery({
        queryKey: ['note', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-notes/${id}`)
            // console.log(data)
            return data;
        }
    });
    const {email, title, description} = note;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedInfo = {
            email: user?.email,
            title:form.title.value,
           description: form.description.value
        }

        try {
            const { data } = await axiosSecure.patch(`/update-note/${id}`, updatedInfo)
            console.log(data)
            toast.success('Note Updated Successfully!')
            navigate('/dashboard/manage-notes')
        } catch (error) {
            console.log(error)
            toast.error('Error updating note')
        }
    }

    if (isLoading) return <span className="loading loading-bars loading-md"></span>
    return (
        <>
            <Helmet>
                <title>Update Note</title>
            </Helmet>
            <div className="mt-12">
                <div className="card bg-base-100 w-[80%] lg:w-2/5 mx-auto shadow-2xl">
                    <h1 className="text-lg font-medium text-center h-0 pt-3">Update Note</h1>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input type="email" defaultValue={email} className="input  input-bordered" readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Title</span>
                            </label>
                            <input type="text" name="title" defaultValue={title} placeholder="title" className="input  input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Description</span>
                            </label>
                            <textarea name="description" defaultValue={description} className="textarea textarea-bordered" placeholder="Write Description here..."></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn  btn-primary">Update Note</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateNote;