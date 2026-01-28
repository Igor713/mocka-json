import { Field } from "./types";

export const userSchema: Field = {
  type: "object",
  fields: {
    id: {
      type: "number",
      min: 1,
      max: 9999,
      required: true,
    },
    name: {
      type: "string",
      minLength: 3,
      maxLength: 12,
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    active: {
      type: "boolean",
      required: true,
    },
    createdAt: {
      type: "date",
      format: "iso",
      required: true,
    },
    tags: {
      type: "array",
      length: 3,
      required: true,
      item: {
        type: "string",
        minLength: 4,
        maxLength: 8,
        required: true,
      },
    },
  },
};
