import { RxRocket } from "react-icons/rx";

const Header = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-[150px] md:h-[200px] bg-[#0D0D0D]">
      <h1 className="flex justify-center text-center text-[24px] sm:text-[30px] md:text-[40px] font-extrabold gap-2">
        <span className="text-[#4EA8DE] mt-2 sm:mt-3">
          <RxRocket size={24} className="sm:text-[30px] md:text-[40px]" />
        </span>
        <span className="text-[#4EA8DE] ml-2 sm:ml-3">ToDo</span>
        <span className="text-[#5E60CE]">App</span>
      </h1>
    </div>
  );
};

export default Header;
