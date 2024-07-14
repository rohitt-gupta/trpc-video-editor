"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { timeStringToSeconds } from "@/lib/utils";
import { CircleDashed, LocateFixed, TestTubes } from "lucide-react";
import React from "react";

type TFormData = {
  adMarkerType: "AUTO" | "ABTEST" | "STATIC";
  adMarkerTimeStamp: string;
  selectedAds: [];
  selectedAd: string;
};

const AdMarkerTypeDialog = ({
  setStep,
  formData,
  setFormData,
}: {
  setStep: any;
  setFormData: any;
  formData: TFormData;
}) => {
  const options = [
    {
      value: "AUTO",
      label: "Auto",
      description: "Automatic ad insertions",
      icon: CircleDashed,
      disabled: true,
    },
    {
      value: "STATIC",
      label: "Static",
      description: "A marker for a specific ad that you select",
      icon: LocateFixed,
      disabled: true,
    },
    {
      value: "ABTEST",
      label: "A/B test",
      description: "Compare the performance of multiple ads",
      icon: TestTubes,
    },
  ];

  const { toast } = useToast();

  const onSubmitHandler = () => {
    const videoLength = 596;
    const adMarkerStartTime = timeStringToSeconds(formData.adMarkerTimeStamp);
    if (adMarkerStartTime > videoLength) {
      toast({
        title: "Invalid timestamp",
        description:
          "The timestamp you entered is greater than the video length",
      });
      return;
    }
    setStep((prev : number) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <DialogHeader>
        <DialogTitle>Create a ad marker</DialogTitle>
        <DialogDescription className="font-semibold text-sm">
          Insert a new ad marker into this episode
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <Label htmlFor="ad-marker-title">Ad marker Timestamp</Label>
        <Input
          value={formData.adMarkerTimeStamp}
          onChange={(e) => {
            setFormData((prev: any) => ({
              ...prev,
              adMarkerTimeStamp: e.target.value,
            }));
          }}
          type="text"
          placeholder="00:05:30"
        />
      </div>
      <div>
        <RadioGroup
          defaultValue={formData.adMarkerType}
          value={formData.adMarkerType}
          onChange={(value) =>
            setFormData((prev: TFormData) => ({ ...prev, adMarkerType: value }))
          }
        >
          <div className="flex flex-col gap-4">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex gap-4 items-center justify-between border border-[#E4E4E7] py-3 px-4 shadow-sm rounded-md"
              >
                <div className="flex items-center gap-4">
                  <option.icon className="size-10" strokeWidth={0.8} />
                  <Label
                    className="flex flex-col gap-1"
                    htmlFor={`option-${option.value}`}
                  >
                    <span className="text-base font-bold text-[#27272A]">
                      {option.label}
                    </span>
                    <span className="text-[#71717A] text-sm font-semibold">
                      {option.description}
                    </span>
                  </Label>
                </div>
                <RadioGroupItem
                  value={option.value}
                  id={`option-${option.value}`}
                  disabled={option.disabled}
                />
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            onClick={() => {
              setFormData(() => ({
                // fill everything empty
                adMarkerType: "ABTEST",
                adMarkerTimeStamp: "",
                selectedAds: [],
                selectedAd: "",
              }));
            }}
            variant="outline"
            className="py-2 px-4"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={onSubmitHandler}
          type="submit"
          className="py-2 px-4 bg-[#18181B]"
        >
          Select marker
        </Button>
      </DialogFooter>
    </div>
  );
};

export default AdMarkerTypeDialog;
