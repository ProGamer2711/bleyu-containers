import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ListDataProvider } from "./contexts/ListDataContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import CreateComment from "./components/comments/CreateComment/CreateComment";
import DeleteComment from "./components/comments/DeleteComment/DeleteComment";
import EditComment from "./components/comments/EditComment/EditComment";
import DownvoteComment from "./components/comments/ratings/DownvoteComment";
import UnvoteComment from "./components/comments/ratings/UnvoteComment";
import UpvoteComment from "./components/comments/ratings/UpvoteComment";

import ListChooser from "./components/common/ListChooser/ListChooser";
import NavBar from "./components/common/NavBar/NavBar";

import GuestGuard from "./components/guards/GuestGuard";
import OwnerGuard from "./components/guards/OwnerGuard";
import UserGuard from "./components/guards/UserGuard";

import CreatePost from "./components/posts/CreatePost/CreatePost";
import DeletePost from "./components/posts/DeletePost/DeletePost";
import EditPost from "./components/posts/EditPost/EditPost";
import PostDetails from "./components/posts/PostDetails/PostDetails";
import DownvotePost from "./components/posts/ratings/DownvotePost";
import UnvotePost from "./components/posts/ratings/UnvotePost";
import UpvotePost from "./components/posts/ratings/UpvotePost";

import DeleteUser from "./components/users/DeleteUser/DeleteUser";
import EditUser from "./components/users/EditUser/EditUser";
import LogIn from "./components/users/LogIn/LogIn";
import LogOut from "./components/users/LogOut/LogOut";
import NotLoggedIn from "./components/users/NotLoggedIn/NotLoggedIn";
import SignUp from "./components/users/SignUp/SignUp";
import UserDetails from "./components/users/UserDetails/UserDetails";

import "./App.css";
import "./Forms.css";

function App() {
	return (
		<div className="App">
			<ThemeProvider>
				<AuthProvider>
					<ListDataProvider>
						<NavBar />

						<div className="main">
							<Routes>
								<Route element={<GuestGuard />}>
									<Route path="/auth/signup" element={<SignUp />} />
									<Route path="/auth/login" element={<LogIn />} />
									<Route path="/not-logged-in" element={<NotLoggedIn />} />
								</Route>

								<Route element={<UserGuard />}>
									<Route path="/auth/logout" element={<LogOut />} />

									<Route path="/posts/create" element={<CreatePost />} />
									<Route path="/posts/:id/upvote" element={<UpvotePost />} />
									<Route
										path="/posts/:id/downvote"
										element={<DownvotePost />}
									/>
									<Route path="/posts/:id/unvote" element={<UnvotePost />} />

									<Route
										path="/posts/:id/comments/create"
										element={<CreateComment />}
									/>
									<Route
										path="/comments/:id/upvote"
										element={<UpvoteComment />}
									/>
									<Route
										path="/comments/:id/downvote"
										element={<DownvoteComment />}
									/>
									<Route
										path="/comments/:id/unvote"
										element={<UnvoteComment />}
									/>
								</Route>

								<Route
									path="/posts/:id/owner"
									element={<OwnerGuard type="post" />}
								>
									<Route path="edit" element={<EditPost />} />
									<Route path="delete" element={<DeletePost />} />
								</Route>

								<Route
									path="/comments/:id/owner"
									element={<OwnerGuard type="comment" />}
								>
									<Route path="edit" element={<EditComment />} />
									<Route path="delete" element={<DeleteComment />} />
								</Route>

								<Route
									path="/users/:id/owner"
									element={<OwnerGuard type="user" />}
								>
									<Route path="edit" element={<EditUser />} />
									<Route path="delete" element={<DeleteUser />} />
								</Route>

								<Route path="/posts/:id" element={<PostDetails />} />
								<Route path="/users/:id" element={<UserDetails />} />

								<Route path="/" element={<ListChooser />} />
								<Route path="*" element={<Navigate to="/" replace />} />
							</Routes>
						</div>
					</ListDataProvider>
				</AuthProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
