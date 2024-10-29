import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import * as postService from "../../../services/postService";

export default function UnvotePost() {
	const { id } = useParams();

	const navigate = useNavigate();

	const { state } = useLocation();

	useEffect(() => {
		postService
			.unvotePost(id)
			.then(() => {
				navigate(state?.previousPath || `/posts/${id}`, { replace: true });
			})
			.catch(err => {
				alert(err?.err || err);
				navigate(state?.previousPath || `/posts/${id}`, { replace: true });
			});
	}, [id, navigate, state?.previousPath]);
}
