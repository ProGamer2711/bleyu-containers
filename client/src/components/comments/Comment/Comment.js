import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { useRating } from "../../../hooks/useRating";
import { formatISODate } from "../../../util/formatISODate";

import styles from "./Comment.module.css";

export default function Comment({ comment }) {
	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	const { pathname } = useLocation();

	const handleRatingButtonsRender = useRating("comment");

	const buttons = handleRatingButtonsRender(styles, comment);

	const handleEdit = () => {
		navigate(`/comments/${comment._id}/owner/edit`);
	};

	const handleDelete = () => {
		if (!window.confirm("Are you sure you want to delete this comment?"))
			return;

		navigate(`/comments/${comment._id}/owner/delete`, {
			state: { previousPath: pathname },
		});
	};

	return (
		<div className={styles["comment-item"]}>
			<div className={styles["rating-wrapper"]}>
				{buttons[0]}

				<div className={styles["rating"]}>{comment.rating}</div>

				{buttons[1]}
			</div>

			<Link
				to={`/users/${comment._owner?._id}`}
				className={styles["owner-data"]}
			>
				<img
					src={comment._owner?.imageUrl || "https://i.ibb.co/5Y9x2mL/image.png"}
					alt={`${comment._owner?.username}'s avatar`}
					className={styles["owner-avatar"]}
				/>
				<span className={styles["owner-username"]}>
					{comment._owner?.username || "[deleted]"}
				</span>
			</Link>

			<div className={styles["comment"]}>
				<span className={styles["creation-date"]}>
					{formatISODate(comment.createdAt)}
				</span>

				<div className={styles["content"]}>{comment.content}</div>

				{user._id === comment._owner?._id && (
					<div className={styles["action-buttons"]}>
						<button className={styles["edit-button"]} onClick={handleEdit}>
							Edit
						</button>
						<button className={styles["delete-button"]} onClick={handleDelete}>
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
