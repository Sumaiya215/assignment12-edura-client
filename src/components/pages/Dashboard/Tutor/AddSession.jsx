
import { useForm } from "react-hook-form"
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AddSession = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors } ,reset} = useForm()
    const onSubmit =async(data) => {
        console.log(data);

        const dataInfo = {
            sessionTitle: data.sessionTitle,
            tutorName: user?.displayName,
            tutorEmail: user?.email,
            sessionDuration: data.sessionDuration,
            registrationStartDate: data.registrationStartDate,
            registrationEndDate: data.registrationEndDate,
            classStartDate: data.classStartDate,
            classEndDate: data.classEndDate,
            registrationFee: parseInt(data.registrationFee),
            status: 'pending',
            sessionDescription: data.sessionDescription

        }
        const res = await axiosSecure.post('/sessions', dataInfo)
        console.log(res.data)
        if(res.data.insertedId){
            reset();
            toast.success('Session Successfully Created')
        };

    }

    return (
        <>
        <Helmet>
            <title>Add Session | Edura</title>
        </Helmet>
        <div className="max-w-xl mx-auto shadow-md rounded-lg p-6 mt-20 mb-12 ">
            <h1 className="text-2xl font bold text-center mb-6">Create Study Session</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Session Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Session Title</label>
                    <input
                        type="text"{...register('sessionTitle')}
                        placeholder="Enter session title" className="input input-bordered" required />
                    {errors.sessionTitle && <span className="text-red-600 text-sm">Session Title is required</span>}
                </div>
                {/* Tutor Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tutor Name</label>
                    <input
                        type="text"{...register('tutorName')}
                        defaultValue={user?.displayName} className="input input-bordered bg-gray-100" readOnly />
                </div>
                {/* Tutor Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tutor Email</label>
                    <input
                        type="text"{...register('tutorEmail')}
                        defaultValue={user?.email} className="input input-bordered bg-gray-100" readOnly />
                </div>
                {/* Session Duration */}
                <div>
                    <label className="block text-sm font-medium mb-1">Session Duration</label>
                    <input
                        type="text"{...register('sessionDuration')}
                        placeholder="duration... " className="input input-bordered" required />
                    {errors.sessionDuration && <span className="text-red-600 text-sm">Session Duration is required</span>}
                </div>
                {/* Registration Start Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Registration Start Date</label>
                    <input
                        type="date"{...register('registrationStartDate')}
                        className="input input-bordered" required />
                    {errors.registrationStartDate && <span className="text-red-600 text-sm">Registration Start Date is required</span>}
                </div>
                {/* Registration End Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Registration End Date</label>
                    <input
                        type="date"{...register('registrationEndDate')}
                        className="input input-bordered" required />
                    {errors.registrationEndDate && <span className="text-red-600 text-sm">Registration Start Date is required</span>}
                </div>
                {/* Class Start Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Class Start Date</label>
                    <input
                        type="date"{...register('classStartDate')}
                        className="input input-bordered" required />
                    {errors.classStartDate && <span className="text-red-600 text-sm">Class Start Date is required</span>}
                </div>
                {/* Class End Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Class End Date</label>
                    <input
                        type="date"{...register('classEndDate')}
                        className="input input-bordered" required />
                    {errors.classEndDate && <span className="text-red-600 text-sm">Class End Date is required</span>}
                </div>
                {/* Registration Fee */}
                <div>
                    <label className="block text-sm font-medium mb-1">Registration Fee</label>
                    <input
                        type="number" {...register('registrationFee')}
                        defaultValue={0} className="input input-bordered bg-gray-100" readOnly />
                </div>
                {/* Status */}
                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                       {...register('status')}
                        defaultValue="pending" className="select select-bordered bg-gray-100"  >
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
                        placeholder="Write Session Description Here..." className="textarea textarea-bordered w-full" required />
                    {errors.sessionDescription && <span className="text-red-600 text-sm">Session Description is required</span>}
                </div>
                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button type="submit" className="btn btn-primary w-full">Submit</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default AddSession;