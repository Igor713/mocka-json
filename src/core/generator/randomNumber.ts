import { Random } from "../schema/types";

export function randomNumber(min = 0, max = 100, random: Random) {
  return random.int(min, max);
}
