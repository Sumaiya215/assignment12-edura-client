import { useLocation } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { imageUpload } from "../../../../api/utils";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const AddMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const location = useLocation();
    const {approvedSession } = location.state || {};
    const {_id} = approvedSession;
    // console.log(_id);

    const handleSubmit =async e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const sessionId = _id;
        const tutorEmail = user?.email;
        const link = form.link.value;
        const image = form.image.files[0];
        const imageURL = await imageUpload(image);

        // console.log(title, sessionId, tutorEmail, link, imageURL);

        const materials = {
            title,
            sessionId,
            tutorEmail,
            link,
            image: imageURL
        }

        try{
            const {data} = await axiosSecure.post('/upload-materials', materials)
            console.log(data)
            toast.success('Materials uploaded successfully!')
            form.reset()
        } catch(err){
            console.log(err)
            toast.error('Error uploading materials')
        }
    }
    return (
        <>
        <Helmet>
            <title>Upload Materials</title>
        </Helmet>
        <div className="card w-3/4 lg:w-[50%] mx-auto mt-12 mb-22 shadow-lg">
             <h1 className="text-lg h-0 text-center font-bold ">Add Materials</h1>
            <form onSubmit={handleSubmit} className="card-body" >
                {/* title */}
                <div className="form-control">
                    <label className=" font-medium">Title</label>
                    <input type="text" name="title" className="input input-sm input-bordered" required />
                </div>
                {/* sessionId */}
                <div className="form-control">
                    <label className=" font-medium">Session Id</label>
                    <input type="text" name="sessionId" defaultValue={_id} className="input input-sm input-bordered" readOnly />
                </div>
                {/* Tutor Email */}
                <div className="form-control">
                    <label className=" font-medium">Tutor Email</label>
                    <input type="email" name="tutorEmail" defaultValue={user?.email} className="input input-sm input-bordered" readOnly />
                </div>
                {/* Image */}
                <div className="form-control">
                    <label className="font-medium">Image</label>
                    <input type="file" name="image" className="input  input-bordered" required />
                </div>
                {/* Link */}
                <div className="form-control">
                    <label className="font-medium">Google Drive Link</label>
                    <input type="url" name="link" className="input  input-bordered" required />
                </div>
                {/* button */}
                <div className="form-control mt-6">
                    <button type="submit" className="btn  bg-fuchsia-600 text-white">Upload Materials</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default AddMaterials;