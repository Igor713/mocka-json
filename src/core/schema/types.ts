export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "object"
  | "array"
  | "id"
  | "name"
  | "email"
  | "phone"
  | "address";

export interface BaseField {
  type: FieldType;
  required?: boolean;
  nullable?: boolean;
  probability?: number;
}

export type IdFormat = "number" | "uuid" | "alphanumeric";

export interface IdField extends BaseField {
  type: "id";
  format: IdFormat;
}

type NameLocale = "pt-BR" | "en-US";

export interface NameField extends BaseField {
  type: "name";
  locale?: NameLocale;
}

export interface EmailField extends BaseField {
  type: "email";
}

export interface PhoneField extends BaseField {
  type: "phone";
}

export interface AddressField extends BaseField {
  type: "address";
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

export interface Random {
  int(min: number, max: number): number;
  float(): number;
}

export type Field =
  | IdField
  | NameField
  | EmailField
  | PhoneField
  | AddressField
  | StringField
  | NumberField
  | BooleanField
  | DateField
  | ObjectField
  | ArrayField;
