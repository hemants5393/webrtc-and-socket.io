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
    store.setSocketId(socket.id);
    registerActiveSession();
  });

  // Listen to "group-chat-message" event from server side
  socket.on("group-chat-message", (messageData) => {
    ui.appendGroupChatMessage(messageData);
  });

  // Listen to "active-peers" event from server side
  socket.on("active-peers", (data) => {
    ui.updateActiveChatboxes(data);
  });

  // Listen to "direct-message" event from server side
  socket.on("direct-message", (data) => {
    console.log("direct-message:", data);
  });
};

const registerActiveSession = () => {
  const userData = {
    username: store.getUsername(),
  };

  // Emit event to the server
  socket.emit("register-new-user", userData);
};

const sendGroupChatMessage = (author, messageContent) => {
  const messageData = {
    author,
    messageContent,
  };

  // Emit event to the server
  socket.emit("group-chat-message", messageData);
};

const sendDirectMessage = (data) => {
  // Emit event to the server
  socket.emit("direct-message", data);
};



export default {
  connectToSocketIoServer,
  sendGroupChatMessage,
  sendDirectMessage,
};
