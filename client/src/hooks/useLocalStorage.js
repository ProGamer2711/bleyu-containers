import { useEffect, useState } from "react";

export const useLocalStorage = (item, initialValue) => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem(item) || JSON.stringify(initialValue))
	);

	useEffect(() => {
		localStorage.setItem(item, JSON.stringify(value));
	}, [item, value]);

	return [value, setValue];
};
