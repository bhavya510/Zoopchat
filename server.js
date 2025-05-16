const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://127.0.0.1:3004", // Your frontend origin
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("send-message", (msg) => {
    console.log("💬 Message received:", msg);
    // Broadcast to all except sender
    socket.broadcast.emit("receive-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅ Server running at http://127.0.0.1:${PORT}`);
});
