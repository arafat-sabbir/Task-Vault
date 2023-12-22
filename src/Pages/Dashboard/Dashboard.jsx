import { Link, NavLink, Outlet } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import useUserinfo from "../../Utils/Hooks/useUserinfo/useUserinfo";
import { IoReturnUpBack } from "react-icons/io5";

const Dashboard = () => {
  const { userinfo } = useUserinfo();
  console.log(userinfo.photo);
  return (
    <div className="flex">
      <div className="w-[280px]  h-screen px-10 pt-12 flex flex-col  items-center fixed">
        <div className="absolute bottom-4 flex flex-col justify-center items-center">
          <img
            src={userinfo.photo}
            className="h-20 w-20 border-2 border-main  rounded-full mx-auto "
            alt=""
          />
          <h1 className="font-semibold text-xl mt-2">{userinfo.name}</h1>
          <Link to={'/'}>
          <button className=" text-black font-semibold flex justify-center gap-2 bg-[#FDF0EC] p-2 rounded-sm mt-2 left-96 top-10">
          {" "}
          <span className="text-2xl">
            <IoReturnUpBack />
          </span>{" "}
          Back To Home
        </button>
          </Link>
        </div>

        <Link to={"/"} className="flex justify-center items-center min-w-full">
          <img
            src="https://i.ibb.co/Syy2tpj/logo.png"
            className="w-[40px] h-[40px]"
            alt=""
          />
          <div className="px-2  mx-2 lg:mx-0 font-bold text-2xl">
            Task Vault
          </div>
        </Link>
        <NavLink to={"/dashboard/tasks"}>
          <button className="text-center bg-[#FBF1E6] px-12 py-1 flex items-center mt-10 justify-between min-w-full">
            <FaListCheck className="mr-4"></FaListCheck> Tasks
          </button>
        </NavLink>
      </div>
      <div className=" ml-[280px] px-16 pt-24 w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
