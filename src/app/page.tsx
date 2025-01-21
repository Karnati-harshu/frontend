'use client'

import { IoIosAddCircleOutline } from "react-icons/io";
import Header from "./components/Header";
import { Task } from './types/taskInterface';
import { CgNotes } from "react-icons/cg";
import TaskCard from "./components/TaskCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmDialog from './components/ConfirmDialog';


export default function Home() {
  const router = useRouter()

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks')
        setTasks(response.data)
        setLoading(false)
      } catch (error) {
        setError('Error fetching tasks. Please try again later.')
        setLoading(false)
      }
    };
    fetchTasks()
  }, []);

  const handleToggleTask = async (taskId: number) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updatedCompletionStatus = !taskToUpdate.completed;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: updatedCompletionStatus }
            : task
        )
      );
      try {
        await axios.patch(`http://localhost:5000/tasks/${taskId}`, {
          completed: updatedCompletionStatus,
        });        
      } catch (error) {
        console.error('Failed to update task completion:', error)
      }
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete !== null) {
      try {
        await axios.delete(`http://localhost:5000/tasks/${taskToDelete}`)
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToDelete))
      } catch (error) {
        console.error('Failed to delete task:', error)
      }
    }
    setShowDeleteModal(false)
    setTaskToDelete(null)
  };

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setTaskToDelete(null)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }


  return (
    <div>
      <Header />
  
      <div className="w-full flex justify-center items-center -mt-[26px] relative">
        <div
          className="flex justify-center items-center rounded-md w-full max-w-[736px] h-[52px] bg-[#1E6F9F] mb-10 cursor-pointer mx-4"
          onClick={() => router.push('/add-task')}
        >
          <button className="flex justify-center items-center gap-2 text-white text-[14px] font-bold">
            <span>Create Task</span>
            <IoIosAddCircleOutline size={16} className="text-white mt-[2px]" />
          </button>
        </div>
      </div>
  
      <div className="mt-8 flex flex-col items-center w-full px-4">
        <div className="flex justify-between w-full max-w-[736px] text-sm text-gray-600">
          <p className="text-[#4EA8DE] text-[14px] font-bold">
            Tasks{' '}
            <span className="rounded-xl py-[2px] px-[8px] bg-[#333333] text-white">
              {tasks.length}
            </span>
          </p>
          <p className="text-[#5E60CE] text-[14px] font-bold">
            Completed{' '}
            <span className="rounded-xl py-[2px] px-[8px] bg-[#333333] text-white">
              {tasks.filter((task) => task.completed).length}
            </span>
          </p>
        </div>
  
        <div className="flex flex-col justify-center items-center p-4 gap-[12px] sm:gap-[16px] w-full max-w-[736px] mt-6">
          {tasks.length === 0 ? (
            <div className="w-full border-t border-[#333333] flex flex-col justify-center items-center pt-16 gap-3">
              <span className="text-[#333333] text-[40px]">
                <CgNotes />
              </span>
              <p className="text-[#808080] text-[16px] font-bold text-center">
                You don&apos;t have any tasks registered yet.
              </p>
              <p className="text-[#808080] text-[16px] font-semibold text-center">
                Create tasks and organize your to-do items.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => handleToggleTask(task.id)}
                onEdit={() => router.push(`/edit-task/${task.id}`)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))
          )}
        </div>
      </div>
      <ConfirmDialog
        message="Are you sure you want to delete this task?"
        isVisible={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}  