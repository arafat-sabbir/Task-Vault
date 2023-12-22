import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import useUserinfo from "../../../Utils/Hooks/useUserinfo/useUserinfo";
import useAxios from "../../../Utils/Hooks/axios/useaxios";
import { useQuery } from "@tanstack/react-query";
import TodoTask from "./TodoTask/TodoTask";
import useAuth from "../../../Utils/Hooks/useAuth/useAuth";
import OngoingTask from "./Ongoingtask/Ongoingtask";
import CompleteTask from "./CompleteTask/CompleteTask";
import Swal from "sweetalert2";
import { VscEdit } from "react-icons/vsc";

const Tasks = () => {
  const { userinfo } = useUserinfo();
  const { user } = useAuth();
  const axios = useAxios();
  // Filter the tasks based on the Status;
  const [toDo, setTodo] = useState("");
  const [onGoing, setOngoing] = useState("");
  const [complete, setComplete] = useState("");

  // Get The Tasks From Database Based On the Logged in User

  const {
    data: tasks,
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(`/getTasksByUser?email=${user?.email}`);
      return res.data;
    },
  });

  // Filtered The task based on the status
  useEffect(() => {
    const todoTasks = tasks?.filter((item) => item.taskStatus === "to-do");
    const onGoingTasks = tasks?.filter((item) => item.taskStatus === "ongoing");
    const completeTasks = tasks?.filter(
      (item) => item.taskStatus === "completed"
    );
    setTodo(todoTasks);
    setOngoing(onGoingTasks);
    setComplete(completeTasks);
  }, [tasks]);

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
    document.getElementById("my_modal_2").close();
    setPriority('')
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
        refetch();
      }
    });
    document.getElementById("my_modal_1").close();
    form.reset();
    setPriority('')
  };
  // handle Delete Task by user confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0e3c49da",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const tid = toast.loading(`Deleting Tasks`);
        axios.delete(`/deleteTask/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            toast.success("Task Deleted", { id: tid });
            refetch();
          }
        });
      }
    });
  };
  // Open the modal for updating the tasks
  const [editId,setEditId] = useState('')
  const handleEdit = (id) => {
    document.getElementById("my_modal_2").showModal();
    setEditId(id)
    console.log(id);
  };
  // get new value from the updated modal
  const handleEditSubmit = (e) => {
    const form = e.target;
    // Show a Task Submitting toast
    const editToast = toast.loading("Creating Task");
    e.preventDefault();
    // Make the task info object
    const taskUpdateInfo = {
      tasktitle: form.title.value,
      taskdeadline: form.deadline.value,
      taskPriority: priority,
      description: form.description.value,
    };
    
    // Send The task info to the Server
    axios.patch(`/updateTasks/${editId}`, taskUpdateInfo).then((res) => {
      if (res.data.modifiedCount >0) {
        toast.success("Task update SuccessFully", { id: editToast });
        refetch();
      }
    });
    console.log(taskUpdateInfo);
    document.getElementById("my_modal_2").close();
    form.reset();
    setPriority('')
  };

  if (isLoading || isPending) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  if(!toDo||!onGoing||!complete){
    return <span className="loading loading-dots loading-lg"></span>
  }
  return (
    <div>
      <div className="flex lg:justify-between justify-end min-w-full items-center">
        <h1 className="text-3xl font-semibold lg:block hidden">Your Tasks</h1>
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
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form className="p-4" onSubmit={handleEditSubmit}>
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
                    <VscEdit className="text-xl mr-2"></VscEdit> Edit Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
        {/* Modal End */}
      </div>

      {tasks && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  py-10 gap-10">
          <div className="bg-[#EEF2FC]">
            <h3 className="text-3xl font-semibold ml-6 mt-6  ">
              To Do : {toDo?.length}{" "}
            </h3>
            {toDo?.map((item) => (
              <TodoTask
                key={item._id}
                task={item}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              ></TodoTask>
            ))}
          </div>
          <div className="bg-[#FFF6EB]">
            <h3 className="text-3xl font-semibold ml-6 mt-6">
              On Going : {onGoing?.length}{" "}
            </h3>
            {onGoing?.map((item) => (
              <OngoingTask
                key={item._id}
                task={item}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              ></OngoingTask>
            ))}
          </div>
          <div className="bg-[#FDF0EC]">
            <h3 className="text-3xl font-semibold ml-6 mt-6">
              Completed : {complete?.length}
            </h3>
            {complete?.map((item) => (
              <CompleteTask
                key={item._id}
                task={item}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              ></CompleteTask>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
