import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import * as userService from "../../../services/userService";
import { formatISODate } from "../../../util/formatISODate";

import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import ToggleSwitch from "../../../components/common/ToggleSwitch/ToggleSwitch";
import CommentsList from "../../comments/CommentsList/CommentsList";
import PostsList from "../../posts/PostsList/PostsList";

import styles from "./UserDetails.module.css";

export default function UserDetails() {
	const [user, setUser] = useState({});
	const [toggleSwitchValue, setToggleSwitchValue] = useState("posts");

	const [loading, setLoading] = useState(true);

	const { user: loggedInUser } = useContext(AuthContext);

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);

		userService
			.getUser(id)
			.then(({ user }) => {
				setUser(user);
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
		navigate("owner/delete");
	};

	return (
		<div className={styles["user-details"]}>
			{!loading ? (
				<>
					<div className={styles["user-data"]}>
						<img
							src={user.imageUrl}
							alt="avatar"
							className={styles["user-avatar"]}
						/>

						<p className={styles["username"]}>{user.username}</p>

						<span>Created On: {formatISODate(user.createdAt)}</span>

						<span>Last Updated On: {formatISODate(user.updatedAt)}</span>

						<span>Number of Posts: {user._posts?.length || 0}</span>

						<span>Number of Comments: {user._comments?.length || 0}</span>
					</div>

					<ToggleSwitch
						choice1="comments"
						choice2="posts"
						value={toggleSwitchValue}
						setValue={setToggleSwitchValue}
					/>

					<div className="user-content">
						{toggleSwitchValue === "posts" ? (
							<PostsList userId={user._id} />
						) : (
							<CommentsList userId={user._id} />
						)}
					</div>

					{loggedInUser._id === user._id && (
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
				</>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
