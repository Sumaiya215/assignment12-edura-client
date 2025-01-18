import { Helmet } from "react-helmet-async";
import Banner from "../../Home/Banner/Banner";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Edura</title>
            </Helmet>
           <Banner></Banner>
        </div>
    );
};

export default Home;