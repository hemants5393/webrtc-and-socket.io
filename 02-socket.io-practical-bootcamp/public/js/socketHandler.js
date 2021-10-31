import store from "./store.js";
import ui from "./ui.js";

// "http://localhost:3000/" is the socket.io server url
const SOCKET_SERVER_URL = "http://localhost:3000/";
let socket = null;
let orderSocket = null;
let userSocket = null;

const connectToSocketIoServer = () => {
  socket = io(SOCKET_SERVER_URL); // the main namespace

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

  // Listen to "peer-disconnected" event from server side
  socket.on("peer-disconnected", (data) => {
    ui.removeChatBoxOfDisconnectedPeer(data);
  });

  // Listen to "direct-message" event from server side
  socket.on("direct-message", (data) => {
    ui.appendDirectChatMessage(data);
  });

  // Listen to "room-message" event from server side
  socket.on("room-message", (data) => {
    ui.appendRoomChatMessage(data);
  });

  /* Namespace code */
  orderSocket = io("http://localhost:3000/orders"); // the "orders" namespace
  userSocket = io("http://localhost:3000/users"); // the "users" namespace

  // Listen to "connect" event on "orders" namespace
  orderSocket.on("connect", () => {
    console.log(
      "Socket connected on client side (orders namespace):",
      orderSocket.id
    );
    // Emit event to the server
    orderSocket.emit("new-user", "hello!");
    // Listen to "new-user" event from server side
    orderSocket.on("new-user", (data) => {
      console.log(
        "Message received on client side (orders namespace):",
        data
      );
    });
  });

  // Listen to "connect" event on "users" namespace
  userSocket.on("connect", () => {
    console.log(
      "Socket connected on client side (users namespace):",
      userSocket.id
    );
    // Emit event to the server
    userSocket.emit("new-user", userSocket.id);
  });
};

const registerActiveSession = () => {
  const userData = {
    username: store.getUsername(),
    roomId: store.getRoomId(),
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

const sendRoomMessage = (data) => {
  // Emit event to the server
  socket.emit("room-message", data);
};

export default {
  connectToSocketIoServer,
  sendGroupChatMessage,
  sendDirectMessage,
  sendRoomMessage,
};
