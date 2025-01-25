import { Helmet } from "react-helmet-async";
import Banner from "../../Home/Banner/Banner";

import Tutors from "../../Home/Tutors/Tutors";
import PopularSessions from "../../Home/PopularSessions/PopularSessions";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Edura</title>
            </Helmet>
           <Banner></Banner>
           <PopularSessions></PopularSessions>
           <Tutors></Tutors>
        </div>
    );
};

export default Home;