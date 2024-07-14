"use client";

import { trpc } from "@/server/client";
import CreateAdMarkerBtn from "./CreateAdMarkerBtn";
import { Button } from "@/components/ui/button";
import { Trash2, WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const AdMarkersList = () => {
  const [formData, setFormData] = useState<any>({
    adMarkerType: "ABTEST",
    adMarkerTimeStamp: "",
    selectedAds: [],
    selectedAd: "",
  });
  const { data, isLoading, refetch, isRefetching } =
    trpc.adMarkerRoutes.getAdMarkers.useQuery(undefined, {});

  const { mutate: deleteAdMarker, isPending: IsDeleting } =
    trpc.adMarkerRoutes.deleteAdMarker.useMutation({
      onSettled: () => {
        refetch();
      },
    });

  useEffect(() => {
    refetch();
  }, [formData.selectedAd]);

  return (
    <div className="bg-white rounded-md flex-1 p-8 border border-[#E4E4E7] flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <span className="text-[#27272A] text-base font-bold">Ad markers</span>
          <span className="text-[#71717A] text-base font-bold">
            {data?.length} {data?.length === 1 ? "ad marker" : "ad markers"}
          </span>
        </div>
        {(!data || data.length === 0) && !isLoading && (
          <span className="text-[#71717A] text-sm">
            No ad markers available
          </span>
        )}
        {(isLoading || isRefetching || IsDeleting) && <span>Loading...</span>}
        {data?.length !== 0 &&
          !isRefetching &&
          !isLoading &&
          !IsDeleting &&
          data?.map((adMarker, index: number) => (
            <AdMarkerItem
              index={index}
              deleteAdMarker={deleteAdMarker}
              id={adMarker.id}
              timestamp={adMarker.timestamp}
              type={adMarker.type}
              key={adMarker.id}
            />
          ))}
      </div>
      <div className="flex flex-col gap-4">
        <CreateAdMarkerBtn formData={formData} setFormData={setFormData} />
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
  deleteAdMarker,
  index,
}: {
  timestamp: string;
  type: "AUTO" | "STATIC" | "ABTEST";
  id: number;
  deleteAdMarker: any;
  index: number;
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

        <Badge
          variant={"outline"}
          className="cursor-pointer rounded-md py-2 px-3 border border-[#E4E4E7] text-[#18181B] text-sm font-semibold hover:bg-[#f0f0f0FF]"
        >
          Edit
        </Badge>
        <Badge
          onClick={() => {
            deleteAdMarker({
              id: id,
            });
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
