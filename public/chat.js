// eslint-disable-next-line no-undef
const socket = io("http://localhost:3333");

const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

const messages_container = document.getElementById("messages_container");

function addMessage(data) {
    const newMessage = document.createElement("div");
    newMessage.className = "new_message";
    newMessage.innerHTML = `
        <label class="form-label">
            <strong> ${data.username} </strong> <span> ${data.text} - ${data.created_at} </span>
        </label>`;

    messages_container.appendChild(newMessage);
}

socket.emit("select_room", {
    username,
    room,
});

socket.on("message", (data) => {
    addMessage(data);
});

socket.on("messages", (data) => {
    data.forEach((message) => addMessage(message));
});

document
    .getElementById("message_input")
    .addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const message = event.target.value;
            // eslint-disable-next-line no-param-reassign
            event.target.value = "";

            const data = {
                room,
                message,
                username,
            };

            socket.emit("message", data);
        }
    });
