export function randomString(min = 5, max = 10) {
  const length = Math.floor(Math.random() * ((max ?? 10) - min + 1)) + min;
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export function randomNumber(min = 0, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
