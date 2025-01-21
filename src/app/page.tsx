import { IoIosAddCircleOutline } from "react-icons/io";
import Header from "./components/Header";
import { Task } from './types/taskInterface';
import { CgNotes } from "react-icons/cg";
import TaskCard from "./components/TaskCard";

const tasks: Task[] = [
  
];

export default function Home() {
  return (
    <div>
      <Header/>

      <div className="w-full flex justify-center items-center -mt-[26px] relative">
        <div className="flex justify-center items-center rounded-md w-[736px] h-[52px] bg-[#1E6F9F] mb-10">
          <button
            className="flex justify-center items-center gap-2 text-white text-[14px] font-bold"
          >
            <span>Create Task</span>
            <IoIosAddCircleOutline size={16} className="text-white mt-[2px]" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center w-full">
        <div className="flex justify-between w-[736px] text-sm text-gray-600">
          <p className="text-[#4EA8DE] text-[14px] font-bold">
            Tasks{' '}
            <span className="rounded-xl py-[2px] px-[8px] bg-[#333333] text-white">
              0
            </span>
          </p>
          <p className="text-[#5E60CE] text-[14px] font-bold">
            Completed{' '}
            <span className="rounded-xl py-[2px] px-[8px] bg-[#333333] text-white">
              0
            </span>
          </p>
        </div>

        <div className="flex flex-col justify-center items-center p-4 gap-[16px] w-[736px] mt-6">
          {tasks.length === 0 ? (
            <div className="w-[732px] border-t border-[#333333] flex flex-col justify-center items-center pt-16 gap-3">
              <span className="text-[#333333] text-[40px]">
                <CgNotes />
              </span>
              <p className="text-[#808080] text-[16px] font-bold">
                You don&apos;t have any tasks registered yet.
              </p>
              <p className="text-[#808080] text-[16px] font-semibold">
                Create tasks and organize your to-do items.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
