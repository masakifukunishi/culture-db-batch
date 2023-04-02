const fs = require("fs").promises;

const imageDownload = async (url, name) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(`images/tmp/${name}.png`, buffer);
};

module.exports = {
  imageDownload,
};
