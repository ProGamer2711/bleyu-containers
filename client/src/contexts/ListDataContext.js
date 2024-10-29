import { createContext, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ListDataContext = createContext({
	data: [],
	setData: data => {
		return data;
	},
	criteria: "posts",
	setCriteria: criteria => {
		return criteria;
	},
});

export const ListDataProvider = ({ children }) => {
	const { pathname } = useLocation();

	const splitPath = pathname.split("/");
	splitPath.shift();

	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState();
	const [filter, setFilter] = useState("");
	const [criteria, setCriteria] = useState("posts");

	const filterData = useCallback(
		item => {
			if (splitPath.length > 1) return true;
			if (criteria === "posts") {
				let titleResults = item.title
					.toLowerCase()
					.includes(filter.toLowerCase());

				let ownerUsernameResults = item._owner?.username
					.toLowerCase()
					.includes(filter.toLowerCase());

				return titleResults || ownerUsernameResults;
			} else if (criteria === "users") {
				return item.username.toLowerCase().includes(filter.toLowerCase());
			} else {
				return true;
			}
		},
		[splitPath.length, criteria, filter]
	);

	const changeFilter = value => {
		setFilter(value);

		setFilteredData(data.filter(filterData));
	};

	const updateData = useCallback(
		newData => {
			setData(newData);

			setFilteredData(newData.filter(filterData));
		},
		[filterData]
	);

	useEffect(() => {
		setData([]);
		setFilteredData([]);
	}, []);

	return (
		<ListDataContext.Provider
			value={{
				filteredData,
				updateData,
				criteria,
				setCriteria,
				changeFilter,
			}}
		>
			{children}
		</ListDataContext.Provider>
	);
};
