const app = require("./config");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("welcome to sistech-api");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});