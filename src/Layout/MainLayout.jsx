import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../Utils/Hooks/useAuth/useAuth";

const MainLayout = () => {
  const { user,signOutUser } = useAuth();
  const signOut = ()=>{
    signOutUser()
    .then()
    .catch()
  }
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/tasks"}>Dashboard</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  bg-base-300">
          {/* Navbar */}
          <div className="container mx-auto navbar">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <img
              src="https://i.ibb.co/Syy2tpj/logo.png"
              className="w-[40px] h-[40px]"
              alt=""
            />
            <div className="flex-1 px-2 mx-2 lg:mx-0 font-bold text-2xl">
              Task Vault
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal font-semibold">
                {/* Navbar menu content here */}
                {links}
                {user ? (
                  <li>
                    <button onClick={signOut} className="border-b-4 pb-2 bg-black text-white border-b-main rounded-none hover:rounded-none">Sign out</button>
                  </li>
                ) : (
                  <li>
                    <Link to={"/signIn"}> <button className="border-b-4 border-main hover:rounded-none">Sign In</button> </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
