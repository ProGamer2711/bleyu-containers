import { useNavigate } from "react-router-dom";

import { formatISODate } from "../../../../util/formatISODate";

import styles from "./UserItem.module.css";

export default function UserItem({ user }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/users/${user._id}`);
	};

	return (
		<div className={styles["user-item"]} onClick={handleClick}>
			<img src={user.imageUrl} alt="avatar" className={styles["user-avatar"]} />

			<div className={styles["user-data"]}>
				<p className={styles["username"]}>{user.username}</p>

				<span>Created On: {formatISODate(user.createdAt)}</span>

				<span>Last Updated On: {formatISODate(user.updatedAt)}</span>

				<span>Number of Posts: {user._posts?.length || 0}</span>

				<span>Number of Comments: {user._comments?.length || 0}</span>
			</div>
		</div>
	);
}
