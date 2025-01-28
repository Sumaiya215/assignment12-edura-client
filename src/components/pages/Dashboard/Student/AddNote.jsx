
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddNote = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async e =>{
            e.preventDefault();
            const form = e.target;
            const email = user?.email;
            const title = form.title.value;
            const description = form.description.value;
            console.log(title, description)
            const note = {
                email, title, description
            }

            try{
                const {data} = await axiosSecure.post('/notes', {note})
                toast.success('Notes added successfully');
                form.reset();
                navigate('/dashboard/manage-notes')
            }catch(err){
                console.log(err)
                toast.error('Error adding note')
            }
    }
    return (
        <>
        <Helmet>
            <title>Add Note</title>
        </Helmet>
        <div className="mt-12">
        <div className="card bg-base-100 w-[80%] lg:w-2/5 mx-auto shadow-2xl">
            <h1 className="text-lg font-medium text-center h-0 pt-3">Add Note</h1>
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Email</span>
                    </label>
                    <input type="email"  defaultValue={user?.email} className="input  input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Title</span>
                    </label>
                    <input type="text" name="title" placeholder="title" className="input  input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Description</span>
                    </label>
                    <textarea name="description" className="textarea textarea-bordered" placeholder="Write Description here..."></textarea>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn  btn-primary">Add Note</button>
                </div>
            </form>
        </div>
        </div>
        </>
    );
};

export default AddNote;