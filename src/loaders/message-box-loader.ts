import { genId } from "utils";
import { getPattern } from "./pattern";

const paths = (require as any)
  .context(
    "assets/message-boxes",
    true,
    /^assets\/message-boxes\/[a-zA-Z0-9|-]+\.(png|jpg|jpeg)$/
  )
  .keys();
const pattern = getPattern("message-boxes");

export const messageBoxes = paths
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
