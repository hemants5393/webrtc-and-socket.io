import store from "./store.js";
import elements from "./elements.js";

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
};

export default {
  goToChatPage,
};
