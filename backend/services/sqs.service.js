const {
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");

const sqsClient = require("../config/sqs.config");

// const QUEUE_URL = "YOUR_SQS_QUEUE_URL";

const QUEUE_URL = process.env.SQS_QUEUE_URL;

const sendMessage = async (messageBody) => {
  try {
    const params = {
      QueueUrl: QUEUE_URL,
      MessageBody: JSON.stringify(messageBody),
    };

    const response = await sqsClient.send(new SendMessageCommand(params));

    console.log("Message Sent:", response.MessageId);

    return response;
  } catch (error) {
    console.error("SQS Send Error:", error);
    throw error;
  }
};

const receiveMessages = async () => {
  try {
    const response = await sqsClient.send(
      new ReceiveMessageCommand({
        QueueUrl: QUEUE_URL,
        MaxNumberOfMessages: 5,
        WaitTimeSeconds: 5,
      })
    );

    return response.Messages || [];
  } catch (error) {
    console.error(error);
  }
};

const deleteMessage = async (receiptHandle) => {
  try {
    await sqsClient.send(
      new DeleteMessageCommand({
        QueueUrl: QUEUE_URL,
        ReceiptHandle: receiptHandle,
      })
    );

    console.log("Message Deleted");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendMessage,
  receiveMessages,
  deleteMessage,
};
