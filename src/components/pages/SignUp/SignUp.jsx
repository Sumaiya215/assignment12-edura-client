import { Helmet } from 'react-helmet-async';
import { imageUpload } from '../../../api/utils.js'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin.jsx';

const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;
        const photo = form.photo.files[0];
        const photoURL = await imageUpload(photo)

        console.log(name, email, password, role, photoURL);

        try {
            const result = await createUser(email, password)

            //saving username & photo
            await updateUserProfile(name, photoURL)
            console.log(result);
            toast.success('User Registration Successful!')
            navigate('/');
        } catch (err) {
            console.log(err)
            toast.error('User registration failed!')
        }


    }
    return (
        <div className=" mt-12 mb-20">
            <Helmet>
                <title>SignUp | Edura</title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
                <h1 className="text-xl h-0 font-bold mt-4 text-center">Register now!</h1>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="name" className="input h-8 text-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Photo</span>
                        </label>
                        <input type="file" name="photo" className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input h-8 text-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input h-8 text-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Role</span>
                        </label>
                        <select name="role" className="select h-8 min-h-8 select-bordered w-full max-w-xs">
                            <option>Student</option>
                            <option>Tutor</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn h-8 min-h-8 bg-fuchsia-700 text-white">Sign Up</button>
                    </div>
                </form>
                <div className="divider mt-0 mb-2 h-2 px-6 text-sm">OR</div>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    );
};

export default SignUp;