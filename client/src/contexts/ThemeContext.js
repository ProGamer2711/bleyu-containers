import { createContext, useEffect } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

export const ThemeContext = createContext({
	theme: "light",
	setTheme: theme => {
		return theme;
	},
});

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useLocalStorage(
		"theme",
		window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light"
	);

	// set css --inversionPercentage value
	useEffect(() => {
		document.documentElement.style.setProperty(
			"--inversionPercentage",
			theme === "light" ? "0" : "100"
		);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(theme => (theme === "light" ? "dark" : "light"));

		document.documentElement.style.setProperty(
			"--inversionPercentage",
			theme === "light" ? "100%" : "0%"
		);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
