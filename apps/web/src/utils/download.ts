import { RandomKey } from "./uuid";

export function downLoadImgByLink(imgUrl: string, filename?: string) {
  const a = document.createElement("a");
  a.href = imgUrl;
  const imgName = filename || RandomKey();

  let img = new Image();
  img.setAttribute("crossOrigin", "Anonymous");
  img.onload = function () {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d")!;
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    let url = canvas.toDataURL("images/png");
    let a = document.createElement("a");
    let event = new MouseEvent("click");
    a.download = imgName;
    a.href = url;
    a.dispatchEvent(event);
  };
  img.src = imgUrl;
}
