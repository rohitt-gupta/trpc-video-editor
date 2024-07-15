"use client";

import { trpc } from "@/server/client";
import CreateAdMarkerBtn from "./CreateAdMarkerBtn";
import { Button } from "@/components/ui/button";
import { Trash2, WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import EditAdMarkerButton from "./EditAdMarkerButton";

const AdMarkersList = () => {
  const [formData, setFormData] = useState<any>({
    adMarkerType: "ABTEST",
    adMarkerTimeStamp: "",
    selectedAds: [],
    selectedAd: "",
  });
  const { data, isLoading, isRefetching } =
    trpc.adMarkerRoutes.getAdMarkers.useQuery();

  const { mutate: deleteAdMarker } =
    trpc.adMarkerRoutes.deleteAdMarker.useMutation();

  const { mutate: editAdMarker } = trpc.adMarkerRoutes.editMarker.useMutation();

  const { mutate: addAdMarker } = trpc.adMarkerRoutes.addAdMarker.useMutation();

  const [adMarkers, setAdMarkers] = useState<
    | {
        type: "AUTO" | "STATIC" | "ABTEST";
        id: number;
        adId: number;
        timestamp: string;
      }[]
    | undefined
  >(data);

  const onAddFn = (
    type: "AUTO" | "STATIC" | "ABTEST",
    timestamp: string,
    adId: number
  ) => {
    if (adMarkers === undefined) return;
    const newAdMarker = {
      type,
      timestamp,
      adId,
    };
    setAdMarkers((prev: any) => [...prev, newAdMarker]);
    addAdMarker({
      adId,
      timestamp,
      type,
    });
  };

  const onDeleteFn = (index: number, id: number) => {
    if (adMarkers === undefined) return;
    setAdMarkers(adMarkers.filter((_, i) => i !== index));
    deleteAdMarker({
      id,
    });
  };

  const onEditFn = (index: number, id: number, timestampInput: string) => {
    if (adMarkers === undefined) return;

    setAdMarkers((prev: any) => {
      prev[index].timestamp = timestampInput;
      return prev;
    });
    editAdMarker({
      id,
      timestamp: timestampInput,
    });
  };

  useEffect(() => {
    if (data) {
      setAdMarkers(data);
    }
  }, [data]);

  return (
    <div className="bg-white rounded-md flex-1 p-8 border border-[#E4E4E7] flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <span className="text-[#27272A] text-base font-bold">Ad markers</span>
          <span className="text-[#71717A] text-base font-bold">
            {isLoading || isRefetching ? (
              "Counting ad markers"
            ) : (
              <>
                {adMarkers?.length}{" "}
                {(adMarkers === undefined || adMarkers.length === 0) && "0"}
                {adMarkers?.length === 1 ? "ad marker" : "ad markers"}
              </>
            )}
          </span>
        </div>
        {(!adMarkers || adMarkers.length === 0) && !isLoading && (
          <span className="text-[#71717A] text-sm">
            No ad markers available
          </span>
        )}
        {(isLoading || isRefetching) && <span>Loading...</span>}
        {adMarkers?.length !== 0 &&
          !isRefetching &&
          !isLoading &&
          adMarkers?.map((adMarker, index: number) => (
            <AdMarkerItem
              onDeleteFn={onDeleteFn}
              onEditFn={onEditFn}
              index={index}
              id={adMarker.id}
              timestamp={adMarker.timestamp}
              type={adMarker.type}
              key={adMarker.id}
            />
          ))}
      </div>
      <div className="flex flex-col gap-4">
        <CreateAdMarkerBtn
          formData={formData}
          setFormData={setFormData}
          onAddFn={onAddFn}
        />
        <Button
          variant={"ghost"}
          className="flex flex-row items-center gap-2 border border-[#E4E4E7] bg-white w-full rounded-md font-bold text-base py-3 text-[#71717A]"
        >
          Automatically place
          <WandSparkles className=" size-4" />
        </Button>
      </div>
    </div>
  );
};

function AdMarkerItem({
  timestamp,
  type,
  id,
  index,
  onDeleteFn,
  onEditFn,
}: {
  timestamp: string;
  type: "AUTO" | "STATIC" | "ABTEST";
  id: number;
  index: number;
  onDeleteFn: (index: number, id: number) => void;
  onEditFn: (index: number, id: number, timestampInput: string) => void;
}) {
  return (
    <div className="flex flex-row items-center ">
      <span className=" px-4">{index + 1}</span>
      <div className="border border-[#E4E4E7] flex flex-row items-center gap-10 justify-between flex-1 py-3 px-4 rounded-md">
        <span className="text-base text-[#27272A] font-semibold">
          {timestamp}
        </span>
        <span
          className={cn(
            " px-2.5 py-1.5 text-sm font-semibold rounded-lg",
            type === "ABTEST" && "bg-[#BBF7D0] text-[#166534]",
            type === "STATIC" && "bg-[#FCA5A5] text-[#7F1D1D]",
            type === "AUTO" && "bg-[#F9E7A2] text-[#7F6C1F]"
          )}
        >
          {type}
        </span>

        <EditAdMarkerButton
          id={id}
          timestamp={timestamp}
          type={type}
          onEditFn={onEditFn}
          index={index}
        />
        <Badge
          onClick={() => {
            onDeleteFn(index, id);
          }}
          className="bg-[#FCA5A5] cursor-pointer p-2 rounded-md text-[#7F1D1D] hover:bg-[#d18787]"
        >
          <Trash2 className=" size-4" />
        </Badge>
      </div>
    </div>
  );
}

export default AdMarkersList;
