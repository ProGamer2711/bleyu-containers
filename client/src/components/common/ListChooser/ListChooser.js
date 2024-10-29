import { useContext } from "react";

import { ListDataContext } from "../../../contexts/ListDataContext";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import PostsList from "../../posts/PostsList/PostsList";
import UsersList from "../../users/UsersList/UsersList";

import styles from "./ListChooser.module.css";

export default function ListChooser() {
	const { criteria, setCriteria } = useContext(ListDataContext);

	return (
		<div className={styles["list-chooser"]}>
			<div className={styles["toggle-switch"]}>
				<ToggleSwitch
					choice1="users"
					choice2="posts"
					value={criteria}
					setValue={setCriteria}
				/>
			</div>

			<div className={styles["list"]}>
				{criteria === "posts" ? <PostsList /> : <UsersList />}
			</div>
		</div>
	);
}
