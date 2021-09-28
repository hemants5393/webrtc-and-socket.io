// "http://localhost:3000/" is the socket.io server url
const SOCKET_SERVER_URL = "http://localhost:3000/";
let socket = null;

const connectToSocketIoServer = () => {
  socket = io(SOCKET_SERVER_URL);

  // Listen to default "connect" event
  socket.on("connect", () => {
    console.log("Socket connected on client side:", socket.id);
  });

  // Listen to "hello-client" event from server side
  socket.on("hello-client", function (data) {
    console.log(data.message);
  });

  // Emit event to the client
  socket.emit("hello-server", {
    message: "Hello Server!",
  });
};

export default {
  connectToSocketIoServer,
};
