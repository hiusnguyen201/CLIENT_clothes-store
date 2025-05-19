"use client";

import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ExcelData, FieldMapping } from "@/components/import/types";

interface ImportPreviewProps {
  data: ExcelData | null;
  file: File | null;
  fieldMappings: FieldMapping[];
  onTestImport: () => void;
  onRealImport: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export function ImportPreview({
  data,
  file,
  fieldMappings,
  onTestImport,
  onRealImport,
  onBack,
  isLoading,
}: ImportPreviewProps) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Preview and Import</h2>
        <div className="text-sm text-muted-foreground">
          {file?.name} • {data.rows.length} rows
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {fieldMappings
                  .filter((mapping) => mapping.dbField)
                  .map((mapping, index) => (
                    <TableHead key={index} className="whitespace-nowrap">
                      <div className="flex items-center gap-1">{mapping.dbField}</div>
                      <div className="text-xs text-muted-foreground">From: {mapping.excelColumn}</div>
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.slice(0, 5).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {fieldMappings
                    .filter((mapping) => mapping.dbField)
                    .map((mapping, colIndex) => {
                      const originalIndex = fieldMappings.findIndex((m) => m.excelColumn === mapping.excelColumn);
                      return (
                        <TableCell key={colIndex} className="whitespace-nowrap">
                          {row[originalIndex] !== undefined ? String(row[originalIndex]) : ""}
                        </TableCell>
                      );
                    })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data.rows.length > 5 && (
            <div className="p-4 text-center text-sm text-muted-foreground border-t">
              Showing 5 of {data.rows.length} rows
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
        <h3 className="font-medium flex items-center">
          <Database className="h-4 w-4 mr-2 text-amber-500" />
          Import Options
        </h3>
        <p className="text-sm mt-2 text-muted-foreground">
          Choose between a test run to validate your data without making changes, or a real import to add the data to
          your database.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="flex-1 border-amber-300 bg-amber-50 hover:bg-amber-100"
            onClick={onTestImport}
            disabled={isLoading}
          >
            Run Test Import
            <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800">
              Safe
            </Badge>
          </Button>
          <Button variant="default" className="flex-1" onClick={onRealImport} disabled={isLoading}>
            Run Real Import
            <Badge variant="outline" className="ml-2 bg-primary/20 text-white">
              Live
            </Badge>
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Back to Mapping
        </Button>
      </div>
    </div>
  );
}
