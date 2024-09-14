const AWS = require("aws-sdk");

const fetchTodos = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let todos;
  console.log("table_name:", process.env.TABLE_NAME);
  console.log("FUNCTION_MODE: ", process.env.FUNCTION_MODE);
  try {
    const results = await dynamodb.scan({ TableName: "TodoTable" }).promise();
    todos = results.Items;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todos),
  };
};

module.exports = { handler: fetchTodos };
