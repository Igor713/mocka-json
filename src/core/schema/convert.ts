import { UIField } from "./uiTypes";
import { Field, ObjectField, ArrayField } from "./types";

export function convertUIToSchema(fields: UIField[]): ObjectField {
  const objectFields: ObjectField["fields"] = {};

  fields.forEach((field) => {
    if (!field.name) return;

    objectFields[field.name] = convertField(field);
  });

  return {
    type: "object",
    required: true,
    fields: objectFields,
  };
}

function convertField(ui: UIField): Field {
  switch (ui.type) {
    case "id":
      return {
        type: "id",
        required: ui.required,
        nullable: ui.nullable,
        probability: ui.probability,
        format: ui.idFormat ?? "number",
      };

    case "name":
      return {
        type: "name",
        required: ui.required,
        nullable: ui.nullable,
        probability: ui.probability,
      };

    case "email":
      return {
        type: "email",
        required: ui.required,
        nullable: ui.nullable,
        probability: ui.probability,
      };

    case "phone":
      return {
        type: "phone",
        required: ui.required,
        nullable: ui.nullable,
        probability: ui.probability,
      };

    case "address":
      return {
        type: "address",
        required: ui.required,
        nullable: ui.nullable,
        probability: ui.probability,
      };

    case "string":
      return {
        type: "string",
        required: ui.required,
        minLength: ui.minLength,
        maxLength: ui.maxLength,
      };

    case "number":
      return {
        type: "number",
        required: ui.required,
        min: ui.min,
        max: ui.max,
      };

    case "boolean":
      return {
        type: "boolean",
        required: ui.required,
      };

    case "date":
      return {
        type: "date",
        required: ui.required,
        format: ui.format,
      };

    case "array":
      return {
        type: "array",
        required: ui.required,
        length: ui.length,
        item: ui.item
          ? convertField(ui.item)
          : {
              type: "string",
              required: true,
            },
      };

    case "object":
      return {
        type: "object",
        required: ui.required,
        fields: {},
      };

    default:
      throw new Error("Tipo não suportado");
  }
}
