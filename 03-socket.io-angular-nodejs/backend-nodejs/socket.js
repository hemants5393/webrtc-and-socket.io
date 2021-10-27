let io;

module.exports = {
  init: (httpServer) => {
    // Setup socket.io with explicitly enabling CORS
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
