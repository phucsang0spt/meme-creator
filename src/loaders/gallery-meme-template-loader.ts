import { genId } from "utils";
import { getPattern } from "./pattern";

const paths = (require as any)
  .context(
    "assets/templates",
    true,
    /^assets\/templates\/[a-zA-Z0-9|-]+\.(png|jpg|jpeg)$/
  )
  .keys();
const pattern = getPattern("templates");

export const galleryMemeTemplates = paths
  .map((path: string) => {
    const [, code] = path.match(pattern) || [];
    return code
      ? {
          id: genId(),
          tags: code.split("-").map((tag) => tag.toLowerCase()),
          src: require(`../${path}`),
        }
      : null;
  })
  .filter(Boolean) as MemeTemplate[];
