import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import * as postService from "../../../services/postService";

import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

export default function DeletePost() {
	const [status, setStatus] = useState(null);

	const { user } = useContext(AuthContext);

	const { id } = useParams();

	useEffect(() => {
		postService
			.deletePost(id, user._id)
			.then(() => setStatus("success"))
			.catch(() => setStatus("fail"));
	}, [id, user]);

	const handleRender = () => {
		switch (status) {
			case "loading":
				return <LoadingSpinner />;
			case "success":
				return <Navigate to="/" replace />;
			case "fail":
				return <Navigate to={-1} replace />;
			default:
				return <LoadingSpinner />;
		}
	};

	return handleRender();
}
