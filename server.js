const http = require("http");
const WebSocket = require("ws");
require("./environment");
const app = require("./app")({ updateAppointment });

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  socket.onmessage = (event) => {
    console.log(`Message Received: ${event.data}`);

    if (event.data === "ping") {
      socket.send(JSON.stringify("pong"));
    }
  };
});

function updateAppointment(id, interview) {
  wss.clients.forEach(function eachClient(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "SET_INTERVIEW",
          id,
          interview,
        })
      );
    }
  });
}

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
