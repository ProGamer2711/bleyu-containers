import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export default function UserGuard() {
	const { user } = useContext(AuthContext);

	const { state } = useLocation();

	if (!user._id) return <Navigate to="/not-logged-in" state={state} replace />;

	return <Outlet />;
}
