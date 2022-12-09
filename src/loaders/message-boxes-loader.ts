import { genId } from "utils";

const paths = (require as any)
  .context(
    "assets/message-boxes",
    true,
    /^assets\/message-boxes\/[a-zA-Z0-9|-]+\.(png|jpg|jpeg)$/
  )
  .keys();

export const messageBoxes = paths
  .map((path: string) => {
    const [, code] =
      path.match(/^assets\/message-boxes\/([a-zA-Z0-9|-]+)\.(png|jpg|jpeg)/) ||
      [];
    return code
      ? {
          id: genId(),
          src: require(`../${path}`),
        }
      : null;
  })
  .filter(Boolean) as Picture[];
