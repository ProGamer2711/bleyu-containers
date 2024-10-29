import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export default function GuestGuard() {
	const { user } = useContext(AuthContext);

	const { state } = useLocation();

	if (user._id) return <Navigate to={state?.previousPath || "/"} replace />;

	return <Outlet />;
}
