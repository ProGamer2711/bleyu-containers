import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import * as commentService from "../../../services/commentService";

export default function UpvoteComment() {
	const { id } = useParams();

	const navigate = useNavigate();

	const { state } = useLocation();

	useEffect(() => {
		commentService
			.upvoteComment(id)
			.then(() => {
				navigate(state?.previousPath || -1, { replace: true });
			})
			.catch(err => {
				alert(err?.err || err);
				navigate(state?.previousPath || -1, { replace: true });
			});
	}, [id, navigate, state?.previousPath]);
}
