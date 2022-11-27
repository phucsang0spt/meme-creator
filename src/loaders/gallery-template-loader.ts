import { genId } from "utils";

const paths = (require as any)
  .context(
    "assets/templates",
    true,
    /^assets\/templates\/[a-zA-Z0-9|-]+\.(png|jpg|jpeg)$/
  )
  .keys();

export const galleryTemplates = paths
  .map((path: string) => {
    const [, code] =
      path.match(/^assets\/templates\/([a-zA-Z0-9|-]+)\.(png|jpg|jpeg)/) || [];
    return code
      ? {
          code,
          id: genId(),
          src: require(`../${path}`),
        }
      : null;
  })
  .filter(Boolean) as { code: string; id: string; src: string }[];
