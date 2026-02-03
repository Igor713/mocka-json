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
