import { genId } from "utils";

const paths = (require as any)
  .context(
    "assets/templates",
    true,
    /^assets\/templates\/[a-zA-Z0-9|-]+\.(png|jpg|jpeg)$/
  )
  .keys();

export const galleryMemeTemplates = paths
  .map((path: string) => {
    const [, code] =
      path.match(/^assets\/templates\/([a-zA-Z0-9|-]+)\.(png|jpg|jpeg)/) || [];
    return code
      ? {
          id: genId(),
          src: require(`../${path}`),
        }
      : null;
  })
  .filter(Boolean) as MemeTemplate[];
