import styles from "./homepage.module.scss";

export const HomePage = () => {
	return (
		<div className={styles["p-home"]}>
			<div className={styles["p-home__canvas-border"]}>
				<canvas id="myCanvas" width={800} height={600}></canvas>
			</div>
		</div>
	);
};
