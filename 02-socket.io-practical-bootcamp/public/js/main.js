import store from "./store.js";
import ui from "./ui.js";
import socketHandler from "./socketHandler.js";

const nameInput = document.querySelector(".introduction_page_name_input");
const chatPageButton = document.querySelector("#enter_chats_button");
const roomSelect = document.querySelector("#room_select");

nameInput.addEventListener("keyup", (event) => {
  store.setUsername(event.target.value);
});

roomSelect.addEventListener("change", (event) => {
  store.setRoomId(event.target.value);
});

chatPageButton.addEventListener("click", () => {
  ui.goToChatPage();
  socketHandler.connectToSocketIoServer();
});
