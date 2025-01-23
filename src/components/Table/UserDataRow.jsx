import { useState } from "react";
import UpdateUserModal from "../Modal/UpdateUserModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const UserDataRow = ({userData, refetch}) => {
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const {name, email, role} = userData || {};
    const updateRole = async finalRole =>{
        if(role === finalRole) return
        try{
            const {data} = await axiosSecure.patch(`/user/role/${email}`,
              {role: finalRole})
              console.log(data);
              toast.success('Updated Role Successfully')
              refetch();
        } catch(err){
            toast.error('Failed to Update Role')
            console.log(err)
        } finally{
            setIsOpen(false)
        }
    }
    return (
        <tr >
            <td></td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>
                <button onClick={() => setIsOpen(true)} className="btn btn-xs btn-outline btn-accent">
                Update Role</button>
                <UpdateUserModal role={role} updateRole={updateRole} isOpen={isOpen}
                 setIsOpen={setIsOpen}></UpdateUserModal>
            </td>
        </tr>)

};

export default UserDataRow;