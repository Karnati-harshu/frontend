'use client'

import { useState } from "react";
import { Task } from "../types/taskInterface";
import { ColorOption } from "../types/colorInterface";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AddTask() {
  const [task, setTask] = useState<Task>({
    id: Date.now(),
    title: "",
    color: "",
    completed: false,
  });

  const [madeChange, setMadeChange] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const router = useRouter()

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [id]: value,
    }))
    setMadeChange(true)
  }

  const handleColorSelect = (color: string) => {
    setTask((prev) => ({
      ...prev,
      color,
    }))
    setMadeChange(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!task.title.trim()) {
      alert("Title is required!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/tasks', task)
      console.log('Task added:', response.data)
      setMadeChange(false)
      setTask({ id: Date.now(), title: "", color: "", completed: false })
      router.push('/')
    } catch (error) {
      console.error('Error adding task:', error)
    }
  };

  const handleBack = () => {
    if (madeChange) {
      setShowDialog(true)
    } else {
      router.push("/")
    }
  };

  const handleConfirm = () => {
    setShowDialog(false)
    router.push("/")
  };

  const handleCancel = () => {
    setShowDialog(false)
  };

  return (
    <div>
      <Header />
      <div className="absolute top-[180px] sm:top-[150px] md:top-[200px] lg:top-[261px] w-full flex justify-center px-4">
        <div className="flex flex-col w-full max-w-[736px] gap-[16px] sm:gap-[24px] px-4 rounded-md">
          <form onSubmit={handleSubmit}>
            <TaskInput
              colorOptions={colorOptions}
              task={task}
              handleChange={handleChange}
              handleColorSelect={handleColorSelect}
              handleBack={handleBack}
            />
            <div className="flex justify-center items-center rounded-md w-full max-w-[736px] h-[52px] mt-[24px] sm:mt-[48px] px-4 bg-[#1E6F9F]">
              <button
                className="flex justify-center items-center w-full max-w-[736px] gap-2 text-white text-[14px] font-bold"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmDialog
        message="You have unsaved changes. Are you sure you want to leave without saving?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isVisible={showDialog}
      />
    </div>
  );
  
}


