"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DotIcon, Library } from "lucide-react";
import Image from "next/image";
import React from "react";
import AdImage from "../../../../public/adImage.png";
import { trpc } from "@/server/client";
import { secondsToTimeString, timeStringToSeconds } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useToast } from "@/components/ui/use-toast";

const AdItem = ({
  ad,
  setFormData,
}: {
  ad: {
    adTitle: string;
    adLength: number;
    adUrl: string;
    id: number;
    createdAt: string;
    updatedAt: string;
  };
  setFormData: any;
}) => {
  const handleCheckboxChange = (
    ad: {
      adTitle: string;
      adLength: number;
      adUrl: string;
      id: number;
      createdAt: string;
      updatedAt: string;
    },
    checked: CheckedState
  ) => {
    if (checked) {
      setFormData((prev: any) => ({
        ...prev,
        selectedAds: [...prev.selectedAds, ad],
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        selectedAds: prev.selectedAds.filter(
          (singleAd: any) => singleAd.id !== ad.id
        ),
      }));
    }
  };
  return (
    <div className="flex flex-row justify-between items-center border-[#E4E4E7] px-4 py-3 border rounded-md">
      <div className="flex flex-row gap-4">
        <Image alt="ad-image" src={AdImage} width={138} height={105} />
        <div className="flex flex-col">
          <span className="font-bold text-[#27272A] text-base whitespace-nowrap">
            {ad.adTitle}
          </span>
          <div className="flex flex-row items-center gap-1">
            <span className="font-semibold text-[#71717A] text-sm">
              {new Date(ad.createdAt).toLocaleDateString()}
            </span>
            <DotIcon />
            <span className="font-semibold text-[#71717A] text-sm">
              {secondsToTimeString(ad.adLength)}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Checkbox
          value={ad.id}
          onCheckedChange={(checked: CheckedState) =>
            handleCheckboxChange(ad, checked)
          }
        />
      </div>
    </div>
  );
};

const SelectAdsDialog = ({
  setStep,
  formData,
  setFormData,
}: {
  setStep: any;
  setFormData: any;
  formData: {
    adMarkerType: string;
    adMarkerTimeStamp: string;
    selectedAds: [];
    selectedAd: string;
  };
}) => {
  const { data, isLoading } = trpc.adRoutes.getAds.useQuery(undefined, {
    retry: false,
  });
  const { toast } = useToast();

  console.log(formData.selectedAds);

  const handleSelectedMarker = () => {
    const videoLength = 596;
    const adMarkerStartTime = timeStringToSeconds(formData.adMarkerTimeStamp);

    if (formData.selectedAds.length < 2) {
      toast({
        title: "Select at least 2 ads to continue",
        description:
          "You have selected " +
          formData.selectedAds.length +
          " ad" +
          (formData.selectedAds.length > 1 ? "s" : ""),
      });
      return;
    }

    let validAds = true;
    formData.selectedAds.forEach((ad: any) => {
      if (adMarkerStartTime + ad.adLength > videoLength) {
        toast({
          title: "Choose correct ad",
          description:
            "Please choose a ad, which fits in the video length at the choosen timestamp",
        });
        validAds = false;
        return;
      }
    });

    if (validAds) setStep((prev: number) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6 min-w-[985px]">
      <DialogHeader>
        <DialogTitle>A/B test</DialogTitle>
        <DialogDescription className="font-semibold text-sm">
          Select which ads you&apos;d like to A/B test
        </DialogDescription>
      </DialogHeader>

      <Separator />

      <div className="flex gap-6">
        <div className="flex flex-col flex-1 gap-6 bg-[#F4F4F5] p-4">
          <div>
            <Input placeholder="Search Library" />
          </div>
          <div className="flex items-center gap-3">
            <Library color="#52525B" />
            <span className="font-bold text-[#27272A] text-base whitespace-nowrap">
              Ad library
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-[3] gap-4">
          {isLoading && (
            <div className="flex flex-col gap-4 border-[#E4E4E7] p-8 border rounded-md">
              <span className="font-bold text-[#27272A] text-base">
                Loading ads...
              </span>
            </div>
          )}
          {!isLoading && data?.length === 0 && (
            <div className="flex flex-col gap-4 border-[#E4E4E7] p-8 border rounded-md">
              <span className="font-bold text-[#27272A] text-base">
                No ads found
              </span>
            </div>
          )}
          {data?.map((ad) => {
            return <AdItem ad={ad} key={ad.id} setFormData={setFormData} />;
          })}
          {formData.selectedAds.length < 2 &&
            !isLoading &&
            data &&
            data?.length >= 2 && (
              <div className="flex flex-row items-center gap-2 bg-[#FCA5A5] p-4 rounded-md">
                <span className="font-semibold text-[#7F1D1D] text-sm">
                  Please select at least 2 ads to continue, you have selected{" "}
                  {formData.selectedAds.length} ad
                  {formData.selectedAds.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
        </div>
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <DialogClose asChild>
          <Button
            onClick={() => {
              setStep((prev: number) => prev - 1);
              setFormData({
                // fill everything empty
                adMarkerType: "ABTEST",
                adMarkerTimeStamp: "",
                selectedAds: [],
                selectedAd: "",
              });
            }}
            variant="outline"
            className="px-4 py-2"
          >
            Cancel
          </Button>
        </DialogClose>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[#27272A] text-sm">
            {formData.selectedAds.length}{" "}
            {formData.selectedAds.length > 1 ? "ads" : "ad"} selected
          </span>
          <Button
            onClick={handleSelectedMarker}
            type="submit"
            className="bg-[#18181B] px-4 py-2"
          >
            Select marker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectAdsDialog;
