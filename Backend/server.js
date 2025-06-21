const express = require("express");
const cors = require("cors");   
const mongoose = require("mongoose");
require('dotenv').config();


const app = express();
app.use(cors())
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

const userRouter = require("./models/User");
const eventRouter = require("./models/Event");

app.use('/Users', userRouter);
app.use('/Events', eventRouter);

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});  