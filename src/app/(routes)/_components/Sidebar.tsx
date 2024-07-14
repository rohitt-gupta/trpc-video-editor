import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  BarChart3,
  CircleDollarSign,
  CircleHelp,
  CirclePlay,
  House,
  Import,
  Lightbulb,
  LucideIcon,
  MailPlus,
  Settings,
  Tv,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const NavItemArray: { label: string; Icon: LucideIcon }[] = [
  { label: "Dashboard", Icon: House },
  {
    label: "Analytics",
    Icon: BarChart3,
  },
  {
    label: "Ads",
    Icon: CircleDollarSign,
  },
  {
    label: "Channels",
    Icon: Tv,
  },
  {
    label: "Import",
    Icon: Import,
  },
  {
    label: "Settings",
    Icon: Settings,
  },
];

const NavItem = ({ Icon, label }: { Icon: LucideIcon; label: string }) => {
  return (
    <Link href={"/"} className="flex flex-row gap-4 items-center cursor-pointer hover:text-black text-[#71717A]">
      <Icon/>
      <span className="font-bold text-2xl ">
        {label}
      </span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="flex-1 border-r border-r-[##E4E4E7] flex flex-col p-8 justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Button className="py-3 px-4 w-full font-medium text-sm font-[#FAFAFA] bg-[#18181B]">
            Create an episode
          </Button>
          <Button
            variant={"ghost"}
            className="border border-[#E4E4E7] bg-white w-full rounded-md font-bold text-base py-3 text-[#71717A]"
          >
            The Diary Of A CEO
          </Button>
        </div>

        {/* NAVLINKS */}
        <div className="flex flex-col gap-8 pl-8">
          {NavItemArray.map((item) => (
            <NavItem key={item.label} Icon={item.Icon} label={item.label} />
          ))}
        </div>
      </div>
      <div className="p-4 bg-white border border-[#E4E4E7] rounded-md">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[#27272A] font-semibold text-base">
              Weekly plays
            </span>
            <span className="text-2xl font-extrabold text-[#27272A]">
              738,849
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowUp color="#16A34A" />
            <span className="text-[#71717A] font-bold text-base">17%</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pl-8">
        <div className="flex flex-row items-center gap-3">
          <CirclePlay color="#71717A" />
          <span className="font-bold text-base text-[#71717A]">Demo mode</span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <MailPlus color="#71717A" />
          <span className="font-bold text-base text-[#71717A]">
            Invite your team
          </span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Lightbulb color="#71717A" />
          <span className="font-bold text-base text-[#71717A]">
            Give feedback
          </span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <CircleHelp color="#71717A" />
          <span className="font-bold text-base text-[#71717A]">
            Help & support
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
