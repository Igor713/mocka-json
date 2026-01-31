import { Field } from "../schema/types";
import { randomNumber, randomString } from "./utils";

export function generateJson(field: Field): any {
  if (typeof field.probability === "number") {
    const chance = field.probability / 100;

    if (Math.random() > chance) {
      return undefined;
    }
  }

  if (field.nullable) {
    if (Math.random() < 0.3) {
      return null;
    }
  }

  switch (field.type) {
    case "string":
      return field.value ?? randomString(field.minLength, field.maxLength);

    case "number":
      return field.value ?? randomNumber(field.min, field.max);

    case "boolean":
      return field.value ?? Math.random() < 0.5;

    case "date":
      return field.format === "timestamp"
        ? Date.now()
        : new Date().toISOString();

    case "object": {
      const result: Record<string, any> = {};

      for (const key in field.fields) {
        const child = field.fields[key];
        if (!child.required && Math.random() < 0.5) continue;
        result[key] = generateJson(child);
      }

      return result;
    }

    case "array":
      return Array.from({ length: field.length ?? 1 }).map(() => {
        return generateJson(field.item);
      });

    default:
      return null;
  }
}
