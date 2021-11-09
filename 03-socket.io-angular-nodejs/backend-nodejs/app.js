const express = require("express");
const app = express(); // Execute the express function
const server = app.listen(3000); // Start the server on localhost with port "3000"
const io = require("./socket").init(server); // Setup socket.io

/* Code for Individual Chat begins here */
let individualUsers = [];
const iChatIo = io.of("/iChat"); // Created namespace "iChat"
iChatIo.on("connection", (socket) => {
  socket.on("connect-user", (user) => {
    console.log(`iChat user connected: ${user.name} (${user.id}).`);
    socket.emit("current-user", user); // Emit to only sender client
    individualUsers.push(user);
    iChatIo.emit("all-users", individualUsers); // Emit event to all connected clients
  });

  socket.on("message", (messageData) => {
    const receiver = messageData.receiver;
    const isReceiverPresent = individualUsers.find(
      (user) => user.id === receiver.id
    );
    if (isReceiverPresent) {
      // Emit event with message to sender client
      socket.emit("message", {
        ...messageData,
        isSender: true,
      });

      // Emit event with message to receiver client
      iChatIo.to(receiver.id).emit("message", {
        ...messageData,
        isSender: false,
      });
    }
  });

  socket.on("disconnect-user", () => {
    socket.disconnect();
  });

  socket.on("disconnect", () => {
    //  Listen to default "disconnect" event
    const user = individualUsers.filter((user) => user.id === socket.id);
    console.log(`iChat user disconnected: ${user[0].name} (${user[0].id}).`);
    individualUsers = individualUsers.filter((user) => user.id !== socket.id);
    iChatIo.emit("all-users", individualUsers); // Emit event to all connected clients
  });
});
/* Code for Individual Chat ends here */

/* Code for Group Chat begins here */
// // Listen to "hello" event from client side
// socket.on("hello", (message) => {
//   console.log("On server side:", message);
//   // Emit event to all clients
//   io.emit("hello", "Hello from server!!!");
// });
/* Code for Group Chat ends here */
