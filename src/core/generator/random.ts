import { Random } from "../schema/types";
import { createFaker } from "./fakerInstance";
import seedrandom from "seedrandom";

export function createRandom(seed: number): Random {
  const rng = seedrandom(String(seed));
  const faker = createFaker(seed);

  return {
    int(min: number, max: number) {
      return Math.floor(rng() * (max - min + 1)) + min;
    },
    float() {
      return rng();
    },
    faker,
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

export function generateName(random: Random): string {
  return random.faker.person.fullName();
}

export function generateEmail(random: Random): string {
  const firstName = random.faker.person.firstName();
  const lastName = random.faker.person.lastName();

  return random.faker.internet
    .email({
      firstName,
      lastName,
      provider: "gmail.com",
    })
    .toLowerCase();
}

export function generatePhone(random: Random) {
  return `(${random.int(11, 99)}) 9${random.int(1000, 9999)}-${random.int(1000, 9999)}`;
}

export function generateAddress(random: Random) {
  return {
    street: random.faker.location.street(),
    number: random.faker.location.buildingNumber(),
    city: random.faker.location.city(),
    state: random.faker.location.state(),
    zipCode: random.faker.location.zipCode("#####-###"),
  };
}
