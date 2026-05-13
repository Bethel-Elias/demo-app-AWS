const sqsService = require("./services/sqs.service");

const pollMessages = async () => {
  console.log("Polling messages...");

  const messages = await sqsService.receiveMessages();

  for (const message of messages) {
    console.log("Received:", message.Body);

    // Process data here

    await sqsService.deleteMessage(message.ReceiptHandle);
  }
};

setInterval(pollMessages, 5000);


