import { Pyramid } from "lucide-react";

const Footer = () => {
  return (
    <div className=" border-t border-t-[#E4E4E7] px-16 py-9 flex flex-row justify-between items-center">
      <span className="text-base text-[#71717A]">Video first podcasts</span>
      <div className="flex items-center gap-4">
      <Pyramid color="#71717A" className=" size-6"/>
      <span className="text-[##27272A] text-2xl font-bold">Vidpod</span>
      </div>
    </div>
  );
};

export default Footer;
