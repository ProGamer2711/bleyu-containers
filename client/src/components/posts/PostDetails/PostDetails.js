import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { useRating } from "../../../hooks/useRating";
import * as postService from "../../../services/postService";
import { formatISODate } from "../../../util/formatISODate";

import CommentsList from "../../comments/CommentsList/CommentsList";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

import styles from "./PostDetails.module.css";

export default function PostDetails() {
	const [post, setPost] = useState({});

	const [buttons, setButtons] = useState([]);

	const [loading, setLoading] = useState(true);

	const handleRatingButtonsRender = useRating("post");

	const { id } = useParams();

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);

		postService
			.getPost(id)
			.then(data => {
				setPost(data.post);
				setButtons(handleRatingButtonsRender(styles, data.post));

				setLoading(false);
			})
			.catch(err => {
				alert(err?.err || err);
			});
	}, [id]);

	const handleEdit = () => {
		navigate("owner/edit");
	};

	const handleDelete = () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;

		navigate("owner/delete");
	};

	return (
		<>
			{!loading ? (
				<div className={styles["post-details"]}>
					<div className={styles["rating-wrapper"]}>
						{buttons[0]}

						<div className={styles["rating"]}>{post.rating}</div>

						{buttons[1]}
					</div>

					<Link
						to={`/users/${post._owner?._id}`}
						className={styles["owner-data"]}
					>
						<img
							src={
								post._owner?.imageUrl || "https://i.ibb.co/5Y9x2mL/image.png"
							}
							alt={`${post._owner?.username}'s avatar`}
							className={styles["owner-avatar"]}
						/>
						<span className={styles["owner-username"]}>
							{post._owner?.username || "[deleted]"}
						</span>
					</Link>

					<div className={styles["post"]}>
						<span className={styles["creation-date"]}>
							{formatISODate(post.createdAt)}
						</span>

						<div className={styles["title"]}>{post.title}</div>

						<div className={styles["content"]}>{post.content}</div>

						{user._id === post._owner?._id && (
							<div className={styles["action-buttons"]}>
								<button className={styles["edit-button"]} onClick={handleEdit}>
									Edit
								</button>
								<button
									className={styles["delete-button"]}
									onClick={handleDelete}
								>
									Delete
								</button>
							</div>
						)}
					</div>

					<p className={styles["comments-title"]}>Comments</p>
					<div className={styles["comments"]}>
						<CommentsList />
					</div>
				</div>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
}
