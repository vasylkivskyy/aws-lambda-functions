const AWS = require("aws-sdk");

const readMessageFromSQS = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    const { body } = record;
    console.log("====Message body:", body);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Messages processed" }),
  };
};

module.exports = { handler: readMessageFromSQS };
