"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AdMarkerTypeDialog from "./AdMarkerTypeDialog";
import SelectAdsDialog from "./SelectAdsDialog";
import ResultDialog from "./ResultDialog";
import { cn } from "@/lib/utils";

type TFormData = {
  adMarkerType: "ABTEST" | "STATIC" | "AUTO";
  adMarkerTimeStamp: string;
  selectedAds: [];
  selectedAd: string;
};

const CreateAdMarkerBtn = ({
  formData,
  setFormData,
}: {
  formData: TFormData;
  setFormData: (formData: TFormData) => void;
}) => {
  const [step, setStep] = useState(0);

  return (
    <Dialog
      onOpenChange={() => {
        setStep(1);
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex flex-row items-center gap-2 py-3 px-4 w-full font-medium text-sm font-[#FAFAFA] bg-[#18181B]">
          Create a ad marker
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(step > 1 && "min-w-max")}>
        {step === 1 && (
          <AdMarkerTypeDialog
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <SelectAdsDialog
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <ResultDialog formData={formData} setFormData={setFormData} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdMarkerBtn;
