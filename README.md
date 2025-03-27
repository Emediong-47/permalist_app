# Todo List Web App

A simple **To-Do List Web Application** built with **Node.js**, **Express.js**, **PostgreSQL**, and **EJS** for templating. Users can manage both daily and weekly tasks, including adding, updating, and deleting tasks.

## Features

- 📝 **Manage To-Do Lists**: Separate lists for **daily** and **weekly** tasks.
- 📌 **Add Tasks**: Users can add tasks dynamically.
- ✏️ **Edit Tasks**: Modify task titles.
- ❌ **Delete Tasks**: Remove tasks from the list.
- 📂 **Persistent Data Storage**: Uses **PostgreSQL** to store tasks.
- 🎨 **Templating with EJS**: Dynamic content rendering.
- ⚡ **Express.js Server**: Handles all routes and database queries.
- 🔐 **Environment Variables**: Uses `dotenv` for database credentials.

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Setup Instructions

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Set Up PostgreSQL Database:**
   - Create a database and two tables:
   ```sql
   CREATE DATABASE todo_app;

   CREATE TABLE daily_todos (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL
   );

   CREATE TABLE weekly_todos (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL
   );
   ```

4. **Configure Environment Variables:**
   - Create a `.env` file in the root directory and add:
   ```env
   PG_USER=your_username
   PG_HOST=localhost
   PG_DATABASE=todo_app
   PG_PASSWORD=your_password
   PG_PORT=5432
   ```

5. **Start the Server:**
   ```sh
   npm start
   ```

6. **Access the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
.
├── public/          # Static assets (CSS, images)
├── views/          # EJS templates
├── .env            # Environment variables
├── index.js        # Main server file
├── package.json    # Dependencies and scripts
└── README.md       # Project documentation
```

## Routes
| Route          | Method | Description        |
|---------------|--------|--------------------|
| `/`           | GET    | View Daily Todos  |
| `/weekly`     | GET    | View Weekly Todos |
| `/add`        | POST   | Add a Task        |
| `/edit`       | POST   | Edit a Task       |
| `/delete`     | POST   | Delete a Task     |

## Future Enhancements
- ✅ Mark tasks as completed
- 📆 Add due dates
- 🔐 User authentication
- 📱 API endpoints for mobile integration

## License
This project is licensed under the MIT License.

---
**Made with ❤️ by Emediong Uyobong Eshiet**

