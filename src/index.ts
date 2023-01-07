import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("chat", (data) => {
    console.log("message from user", data);
    socket.emit("chat", data);
    //test
    socket.emit("chat", {
      networkName: "Freenode",
      channelName: "#ubuntu",
      author: "croraf",
      text: "dwa",
      timestamp: Date.now(),
    });
  });

  socket.on("auth", (data) => {
    console.log("message from user", data);
    socket.emit("auth", {
      networkName: data.networkName,
      //test
      status: data.networkName === "LiberaChat" ? "authenticated" : "error",
    });
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

server.listen(4000, () => {
  console.log("listening on 4000");
});
