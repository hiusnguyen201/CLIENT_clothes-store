"use client";

import { useMemo, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ImportSteps } from "@/components/import/import-steps";
import { FileUploader } from "@/components/import/file-uploader";
import { SchemaMapper } from "@/components/import/schema-mapper";
import { ImportPreview } from "@/components/import/import-preview";
import { ImportResults } from "@/components/import/import-results";
import * as XLSX from "xlsx";
import {
  DatabaseField,
  ExcelData,
  FieldMapping,
  ImportResult,
  ImportStep,
  ValidationResult,
} from "@/components/import/types";

export function FileExcelImportProcess({
  onClickTestImport,
  onClickLiveImport,
  testResults,
  importResults,
  databaseFields = [],
}: {
  onClickTestImport: (data: Record<string, any>[]) => void;
  onClickLiveImport: (data: Record<string, any>[]) => void;
  testResults: ValidationResult;
  importResults: ImportResult;
  databaseFields: DatabaseField[];
}) {
  const [currentStep, setCurrentStep] = useState<ImportStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ExcelData | null>(null);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [tab, setTab] = useState<"test" | "real">("test");

  const headerMappings = useMemo(() => {
    const result: Record<string, string> = {};
    fieldMappings.map((item) => {
      if (item.dbField) {
        result[item.dbField] = item.excelColumn;
      }
    });
    return result;
  }, [fieldMappings]);

  const converterData = (data: ExcelData | null): Record<string, any>[] => {
    if (!data) return [];
    return data.rows.map((row) => {
      const result: Record<string, any> = {};

      fieldMappings.forEach((mapping, index) => {
        if (mapping.dbField) {
          result[mapping.dbField] = row[index];
        }
      });

      return result;
    });
  };

  const handleFileExcel = async (file: File) => {
    setFile(file);
    setIsLoading(true);

    try {
      const reader = new FileReader();

      reader.onload = (e) => {
        const workbook = XLSX.read(e.target?.result, { type: "array" });

        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length === 0) {
          setError("The Excel file is empty");
          setIsLoading(false);
          return;
        }

        // Extract headers and rows
        const headers = jsonData[0] as string[];
        setData({ headers, rows: jsonData.slice(1) });

        setFieldMappings(headers.map((h) => ({ excelColumn: h, dbField: "" })));

        setIsLoading(false);
        setCurrentStep("mapping");
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      setFile(null);
      setIsLoading(false);
      setError("An unexpected error occurred");
    }
  };

  const runTestImport = async () => {
    setIsLoading(true);
    setTab("test");

    try {
      const converted = converterData(data);
      onClickTestImport(converted);
      setIsLoading(false);
      setCurrentStep("results");
    } catch (error) {
      setError("Test import failed");
      setIsLoading(false);
    }
  };

  const runRealImport = async () => {
    setIsLoading(true);
    setTab("real");

    try {
      const converted = converterData(data);
      onClickLiveImport(converted);
      setIsLoading(false);
      setCurrentStep("results");
    } catch (error) {
      setError("Real import failed");
      setIsLoading(false);
    }
  };

  const resetImport = () => {
    setCurrentStep("upload");
    setFile(null);
    setData(null);
    setFieldMappings([]);
    setError(null);
  };

  const handleMappingSubmit = (values: { mappings: FieldMapping[] }) => {
    setFieldMappings(values.mappings);
    setCurrentStep("preview");
  };

  return (
    <div className="space-y-6">
      <ImportSteps currentStep={currentStep} />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {currentStep === "upload" && <FileUploader onFileSelect={handleFileExcel} />}

      {currentStep === "mapping" && data && (
        <SchemaMapper
          data={data}
          file={file}
          initialMappings={fieldMappings}
          databaseFields={databaseFields}
          onSubmit={handleMappingSubmit}
          onBack={resetImport}
        />
      )}

      {currentStep === "preview" && data && (
        <ImportPreview
          data={data}
          file={file}
          fieldMappings={fieldMappings}
          onTestImport={runTestImport}
          onRealImport={runRealImport}
          onBack={() => setCurrentStep("mapping")}
          isLoading={isLoading}
        />
      )}

      {currentStep === "results" && (
        <ImportResults
          tab={tab}
          file={file}
          data={data}
          testResults={{
            rowsWithErrors: testResults.rowsWithErrors || 0,
            totalRows: testResults.totalRows || 0,
            validRows: testResults.validRows || 0,
            errors: testResults.errors.map((err) => ({
              ...err,
              column: headerMappings[err.field],
            })),
          }}
          importResults={{
            errors: importResults.errors.map((err) => ({
              ...err,
              column: headerMappings[err.field],
            })),
            recordsImported: importResults.recordsImported,
            success: importResults.errors.length === 0,
          }}
          onBack={() => setCurrentStep("preview")}
          onReset={resetImport}
          onRealImport={runRealImport}
        />
      )}
    </div>
  );
}
