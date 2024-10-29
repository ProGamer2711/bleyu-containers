export const formatISODate = date => {
	const dateObj = new Date(date);

	return (
		dateObj.toLocaleDateString("EN-gb", { hourCycle: "h24" }) +
		" " +
		dateObj.toLocaleTimeString("EN-gb", { hourCycle: "h24" })
	);
};
