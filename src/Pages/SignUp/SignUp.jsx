import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import useAxios from "../../Utils/Hooks/axios/useaxios";
import useAuth from "../../Utils/Hooks/useAuth/useAuth";
import { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";

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

//   Get the profession from the user 

  const [profession, setProfession] = useState("");
  const handleProfession = (e)=>{
    setProfession(e.target.value)
  }

  const onSubmit = (data) => {
    const toastid = toast.loading("Sign Up Processing");
    signUpUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);

        // update the user profile on firebase with relevant data

        updateUserProfile(data.name, data.photoUrl)
          .then((res) => {
            const userdata = {
              email: data.email,
              name: data.name,
              photo: data.photoUrl,
              type: profession,
              creationDate: new Date().toDateString(),
            };

            // if the profile get update successfully Send the data to the server

            axios.post("/createUser", userdata)
            .then((res) => {
              if (res.data.insertedId) {
                toast.success("Sign Up SuccessFully", { id: toastid });
                reset();
                navigate(location.state ? location.state : "/");
              }
            });
          })

        //   If any error happen show it to the user 

          .catch((error) => {
            toast.error(error)
          });
        console.log(data);
      })

    //   If Email is already registered Send A toast to the user

      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already Registered", { id: toastid });
        }
      });
  };


  return (
    <div className="bg-cover relative"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/7NJZ15z/13900642-5387142.jpg")',
      }}
    >
       <Link to={'/'}>
       <button className=" text-black font-semibold flex justify-center gap-2  absolute left-96 top-10"> <span className="text-2xl"><IoReturnUpBack/></span> Back To Home</button>
       </Link>
      <div className="flex h-screen gap-10 container mx-auto  justify-center items-center">
        <Helmet>
          <title>Echo Estate || Sign Up</title>
        </Helmet>
        <div className="lg:w-1/2 w-[90vw]">
          <div className="card  lg:w-3/4  mx-auto shadow-[0_0_20px_] backdrop-blur-sm p-10 my-10">
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
              onChange={handleProfession}
              className="select select-bordered mt-4 bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main join-item"
              required
            >
                 
              <option className=" " disabled selected>
                Select Your Profession
              </option>
              <option>Developer</option>
              <option>Student</option>
              <option>Engineer</option>
              <option>Banker</option>
              <option>Govt Job</option>
              <option>Doctor</option>
              <option>Other</option>
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
