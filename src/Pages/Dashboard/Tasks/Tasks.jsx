import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import useUserinfo from "../../../Utils/Hooks/useUserinfo/useUserinfo";
import useAxios from "../../../Utils/Hooks/axios/useaxios";
import { useQuery } from "@tanstack/react-query";
import TodoTask from "./TodoTask/TodoTask";

const Tasks = () => {
  const { userinfo } = useUserinfo();
  const axios = useAxios();
  // Filter the tasks based on the Status;
  const [toDo, setTodo] = useState("");
  const [onGoing, setOngoing] = useState("");
  const [complete, setComplete] = useState("");

  // Get The Tasks From Database Based On the Logged in User

  const { data: tasks = [],isLoading,refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(`/getTasksByUser?email=${userinfo.email}`);
      return res.data;
    },
  });

  useEffect(() => {
   if(userinfo){
    const todoTasks = tasks?.filter((item) => item.taskStatus === "to-do");
    const onGoingTasks = tasks?.filter((item) => item.taskStatus === "onGoing");
    const completeTasks = tasks?.filter((item) => item.taskStatus === "complete");
    
    setTodo(todoTasks);
    setOngoing(onGoingTasks);
    setComplete(completeTasks);
   }
  }, [tasks,userinfo]);
  console.log(toDo, onGoing, complete);
  
  // Get the priority from the select option
  const [priority, setPriority] = useState("");
  const handlePriority = (e) => {
    const priority = e.target.value;
    setPriority(priority);
  };
  // Close the modal with cancel button
  const handleCancel = (e) => {
    e.preventDefault();
    document.getElementById("my_modal_1").close();
    toast.error("Task Canceled");
  };
  // HandleFrom Submit
  const handleSubmit = (e) => {
    const form = e.target;
    // Show a Task Submitting toast
    const taskToast = toast.loading("Creating Task");
    e.preventDefault();
    // Make the task info object
    const taskInfo = {
      tasktitle: form.title.value,
      taskdeadline: form.deadline.value,
      taskStatus: "to-do",
      taskPriority: priority,
      description: form.description.value,
      userEmail: userinfo.email,
      userName: userinfo.name,
    };
    // Send The task info to the Server
    axios.post("/createTasks", taskInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success("Task Created SuccessFully", { id: taskToast });
        refetch()
      }
    });
    document.getElementById("my_modal_1").close();
  };

  return (
    <div>
      <div className="flex justify-between min-w-full items-center">
        <h1 className="text-3xl font-semibold">Your Tasks</h1>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="flex font-semibold items-center bg-red-500 text-white px-4 py-2 rounded-sm"
        >
          {" "}
          <GoPlus className="mr-2 text-xl"></GoPlus> New Tasks
        </button>
        {/* Create New Task With Relevent Info From User */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form className="p-4" onSubmit={handleSubmit}>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Task Title?</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="title"
                  required
                  placeholder="Task Title"
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Task Deadline?</span>
                </div>
                <input
                  name="deadline"
                  type="date"
                  required
                  className="input input-bordered w-full "
                />
              </label>
              <select
                onChange={handlePriority}
                className="select select-bordered mt-4 w-full  join-item"
                required
              >
                <option disabled selected>
                  Select Task Priority
                </option>
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Task Description?</span>
                </div>
                <textarea
                  placeholder="Task Description"
                  className="textarea textarea-bordered"
                  name="description"
                  cols="10"
                  rows="4"
                  required
                ></textarea>
              </label>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="btn bg-red-500 text-white rounded-sm hover:bg-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex font-semibold items-center bg-red-500 text-white px-4 py-2 rounded-sm"
                  >
                    {" "}
                    <GoPlus className="mr-2 text-xl"></GoPlus> New Tasks
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
        {/* Modal End */}
        
      </div>
      {isLoading ?<p className="text-5xl">loading</p>:<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-10 h-[500vh]" >
      <div>
      {
          tasks?.map(item=><TodoTask key={item._id} task={item}></TodoTask>)
      }
      </div>
      </div>
      }
    </div>
  );
};

export default Tasks;
