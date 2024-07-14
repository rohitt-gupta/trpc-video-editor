import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, secondsToTimeString } from "@/lib/utils";
import { DotIcon } from "lucide-react";
import Image from "next/image";
import AdImage from "../../../../public/adImage.png";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { trpc } from "@/server/client";

const ResultDialog = ({
  formData,
  setFormData,
}: {
  formData: {
    adMarkerType: "AUTO" | "ABTEST" | "STATIC";
    adMarkerTimeStamp: string;
    selectedAds: [];
    selectedAd: string;
  };
  setFormData: any;
}) => {
  const [resultedAds, setResultedAds] = useState<any>([
    ...formData.selectedAds,
  ]);

  const { mutate: addAdMarker } = trpc.adMarkerRoutes.addAdMarker.useMutation({
    onSettled: () => {
      setFormData(() => ({
        adMarkerType: "ABTEST",
        selectedAds: [],
        adMarkerTimeStamp: "",
        selectedAd: JSON.stringify(resultedAds[0].id),
      }));
    },
  });

  useEffect(() => {
    // sort the ads based on the ad length
    setResultedAds(
      resultedAds.sort((a: any, b: any) => a.adLength - b.adLength)
    );
  }, []);

  const onSubmitHandler = () => {
    addAdMarker({
      adId: resultedAds[0].id,
      timestamp: formData.adMarkerTimeStamp,
      type: formData.adMarkerType,
    });
  };

  return (
    <div className=" flex flex-col gap-6">
      <DialogHeader>
        <DialogTitle>A/B test results</DialogTitle>
        <DialogDescription className="font-semibold text-sm">
          {formData.selectedAds.length}{" "}
          {formData.selectedAds.length > 1 ? "ads" : "ad"} selected
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        {resultedAds.map((ad: any, index: number) => (
          <div
            key={ad.id}
            className={cn(
              "rounded-md py-3 px-4 border border-[#E4E4E7]  flex flex-row justify-between items-center",
              index === 0 && "border-[#BBF7D0] border-4"
            )}
          >
            <div className="flex flex-row gap-10 items-center">
              <div className="flex flex-row gap-4 items-center">
                <Image alt="ad-image" src={AdImage} width={138} height={105} />
                <div className="flex flex-col">
                  <span className=" whitespace-nowrap font-bold text-[#27272A] text-base">
                    {ad.adTitle}
                  </span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-sm font-semibold text-[#71717A]">
                      {new Date(ad.createdAt).toLocaleDateString()}
                    </span>
                    <DotIcon />
                    <span className="text-sm font-semibold text-[#71717A]">
                      {secondsToTimeString(ad.adLength)}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "bg-white px-2.5 py-1.5 text-sm font-semibold rounded-lg text-black border-black border",
                  index === 0 && "bg-[#BBF7D0] text-[#166534] border-none"
                )}
              >
                {`#${index + 1}`}
              </div>
            </div>
          </div>
        ))}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="py-2 px-4">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={onSubmitHandler}
              type="submit"
              className="py-2 px-4 bg-[#18181B]"
            >
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </div>
  );
};

export default ResultDialog;
