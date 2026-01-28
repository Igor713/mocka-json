import { FieldType } from "./types";

export interface UIField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;

  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  format?: "iso" | "timestamp";

  length?: number;
  item?: UIField;
}
