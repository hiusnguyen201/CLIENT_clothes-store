"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg min-h-96 p-10 flex flex-col items-center justify-center text-center transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <div>
          <p className="text-lg font-medium">Drag and drop your Excel file here</p>
          <p className="text-sm text-muted-foreground mt-1">or click the button below</p>
        </div>
        <Button onClick={open} className="mt-2" type="button">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Select Excel File
        </Button>
      </div>
    </div>
  );
}
