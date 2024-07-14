import { Button } from "@/components/ui/button";
import { Bell, Pyramid, Settings } from "lucide-react";
import Image from "next/image";
import Logo from "../../../../public/emma-warren-logo.png";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center px-16 py-6 border-b border-b-[#E4E4E7] bg-[##FAFAFA]">
      <div className="flex items-center gap-4">
        <Pyramid color="#71717A" className=" size-6" />
        <span className="text-[##27272A] text-2xl font-bold">Vidpod</span>
      </div>
      <div className="flex flex-row gap-8 items-center">
        <Settings color="#71717A" />
        <Bell color="#71717A" />
        <Button className="flex flex-row gap-2 items-center bg-white hover:bg-white text-[#27272A] border border-[#E4E4E7] py-6 px-4">
          <Image src={Logo} width={32} height={32} alt="user-logo" />
          Emma Warren
        </Button>
      </div>
    </div>
  );
};

export default Header;
