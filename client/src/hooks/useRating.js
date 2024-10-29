import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export const useRating = type => {
	const { user } = useContext(AuthContext);

	const { pathname } = useLocation();

	const handleRatingButtonsRender = (styles, data) => {
		const buttons = [];

		const userRating = data._ratedBy?.find(
			rating => rating._user === user?._id
		);

		if (userRating) {
			if (userRating.vote === 1) {
				buttons.push(
					<div className={`${styles["upvote"]} ${styles["selected"]}`}>
						<Link
							to={`/${type}s/${data._id}/unvote`}
							state={{ previousPath: pathname }}
						>
							<img src="/images/upvote_arrow.png" alt="unvote" />
						</Link>
					</div>
				);

				buttons.push(
					<div className={styles["downvote"]}>
						<Link
							to={`/${type}s/${data._id}/downvote`}
							state={{ previousPath: pathname }}
						>
							<img src="/images/downvote_arrow.png" alt="downvote" />
						</Link>
					</div>
				);
			} else {
				buttons.push(
					<div className={styles["upvote"]}>
						<Link
							to={`/${type}s/${data._id}/upvote`}
							state={{ previousPath: pathname }}
						>
							<img src="/images/upvote_arrow.png" alt="upvote" />
						</Link>
					</div>
				);

				buttons.push(
					<div className={`${styles["downvote"]} ${styles["selected"]}`}>
						<Link
							to={`/${type}s/${data._id}/unvote`}
							state={{ previousPath: pathname }}
						>
							<img src="/images/downvote_arrow.png" alt="unvote" />
						</Link>
					</div>
				);
			}
		} else {
			buttons.push(
				<div className={styles["upvote"]}>
					<Link
						to={`/${type}s/${data._id}/upvote`}
						state={{ previousPath: pathname }}
					>
						<img src="/images/upvote_arrow.png" alt="upvote" />
					</Link>
				</div>
			);

			buttons.push(
				<div className={styles["downvote"]}>
					<Link
						to={`/${type}s/${data._id}/downvote`}
						state={{ previousPath: pathname }}
					>
						<img src="/images/downvote_arrow.png" alt="downvote" />
					</Link>
				</div>
			);
		}

		return buttons;
	};

	return handleRatingButtonsRender;
};
