"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const ws = new socket_io_1.Server(server);
app.get("/", (req, res) => {
    res.send("Hello World");
});
ws.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('message', (msg) => {
        // stream the received message to all clients
        console.log(msg);
        ws.sockets.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    socket.on("lolol", (msg) => {
        console.log(msg);
    });
    const start = {
        "type": "CONN_START",
    };
    socket.emit("message", start);
});
server.listen(3000, () => {
    console.log("Server started on port 3000");
});
