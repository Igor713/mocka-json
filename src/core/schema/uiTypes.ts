import { FieldType } from "./types";

export interface UIField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;

  nullable?: boolean;
  probability?: number;

  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  format?: "iso" | "timestamp";

  length?: number;
  item?: UIField;

  idFormat?: "number" | "uuid" | "alphanumeric";
}
