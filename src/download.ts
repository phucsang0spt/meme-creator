import { Filesystem, Directory } from "@capacitor/filesystem";
import { isPlatform } from "@ionic/react";
import { genId } from "utils";

export async function downloadFile(filename: string, src: string) {
  const isAndroidOrIos = isPlatform("android") || isPlatform("ios");
  if (isAndroidOrIos) {
    await Filesystem.writeFile({
      path: `${genId()}-${filename}`,
      data: src,
      directory: Directory.Documents,
    });
  } else {
    const a = document.createElement("a");
    a.href = src;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(src);

    document.body.removeChild(a);
  }
}
