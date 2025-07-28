import styles from "./loading.module.scss";

export const Loading = () => {
	return (
		<div className={styles["container"]}>
            <p>Try reloading if taking long</p>
			<div className={styles["lds-dual-ring"]}></div>
		</div>
	);
};
