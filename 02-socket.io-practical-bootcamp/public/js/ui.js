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
  connectedPeers.forEach((peer) => {
    createNewUserChatbox(peer);
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
};

export default {
  goToChatPage,
  appendGroupChatMessage,
  updateActiveChatboxes,
};
