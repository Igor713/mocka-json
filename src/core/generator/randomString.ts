import { Random } from "../schema/types";

export function randomString(min = 5, max = 10, random: Random) {
  const length = random.int(min, max);
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[random.int(0, chars.length - 1)];
  }

  return result;
}
