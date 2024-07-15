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

type TSelectedAds = {
  id: number;
  adTitle: string;
  adLength: number;
  adUrl: string;
  createdAt: string;
  updatedAt: string;
};

type TFormData = {
  adMarkerType: "AUTO" | "ABTEST" | "STATIC";
  adMarkerTimeStamp: string;
  selectedAds: TSelectedAds[];
  selectedAd: string;
};

const ResultDialog = ({
  formData,
  setFormData,
  onAddFn,
}: {
  formData: TFormData;
  setFormData: any;
  onAddFn: (
    type: "AUTO" | "STATIC" | "ABTEST",
    timestamp: string,
    adId: number
  ) => void;
}) => {
  const sortedArray = formData.selectedAds.sort(
    (a: TSelectedAds, b: TSelectedAds) => a.adLength - b.adLength
  );

  const onSubmitHandler = () => {
    onAddFn(
      formData.adMarkerType,
      formData.adMarkerTimeStamp,
      sortedArray[0].id
    );
    setFormData({
      adMarkerType: "ABTEST",
      adMarkerTimeStamp: "",
      selectedAds: [],
      selectedAd: "",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <DialogHeader>
        <DialogTitle>A/B test results</DialogTitle>
        <DialogDescription className="font-semibold text-sm">
          {formData.selectedAds.length}{" "}
          {formData.selectedAds.length > 1 ? "ads" : "ad"} selected
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        {sortedArray.map((ad: TSelectedAds, index: number) => (
          <div
            key={ad.id}
            className={cn(
              "rounded-md py-3 px-4 border border-[#E4E4E7]  flex flex-row justify-between items-center",
              index === 0 && "border-[#BBF7D0] border-4"
            )}
          >
            <div className="flex flex-row items-center gap-10">
              <div className="flex flex-row items-center gap-4">
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
            <Button
              onClick={() => {
                setFormData({
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
          <DialogClose asChild>
            <Button
              onClick={onSubmitHandler}
              type="submit"
              className="bg-[#18181B] px-4 py-2"
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
