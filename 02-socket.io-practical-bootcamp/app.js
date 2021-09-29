// All imports
const express = require("express");

// Execute the express function
const app = express();

/* 
  Set the view engine to show dynamic content in html with "ejs" files
  2nd argument "views" is the folder name which has html files
*/
app.set("view engine", "ejs");
app.set("views", "views");

// Serving the "public" folder statically (Serve the files in the folder as if they were in the root folder)
app.use(express.static(__dirname + "/public"));

app.use("/", (req, res, next) => {
  /* 
    To handle favicon request issue.
    If we don't use this code then each request runs twice.
  */
  if (req.originalUrl.includes("favicon.ico")) {
    return res.status(204).end();
  }
  // Forward the incoming request to the next middleware
  next();
});

app.get("/", (req, res, next) => {
  res.render("index");
});

// Start the server on localhost with port "3000"
const server = app.listen(3000);

// Setup socket.io
const io = require("./socket").init(server);

// IO connection event
let connectedPeers = [];
io.on("connection", (socket) => {
  console.log("Socket connected on server side:", socket.id);

  // Listen to "group-chat-message" event from client side
  socket.on("register-new-user", (userData) => {
    const { username, roomId } = userData;

    const newPeer = {
      username,
      roomId,
      socketId: socket.id,
    };

    // Join socket.io Room
    socket.join(roomId);

    connectedPeers = [...connectedPeers, newPeer];
    broadcastConnectedPeers();
  });

  // Listen to "group-chat-message" event from client side
  socket.on("group-chat-message", (messageData) => {
    // Emit event to all clients
    io.emit("group-chat-message", messageData);
  });

  // Listen to "direct-message" event from client side
  socket.on("direct-message", (data) => {
    const { receiverSocketId } = data;
    const connectedPeer = connectedPeers.find(
      (peer) => peer.socketId === receiverSocketId
    );
    if (connectedPeer) {
      const authorData = {
        ...data,
        isAuthor: true,
      };

      // Emit event with message to sender client
      socket.emit("direct-message", authorData);

      // Emit event with message to receiver client
      io.to(receiverSocketId).emit("direct-message", data);
    }
  });

  // Listen to "room-message" event from client side
  socket.on("room-message", (data) => {
    const { roomId } = data;

      // Emit event with message to receiver client room
      io.to(roomId).emit("room-message", data);
  });

  // Listen to default "disconnect" event
  socket.on("disconnect", () => {
    connectedPeers = connectedPeers.filter(
      (peer) => peer.socketId !== socket.id
    );
    broadcastConnectedPeers();
    broadcastDisconnectedPeer(socket.id);
  });
});

const broadcastConnectedPeers = () => {
  const data = {
    connectedPeers,
  };
  // Emit event to all clients
  io.emit("active-peers", data);
};

const broadcastDisconnectedPeer = (socketId) => {
  const data = {
    socketIdOfDisconnectedPeer: socketId,
  };
  // Emit event to all clients
  io.emit("peer-disconnected", data);
};
