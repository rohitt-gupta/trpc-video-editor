import { Button } from "@/components/ui/button";
import { Bell, Pyramid, Settings } from "lucide-react";
import Image from "next/image";
import Logo from "../../../../public/emma-warren-logo.png";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-[##FAFAFA] px-16 py-6 border-b border-b-[#E4E4E7]">
      <div className="flex items-center gap-4">
        <Pyramid color="#71717A" className="size-6" />
        <span className="font-bold text-[##27272A] text-2xl">Vidpod</span>
      </div>
      <div className="flex flex-row items-center gap-8">
        <Settings color="#71717A" />
        <Bell color="#71717A" />
        <Button className="flex flex-row items-center gap-2 border-[#E4E4E7] bg-white hover:bg-white px-4 py-6 border text-[#27272A]">
          <Image src={Logo} width={32} height={32} alt="user-logo" />
          Rohit Gupta
        </Button>
      </div>
    </div>
  );
};

export default Header;
