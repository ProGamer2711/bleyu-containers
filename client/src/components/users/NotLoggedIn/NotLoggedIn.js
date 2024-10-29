import { Link } from "react-router-dom";

import styles from "./NotLoggedIn.module.css";

export default function NotLoggedIn() {
	return (
		<div className={styles["not-logged-in"]}>
			<Link to="/" className={styles["logo-wrapper"]}>
				<img src="/icons/android-chrome-192x192.png" alt="Home Link" />
			</Link>

			<h1>Not logged in</h1>
			<p>You must be logged in to view this page.</p>

			<p>
				<Link to="/auth/login">Login</Link> or{" "}
				<Link to="/auth/signup">Sign up</Link>
			</p>
		</div>
	);
}
