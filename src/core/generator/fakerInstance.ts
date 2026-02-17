import { Faker, pt_BR } from "@faker-js/faker";

export function createFaker(seed: number) {
  const faker = new Faker({
    locale: [pt_BR],
  });

  faker.seed(seed);
  return faker;
}
