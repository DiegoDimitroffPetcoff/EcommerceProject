const { app } = require("./app");
const { SERVER } = require("./routes/productRoute");
const PORT = parseInt(process.argv[2]) || 8080;

SERVER.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
SERVER.on("Error", (error) => console.log("error en servidor ${error}"));
