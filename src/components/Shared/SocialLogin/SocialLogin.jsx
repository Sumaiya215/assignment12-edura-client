import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveUser } from "../../../api/utils";

const SocialLogin = () => {
    const {signInWithGoogle, signInWithGithub, user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    if (user) return <Navigate to={from} replace={true} />

    const handleGoogleSignIn = async() =>{
        try{
            const data = await signInWithGoogle()
            const user = data?.user;
            const userData = {
                uid: user?.uid,
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
                role: 'Student'

            };
            console.log('Google Login Success', userData)
            await saveUser(userData)
            navigate(from, { replace: true })
            toast.success('Login Successful')
            return userData;
            
        }catch(err){
            console.log(err)
            toast.error('Login error')
        }   
    }

    const handleGithubSignIn = async() =>{
        try{
            const data = await signInWithGithub()
            const user = data?.user;

            const userData = {
                uid: user?.uid,
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
                role: 'Student'

            };
            console.log('Github Login Success', userData)
            await saveUser(userData)
            navigate(from, { replace: true })
            toast.success('Login Successful')
            // return userData;

            
            
        }catch(err){
            console.log(err)
            toast.error('Login error')
        }   
    }


    return (
        <div>
            <div onClick={handleGoogleSignIn} className='flex justify-center items-center gap-3 border border-gray-300 rounded-lg my-4 mx-6 p-1.5'>
                    <FcGoogle /> <p className='text-sm'>Continue With Google</p>
                </div>
                <div onClick={handleGithubSignIn} className='flex justify-center items-center gap-3 border border-gray-300 rounded-lg mb-6 mx-6 p-1.5'>
                    <FaGithub />  <p className='text-sm'>Continue With GitHub</p>
                </div>
            
        </div>
    );
};

export default SocialLogin;