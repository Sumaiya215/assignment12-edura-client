import { motion } from "framer-motion"
import student1 from '../../../assets/banner/student.webp'
import student2 from '../../../assets/banner/student2.webp'
const Banner = () => {
    return (
        <div className="hero  min-h-[540px] w-[90%] mx-auto">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="flex-1 flex gap-6">
                    <motion.img
                        animate={{y:[0,20,0]}}
                        transition={{duration:5, repeat:Infinity}}
                        src={student1}
                        className="max-w-xl  rounded-lg shadow-2xl w-[200px]" />
                    <motion.img
                        animate={{y:[80,40,80]}}
                        transition={{duration:5,delay:1, repeat:Infinity}}
                        src={student2}
                        className="max-w-xl rounded-lg shadow-2xl w-[200px]" />
                </div>

                <div className="flex-1">
                    <motion.h1
                        animate={{ x: 50 }} transition={{ duration: 3, delay: 1, ease: 'easeOut', repeat: Infinity }}
                        className="text-4xl font-bold">
                        Unlock Your Learning <motion.span animate={{color:['royalblue']}}>Opportunities</motion.span></motion.h1>
                    <motion.p
                        animate={{ x: 50, color:['gray'] }} transition={{ duration: 3, delay: 1, ease: 'easeOut', repeat: Infinity }}
                        className="py-6 w-3/4">
                        Education can be thought of as the transmission of the values  and
                        accumulated knowledge of a society. In this sense, it is equivalent.
                    </motion.p>
                    <motion.button
                        animate={{ x: 50 }} transition={{ duration: 3, delay: 1, ease: 'easeOut', repeat: Infinity }}
                        className="btn btn-primary text-base font-semibold">Get Started</motion.button>
                </div>
            </div>
        </div>
    );
};

export default Banner;