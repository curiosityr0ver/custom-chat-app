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
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));

const io = require('socket.io')(server, {
    pingTimeout: 90000,
    cors: {
        origin: 'http://localhost:3000',
    }
});

io.on("connection", (socket) => {
    // console.log('connected to socket.io');
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User joined room" + room);
        // socket.emit("connected");
    });

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) {
            console.log("chat.users not defined");
        }
        chat.users.forEach(user => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message received", newMessageRecieved);
        });
        socket.join(room);
        console.log("User joined room" + room);
        // socket.emit("connected");
    });

});
