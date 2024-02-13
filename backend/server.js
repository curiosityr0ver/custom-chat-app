const express = require("express");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config();

console.clear();
connectDB();
const app = express();
app.use(express.json());


app.get('/api/chat', (req, res) => {
    res.send(chats);
});


app.get('api/chat/:id', (req, res) => {
    const singleChat = chats.find(c => c._id == req.params.id);
    res.send(singleChat);
});

app.use('/api/user', userRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));
