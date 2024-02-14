const express = require("express");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoute");
const messageRouter = require("./routes/messageRoute");

const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config();

console.clear();
connectDB();
const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use("/api/message", messageRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));
