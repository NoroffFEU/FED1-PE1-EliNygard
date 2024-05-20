export function editSuccessMessage() {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  const message = document.createElement("p");
  message.classList.add("message-success");
  message.textContent = "The post was successfully edited!";
  messageContainer.appendChild(message);
  document.body.appendChild(messageContainer);

  setTimeout(() => {
    message.remove();
  }, 3000);
}
