import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const MaterialRows = ({ material, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { _id, title, link, image } = material || {}

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/material/${id}`)
            console.log(data)
            toast.success('Material deleted Successfully!')
            refetch()
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete materials!')
        }
    }
    return (
        <tr>
            <th>{title}</th>
            <td>
                <a href={link} className="text-blue-500 hover:underline"
                    target="_blank">{link}</a>
            </td>
            <td>
                <img src={image} className="w-16 h-8" alt="" />
            </td>
            <td>
                <Link to={`/dashboard/my-materials/${_id}`}>
                    <button className="btn btn-xs btn-outline btn-accent">Update</button>
                </Link>
            </td>
            <td>
                <button onClick={() => handleDelete(_id)}
                    className="btn btn-xs btn-outline btn-error">Delete</button>
            </td>
        </tr>
    );
};

export default MaterialRows;