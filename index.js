const express = require("express");
const cors = require("cors");
const { connectToServer } = require("./utils/dbConnect");
const errorhandler = require("./middleware/errorhandler");
const userRouter = require("./routes/v1/user.route");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log("HEY connected database", port);
    });
  } else {
    console.log("You have to  sure connect!!");
  }
});

app.use("/api/v1/user", userRouter);

app.all("*", (req, res) => {
  res.send("No route found");
});

app.use(errorhandler);

// process.on("unhandledRejection", (error) => {
//   console.log(error.name, error.message);
//   app.close(() => {
//     process.exit(1);
//   });
// });
