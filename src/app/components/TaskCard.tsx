import { RiDeleteBin5Line } from 'react-icons/ri';
import {Task} from '@/app/types/taskInterface'

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-[732px] h-[72px] border border-[#333333] p-[12px] rounded-md bg-[#262626]">
      <div className="flex justify-between items-start w-full m-0">
        <div className="flex gap-3">
          <input
            type="checkbox"
            id={`checkbox-${task.id}`}
            checked={task.completed || false}
            className="peer w-[16px] h-[16px] mt-[5px] rounded-full border border-[#4EA8DE] appearance-none focus:outline-none cursor-pointer checked:bg-[#5E60CE] checked:border-[#5E60CE]"
          />
          <span
            className={`peer-checked:line-through text-white text-[16px] font-semibold break-words peer-checked:text-[#808080] cursor-pointer ${task.completed ? 'line-through' : ''}`}
          >
            {task.title}
          </span>
        </div>

        <span
          className="text-[#808080] ml-[170px] mr-0 cursor-pointer"
        >
          <RiDeleteBin5Line size={20} />
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
