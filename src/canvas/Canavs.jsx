import { useEffect, useRef, useState } from "react";
import { Loading } from "../loading/Loading";

export const Canvas = (props) => {
	const canvasRef = useRef(null);
	const socketRef = useRef(null);
	const [data, setData] = useState(null);
	const [playerPos, setPlayerPos] = useState({ x: 400, y: 300 });
	const [position, setPosition] = useState(null);

	const name = "bob";
	const color = "#fff";

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8080");
		socketRef.current = socket;

		socket.onopen = () => {
			console.log("Verbonden met WebSocket-server");
		};

		socket.onmessage = (e) => {
			let data = JSON.parse(e.data);
			setData(data);
			setPosition(data.length);
			console.log(data);
		};

		socket.onerror = (err) => {
			console.error("WebSocket fout:", err);
		};

		socket.onclose = () => {
			console.log("WebSocket gesloten");
		};

		return () => socket.close();
	}, []);

	useEffect(() => {
		const handleMove = (e) => {
			setPlayerPos((prev) => {
				const step = 5;
				if (e.key === "ArrowUp") {
					setPlayerPos({ x: prev.x, y: prev.y - step });
				} else if (e.key === "ArrowDown") {
					setPlayerPos({ x: prev.x, y: prev.y + step });
				} else if (e.key === "ArrowLeft") {
					setPlayerPos({ x: prev.x - step, y: prev.y });
				} else if (e.key === "ArrowRight") {
					setPlayerPos({ x: prev.x + step, y: prev.y });
				}
			});
		};

		window.addEventListener("keydown", handleMove);
		return () => window.removeEventListener("keydown", handleMove);
	}, []);

	useEffect(() => {
		if (data != null) {
			const canvas = canvasRef.current;
			const context = canvas.getContext("2d");

			const width = canvas.width;
			const height = canvas.height;

			context.clearRect(0, 0, width, height);
			context.fillStyle = color;
			context.strokeStyle = color;
			context.beginPath();
			context.arc(playerPos.x, playerPos.y, 4, 0, 2 * Math.PI);
			context.fill();
			context.font = "14px Segoe UI";
			context.strokeText(name, playerPos.x, playerPos.y - 8);
		}
	}, [playerPos, data]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && data !== null) {
				const message = {
					x: playerPos.x,
					y: playerPos.y,
					name,
					color,
					position: position,
				};
				socketRef.current.send(JSON.stringify(message));
			}
		}, 500);

		return () => clearInterval(interval);
	}, [playerPos, data]);

	return data !== null ? <canvas ref={canvasRef} width={800} height={600} {...props} /> : <Loading />;
};
