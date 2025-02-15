import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface GuideStep {
  title: string;
  description: string;
}

interface PageGuideProps {
  pageId: string;
  steps: GuideStep[];
}

export function PageGuide({ pageId, steps }: PageGuideProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem(`guide-${pageId}`);
    if (!hasSeenGuide) {
      setOpen(true);
    }
  }, [pageId]);

  const handleClose = () => {
    localStorage.setItem(`guide-${pageId}`, 'true');
    setOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep]?.title}</DialogTitle>
          <DialogDescription>
            {steps[currentStep]?.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Skip
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
