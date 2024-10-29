# Bleyu Server

## Table of Contents

- [How To Use](#how-to-use)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running](#running)
- [Requests](#requests)
  - [Base URL](#base-url)
  - [Supported requests](#supported-requests)
  - [API Endpoints](#api-endpoints)
    - [Users](#users1)
    - [Posts](#posts1)
    - [Comments](#comments1)
    - [Authentication](#authentication1)
- [Request Bodies](#request-bodies)
  - [Users](#users2)
  - [Posts](#posts2)
  - [Comments](#comments2)
  - [Authentication](#authentication2)
- [Responses](#responses)
  - [Users](#users3)
  - [Posts](#posts3)
  - [Comments](#comments3)
  - [Authentication](#authentication3)

## How To Use

### Installation

```bash
git clone "https://www.github.com/ProGamer2711/bleyu-server.git"

cd ./bleyu-server

npm install
```

### Configuration

Create a `.env` file following the `.env.example` file.

### Running

```bash
npm run dev
```

The server will be started on `localhost:8393`.

## Requests

# Note:

## **_Every request which needs authorization is required to include a `X-Access-Token` header with the token for its value._**

### Base URL

`http://bleyu-server.herokuapp.com`

### Supported requests

- GET
- POST
- PUT
- DELETE

---

### API Endpoints

<a id="users1"></a>

#### Users

- **[GET]** `/users` - Get all users
- **[GET]** `/users/{id}` - Get user by id
- **[PUT]** `/users/{id}` - Update user by id (requires log in & password verification)
- **[DELETE]** `/users/{id}` - Delete user by id (requires log in & password verification)

---

<a id="posts1"></a>

#### Posts

- **[GET]** `/posts` - Get all posts
- **[GET]** `/posts/user/{id}` - Get post by user id
- **[GET]** `/posts/{id}` - Get post by id
- **[POST]** `/posts` - Create post (requires log in)
- **[PUT]** `/posts/{id}` - Update post by id (requires log in & ownership)
- **[DELETE]** `/posts/{id}` - Delete post by id (requires log in & ownership)
- **[PUT]** `/posts/{id}/upvote` - Upvote post by id (requires log in)
- **[PUT]** `/posts/{id}/downvote` - Downvote post by id (requires log in)
- **[PUT]** `/posts/{id}/unvote` - Unvote post by id (requires log in)

---

<a id="comments1"></a>

#### Comments

- **[GET]** `/comments/post/{id}` - Get all comments for post by post id
- **[GET]** `/comments/user/{id}` - Get all comments for user by user id
- **[GET]** `/comments/{id}` - Get comment by id
- **[POST]** `/comments` - Create comment (requires log in)
- **[PUT]** `/comments/{id}` - Update comment by id (requires log in & ownership)
- **[DELETE]** `/comments/{id}` - Delete comment by id (requires log in & ownership)
- **[PUT]** `/comments/{id}/upvote` - Upvote comment by id (requires log in)
- **[PUT]** `/comments/{id}/downvote` - Downvote comment by id (requires log in)
- **[PUT]** `/comments/{id}/unvote` - Unvote comment by id (requires log in)

---

<a id="authentication1"></a>

#### Authentication

- **[POST]** `/auth/login` - Login user (requires email & password)
- **[POST]** `/auth/register` - Register user (requires username, email, password and image URL (optional))
- **[GET]** `/auth/logout` - Logout user (requires log in)

---

## Request bodies

<a id="users2"></a>

### Users

- **[PUT]** `/users/{id}` - Update user by id (requires log in & password verification)

```json
{
	"username": "OPTIONAL Username",
	"password": "REQUIRED Old password",
	"newPassword": "OPTIONAL New password",
	"email": "OPTIONAL Valid email address",
	"imageUrl": "OPTIONAL Valid URL for a profile picture"
}
```

- **[DELETE]** `/users/{id}` - Delete user by id (requires log in & password verification)

```json
{
	"password": "REQUIRED Password for user"
}
```

---

<a id="posts2"></a>

### Posts

- **[POST]** `/posts` - Create post (requires log in)

```json
{
	"_owner": "REQUIRED Id of the user who created the post",
	"title": "REQUIRED Title of the post",
	"content": "REQUIRED Content of the post"
}
```

- **[PUT]** `/posts/{id}` - Update post by id (requires log in & ownership)

```json
{
	"_owner": "REQUIRED Id of the user who created the post",
	"title": "OPTIONAL Title of the post",
	"content": "OPTIONAL Content of the post"
}
```

- **[DELETE]** `/posts/{id}` - Delete post by id (requires log in & ownership)

```json
{
	"_owner": "REQUIRED Id of the user who created the post"
}
```

---

<a id="comments2"></a>

### Comments

- **[POST]** `/comments` - Create comment (requires log in)

```json
{
	"_owner": "REQUIRED Id of the user who created the comment",
	"_post": "REQUIRED Id of the post the comment is for",
	"content": "REQUIRED Content of the comment"
}
```

- **[PUT]** `/comments/{id}` - Update comment by id (requires log in & ownership)

```json
{
	"_owner": "REQUIRED Id of the user who created the comment",
	"content": "OPTIONAL Content of the comment"
}
```

- **[DELETE]** `/comments/{id}` - Delete comment by id (requires log in & ownership)

```json
{
	"_owner": "REQUIRED Id of the user who created the comment"
}
```

---

<a id="authentication2"></a>

### Authentication

- **[POST]** `/auth/login` - Login user (requires email & password)

```json
{
	"email": "REQUIRED Valid email address",
	"password": "REQUIRED Password for user"
}
```

- **[POST]** `/auth/register` - Register user (requires username, email, password and image URL (optional))

```json
{
	"username": "REQUIRED Username",
	"email": "REQUIRED Valid email address",
	"password": "REQUIRED Password for user",
	"imageUrl": "OPTIONAL Valid URL for a profile picture"
}
```

---

## Responses

<a id="users3"></a>

### Users

- **[GET]** `/users`

```json
{
	"users": [
		{
			"_id": "Id of the user",
			"username": "Username",
			"imageUrl": "Valid URL for a profile picture",
			"_posts": [
				{
					"_id": "Id of the post",
					"title": "Title of the post",
					"rating": "Rating of the post",
					"_ratedBy": [
						{
							"_id": "Id of the user who rated the post",
							"username": "Username of the user who rated the post",
							"imageUrl": "Valid URL for a profile picture"
						}
					]
				}
			],
			"_comments": [
				{
					"_id": "Id of the comment",
					"content": "Content of the comment",
					"rating": "Rating of the comment",
					"_ratedBy": [
						{
							"_id": "Id of the user who rated the comment",
							"username": "Username of the user who rated the comment",
							"imageUrl": "Valid URL for a profile picture"
						}
					]
				}
			],
			"createdAt": "Date of creation",
			"updatedAt": "Date of last update"
		}
	],
	"count": "Number of users",
	"err": "Error message (if an error occurs)"
}
```

- **[GET]** `/users/{id}`

```json
{
	"user": {
		"_id": "Id of the user",
		"username": "Username",
		"imageUrl": "Valid URL for a profile picture",
		"_posts": [
			{
				"_id": "Id of the post",
				"title": "Title of the post",
				"rating": "Rating of the post",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the post",
						"username": "Username of the user who rated the post",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"_comments": [
			{
				"_id": "Id of the comment",
				"content": "Content of the comment",
				"rating": "Rating of the comment",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the comment",
						"username": "Username of the user who rated the comment",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[PUT]** `/users/{id}`

```json
{
	"user": {
		"_id": "Id of the user",
		"username": "Username",
		"email": "Valid email address",
		"imageUrl": "Valid URL for a profile picture",
		"_posts": [
			{
				"_id": "Id of the post",
				"title": "Title of the post",
				"rating": "Rating of the post",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the post",
						"username": "Username of the user who rated the post",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"_comments": [
			{
				"_id": "Id of the comment",
				"content": "Content of the comment",
				"rating": "Rating of the comment",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the comment",
						"username": "Username of the user who rated the comment",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[DELETE]** `/users/{id}`

```json
{
	"message": "Success message",
	"err": "Error message (if an error occurs)"
}
```

---

<a id="posts3"></a>

### Posts

- **[GET]** `/posts`

```json
{
	"posts": [
		{
			"_id": "Id of the post",
			"_owner": "Id of the user who created the post",
			"title": "Title of the post",
			"content": "Content of the post",
			"rating": "Rating of the post",
			"_ratedBy": [
				{
					"_user": "Id of the user who voted",
					"vote": "Vote of the user"
				}
			],
			"_comments": [
				{
					"_id": "Id of the comment",
					"content": "Content of the comment",
					"rating": "Rating of the comment",
					"_ratedBy": [
						{
							"_id": "Id of the user who rated the comment",
							"username": "Username of the user who rated the comment",
							"imageUrl": "Valid URL for a profile picture"
						}
					]
				}
			],
			"createdAt": "Date of creation",
			"updatedAt": "Date of last update"
		}
	],
	"count": "Number of posts",
	"err": "Error message (if an error occurs)"
}
```

- **[GET]** `/posts/user/{id}`

```json
{
	"posts": [
		{
			"_id": "Id of the post",
			"_owner": "Id of the user who created the post",
			"title": "Title of the post",
			"content": "Content of the post",
			"rating": "Rating of the post",
			"_ratedBy": [
				{
					"_user": "Id of the user who voted",
					"vote": "Vote of the user"
				}
			],
			"_comments": [
				{
					"_id": "Id of the comment",
					"content": "Content of the comment",
					"rating": "Rating of the comment",
					"_ratedBy": [
						{
							"_id": "Id of the user who rated the comment",
							"username": "Username of the user who rated the comment",
							"imageUrl": "Valid URL for a profile picture"
						}
					]
				}
			],
			"createdAt": "Date of creation",
			"updatedAt": "Date of last update"
		}
	],
	"count": "Number of posts",
	"err": "Error message (if an error occurs)"
}
```

- **[GET]** `/posts/{id}`

```json
{
	"post": {
		"_id": "Id of the post",
		"_owner": "Id of the user who created the post",
		"title": "Title of the post",
		"content": "Content of the post",
		"rating": "Rating of the post",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"_comments": [
			{
				"_id": "Id of the comment",
				"content": "Content of the comment",
				"rating": "Rating of the comment",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the comment",
						"username": "Username of the user who rated the comment",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[POST]** `/posts`

```json
{
	"post": {
		"_id": "Id of the post",
		"_owner": "Id of the user who created the post",
		"title": "Title of the post",
		"content": "Content of the post",
		"rating": "Rating of the post",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"_comments": [
			{
				"_id": "Id of the comment",
				"content": "Content of the comment",
				"rating": "Rating of the comment",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the comment",
						"username": "Username of the user who rated the comment",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[PUT]** `/posts/{id}`

```json
{
	"post": {
		"_id": "Id of the post",
		"_owner": "Id of the user who created the post",
		"title": "Title of the post",
		"content": "Content of the post",
		"rating": "Rating of the post",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"_comments": [
			{
				"_id": "Id of the comment",
				"content": "Content of the comment",
				"rating": "Rating of the comment",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the comment",
						"username": "Username of the user who rated the comment",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[DELETE]** `/posts/{id}`

```json
{
	"message": "Success message",
	"err": "Error message (if an error occurs)"
}
```

- **[PUT]** `/posts/{id}/upvote`

```json
{
	"post": {
		"_id": "Id of the post",
		"_owner": "Id of the user who created the post",
		"title": "Title of the post",
		"content": "Content of the post",
		"rating": "Rating of the post",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"_comments": [
			{
				"_id": "Id of the comment",
				"content": "Content of the comment",
				"rating": "Rating of the comment",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the comment",
						"username": "Username of the user who rated the comment",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[PUT]** `/posts/{id}/downvote`

```json
{
	"post": {
		"_id": "Id of the post",
		"_owner": "Id of the user who created the post",
		"title": "Title of the post",
		"content": "Content of the post",
		"rating": "Rating of the post",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"_comments": [
			{
				"_id": "Id of the comment",
				"content": "Content of the comment",
				"rating": "Rating of the comment",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the comment",
						"username": "Username of the user who rated the comment",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[PUT]** `/posts/{id}/unvote`

```json
{
	"post": {
		"_id": "Id of the post",
		"_owner": "Id of the user who created the post",
		"title": "Title of the post",
		"content": "Content of the post",
		"rating": "Rating of the post",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"_comments": [
			{
				"_id": "Id of the comment",
				"content": "Content of the comment",
				"rating": "Rating of the comment",
				"_ratedBy": [
					{
						"_id": "Id of the user who rated the comment",
						"username": "Username of the user who rated the comment",
						"imageUrl": "Valid URL for a profile picture"
					}
				]
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

---

<a id="comments3"></a>

### Comments

- **[GET]** `/comments/{postId}`

```json
{
	"comments": [
		{
			"_id": "Id of the comment",
			"_owner": "Id of the user who created the comment",
			"_post": "Id of the post",
			"content": "Content of the comment",
			"_ratedBy": [
				{
					"_user": "Id of the user who voted",
					"vote": "Vote of the user"
				}
			],
			"createdAt": "Date of creation",
			"updatedAt": "Date of last update"
		}
	],
	"count": "Number of comments",
	"err": "Error message (if an error occurs)"
}
```

- **[GET]** `/comments/user/{id}`

```json
{
	"comments": [
		{
			"_id": "Id of the comment",
			"_owner": "Id of the user who created the comment",
			"_post": "Id of the post",
			"content": "Content of the comment",
			"_ratedBy": [
				{
					"_user": "Id of the user who voted",
					"vote": "Vote of the user"
				}
			],
			"createdAt": "Date of creation",
			"updatedAt": "Date of last update"
		}
	],
	"count": "Number of comments",
	"err": "Error message (if an error occurs)"
}
```

- **[GET]** `/comments/{id}`

```json
{
	"comment": {
		"_id": "Id of the comment",
		"_owner": "Id of the user who created the comment",
		"_post": "Id of the post",
		"content": "Content of the comment",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[POST]** `/comments`

```json
{
	"comment": {
		"_id": "Id of the comment",
		"_owner": "Id of the user who created the comment",
		"_post": "Id of the post",
		"content": "Content of the comment",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[PUT]** `/comments/{id}`

```json
{
	"comment": {
		"_id": "Id of the comment",
		"_owner": "Id of the user who created the comment",
		"_post": "Id of the post",
		"content": "Content of the comment",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[DELETE]** `/comments/{id}`

```json
{
	"message": "Success message",
	"err": "Error message (if an error occurs)"
}
```

- **[PUT]** `/comments/{id}/upvote`

```json
{
	"comment": {
		"_id": "Id of the comment",
		"_owner": "Id of the user who created the comment",
		"_post": "Id of the post",
		"content": "Content of the comment",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[PUT]** `/comments/{id}/downvote`

```json
{
	"comment": {
		"_id": "Id of the comment",
		"_owner": "Id of the user who created the comment",
		"_post": "Id of the post",
		"content": "Content of the comment",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

- **[PUT]** `/comments/{id}/unvote`

```json
{
	"comment": {
		"_id": "Id of the comment",
		"_owner": "Id of the user who created the comment",
		"_post": "Id of the post",
		"content": "Content of the comment",
		"_ratedBy": [
			{
				"_user": "Id of the user who voted",
				"vote": "Vote of the user"
			}
		],
		"createdAt": "Date of creation",
		"updatedAt": "Date of last update"
	},
	"err": "Error message (if an error occurs)"
}
```

---

<a id="authentication3"></a>

### Authentication

- **[POST]** `/login`

```json
{
	"_id": "Id of the user",
	"username": "Username",
	"email": "Valid email address",
	"password": "Encrypted password",
	"imageUrl": "Valid URL for a profile picture",
	"_posts": [
		{
			"_id": "Id of the post",
			"title": "Title of the post",
			"rating": "Rating of the post",
			"_ratedBy": [
				{
					"_id": "Id of the user who rated the post",
					"username": "Username of the user who rated the post",
					"imageUrl": "Valid URL for a profile picture"
				}
			]
		}
	],
	"_comments": [
		{
			"_id": "Id of the comment",
			"content": "Content of the comment",
			"rating": "Rating of the comment",
			"_ratedBy": [
				{
					"_id": "Id of the user who rated the comment",
					"username": "Username of the user who rated the comment",
					"imageUrl": "Valid URL for a profile picture"
				}
			]
		}
	],
	"createdAt": "Date of creation",
	"updatedAt": "Date of last update",
	"_token": "JWT token",
	"err": "Error message (if an error occurs)"
}
```

- **[POST]** `/register`

```json
{
	"_id": "Id of the user",
	"username": "Username",
	"email": "Valid email address",
	"password": "Encrypted password",
	"imageUrl": "Valid URL for a profile picture",
	"_posts": [
		{
			"_id": "Id of the post",
			"title": "Title of the post",
			"rating": "Rating of the post",
			"_ratedBy": [
				{
					"_id": "Id of the user who rated the post",
					"username": "Username of the user who rated the post",
					"imageUrl": "Valid URL for a profile picture"
				}
			]
		}
	],
	"_comments": [
		{
			"_id": "Id of the comment",
			"content": "Content of the comment",
			"rating": "Rating of the comment",
			"_ratedBy": [
				{
					"_id": "Id of the user who rated the comment",
					"username": "Username of the user who rated the comment",
					"imageUrl": "Valid URL for a profile picture"
				}
			]
		}
	],
	"createdAt": "Date of creation",
	"updatedAt": "Date of last update",
	"_token": "JWT token",
	"err": "Error message (if an error occurs)"
}
```

- **[GET]** `/logout`

```json
{
	"message": "Success message",
	"err": "Error message (if an error occurs)"
}
```
