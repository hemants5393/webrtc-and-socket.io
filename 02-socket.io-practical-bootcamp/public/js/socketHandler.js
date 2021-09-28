import store from "./store.js";
import ui from "./ui.js";

// "http://localhost:3000/" is the socket.io server url
const SOCKET_SERVER_URL = "http://localhost:3000/";
let socket = null;

const connectToSocketIoServer = () => {
  socket = io(SOCKET_SERVER_URL);

  // Listen to default "connect" event
  socket.on("connect", () => {
    console.log("Socket connected on client side:", socket.id);
    registerActiveSession();
  });

  // Listen to "group-chat-message" event from server side
  socket.on("group-chat-message", (messageData) => {
    ui.appendGroupChatMessage(messageData);
  });
};

const sendGroupChatMessage = (author, messageContent) => {
  const messageData = {
    author,
    messageContent,
  };

  // Emit event to the server
  socket.emit("group-chat-message", messageData);
};

const registerActiveSession = () => {
  const userData = {
    username: store.getUsername(),
  };

  // Emit event to the server
  socket.emit("register-new-user", userData);
};

export default {
  connectToSocketIoServer,
  sendGroupChatMessage,
};
