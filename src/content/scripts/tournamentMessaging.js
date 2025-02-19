const deployed = false;
const connectionString = deployed
  ? "https://hotshot-tournaments.herokuapp.com/"
  : "http://10.223.69.35:8000";
const socket = io.connect(connectionString);

const form = document.querySelector("#send-message-form");
const message = document.querySelector("#input-message");
const tournamentID = document.querySelector("#tournamentID").textContent;

socket.on("newMessage", (message) => {
  const messagesContainer = document.querySelector("#messages-container");

  messagesContainer.innerHTML =
    messagesContainer.innerHTML +
    /*html*/ `
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">${message.user.name}</h5>
      <p class="card-title">${message.body}</p>
    </div>
  </div>
`;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const messageValue = message.value;
  fetch(`/messages/tournament/${tournamentID}`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json" //for when the application only accepts JSON input
      "Content-Type": "application/x-www-form-urlencoded" //for when the application only accepts form urlencoded input
    },
    //when using FORM - URLENCODED use the URLSearchParams class fort the body
    body: new URLSearchParams({
      message: messageValue
    })
  });

  //set the value of the message box back to empty
  document.querySelector("#input-message").value = "";
});

function copyText() {
  const tournamentLink = document.getElementById("tournamentInviteLink");
  tournamentLink.select();
  tournamentLink.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert(`Copied to your clipboard`);
}
