import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://edura-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic;