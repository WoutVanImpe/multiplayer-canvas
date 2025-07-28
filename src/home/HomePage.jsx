import { Canvas } from "../canvas/Canavs";
import styles from "./homepage.module.scss";

export const HomePage = () => {
	return (
		<div className={styles["p-home"]}>
			<div className={styles["p-home__canvas-border"]}>
				<Canvas width={800} height={600} />
			</div>
		</div>
	);
};
