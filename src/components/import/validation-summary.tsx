import { Check, X, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ValidationResult } from "@/components/import/types";

interface ValidationSummaryProps {
  results: ValidationResult;
}

export function ValidationSummary({ results }: ValidationSummaryProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-slate-50 p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Validation Summary</h3>
            {results.rowsWithErrors === 0 ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <Check className="h-3 w-3 mr-1" /> Valid
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-white">
                <X className="h-3 w-3 mr-1" /> Invalid
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-4 rounded-md border">
              <div className="text-sm text-muted-foreground">Total Rows</div>
              <div className="text-2xl font-bold">{results.totalRows}</div>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <div className="text-sm text-muted-foreground">Valid Rows</div>
              <div className="text-2xl font-bold text-green-600">{results.validRows}</div>
            </div>
            <div className="bg-white p-4 rounded-md border">
              <div className="text-sm text-muted-foreground">Rows with Errors</div>
              <div className="text-2xl font-bold text-red-600">{results.rowsWithErrors}</div>
            </div>
          </div>
        </div>

        {results.errors.length > 0 && (
          <div className="p-6">
            <h4 className="font-medium mb-3">Validation Errors</h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.errors.map((error, index) => (
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
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
