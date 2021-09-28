// "http://localhost:3000/" is the socket.io server url
const SOCKET_SERVER_URL = "http://localhost:3000/";
let socket = null;

const connectToSocketIoServer = () => {
  socket = io(SOCKET_SERVER_URL);

  // Listen to default "connect" event
  socket.on("connect", () => {
    console.log("Socket connected on client side:", socket.id);
  });
};

const sendGroupChatMessage = (author, messageContent) => {
  const messageData = {
    author,
    messageContent,
  };

  // Emit event to the client
  socket.emit("group-chat-message", messageData);
};

export default {
  connectToSocketIoServer,
  sendGroupChatMessage,
};
