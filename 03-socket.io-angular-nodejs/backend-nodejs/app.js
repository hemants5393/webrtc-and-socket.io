// All imports
const express = require("express");

// Execute the express function
const app = express();

// Start the server on localhost with port "3000"
const server = app.listen(3000);

// Setup socket.io
const io = require("./socket").init(server);

// IO connection event
io.on("connection", (socket) => {
  console.log("Socket connected on server:", socket.id);

  // Listen to "hello" event from client side
  socket.on("hello", (message) => {
    console.log("On server side:", message);
    // Emit event to all clients
    io.emit("hello", "Hello from server!!!");
  });

  // Listen to default "disconnect" event
  socket.on("disconnect", () => {
    console.log("Socket disconnected from server:", socket.id);
  });
});
