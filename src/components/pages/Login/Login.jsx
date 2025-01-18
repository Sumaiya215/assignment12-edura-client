import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { signInUser, signInWithGoogle, user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    if (user) return <Navigate to={from} replace={true} />

    const handleLogin = async e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        try {
           await signInUser(email, password)
            navigate(from, { replace: true })
            toast.success('Login Successful')
        } catch (err) {
            console.log(err)
            toast.error('Login error')
        }

    }

    return (
        <div className="flex justify-center items-center mt-32 mb-20">
            <Helmet>
                <title>Login | Edura</title>
            </Helmet>
            <div className="card  bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
                <h1 className="text-xl h-0 font-bold mt-4 text-center">Login now!</h1>
                <form onSubmit={handleLogin} className="card-body">
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
                        <label className="label">
                            <a href="#" className="label-text-alt  link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-2">
                        <button className="btn h-10 min-h-8 bg-fuchsia-700 text-white">Login</button>
                    </div>
                </form>
                <div className="divider mt-0 mb-2 h-2 px-6 text-sm">OR</div>
                <SocialLogin></SocialLogin>
                <p className=' mb-6 px-6 text-sm text-center '>Don't have an account 
                    <Link to='/signup' className='text-fuchsia-600 underline ml-2'>Sign Up</Link> </p>
            </div>
        </div>
    );
};

export default Login;