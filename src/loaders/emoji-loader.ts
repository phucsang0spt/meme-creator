import { genId } from "utils";
import { getPattern } from "./pattern";

const paths = (require as any)
  .context(
    "assets/emojis",
    true,
    /^assets\/emojis\/[a-zA-Z0-9|-]+\.(png|jpg|jpeg|svg)$/
  )
  .keys();
const pattern = getPattern("emojis");

export const emojis = paths
  .map((path: string) => {
    const [, code] = path.match(pattern) || [];

    return code
      ? {
          id: genId(),
          src: require(`../${path}`),
        }
      : null;
  })
  .filter(Boolean) as Picture[];
