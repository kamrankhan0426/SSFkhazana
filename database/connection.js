const mongoose = require("mongoose");
require('dotenv').config();

const DB = process.env.DATA_BASE;

mongoose.connect(DB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})
.then(() => {
  console.log("Connection Successful");
})
.catch((err) => {
  console.log("No Connection", err);
});
