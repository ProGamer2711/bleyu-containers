import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useRating } from "../../../../hooks/useRating";
import { formatISODate } from "../../../../util/formatISODate";

import styles from "./PostItem.module.css";

export default function PostItem({ post }) {
	const navigate = useNavigate();

	const handleRatingButtonsRender = useRating("post");

	const parentRef = useRef(null);

	const handleClick = () => {
		navigate(`/posts/${post._id}`);
	};

	const buttons = handleRatingButtonsRender(styles, post);

	return (
		<div className={styles["post-item"]} ref={parentRef} onClick={handleClick}>
			<div
				className={styles["rating-wrapper"]}
				onClick={e => e.stopPropagation()}
				onMouseEnter={() =>
					parentRef.current.classList.add(styles["child-hover"])
				}
				onMouseLeave={() =>
					parentRef.current.classList.remove(styles["child-hover"])
				}
			>
				{buttons[0]}

				<div className={styles["rating"]}>{post.rating}</div>

				{buttons[1]}
			</div>

			<span className={styles["owner-data"]}>
				<img
					src={post._owner?.imageUrl || "https://i.ibb.co/5Y9x2mL/image.png"}
					alt={`${post._owner?.username}'s avatar`}
					className={styles["owner-avatar"]}
				/>
				<span className={styles["owner-username"]}>
					{post._owner?.username || "[deleted]"}
				</span>
			</span>

			<span className={styles["creation-date"]}>
				{formatISODate(post.createdAt)}
			</span>

			<div className={styles["title"]}>{post.title}</div>
		</div>
	);
}
