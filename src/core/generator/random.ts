import { Random } from "../schema/types";

export function createRandom(seed: number): Random {
  let value = seed;

  const next = () => {
    value = (value * 16807) % 2147483647;
    return value / 2147483647;
  };

  return {
    float() {
      return next();
    },
    int(min: number, max: number) {
      return Math.floor(next() * (max - min + 1)) + min;
    },
  };
}

export function generateUUID(random: Random) {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = random.int(0, 15);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateAlphanumeric(random: Random, length = 12) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => chars[random.int(0, chars.length - 1)],
  ).join("");
}
