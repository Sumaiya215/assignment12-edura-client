import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdateSession = () => {
    const { id } = useParams(); 
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    // get a specific session
    const { data: session = [], isLoading } = useQuery({
        queryKey: ['session', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/sessions/${id}`)
            // console.log(data)
            return data;
        }
    });

    console.log(session);
  

    const { sessionTitle,
        tutorName,
        tutorEmail,
        sessionDuration,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        registrationFee,
        status,
        sessionDescription } = session;

    // update session
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {
        // console.log(data);

        const updatedInfo = {
           
            sessionTitle: data.sessionTitle,
            tutorName: data.tutorName,
            tutorEmail: data.tutorEmail,
            sessionDuration: data.sessionDuration,
            registrationStartDate: data.registrationStartDate,
            registrationEndDate: data.registrationEndDate,
            classStartDate: data.classStartDate,
            classEndDate: data.classEndDate,
            registrationFee: parseInt(data.registrationFee),
            status: 'approved',
            sessionDescription: data.sessionDescription

        }

        try {
            const res = await axiosSecure.patch(`/sessions/update/${id}`, updatedInfo)
            console.log(res.data)
            if (res.data.modifiedCount) {
                reset();
                toast.success('Session Successfully Updated!');
                navigate('/dashboard/all-sessions')
            };
        } catch (error) {
            console.error(error)
            toast.error('Failed to update session')
        }

    }

    if (isLoading) return <span className="loading loading-bars loading-md"></span>
    return (
        <>
            <Helmet>
                <title>Update Session</title>
            </Helmet>
            <div className="w-4/5 lg:w-[60%] mx-auto shadow-md rounded-lg p-6 mt-20 mb-12 ">
                <h1 className="text-2xl font bold text-center mb-6">Update Study Session</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Session Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Session Title</label>
                        <input
                            type="text"{...register('sessionTitle')}
                            defaultValue={sessionTitle} className="input input-bordered w-full" required />
                        {errors.sessionTitle && <span className="text-red-600 text-sm">Session Title is required</span>}
                    </div>
                    {/* Tutor Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Tutor Name</label>
                        <input
                            type="text"{...register('tutorName')}
                            defaultValue={tutorName} className="input input-bordered w-full bg-gray-100" readOnly />
                    </div>
                    {/* Tutor Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Tutor Email</label>
                        <input
                            type="text"{...register('tutorEmail')}
                            defaultValue={tutorEmail} className="input input-bordered w-full bg-gray-100" readOnly />
                    </div>
                    {/* Session Duration */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Session Duration</label>
                        <input
                            type="text"{...register('sessionDuration')}
                            defaultValue={sessionDuration} className="input input-bordered w-full" required />
                        {errors.sessionDuration && <span className="text-red-600 text-sm">Session Duration is required</span>}
                    </div>
                    {/* Registration Start Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Registration Start Date</label>
                        <input
                            type="date"{...register('registrationStartDate')}
                            defaultValue={registrationStartDate} className="input input-bordered w-full" required />
                        {errors.registrationStartDate && <span className="text-red-600 text-sm">Registration Start Date is required</span>}
                    </div>
                    {/* Registration End Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Registration End Date</label>
                        <input
                            type="date"{...register('registrationEndDate')}
                            defaultValue={registrationEndDate} className="input input-bordered w-full" required />
                        {errors.registrationEndDate && <span className="text-red-600 text-sm">Registration Start Date is required</span>}
                    </div>
                    {/* Class Start Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Class Start Date</label>
                        <input
                            type="date"{...register('classStartDate')}
                            defaultValue={classStartDate} className="input input-bordered w-full" required />
                        {errors.classStartDate && <span className="text-red-600 text-sm">Class Start Date is required</span>}
                    </div>
                    {/* Class End Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Class End Date</label>
                        <input
                            type="date"{...register('classEndDate')}
                            defaultValue={classEndDate} className="input input-bordered w-full" required />
                        {errors.classEndDate && <span className="text-red-600 text-sm">Class End Date is required</span>}
                    </div>
                    {/* Registration Fee */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Registration Fee</label>
                        <input
                            type="number" {...register('registrationFee')}
                            defaultValue={registrationFee} className="input input-bordered w-full bg-gray-100" required />
                    </div>
                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            {...register('status')}
                            defaultValue={status} className="select select-bordered w-full bg-gray-100"  >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    {/* Session Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Session Description</label>
                        <textarea
                            {...register('sessionDescription')}
                            defaultValue={sessionDescription} className="textarea textarea-bordered w-full" required />
                        {errors.sessionDescription && <span className="text-red-600 text-sm">Session Description is required</span>}
                    </div>
                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <button type="submit" className="btn text-white bg-fuchsia-600 w-full">Update Session</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateSession;