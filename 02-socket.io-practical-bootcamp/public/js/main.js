import store from "./store.js";
import ui from "./ui.js";
import socketHandler from "./socketHandler.js";

const nameInput = document.querySelector(".introduction_page_name_input");
const chatPageButton = document.querySelector("#enter_chats_button");

nameInput.addEventListener("keyup", (event) => {
  store.setUsername(event.target.value);
});

chatPageButton.addEventListener("click", () => {
  ui.goToChatPage();
  socketHandler.connectToSocketIoServer();
});
