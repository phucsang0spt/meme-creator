export function genId(length = 12) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function msToTimer(_ms: number) {
  const ms = _ms / 1000;
  const hours = Math.floor(ms / 3600);
  let remainSeconds = ms - hours * 3600;
  const minutes = Math.floor(remainSeconds / 60);
  remainSeconds = remainSeconds - minutes * 60;

  return `${padL(hours)}:${padL(minutes)}:${padL(Math.round(remainSeconds))}`;
}

export function padL(a: number, b = 2) {
  //string/number,length=2
  return (new Array(b || 2).join("0") + a).slice(-b);
}

export function downloadFile(filename: string, src: string) {
  const a = document.createElement("a");
  a.href = src;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(src);

  document.body.removeChild(a);
}
