import envFile from "../constants/envFile";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: envFile.AWS_ACCESS_KEY_ID,
  secretAccessKey: envFile.AWS_SECRET_ACCESS_KEY,
  region: envFile.AWS_REGION,
});
const s3 = new AWS.S3();

/**
 * Function to convert a URI to a Blob object
 * @param {string} uri - The URI of the file
 * @returns {Promise<Blob>} - Returns a promise that resolves with the Blob object
 */
export function uriToBlob(uri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
}

const uploadFileToS3 = (bucketName, fileName, filePath, fileType) => {
  // console.log("aaaa ", fileName);
  const params = {
    ACL: "public-read",
    Bucket: bucketName,
    Key: `${fileName}-${Date.now().toString()}`,
    // Body: fs.readFileSync(filePath),
    Body: filePath,
    ContentType: fileType,
  };
  return s3.upload(params).promise();
};

const AWSHelper = {
  uploadFile: function (path) {
    return new Promise(async (resolve, reject) => {
      try {
        const blob = await uriToBlob(path.uri);
        const bucketName = envFile.AWS_BUCKET;
        const fileName = path.fileName;
        const fileType = path.type;
        let getAws = await uploadFileToS3(bucketName, fileName, blob, fileType);
        resolve(getAws);
      } catch (error) {
        console.log("Error Data -->", error);
        reject(false);
      }
    });
  },
};

export default AWSHelper;
