const AWS = require("aws-sdk");

const fetchTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let todo;

  try {
    const result = await dynamodb
      .get({
        TableName: "TodoTable",
        Key: { id },
      })
      .promise();
    todo = result.Item;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 203,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  };
};

module.exports = { handler: fetchTodo };
