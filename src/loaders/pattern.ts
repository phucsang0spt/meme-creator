export function getPattern(folder: string) {
  const pattern = new RegExp(
    `^assets/${folder}/[a-zA-Z0-9|-]+.(png|jpg|jpeg|svg)$`
  );
  return pattern;
}
