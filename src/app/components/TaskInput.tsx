import { FaArrowLeft } from "react-icons/fa6";
import { ColorOption } from "../types/colorInterface";
import { Task } from '../types/taskInterface';

interface TaskInputProps {
  colorOptions: ColorOption[];
  task: Task; 
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleColorSelect: (color: string) => void;
  handleBack: () => void;
}

const TaskInput = ({
  colorOptions,
  task,
  handleChange,
  handleColorSelect,
  handleBack,
}: TaskInputProps) => {
  return (
    <div>
      <div className="h-[19px] flex text-sm text-gray-600 mb-8" >
        <button onClick={handleBack} className="text-white">
          <FaArrowLeft size={14} />
        </button>
      </div>
      <div className="w-full flex flex-col justify-start items-center">
        <div className="flex flex-col justify-start items-start p-[64px 24px] gap-[16px]">
          <label htmlFor="title" className="text-[#4EA8DE] font-bold text-[14px] text-left pl-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={task?.title || ""}
            placeholder="Ex. Brush your Teeth"
            className="bg-[#262626] w-[736px] h-[52px] px-5 rounded-md text-white"
            onChange={handleChange}
            required
          />
          <label htmlFor="color" className="text-[#4EA8DE] font-bold text-[14px] text-left pl-1">
            Color
          </label>
          <div className="flex flex-row justify-start items-center gap-[16px]">
            {colorOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                style={{
                  backgroundColor: option.color,
                  border: task?.color === option.color ? '2px solid white' : 'none',
                }}
                className="w-[52px] h-[52px] rounded-full cursor-pointer select-none" 
                onClick={() => handleColorSelect(option.color)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;