import store from "./store.js";

const nameInput = document.querySelector(".introduction_page_name_input");
nameInput.addEventListener("keyup", (event) => {
  store.setUsername(event.target.value);
});

// "http://localhost:3000/" is the server url to connect to
const socket = io("http://localhost:3000/");

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
