import store from "./store.js";
import elements from "./elements.js";
import socketHandler from "./socketHandler.js";

const chatboxMessagesId = "group-chat-chatbox";
const chatboxInputId = "group-chat-messages";
const chatboxId = "group-chat-input";

const goToChatPage = () => {
  const introductionPage = document.querySelector(".introduction_page");
  const chatPage = document.querySelector(".chat_page");

  introductionPage.classList.add("display_none");
  chatPage.classList.remove("display_none");
  chatPage.classList.add("display_flex");

  const username = store.getUsername();
  updateUsername(username);
  createGroupChatBox();
  createRoomChatBox();
};

const updateUsername = (username) => {
  const usernameLabel = document.querySelector(".username_label");
  usernameLabel.innerHTML = username;
};

const createGroupChatBox = (username) => {
  const data = {
    chatboxLabel: "Group chat",
    chatboxMessagesId,
    chatboxInputId,
    chatboxId,
  };

  const chatbox = elements.getChatBox(data);
  const chatboxesContainer = document.querySelector(".chatboxes_container");
  chatboxesContainer.appendChild(chatbox);

  const newMessageInput = document.getElementById(chatboxInputId);
  newMessageInput.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Enter") {
      const author = store.getUsername();
      const messageContent = event.target.value;

      // Send message to socket.io server
      socketHandler.sendGroupChatMessage(author, messageContent);
      newMessageInput.value = "";
    }
  });
};

const appendGroupChatMessage = (data) => {
  const groupChatboxMessagesContainer =
    document.getElementById(chatboxMessagesId);
  const chatMessage = elements.getGroupChatMessage(data);
  groupChatboxMessagesContainer.appendChild(chatMessage);
};

const updateActiveChatboxes = (data) => {
  const { connectedPeers } = data;
  const userSocketId = store.getSocketId();

  connectedPeers.forEach((peer) => {
    const activeChatboxes = store.getActiveChatboxes();
    const activeChatbox = activeChatboxes.find(
      (chatbox) => peer.socketId === chatbox.socketId
    );

    if (!activeChatbox && peer.socketId !== userSocketId) {
      createNewUserChatbox(peer);
    }
  });
};

const createNewUserChatbox = (peer) => {
  const chatboxId = peer.socketId;
  const chatboxMessagesId = `${peer.socketId}-messages`;
  const chatboxInputId = `${peer.socketId}-input`;
  const data = {
    chatboxLabel: peer.username,
    chatboxMessagesId,
    chatboxInputId,
    chatboxId,
  };

  const chatbox = elements.getChatBox(data);
  const chatboxesContainer = document.querySelector(".chatboxes_container");
  chatboxesContainer.appendChild(chatbox);

  // register event listeners for chatbox input to send a message to other user
  const newMessageInput = document.getElementById(chatboxInputId);
  newMessageInput.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Enter") {
      const author = store.getUsername();
      const messageContent = event.target.value;
      const receiverSocketId = peer.socketId;
      const authorSocketId = store.getSocketId();

      const data = {
        author,
        messageContent,
        receiverSocketId,
        authorSocketId,
      };

      // Send message to socket.io server
      socketHandler.sendDirectMessage(data);
      newMessageInput.value = "";
    }
  });

  // push to active chatboxes new user box
  const activeChatboxes = store.getActiveChatboxes();
  const newActiveChatboxes = [...activeChatboxes, peer];
  store.setActiveChatboxes(newActiveChatboxes);
};

const appendDirectChatMessage = (messageData) => {
  const { author, messageContent, authorSocketId, isAuthor, receiverSocketId } =
    messageData;
  const messagesContainer = isAuthor
    ? document.getElementById(`${receiverSocketId}-messages`)
    : document.getElementById(`${authorSocketId}-messages`);

  if (messagesContainer) {
    const data = {
      author,
      messageContent,
      alignRight: isAuthor ? true : false,
    };
    const message = elements.getDirectChatMessage(data);
    messagesContainer.appendChild(message);
  }
};

const removeChatBoxOfDisconnectedPeer = (data) => {
  const { socketIdOfDisconnectedPeer } = data;

  // Remove active chatbox details from the store
  const activeChatboxes = store.getActiveChatboxes();
  const newActiveChatboxes = activeChatboxes.filter(
    (chatbox) => chatbox.socketId !== socketIdOfDisconnectedPeer
  );
  store.setActiveChatboxes(newActiveChatboxes);

  // Remove chatbox from chatboxes container in HTML DOM
  const chatbox = document.getElementById(socketIdOfDisconnectedPeer);
  if (chatbox) {
    chatbox.parentElement.removeChild(chatbox);
  }
};

const createRoomChatBox = () => {
  const roomId = store.getRoomId();

  const chatboxLabel = roomId;
  const chatboxId = roomId;
  const chatboxMessagesId = `${roomId}-messages`;
  const chatboxInputId = `${roomId}-input`;

  const data = {
    chatboxLabel,
    chatboxId,
    chatboxMessagesId,
    chatboxInputId,
  };

  const chatbox = elements.getChatBox(data);
  const chatboxesContainer = document.querySelector(".chatboxes_container");
  chatboxesContainer.appendChild(chatbox);

  // register event listeners for room chatbox input
  const newMessageInput = document.getElementById(chatboxInputId);
  newMessageInput.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Enter") {
      const author = store.getUsername();
      const messageContent = event.target.value;
      const authorSocketId = store.getSocketId();

      const data = {
        author,
        messageContent,
        roomId,
        authorSocketId,
      };

      // Send message to socket.io server
      socketHandler.sendRoomMessage(data);
      newMessageInput.value = "";
    }
  });
};

const appendRoomChatMessage = (messageData) => {
  const { roomId } = messageData;
  const chatboxMessagesId = `${roomId}-messages`;

  const roomChatboxMessagesContainer =
    document.getElementById(chatboxMessagesId);

  if (roomChatboxMessagesContainer) {
    const message = elements.getGroupChatMessage(messageData);
    roomChatboxMessagesContainer.appendChild(message);
  }
};

export default {
  goToChatPage,
  appendGroupChatMessage,
  updateActiveChatboxes,
  appendDirectChatMessage,
  removeChatBoxOfDisconnectedPeer,
  createRoomChatBox,
  appendRoomChatMessage,
};
