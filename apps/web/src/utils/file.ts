import path from "path-browserify";

// 格式化content-disposition字段
export function normalizeContentDis(rawDisposition: string) {
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(rawDisposition);
  let filename = "文件";
  if (matches != null && matches[1]) {
    filename = matches[1].replace(/['"]/g, "");
  }

  return decodeURIComponent(filename);
}

// 下载文件（blob）
export function downloadFile(fileData: Blob, fileName = "新文件") {
  if (fileData instanceof Blob) {
    const blob = new Blob([fileData]);
    if ("download" in document.createElement("a")) {
      // 非IE下载
      const elink = document.createElement("a");
      elink.download = fileName;
      elink.style.display = "none";
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    } else {
      // IE10+下载
      (navigator as any).msSaveBlob(blob, fileName);
    }
  }
}

export function downloadFileLink(fileLink: string) {
  if (fileLink) {
    window.open(fileLink);
  }
}

// 下载文件（链接）用于不能window.open的链接
export function downloadFilePureLink(url: string, fileName: string) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link: any = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName || url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}

//下载图片地址和图片名
export const downloadImage = (imgsrc: string, name: string) => {
  const image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d")!;
    context.drawImage(image, 0, 0, image.width, image.height);
    const url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

    const a = document.createElement("a"); // 生成一个a元素
    const event = new MouseEvent("click"); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
  };
  image.src = imgsrc + "?v=" + Math.random();
};

export function getFileUrlInfo(fileUrl: string): {
  filename: string;
  extname: string;
} {
  if (!fileUrl) {
    return {
      filename: "",
      extname: "",
    };
  }
  const filePathObj = path.parse(fileUrl);
  // console.log("filePathObj ", filePathObj,this.accept);
  const filename = filePathObj.name;
  const extname = filePathObj.ext;

  return {
    filename,
    extname,
  };
}

export function getFileExtension(url: string) {
  const origin = url.trim();
  if (!origin) return "";

  // 移除查询参数
  const pathWithoutQuery = origin.split("?")[0];

  const lastDotIndex = pathWithoutQuery.lastIndexOf(".");
  if (lastDotIndex === -1) return "";

  return pathWithoutQuery.substring(lastDotIndex + 1);
}
