const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rootRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors({}));


app.use("/api/v1", rootRouter);

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});