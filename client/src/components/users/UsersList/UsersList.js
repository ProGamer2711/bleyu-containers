import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ListDataContext } from "../../../contexts/ListDataContext";
import * as userService from "../../../services/userService";

import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import UserItem from "./UserItem/UserItem";

import styles from "./UsersList.module.css";

export default function UsersList() {
	const { filteredData, updateData } = useContext(ListDataContext);

	const [loading, setLoading] = useState(true);
	const [noUsers, setNoUsers] = useState(false);

	useEffect(() => {
		setLoading(true);

		userService
			.getUsers()
			.then(data => {
				updateData(data.users);

				setLoading(false);

				if (data.users.length === 0) {
					setNoUsers(true);
				}
			})
			.catch(err => {
				alert(err?.err || err);
			});
	}, [updateData]);

	return (
		<div className={styles["users-list"]}>
			{!loading &&
				filteredData.map(user => <UserItem key={user._id} user={user} />)}
			{noUsers && (
				<div className={styles["no-users"]}>
					<p>No users yet...</p>

					<p>Be the first to create one!</p>
					<Link to="/auth/signup">Create a user</Link>
				</div>
			)}
			{filteredData?.length === 0 && (
				<div className={styles["no-users"]}>
					<p>No users matching your search...</p>

					<p>Be the first to create one!</p>
					<Link to="/auth/signup">Create a user</Link>
				</div>
			)}
			{loading && !noUsers && <LoadingSpinner />}
		</div>
	);
}
