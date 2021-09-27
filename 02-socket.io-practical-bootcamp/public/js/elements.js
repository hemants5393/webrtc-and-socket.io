const getChatBox = (data) => {
  const { chatboxLabel, chatboxMessagesId, chatboxInputId, chatboxId } = data;

  const chatboxContainer = document.createElement("div");
  chatboxContainer.classList.add("chatbox_container");
  chatboxContainer.setAttribute("id", chatboxId);
  chatboxContainer.innerHTML = `
    <div class="chatbox_label_container">
        <p class="chatbox_label">${chatboxLabel}</p>
    </div>
    <div class="messages_container" id="${chatboxMessagesId}">
        <div class="message_container">
            <p class="message_paragraph">
            <span class="message_author">Hemant: </span>
            Hello World!
            </p>
        </div>
    </div>
    <div class="new_message_input_container">
        <input
            type="text"
            class="new_message_input"
            id="${chatboxInputId}"
            placeholder="Type your message..."
        />
    </div>
  `;

  return chatboxContainer;
};

export default {
  getChatBox,
};
