import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
const axiosPublic = useAxiosPublic();

export const imageUpload = async imageData =>{
        const formData = new FormData();
        formData.append('image', imageData);

        const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
            formData
        )

     return data.data.display_url   
}

export const saveUser = async user =>{
    await axiosPublic.post(`/users/${user?.email}`,{
        name: user?.name,
        image: user?.photoURL,
        email: user?.email,
        role:user?.role
    })
}