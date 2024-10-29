import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import * as commentService from "../../services/commentService";
import * as postService from "../../services/postService";
import * as userService from "../../services/userService";

import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";

export default function OwnerGuard({ type }) {
	const [status, setStatus] = useState("loading");

	const { user: loggedInUser } = useContext(AuthContext);

	const { id } = useParams();

	const { state } = useLocation();

	useEffect(() => {
		if (type === "post") {
			postService
				.getPost(id)
				.then(({ post }) => {
					setStatus(post._owner?._id === loggedInUser._id ? "success" : "fail");
				})
				.catch(err => {
					alert(err?.err || err);
				});
		} else if (type === "comment") {
			commentService
				.getComment(id)
				.then(data => {
					setStatus(
						data.comment._owner?._id === loggedInUser._id ? "success" : "fail"
					);
				})
				.catch(err => {
					alert(err?.err || err);
				});
		} else if (type === "user") {
			userService
				.getUser(id)
				.then(({ user }) => {
					setStatus(user._id === loggedInUser._id ? "success" : "fail");
				})
				.catch(err => {
					alert(err?.err || err);
				});
		} else {
			setStatus("fail");
		}
	}, [id, loggedInUser, type]);

	const handleRender = () => {
		switch (status) {
			case "loading":
				return <LoadingSpinner />;
			case "success":
				return <Outlet />;
			case "fail":
				return <Navigate to={-1} state={state} />;
			default:
				return <LoadingSpinner />;
		}
	};

	return handleRender();
}
