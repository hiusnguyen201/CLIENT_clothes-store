"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ExcelData, ValidationResult, ImportResult } from "@/components/import/types";
import { ValidationSummary } from "@/components/import/validation-summary";
import { ImportSummary } from "@/components/import/import-summary";
import { ImportResultsSkeleton } from "./import-results-skeleton";

interface ImportResultsProps {
  file: File | null;
  data: ExcelData | null;
  testResults: ValidationResult | null;
  importResults: ImportResult | null;
  onBack: () => void;
  onReset: () => void;
  onRealImport: () => void;
  tab: "test" | "real";
  loadingTestImport?: boolean;
  loadingLiveImport?: boolean;
}

export function ImportResults({
  file,
  data,
  testResults,
  importResults,
  onBack,
  onReset,
  onRealImport,
  loadingTestImport,
  loadingLiveImport,
  tab = "test",
}: ImportResultsProps) {
  const rows = importResults?.errors.map((error) => error.row) || [];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Import Results</h2>
        <div className="text-sm text-muted-foreground">
          {file?.name} • {data?.rows.length} rows
        </div>
      </div>

      <Tabs defaultValue={tab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="test" disabled={tab === "real"}>
            Test Results
          </TabsTrigger>
          <TabsTrigger value="real" disabled={tab === "test"}>
            Real Import Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="test" className="space-y-4 mt-4">
          {testResults && !loadingTestImport && <ValidationSummary results={testResults} />}
          {loadingTestImport && <ImportResultsSkeleton />}

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Back to Preview
            </Button>

            {testResults?.rowsWithErrors === 0 && <Button onClick={onRealImport}>Proceed to Real Import</Button>}
          </div>
        </TabsContent>

        <TabsContent value="real" className="space-y-4 mt-4">
          {importResults && !loadingLiveImport && (
            <ImportSummary
              results={importResults}
              totalRows={data?.rows.length || 0}
              successRows={
                data?.rows
                  .filter((_, index) => !rows.includes(index + 2))
                  .map((item, index) => ({ data: item, rowNumber: index + 2 })) || []
              }
            />
          )}
          {loadingLiveImport && <ImportResultsSkeleton />}

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Back to Preview
            </Button>
            <Button onClick={onReset}>Start New Import</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
