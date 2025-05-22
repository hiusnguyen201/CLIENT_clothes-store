export type ExcelData = {
  headers: string[];
  rows: any[];
};

export type FieldMapping = {
  excelColumn: string;
  dbField: string;
};

export type ImportStep = "upload" | "mapping" | "preview" | "results";

export type DatabaseField<T extends Record<string, any>> = {
  name: keyof T;
  type: "text" | "number";
  constraints: {
    required?: boolean;
    unique?: boolean;
  };
};

export type ValidationResult = {
  totalRows: number;
  rowsWithErrors: number;
  validRows: number;
  errors: ValidationError[];
};

export type ValidationError = {
  type: "mapping" | "data";
  row?: number;
  column?: string;
  field: string;
  message: string;
};

export interface SuccessRow {
  row: number;
  data: Record<string, any>;
}

export type ImportResult = {
  success: boolean;
  recordsImported: number;
  errors: ValidationError[];
};
