"use client";

import { useFormik } from "formik";
import { object, array, string } from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { ExcelData, FieldMapping, DatabaseField } from "@/components/import/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const validationSchema = object({
  mappings: array()
    .of(
      object().shape({
        excelColumn: string().required(),
        dbField: string(),
      })
    )
    .test(
      "has-mappings",
      "At least one column must be mapped",
      (mappings) => mappings?.some((m) => m.dbField) || false
    ),
});

interface SchemaMapperProps {
  data: ExcelData;
  file: File | null;
  initialMappings: FieldMapping[];
  databaseFields: DatabaseField[];
  onSubmit: (values: { mappings: FieldMapping[] }) => void;
  onBack: () => void;
}

export function SchemaMapper({ data, file, initialMappings, databaseFields, onSubmit, onBack }: SchemaMapperProps) {
  const formik = useFormik({
    initialValues: {
      mappings: initialMappings,
    },
    validationSchema,
    onSubmit,
  });

  const updateFieldMapping = (index: number, field: Partial<FieldMapping>) => {
    const newMappings = [...formik.values.mappings];
    newMappings[index] = { ...newMappings[index], ...field };
    formik.setFieldValue("mappings", newMappings);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Map Excel Columns to Database Fields</h2>
        <div className="text-sm text-muted-foreground">
          {file?.name} • {data?.rows.length} rows
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 font-medium text-sm">
              <div className="col-span-3">Excel Column</div>
              <div className="col-span-4">Database Field</div>
              <div className="col-span-2 flex justify-center">Data type</div>
              <div className="col-span-3 flex justify-center">Constraints</div>
            </div>

            <Separator />

            {/* Mappings List */}
            {formik.values.mappings.map((mapping, index) => {
              const selectedField = databaseFields.find((f) => f.name === mapping?.dbField);

              return (
                <div key={index} className="grid grid-cols-12 gap-4 items-center">
                  {/* Excel Column */}
                  <div className="col-span-3 font-medium truncate" title={mapping.excelColumn}>
                    {mapping.excelColumn}
                  </div>

                  {/* Database Field Selector */}
                  <div className="col-span-4">
                    <Select
                      value={mapping.dbField || "default"}
                      onValueChange={(value) =>
                        updateFieldMapping(index, {
                          dbField: value === "default" ? "" : value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">-- Ignore this column --</SelectItem>
                        {databaseFields.map((field) => (
                          <SelectItem key={field.name} value={field.name}>
                            {field.name} {field?.constraints?.required && " *"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Data Type */}
                  <div className="col-span-2 flex justify-center">
                    {selectedField ? selectedField.type : <span className="text-muted-foreground">-</span>}
                  </div>

                  {/* Constraints */}
                  <div className="col-span-3 flex justify-center flex-wrap gap-1">
                    {selectedField?.constraints && Object.keys(selectedField.constraints).length > 0 ? (
                      Object.entries(selectedField.constraints).map(([key, value]) => {
                        return value ? (
                          <Badge key={key} variant="outline" className="bg-amber-100 capitalize">
                            {key}
                          </Badge>
                        ) : (
                          "-"
                        );
                      })
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {formik.errors.mappings && typeof formik.errors.mappings === "string" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formik.errors.mappings}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <Button type="button" variant="outline" onClick={onBack}>
          Back to Upload
        </Button>
        <Button type="submit">Preview Data</Button>
      </div>
    </form>
  );
}
