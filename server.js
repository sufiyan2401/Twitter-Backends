const express = require("express");
const mongoose = require("mongoose");
const StudentRouter = require("./routes/studentRouter");
const UserRoute = require("./routes/userroute");
const PostRoute = require("./routes/postsroute");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())


app.use("/api/post", PostRoute);
app.use("/api/student", StudentRouter);
app.use("/api/user", UserRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Database Connected Successfully and server is listening on this port 5000"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
