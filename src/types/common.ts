export type Nullable<TData> = TData | null;

export type Optional<TData> = TData | undefined;

export type ImportError = { row: number; field: string; message: string };
