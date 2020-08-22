const fs = require("fs");
const AWS = require("aws-sdk");

const BUCKET_NAME = "";
const IAM_USER_KEY = "";
const IAM_USER_SECRET = "";

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