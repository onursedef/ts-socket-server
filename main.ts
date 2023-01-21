import express, { Application, Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";

const app: Application = express();

const server = http.createServer(app);

const ws = new Server(server);

app.get("/", (req: Request, res: Response) => {
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
        "type" : "CONN_START",
    };

    socket.emit("message", start);
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
