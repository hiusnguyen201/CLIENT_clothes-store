import { Check, X, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ImportResult } from "@/components/import/types";

interface ImportSummaryProps {
  results: ImportResult;
  totalRows: number;
}

export function ImportSummary({ results, totalRows }: ImportSummaryProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-slate-50 p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Import Results</h3>
            {results.success ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <Check className="h-3 w-3 mr-1" /> Success
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-white">
                <X className="h-3 w-3 mr-1" /> Failed
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-md border">
              <div className="text-sm text-muted-foreground">Total Rows</div>
              <div className="text-2xl font-bold">{totalRows}</div>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <div className="text-sm text-muted-foreground">Records Imported</div>
              <div className="text-2xl font-bold text-green-600">{results.recordsImported}</div>
            </div>
          </div>
        </div>

        {results.success ? (
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-medium">Import Completed Successfully</h4>
              <p className="text-muted-foreground mt-2">
                All {results.recordsImported} records have been imported to the database.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h4 className="font-medium mb-3">Import Errors</h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.errors.map((error, index) => {
                return (
                  <Alert key={index} variant="destructive" className="py-2">
                    <AlertDescription className="flex items-center gap-3">
                      <AlertCircle className="h-4 w-4" />
                      {error.type === "mapping" ? (
                        <span>{error.message}</span>
                      ) : (
                        <span>
                          Row {error.row}, {`${error.column ? "Column" : "Field"} "${error.column || error.field}"`}:{" "}
                          {error.message}
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
