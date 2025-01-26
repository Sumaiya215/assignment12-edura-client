import { Link } from "react-router-dom";


const PopularSessionCard = ({ sessionInfo }) => {
    const {
        _id,
        sessionTitle,
        sessionDescription,
        registrationStartDate,
        registrationEndDate }
        = sessionInfo || {}

    const sessionStatus = (registrationStartDate, registrationEndDate) => {
        const now = new Date()
        const start = new Date(registrationStartDate)
        const end = new Date(registrationEndDate)
        return now >= start && now <= end ? 'ongoing' : 'closed'
    }

    return (
        <div className="w-11/12 mx-auto ">
            <div className="card bg-base-100 w-90 shadow-xl">
                <div className="card-body">
                    <h2 className="text-lg font-bold">{sessionTitle}</h2>
                    <p className="text-sm text-gray-400 mb-4">{sessionDescription}</p>

                    <div className="card-actions justify-end">
                        <button className={`btn btn-sm btn-secondary  ${sessionStatus(registrationStartDate, registrationEndDate)}`}>
                            {sessionStatus(registrationStartDate, registrationEndDate)}
                        </button>
                        <Link to={`/sessionDetails/${_id}`}>
                            <button className="btn btn-sm btn-primary font-semibold">
                             Read More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularSessionCard;