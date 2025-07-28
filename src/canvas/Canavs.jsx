import { useEffect, useRef, useState } from "react";

export const Canvas = (props) => {
	const canvasRef = useRef(null);
	const [playerPos, setPlayerPos] = useState({ x: 400, y: 300 });

	window.onkeydown = move;

	function move(e) {
		if (e.key === "ArrowUp") {
			setPlayerPos({ x: playerPos.x, y: playerPos.y - 5 });
		} else if (e.key === "ArrowDown") {
			setPlayerPos({ x: playerPos.x, y: playerPos.y + 5 });
		} else if (e.key === "ArrowLeft") {
			setPlayerPos({ x: playerPos.x - 5, y: playerPos.y });
		} else if (e.key === "ArrowRight") {
			setPlayerPos({ x: playerPos.x + 5, y: playerPos.y });
		}
	}

	function drawCircle(context, color, x, y, rad) {
		context.fillStyle = color;
		context.beginPath();
		context.arc(x, y, rad, 0, 2 * Math.PI);
		context.fill();
	}

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		const width = context.canvas.width;
		const height = context.canvas.height;

		context.clearRect(0, 0, width, height);
		drawCircle(context, "#fff", playerPos.x, playerPos.y, 4);
	}, [playerPos]);

	return <canvas ref={canvasRef} {...props} />;
};
