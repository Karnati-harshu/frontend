'use client';

import { Task } from "../../types/taskInterface"; 
import Header from "@/app/components/Header";
import TaskInput from "../../components/TaskInput";
import { useState } from "react";

export default function EditTask() {
  
  const [task, setTask] = useState<Task | null>(null);
  const [madeChange, setMadeChange] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  const colorOptions = [
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
        <form className="flex flex-col w-[736px] gap-[24px] rounded-md">
          <TaskInput
            colorOptions={colorOptions}
            task={task}
          />
          <div className="flex justify-center items-center rounded-md w-[736px] h-[52px] mt-[48px] bg-[#1E6F9F]">
            <button
              type="submit"
              className="flex justify-center items-center gap-2 text-white text-[14px] font-bold"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


