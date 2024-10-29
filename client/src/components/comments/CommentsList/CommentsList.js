import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as commentService from "../../../services/commentService";

import Comment from "../Comment/Comment";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

import styles from "./CommentsList.module.css";
import { AuthContext } from "../../../contexts/AuthContext";

export default function CommentsList({ userId }) {
	const [comments, setComments] = useState([]);

	const [noComments, setNoComments] = useState(false);
	const [loading, setLoading] = useState(false);

	const { id } = useParams();

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);

		if (userId) {
			commentService
				.getUserComments(userId)
				.then(data => {
					setComments(data.comments);

					setLoading(false);

					if (data.comments.length === 0) {
						setNoComments(true);
					}
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			commentService
				.getPostComments(id)
				.then(data => {
					setComments(data.comments);

					setLoading(false);

					if (data.comments.length === 0) {
						setNoComments(true);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [userId, id]);

	const handleCreateComment = e => {
		navigate(`/posts/${id}/comments/create`);
	};

	return (
		<>
			{!loading && !noComments && (
				<div className={styles["comments-list"]}>
					{comments.map(comment => (
						<Comment
							key={comment._id}
							comment={comment}
						/>
					))}

					{user._id && !userId && (
						<button
							className={styles["comment-create-btn"]}
							onClick={handleCreateComment}>
							Create a comment
						</button>
					)}
				</div>
			)}
			{noComments && (
				<div className={styles["no-comments"]}>
					<p>No comments yet...</p>

					{user._id && !userId && (
						<button
							className={styles["comment-create-btn"]}
							onClick={handleCreateComment}>
							Create a comment
						</button>
					)}
				</div>
			)}
			{loading && !noComments && <LoadingSpinner />}
		</>
	);
}
