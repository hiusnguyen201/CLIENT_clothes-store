import type { ImportStep } from "@/components/import/types";

interface ImportStepsProps {
  currentStep: ImportStep;
}

export function ImportSteps({ currentStep }: ImportStepsProps) {
  return (
    <div className="relative">
      <div className="flex justify-between mb-2">
        {["Upload File", "Map Columns", "Preview & Import", "Results"].map((step, index) => {
          const stepValue = ["upload", "mapping", "preview", "results"][index] as ImportStep;
          const isActive = currentStep === stepValue;
          const isPast = ["upload", "mapping", "preview", "results"].indexOf(currentStep) >= index;

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : isPast
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <div className={`text-xs mt-1 ${isActive ? "font-medium" : "text-muted-foreground"}`}>{step}</div>
            </div>
          );
        })}
      </div>
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted -z-10">
        <div
          className="h-full bg-primary transition-all"
          style={{
            width:
              currentStep === "upload"
                ? "0%"
                : currentStep === "mapping"
                ? "33%"
                : currentStep === "preview"
                ? "66%"
                : "100%",
          }}
        />
      </div>
    </div>
  );
}
