import { RxRocket } from "react-icons/rx";

const Header = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-[200px] bg-[#0D0D0D]">
      <h1 className="text-center text-[40px] flex font-extrabold gap-2">
        <span className="text-[#4EA8DE] mt-3"><RxRocket /></span>
        <span className="text-[#4EA8DE] ml-3">ToDo</span>
        <span className="text-[#5E60CE]">App</span>
      </h1>
    </div>
  );
};

export default Header;