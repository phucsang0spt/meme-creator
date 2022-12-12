import { genId } from "utils";

const paths = (require as any)
  .context(
    "assets/emojis",
    true,
    /^assets\/emojis\/[a-zA-Z0-9|-]+\.(png|jpg|jpeg)$/
  )
  .keys();

export const emojis = paths
  .map((path: string) => {
    const [, code] =
      path.match(/^assets\/emojis\/([a-zA-Z0-9|-]+)\.(png|jpg|jpeg)/) || [];
    return code
      ? {
          id: genId(),
          src: require(`../${path}`),
        }
      : null;
  })
  .filter(Boolean) as Picture[];
