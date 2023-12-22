import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };
  return (
    <>
      <div className="bg-[#FFF6EB]">
        <div className="flex container mx-auto md:flex-row flex-col">
          <div className="flex-1 items-center flex justify-center text-center md:text-start">
            <h1 className="text-4xl font-semibold !tracking-wider !leading-[50px]"> <span className="text-main">Task Vault</span> :  Your Ultimate Task Management Solution! <br /> For :  <span>
            <Typewriter
              words={["Revolutionize Your Productivity", "Organize Your Journey", " Achieve Goals with Precision", " Your Key to Meeting Deadlines"," Maximize Efficiency for Work-Life"]}
              loop={5}
              cursor
              cursorStyle="."
              typeSpeed={90}
              deleteSpeed={90}
              delaySpeed={1000}
              onLoopDone={handleDone}
            />
            </span> <br />
            <Link to={'/dashboard/tasks'}>
            <button  className="border-b-4  bg-black text-white border-b-main rounded-sm px-4 py-2 text-center text-xl mt-4">Let's Explore</button>
            </Link>
            </h1>
          </div>
          <div className="flex-1">
            <img src="https://i.ibb.co/T4wPNMx/Untitled-design.webp" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
