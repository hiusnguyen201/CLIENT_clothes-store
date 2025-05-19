"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ExcelData, ValidationResult, ImportResult } from "@/components/import/types";
import { ValidationSummary } from "@/components/import/validation-summary";
import { ImportSummary } from "@/components/import/import-summary";

interface ImportResultsProps {
  file: File | null;
  data: ExcelData | null;
  testResults: ValidationResult | null;
  importResults: ImportResult | null;
  onBack: () => void;
  onReset: () => void;
  onRealImport: () => void;
  tab: "test" | "real";
}

export function ImportResults({
  file,
  data,
  testResults,
  importResults,
  onBack,
  onReset,
  onRealImport,
  tab = "test",
}: ImportResultsProps) {
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
          {testResults && <ValidationSummary results={testResults} />}

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Back to Preview
            </Button>

            {testResults?.rowsWithErrors === 0 && <Button onClick={onRealImport}>Proceed to Real Import</Button>}
          </div>
        </TabsContent>

        <TabsContent value="real" className="space-y-4 mt-4">
          {importResults && <ImportSummary results={importResults} totalRows={data?.rows.length || 0} />}

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
