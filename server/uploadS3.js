const fs = require("fs");
const AWS = require("aws-sdk");

const BUCKET_NAME = "pdf-place";
const IAM_USER_KEY = "AKIA3JWUGIB5YJFT5KF3";
const IAM_USER_SECRET = "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";

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});

exports.upload = function uploadToS3(fileName) {
  const readStream = fs.createReadStream(fileName);

  const params = {
    Bucket: BUCKET_NAME,
    Key: "pdf_upload" + "/" + fileName,
    Body: readStream
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, function(err, data) {
      readStream.destroy();
      
      if (err) {
        return reject(err);
      }
      
      return resolve(data);
    });
  });
}