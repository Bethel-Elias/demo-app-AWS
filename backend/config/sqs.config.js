// const { SQSClient } = require("@aws-sdk/client-sqs");

// const sqsClient = new SQSClient({
//   region: "us-east-1",
// });

// module.exports = sqsClient;



require("dotenv").config();

const { SQSClient } = require("@aws-sdk/client-sqs");

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION,

  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = sqsClient;