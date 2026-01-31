export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "object"
  | "array";

export interface BaseField {
  type: FieldType;
  required?: boolean;
  nullable?: boolean;
  probability?: number;
}

export interface StringField extends BaseField {
  type: "string";
  value?: string;
  minLength?: number;
  maxLength?: number;
}

export interface NumberField extends BaseField {
  type: "number";
  value?: number;
  min?: number;
  max?: number;
}

export interface BooleanField extends BaseField {
  type: "boolean";
  value?: boolean;
}

export interface DateField extends BaseField {
  type: "date";
  format?: "iso" | "timestamp";
}

export interface ObjectField extends BaseField {
  type: "object";
  fields: Record<string, Field>;
}

export interface ArrayField extends BaseField {
  type: "array";
  length?: number;
  item: Field;
}

export type Field =
  | StringField
  | NumberField
  | BooleanField
  | DateField
  | ObjectField
  | ArrayField;
