

const TutorCard = ({ tutor }) => {
    const { name, image, email } = tutor || {}
    return (
        <div className="card bg-base-100 w-86 shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src={image}
                    alt="image"
                    className="rounded-xl w-[200px] h-[150px]" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="text-lg font-medium">{name}</h2>
                <p className="text-sm text-blue-400 pb-4">{email}</p>
            </div>
        </div>
    );
};

export default TutorCard;