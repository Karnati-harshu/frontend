'use client';

import { Task } from "../../types/taskInterface"; 
import Header from "@/app/components/Header";
import TaskInput from "../../components/TaskInput";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import ConfirmDialog from "@/app/components/ConfirmDialog";

export default function EditTask() {
  const { id: taskId } = useParams()
  const router = useRouter()

  const [task, setTask] = useState<Task | null>(null)
  const [madeChange, setMadeChange] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  
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

  useEffect(() => {
    if (!taskId) return
    axios.get(`http://localhost:5000/tasks/${taskId}`)
      .then(response => {
        setTask(response.data)
      })
      .catch(error => console.error("Error fetching task:", error))
  }, [taskId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setTask(prev => (prev ? { ...prev, [id]: value } : null))
    setMadeChange(true)
  };

  const handleColorSelect = (color: string) => {
    setTask(prev => (prev ? { ...prev, color } : null))
    setMadeChange(true)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task) {
      axios.put(`http://localhost:5000/tasks/${task.id}`, task)
        .then(response => {
          console.log("Task updated:", response.data)
          setMadeChange(false);
          router.push("/");
        })
        .catch(error => {
          console.error("Error saving task:", error)
        });
    }
  };

  const handleBack = () => {
    console.log(madeChange)
    if(madeChange) {
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

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="absolute top-[261px] w-full flex justify-center">
        <form className="flex flex-col w-[736px] gap-[24px] rounded-md" onSubmit={handleSubmit}>
          <TaskInput
            colorOptions={colorOptions}
            task={task}
            handleChange={handleChange}
            handleColorSelect={handleColorSelect}
            handleBack={handleBack}
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
      <ConfirmDialog
        message="You have unsaved changes. Are you sure you want to leave without saving?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isVisible={showDialog}
      />
    </div>
  );
}


