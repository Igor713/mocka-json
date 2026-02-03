import { Field, Random } from "../schema/types";
import { generateAlphanumeric, generateUUID } from "./random";
import { randomNumber } from "./randomNumber";
import { randomString } from "./randomString";

export function generateJson(field: Field, random: Random): any {
  if (typeof field.probability === "number") {
    const chance = field.probability / 100;

    if (random.float() > chance) {
      return undefined;
    }
  }

  if (field.nullable) {
    if (random.float() < 0.3) {
      return null;
    }
  }

  switch (field.type) {
    case "string":
      return (
        field.value ?? randomString(field.minLength, field.maxLength, random)
      );

    case "number":
      return field.value ?? randomNumber(field.min, field.max, random);

    case "id":
      if (field.format === "number") {
        return random.int(1, 1_000_000);
      }

      if (field.format === "uuid") {
        return generateUUID(random);
      }

      return generateAlphanumeric(random);

    case "boolean":
      return field.value ?? random.float() < 0.5;

    case "date":
      return field.format === "timestamp"
        ? Date.now()
        : new Date().toISOString();

    case "object": {
      const result: Record<string, any> = {};

      for (const key in field.fields) {
        const child = field.fields[key];
        if (!child.required && Math.random() < 0.5) continue;
        result[key] = generateJson(child, random);
      }

      return result;
    }

    case "array":
      return Array.from({ length: field.length ?? 1 }).map(() => {
        return generateJson(field.item, random);
      });

    default:
      return null;
  }
}
