import { useContext } from "react";

import { ListDataContext } from "../../../contexts/ListDataContext";

import styles from "./SearchBar.module.css";

export default function SearchBar() {
	const { changeFilter } = useContext(ListDataContext);

	const handleChange = e => {
		changeFilter(e.target.value);
	};

	return (
		<div className={`form-field ${styles["search-bar"]}`}>
			<input type="text" placeholder="Search" onChange={handleChange} />
		</div>
	);
}
