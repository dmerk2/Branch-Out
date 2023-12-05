require("dotenv").config();
const { S3 } = require("aws-sdk");

const s3 = new S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const generatePresignedUrl = async (key) => {
  console.log("bucket name: ", process.env.S3_BUCKET)
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Expires: 300,
  };

  return s3.getSignedUrlPromise("putObject", params);
};

module.exports = { generatePresignedUrl };
