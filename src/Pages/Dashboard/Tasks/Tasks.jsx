import { GoPlus } from "react-icons/go";

const Tasks = () => {
    return (
        <>
        <div className='flex justify-between min-w-full items-center'> 
            <h1 className="text-3xl font-semibold">Your Tasks</h1>
            <button className="flex font-semibold items-center bg-red-500 text-white px-4 py-2 rounded-sm"> <GoPlus className="mr-2 text-xl"></GoPlus> New Tasks</button>
        </div>
        </>
    );
};

export default Tasks;