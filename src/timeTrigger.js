const timeTrigger = async (event) => {
  const currentTime = new Date().toUTCString();
  console.log("Time Trigger function executed at:", currentTime);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Time trigger function executed successfully",
      time: currentTime,
    }),
  };
};

module.exports = { handler: timeTrigger };
