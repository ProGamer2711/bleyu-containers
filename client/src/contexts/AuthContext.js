import { createContext } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext({
	user: {
		_id: "",
		username: "",
		email: "",
		imageUrl: "",
		_posts: [],
		_comments: [],
		createdAt: "",
		updatedAt: "",
	},
	setUser: user => {
		return user;
	},
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useLocalStorage("user", {});

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
