import { WebSocketServer } from "ws";

const port = process.env.PORT || 8080;
console.log(`Start WebSocket-server op poort ${port}...`);

const wss = new WebSocketServer({ port });

let positions = [];

wss.on("listening", () => {
	console.log(`WebSocket-server luistert op ws://localhost:${port}`);
});

wss.on("connection", function connection(ws) {
	console.log("🔌 Nieuwe client verbonden");

	ws.on("error", (err) => {
		console.error("WebSocket fout:", err);
	});

	ws.on("message", function message(data) {
		console.log("Bericht ontvangen:", data.toString());
	});
	ws.send(JSON.stringify(positions));
});
