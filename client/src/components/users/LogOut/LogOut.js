import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { logoutUser } from "../../../services/userService";

import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

export default function LogOut() {
	const { setUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const { state } = useLocation();

	useEffect(() => {
		logoutUser().then(() => {
			setUser({});
			navigate(state.previousPath || -1, { replace: true, state });
		});
	}, [navigate, setUser, state]);

	return <LoadingSpinner />;
}
