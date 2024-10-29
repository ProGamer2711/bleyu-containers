import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ListDataContext } from "../../../contexts/ListDataContext";
import * as postService from "../../../services/postService";

import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import PostItem from "./PostItem/PostItem";

import styles from "./PostsList.module.css";

export default function PostsList({ userId }) {
	const { filteredData, updateData } = useContext(ListDataContext);

	const [loading, setLoading] = useState(true);
	const [noPosts, setNoPosts] = useState(false);

	useEffect(() => {
		setLoading(true);

		postService
			.getPosts(userId || "")
			.then(data => {
				updateData(data.posts);

				setLoading(false);

				if (data.posts.length === 0) {
					setNoPosts(true);
				}
			})
			.catch(err => {
				alert(err?.err || err);
			});
	}, [userId, updateData]);

	return (
		<div className={styles["posts-list"]}>
			{!loading &&
				filteredData.map(post => <PostItem key={post._id} post={post} />)}
			{noPosts && (
				<div className={styles["no-posts"]}>
					<p>No posts yet...</p>
					{!userId && (
						<>
							<p>Be the first to create one!</p>
							<Link to="/posts/create">Create a post</Link>
						</>
					)}
				</div>
			)}
			{filteredData?.length === 0 && !loading && (
				<div className={styles["no-posts"]}>
					<p>No posts matching your search...</p>

					{!userId && (
						<>
							<p>Be the first to create one!</p>
							<Link to="/posts/create">Create a post</Link>
						</>
					)}
				</div>
			)}
			{loading && !noPosts && <LoadingSpinner />}
		</div>
	);
}
