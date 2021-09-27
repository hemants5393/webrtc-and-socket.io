// "http://localhost:3000/" is the server url to connect to
const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  console.log("Socket connected on client side:", socket.id);
});