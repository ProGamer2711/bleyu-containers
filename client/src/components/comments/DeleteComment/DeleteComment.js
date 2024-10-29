import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import * as commentService from "../../../services/commentService";

import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

export default function DeleteComment() {
	const [status, setStatus] = useState(null);

	const { user } = useContext(AuthContext);

	const { state } = useLocation();

	const { id } = useParams();

	useEffect(() => {
		commentService
			.deleteComment(id, user._id)
			.then(() => setStatus("success"))
			.catch(() => setStatus("fail"));
	}, [id, user]);

	const handleRender = () => {
		switch (status) {
			case "loading":
				return <LoadingSpinner />;
			case "success":
				return <Navigate to={state?.previousPath || "/"} replace />;
			case "fail":
				return <Navigate to={-1} />;
			default:
				return <LoadingSpinner />;
		}
	};

	return handleRender();
}
