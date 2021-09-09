import socketIo, { Socket } from "socket.io";
import http from "http";
import express, { Application, response } from "express";
import path from "path";
const app: Application = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("new user connection");
  //servr is listin now wita emit clinet
  socket.on("serverListin", (data) => {
    console.log("server is listin", data);
  });
  socket.on("sendMsg", () => {
    io.to("myRoom").emit("newMsg");
  });
  socket.on("joinRoom", () => {
    socket.join("myRoom");
  });
  // server is emit now and the clint wait the sever finshed is emit
  socket.emit("ServerEmit");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
server.listen(4000, () => {
  console.log("server is listen");
});
