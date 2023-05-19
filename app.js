require("dotenv").config();
const express = require("express");
const connectToMongoDB = require("./config/db");
const app = express();
const port = process.env.PORT;
connectToMongoDB();

//middlware
app.use(express.json());

// routing configer
app.use("/", require("./routers/userRoutes"));
app.use("/post", require("./routers/postRoutes"));

app.listen(port, () => {
  console.log(`Server Is Running On http://localhost:${port}`);
});
