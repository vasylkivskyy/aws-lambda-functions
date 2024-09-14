const AWS = require("aws-sdk");

const sendMessageToSQS = async (event) => {
  const sqs = new AWS.SQS({ region: "us-west-2" });
  const { message } = JSON.parse(event.body);

  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MessageBody: JSON.stringify({ message }),
  };
  console.log("params: ", params);

  try {
    const result = await sqs.sendMessage(params).promise();
    console.log("Message sent to SQS:", result);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Message sent to SQS", result }),
    };
  } catch (error) {
    console.error("Error sending message to SQS:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Error sending message to SQS" }),
    };
  }
};

module.exports = { handler: sendMessageToSQS };
