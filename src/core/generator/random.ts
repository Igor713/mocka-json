import { Random } from "../schema/types";
import { randomString } from "./randomString";

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

export function generateNumericId(random: Random) {
  return random.int(1, 1_000_000);
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

const FIRST_NAMES = ["João", "Maria", "Jéssica", "Lucas", "Pedro"];
const LAST_NAMES = ["Silva", "Santos", "Oliveira", "Costa"];

export function generateName(random: Random) {
  return `${pick(FIRST_NAMES, random)} ${pick(LAST_NAMES, random)}`;
}

function pick<T>(arr: T[], random: Random) {
  return arr[random.int(0, arr.length - 1)];
}

export function generateEmail(random: Random) {
  const user = randomString(5, 10, random);
  const domains = ["gmail.com", "outlook.com", "hotmail.com"];
  const domain = domains[random.int(0, domains.length - 1)];

  return `${user}@${domain}`;
}

export function generatePhone(random: Random) {
  return `(${random.int(11, 99)}) 9${random.int(1000, 9999)}-${random.int(1000, 9999)}`;
}

export function generateAddress(random: Random) {
  return {
    street: `Rua ${randomString(5, 10, random)}`,
    number: random.int(1, 9999),
    city: "São Paulo",
    state: "SP",
    zip: `${random.int(10000, 99999)}-${random.int(100, 999)}`,
  };
}
