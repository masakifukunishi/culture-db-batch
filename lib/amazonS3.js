import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const uploadFile = async (url) => {
  console.log(url);
  const res = await fetch(url);
  const blob = await res.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: "main/test.png",
    Body: buffer,
  };

  return s3.upload(params).promise();
};
export default { uploadFile };
