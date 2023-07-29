MERN Task Manager is a feature-rich application for basic task management, developed using the MERN stack (MongoDB, Express.js, React, and Node.js). It includes both user-side and developer-side features, such as signup, login, logout, adding, viewing, updating, and deleting tasks. The application utilizes various technologies and tools, including Tailwind CSS for styling, Redux for global state management, and Axios for handling HTTP requests.

Key Features:

User-side features:

Signup, Login, Logout, Add tasks, View tasks, Update tasks, Delete tasks.
Developer-side features:

Toasts for success and error messages, form validations in frontend and backend, responsive Navbar, token-based authentication, 404 page for wrong URLs, global user state using Redux, custom loaders, usage of tooltips, dynamic document titles, redirect to the previous page after login, usage of various React hooks, and routes protection.
Admin Dashboard features:

Sort tasks in the admin dashboard.
Search for specific tasks based on their attributes.
View a list of all users registered in the system.
Tools and Technologies:

HTML, CSS, JavaScript
Tailwind CSS
Node.js, Express.js
React, Redux
MongoDB
Dependencies:

Major dependencies include Axios, React, React Router, Redux, Express, Mongoose, bcrypt, and jsonwebtoken.
Dev-dependencies:

Major dev-dependencies include Nodemon and Concurrently.
Prerequisites:

Node.js and MongoDB should be installed on the system, and a code editor like VS Code is preferred.
Installation and Setup:

Install all dependencies using npm run install-all.
Create a .env file inside the backend folder with the necessary credentials.
Start the application using npm run dev, and it will be available at http://localhost:3000.
API Endpoints:

/api/auth/signup, /api/auth/login: For user authentication.
/api/tasks, /api/tasks/:taskId: For managing tasks.
/api/profile: For fetching user profile.
Frontend Pages:

Home Screen (public home page for guests and private dashboard for logged-in users)
Signup, Login, Add new task, Edit a task
Useful Links:

Links to the GitHub repository, official documentation of React, npm, MongoDB, and GitHub, as well as tutorials for Express.js, React, and Redux.
Download links for Node.js and VS Code.
Cheatsheets for Git, VS Code keyboard shortcuts, and CSS selectors.
Contact:

Email: swastikasony09@gmail.com