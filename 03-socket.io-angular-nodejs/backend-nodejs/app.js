// All imports
const express = require("express");

// Execute the express function
const app = express();

// Start the server on localhost with port "3000"
const server = app.listen(3000);

// Setup socket.io
const io = require("./socket").init(server);

let individualUsers = [];
 
// IO connection event
io.on("connection", (socket) => {
  /* Logic for Individual Chat begins here */
  socket.on("register-new-individual-user", (user) => {
    console.log(`Individual user connected: ${user.name} (${user.id}).`);
    socket.emit("new-registered-user", user); // Emit to only sender client
    individualUsers.push(user);
    io.emit("individual-users", individualUsers); // Emit event to all connected clients
  });
  /* Logic for Individual Chat ends here */
 
  // Listen to "hello" event from client side
  socket.on("hello", (message) => {
    console.log("On server side:", message);
    // Emit event to all clients
    io.emit("hello", "Hello from server!!!");
  });
   
  // Listen to default "disconnect" event
  socket.on("disconnect-user", () => {
    socket.disconnect();
  });

  // Listen to default "disconnect" event
  socket.on("disconnect", () => {
    console.log("Socket disconnected from server:", socket.id);
    individualUsers = individualUsers.filter((user) => user.id !== socket.id);
    io.emit("individual-users", individualUsers); // Emit event to all connected clients
  });
});
