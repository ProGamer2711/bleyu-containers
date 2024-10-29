import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch({ choice1, choice2, value, setValue }) {
	function handleClick() {
		setValue(value => (value === choice1 ? choice2 : choice1));
	}

	function styleToggleSwitch(value) {
		if (value === choice1) {
			return { clipPath: "inset(0 0 0 50%)", backgroundColor: "#eb9b30" };
		} else {
			return { clipPath: "inset(0 50% 0 0)", backgroundColor: "#1464cf" };
		}
	}

	return (
		<div id={styles["container"]} onClick={handleClick}>
			<div className={styles["inner-container"]}>
				<div className={styles["toggle"]}>
					<p>{choice1}</p>
				</div>
				<div className={styles["toggle"]}>
					<p>{choice2}</p>
				</div>
			</div>
			<div
				className={styles["inner-container"]}
				style={
					value === choice1
						? styleToggleSwitch(choice1)
						: styleToggleSwitch(choice2)
				}
			>
				<div className={styles["toggle"]}>
					<p>{choice1}</p>
				</div>
				<div className={styles["toggle"]}>
					<p>{choice2}</p>
				</div>
			</div>
		</div>
	);
}
