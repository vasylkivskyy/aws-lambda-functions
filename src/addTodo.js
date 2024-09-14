const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();

  const newTodo = { id, todo, createdAt, completed: false };

  console.log("This is a neTodo: ", newTodo);
  console.log(process.env.TABLE_NAME);
  console.log(process.env.FUNCTION_MODE);

  await dynamodb
    .put({
      TableName: "TodoTable",
      Item: newTodo,
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  };
};

module.exports = { handler: addTodo };
