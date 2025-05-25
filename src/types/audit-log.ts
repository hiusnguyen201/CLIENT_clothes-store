export type AuditLog = {
  id: string;
  operationType: OPERATION_TYPE;
  collection: string;
  documentId: string;
  fullDocument?: string;
  updateDescription?: string;
  activityDate: Date;
  result: RESULT;
  createdAt: Date;
  updatedAt: Date;
};

export enum OPERATION_TYPE {
  INSERT = "insert",
  UPDATE = "update",
  DELETE = "delete",
}

export enum RESULT {
  SUCCESS = "success",
  FAIL = "fail",
  UNKNOWN = "unknown",
}
