'use client'

import { useState } from "react";
import { Task } from "../types/taskInterface";
import { ColorOption } from "../types/colorInterface";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";

export default function AddTask() {
  const [task, setTask] = useState<Task>({
    id: Date.now(),
    title: "",
    color: "",
    completed: false,
  });

  const [madeChange, setMadeChange] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const colorOptions: ColorOption[] = [
    { id: "1", color: "#FF3B30" },
    { id: "2", color: "#FF9500" },
    { id: "3", color: "#FFCC00" },
    { id: "4", color: "#34C759" },
    { id: "5", color: "#007AFF" },
    { id: "6", color: "#5856D6" },
    { id: "7", color: "#AF52DE" },
    { id: "8", color: "#FF2D55" },
    { id: "9", color: "#A2845E" },
  ];

  return (
    <div>
      <Header />
      <div className="absolute top-[261px] w-full flex justify-center">
        <div className="flex flex-col w-[736px] gap-[24px] rounded-md">
          <form>
            <TaskInput
              colorOptions={colorOptions}
              task={task}
            />
            <div className="flex justify-center items-center rounded-md w-[736px] h-[52px] mt-[48px] bg-[#1E6F9F]">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 text-white text-[14px] font-bold"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


