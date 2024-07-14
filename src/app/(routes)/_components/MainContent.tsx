import { DotIcon, MoveLeft } from "lucide-react";
import React from "react";
import AdMarkersList from "./AdMarkersList";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import MixerImage from "../../../../public/mixer-img.png";

const MainContent = () => {
  return (
    <div className="flex-[5] overflow-auto p-16 flex flex-col gap-8">
      <div className=" grid grid-cols-2">
        <div className="flex flex-col  gap-4">
          <div className=" flex flex-row items-center gap-1">
            <MoveLeft color="#71717A" size={15} />
            <span className="text-[#71717A] text-sm font-semibold">Ads</span>
          </div>
          <span className="text-3xl font-bold">
            The Longevity Expert: The Truth About Ozempic, The Magic Weight Loss
            Drug & The Link Between Milk & Cancer!
          </span>
          <div className="flex flex-row text-base text-[#71717A]">
            <span>Episode 503</span>
            <DotIcon />
            <span>12 April 2024</span>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex flex-row gap-8">
        <AdMarkersList />
        <div className="bg-white flex-[2] border border-[#E4E4E7] p-8 rounded-md flex flex-col gap-4">
          <VideoPlayer />
        </div>
      </div>
      <div className="border border-[#E4E4E7] p-8">
        <Image
          className="w-full rounded-md"
          width={1232}
          height={128}
          alt="mixer-image"
          src={MixerImage}
        />
      </div>
    </div>
  );
};

export default MainContent;
