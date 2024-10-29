# Bleyu

---

## Overview

Bleyu is a React web application that recreates the most basic features of a social media platform.

## Description

Bleyu has the following features:

- User, Post and Comment systems with `CRUD` operations
- Authentication with `JWT` tokens
- Routing with `react-router-dom` `V6`
- Route guarding for `private` routes. Route guards for:
  - Guests (not logged in users)
  - Logged in users
  - Owners of a post or comment
- User sessions stored in `localStorage`
- Error handling
- Search functionality

---

## Links

[Bleyu GitHub Repository](https://www.github.com/ProGamer2711/Bleyu.git)

[Bleyu Server GitHub Repository](https://www.github.com/ProGamer2711/bleyu-server.git)

[Bleyu Website On Heroku](https://bleyu.herokuapp.com)

---

## Installation

```bash
git clone "https://www.github.com/ProGamer2711/Bleyu.git"

cd ./Bleyu

npm install
```

## Notes

Be sure to check what server you are using. To do this go to the `src/util/requester.js` file and look for the `baseUrl` variable.
You can change swap it with the comment below. The default value is `http://localhost:8393`. The hosted server for production is `https://bleyu-server.herokuapp.com`.

Snippet of the code you are looking for:

```js
const baseUrl = "http://localhost:8393";
// https://bleyu-server.herokuapp.com
```

**_Every logo of the website you see is clickable and will send you to the home page._**

## Running

```bash
npm start
```

The application will be running on `localhost:3000`.

## Testing

```bash
npm test
```
