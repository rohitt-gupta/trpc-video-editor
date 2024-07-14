"use client";

import {
  ArrowLeftToLine,
  ArrowRightToLine,
  FastForward,
  Pause,
  Play,
  Rewind,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import React, { useRef, useState } from "react";


const VideoPlayer = () => {
    const [playing, setPlaying] = useState(false);
    const ref = useRef<HTMLVideoElement>(null);
  
    return (
      <>
        <video ref={ref} height={400} className=" rounded-md">
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>
        <div className="border border-[#E4E4E7] rounded-md p-4 flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <ArrowLeftToLine
              className="cursor-pointer"
              fill="#27272A"
              onClick={() => {
                if (ref.current) {
                  ref.current.currentTime = 0;
                  ref.current.play();
                }
              }}
            />
          </div>
  
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <RotateCcw
                className="cursor-pointer"
                onClick={() => {
                  if (ref.current) {
                    ref.current.currentTime -= 10;
                    ref.current.play();
                  }
                }}
              />
              <span className="text-[#71717A] font-semibold text-sm">10s</span>
            </div>
  
            <Rewind
              className="cursor-pointer"
              fill="#27272A"
              onClick={() => {
                if (ref.current) {
                  ref.current.playbackRate -= 0.25;
                  ref.current.play();
                }
              }}
            />
            {playing ? (
              <Pause
                className="cursor-pointer"
                size={40}
                color="#27272A"
                onClick={() => {
                  setPlaying(!playing);
                  ref.current?.pause();
                }}
              />
            ) : (
              <Play
                className="cursor-pointer"
                size={40}
                fill="#27272A"
                color="#27272A"
                onClick={() => {
                  setPlaying(!playing);
                  ref.current?.play();
                }}
              />
            )}
  
            <FastForward
              className="cursor-pointer"
              fill="#27272A"
              onClick={() => {
                if (ref.current) {
                  ref.current.playbackRate += 0.25;
                  ref.current.play();
                }
              }}
            />
            <div className="flex items-center gap-2">
              <span className="text-[#71717A] font-semibold text-sm">10s</span>
              <RotateCw
                className="cursor-pointer"
                onClick={() => {
                  if (ref.current) {
                    ref.current.currentTime += 10;
                    ref.current.play();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRightToLine
              className="cursor-pointer"
              fill="#27272A"
              onClick={() => {
                if (ref.current) {
                  ref.current.currentTime = ref.current.duration - 2;
                  ref.current.play();
                }
              }}
            />
          </div>
        </div>
      </>
    );
  }

export default VideoPlayer;