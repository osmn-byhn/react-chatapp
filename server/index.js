const express = require('express')
const app = express()
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

const server = http.createServer(app);

app.use(cors())
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log("A User connected: " + socket.id);

    socket.on("disconnect", () => {
        console.log("User Disconnected: ", socket.id);
    })
})


server.listen(3001, () => {
    console.log("SERVER RUNNING ON: http//localhost:3001");
})