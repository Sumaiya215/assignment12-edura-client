import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
// import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div className="w-[90%] mx-auto mt-10 mb-12">
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default MainLayout;