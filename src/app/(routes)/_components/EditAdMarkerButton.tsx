"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { timeStringToSeconds } from "@/lib/utils";
import { FC, useState } from "react";

interface EditMarkerButtonProps {
  id: number;
  timestamp: string;
  type: "ABTEST" | "AUTO" | "STATIC";
  onEditFn: (index: number, id: number, timestampInput: string) => void;
  index: number;
}

const EditAdMarkerButton: FC<EditMarkerButtonProps> = ({
  id,
  timestamp,
  type,
  onEditFn,
  index,
}) => {
  const [timestampInput, setTimestampInput] = useState<string>(timestamp);
  const { toast } = useToast();
  const onTimeStampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    const numericValue = value.replace(/\D/g, "");
    console.log(numericValue);

    // user should not be able to enter more than 6 digits
    if (numericValue.length > 6) {
      return;
    }

    // i am working on input to make it work like time input so after every each 2 digits of input add a colon
    // so it looks like a time input
    const formattedValue = numericValue
      .split("")
      .map((char, index) => {
        if (index % 2 === 0 && index !== 0) {
          return ":" + char;
        }
        return char;
      })
      .join("");
    console;
    // for valid timestamp

    setTimestampInput(formattedValue);
  };

  const onSubmit = () => {
    if (timestamp.length < 8) {
      toast({
        title: "Invalid timestamp",
        description: "The timestamp you entered is invalid",
      });
      return;
    }

    const videoLength = 596;
    const adMarkerStartTime = timeStringToSeconds(timestamp);
    if (adMarkerStartTime > videoLength) {
      toast({
        title: "Invalid timestamp",
        description:
          "The timestamp you entered is greater than the video length",
      });
      return;
    }

    onEditFn(index, id, timestampInput);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge
          variant={"outline"}
          className="cursor-pointer rounded-md py-2 px-3 border border-[#E4E4E7] text-[#18181B] text-sm font-semibold hover:bg-[#f0f0f0FF]"
        >
          Edit
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit ad marker</DialogTitle>
          <DialogDescription className="font-semibold text-sm">
            Edit the ad marker
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col gap-4">
          {/* show the type into the the input with disabled */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="type" className="text-sm font-semibold">
              Timestamp
            </Label>
            <Input
              id="type"
              value={timestampInput}
              onChange={onTimeStampChange}
              placeholder="hh:mm:ss"
              className="text-black "
            />
          </div>
          <div className=" flex flex-col gap-2">
            <Label htmlFor="type" className="text-sm font-semibold">
              AdMarker Type
            </Label>
            <Input
              id="type"
              value={type}
              disabled
              className="text-black border border-gray-900 bg-gray-300"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button onClick={onSubmit}>Done</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdMarkerButton;
