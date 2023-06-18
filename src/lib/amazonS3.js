import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

class AmazonS3 {
  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(url, path) {
    const res = await fetch(url);
    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: path,
      Body: buffer,
    };

    const command = new PutObjectCommand(params);

    await this.s3.send(command);

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${path}`;
  }
}

export default AmazonS3;
