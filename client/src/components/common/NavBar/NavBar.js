import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { ThemeContext } from "../../../contexts/ThemeContext";

import SearchBar from "../SearchBar/SearchBar";

import styles from "./NavBar.module.css";

export default function NavBar() {
	const { user } = useContext(AuthContext);
	const { toggleTheme } = useContext(ThemeContext);

	const { pathname, state } = useLocation();

	return (
		<div className={styles["nav-bar"]}>
			<div className={styles["logo-wrapper"]}>
				<Link to="/" className={styles["nav-link"]}>
					<img src="/icons/android-chrome-192x192.png" alt="Bleyu Logo" />
				</Link>
			</div>
			<div className={styles["search-bar"]}>
				<SearchBar />
			</div>
			<div className={styles["side-buttons"]}>
				<button
					className={`${styles["theme-changer"]} ${styles["nav-link"]}`}
					onClick={toggleTheme}
				>
					<img src="/images/theme_changer.png" alt="Theme Changer" />
				</button>

				{!user.username ? (
					<>
						<Link to="/auth/login" className={styles["nav-link"]} state={state}>
							Log In
						</Link>
						<Link
							to="/auth/signup"
							className={styles["nav-link"]}
							state={state}
						>
							Sign Up
						</Link>
					</>
				) : (
					<>
						<Link to="/posts/create" className={styles["nav-link"]}>
							Create Post
						</Link>
						<Link to={`/users/${user._id}`} className={styles["nav-link"]}>
							<img
								src={user.imageUrl || "https://i.ibb.co/5Y9x2mL/image.png"}
								alt={`${user.username}'s avatar`}
								className={styles["user-avatar"]}
							/>
							<span className={styles["username"]}>{user.username}</span>
						</Link>
						<Link
							to="/auth/logout"
							className={styles["nav-link"]}
							state={{ previousPath: pathname }}
						>
							Log Out
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
