import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import useAxios from "../../Utils/Hooks/axios/useaxios";
import useAuth from "../../Utils/Hooks/useAuth/useAuth";
import GoogleSignIn from "../../Auth/GoogleSignIn/GoogleSignIn";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { signUpUser, updateUserProfile } = useAuth();
  const onSubmit = (data) => {
    const toastid = toast.loading("Sign Up Processing");
    signUpUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        updateUserProfile(data.name, data.photoUrl)
          .then((res) => {
            const userdata = {
              email: data.email,
              name: data.name,
              photo: data.photoUrl,
              role: "user",
              creationDate: new Date().toDateString(),
            };
            axios.post("/users", userdata).then((res) => {
              if (res.data.insertedId) {
                toast.success("Sign Up SuccessFully", { id: toastid });
                reset();
                navigate(location.state ? location.state : "/");
              }
            });
          })
          .catch((error) => console.log(error));
        console.log(data);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already Registered", { id: toastid });
        }
      });
  };
  const [profession, setProfession] = useState("");
  const handlePriceRange = (e)=>{
    setProfession(e.target.value)
  }

  return (
    <div className="bg-cover"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/7NJZ15z/13900642-5387142.jpg")',
      }}
    >
      <div className="flex h-screen gap-10 container mx-auto  justify-center items-center">
        <Helmet>
          <title>Echo Estate || Sign Up</title>
        </Helmet>
        <div className="lg:w-1/2 w-[90vw]">
          <div className="card  lg:w-3/4  mx-auto shadow-[0_0_30px_] pb-10 my-10 backdrop-blur-sm ">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  name="name"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  required
                  {...register("name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 mt-4">Please Type An Email</p>
                )}
              </div>
              {/* for selecting profession */}
              <select
              onChange={handlePriceRange}
              className="select select-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main text-black font-semibold join-item"
            >
                 
              <option className="font-normal " disabled selected>
                Select Your Profession
              </option>
              <option>Developer</option>
              <option>Student</option>
              <option>Engineer</option>
              <option>Banker</option>
              <option>Govt Job</option>
              <option>Doctor</option>
            </select>
              {/* end here */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                  })}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <div>
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500" role="alert">
                      Password Should Atleast 6 Character
                    </p>
                  )}
                  {errors.password?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      Password Is required
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500" role="alert">
                      Password Should Contain atleast one Uppercase And One
                      Special Character
                    </p>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gray-100 hover:bg-gray-100 border-dashed border-main hover:border-main"
                  type="submit"
                  value="Sign UP"
                />
              </div>
              <p className="font-medium my-4 text-center">
                Already Have an Account.?
                <Link className=" font-bold text-main ml-1" to={"/signIn"}>
                  SignIn
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
