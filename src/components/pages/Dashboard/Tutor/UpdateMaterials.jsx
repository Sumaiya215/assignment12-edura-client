import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { imageUpload } from "../../../../api/utils";


const UpdateMaterials = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    const { data: material = [], isLoading } = useQuery({
        queryKey: ['material', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/material/${id}`)
            return data;
        }
    });

    // console.log(material);
    const { title, sessionId, tutorEmail, link, image } = material

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const newImage = form.newImage.files[0];
        let imageURL = image;

        if (newImage) {
            try {
                imageURL = await imageUpload(newImage);
                console.log('new image uploaded',imageURL);
            } catch(err){
                console.log('Error uploading image',err)
            }         
        }


        const updatedInfo = {
            title:form.title.value,
            sessionId,
            tutorEmail,
            link:form.link.value,
            image: imageURL
        }

        try {
            const { data } = await axiosSecure.patch(`/update-material/${id}`, updatedInfo)
            console.log(data)
            toast.success('Material Updated Successfully!')
            navigate('/dashboard/my-materials')
        } catch (error) {
            console.log(error)
            toast.error('Error updating material')
        }
    }

    if (isLoading) return <span className="loading loading-bars loading-md"></span>

    return (
        <>
            <Helmet>
                <title>Update Materials</title>
            </Helmet>
            <div className="card w-3/4 lg:w-[50%] mx-auto mt-12 mb-22 shadow-lg mb-12">
                <h1 className="text-lg h-0 text-center font-bold ">Update Material</h1>
                <form onSubmit={handleSubmit} className="card-body" >
                    {/* title */}
                    <div className="form-control">
                        <label className=" font-medium">Title</label>
                        <input type="text" name="title" defaultValue={title}
                            className="input input-sm input-bordered" required />
                    </div>
                    {/* sessionId */}
                    <div className="form-control">
                        <label className=" font-medium">Session Id</label>
                        <input type="text" name="sessionId" defaultValue={sessionId} className="input input-sm input-bordered" readOnly />
                    </div>
                    {/* Tutor Email */}
                    <div className="form-control">
                        <label className=" font-medium">Tutor Email</label>
                        <input type="email" name="tutorEmail" defaultValue={tutorEmail} className="input input-sm input-bordered" readOnly />
                    </div>
                    {/* Current image */}
                    <div className="form-control">
                        <label className="font-medium">Current Image</label>
                        <img src={image} alt="current-image" className="w-24 h-24 object-cover rounded-lg lg:ml-36" />
                    </div>
                    {/*New Image */}
                    <div className="form-control">
                        <label className="font-medium">Upload New Image</label>
                        <input type="file" name="newImage" className="input  input-bordered" required={!image} />
                    </div>
                    {/* Link */}
                    <div className="form-control">
                        <label className="font-medium">Google Drive Link</label>
                        <input type="url" name="link" defaultValue={link} className="input  input-bordered" required />
                    </div>
                    {/* button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn  bg-fuchsia-600 text-white">Update Material</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateMaterials;