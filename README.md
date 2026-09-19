# FlowDesk

FlowDesk is a full-stack project management application that lets authenticated users organize their work in a hierarchical structure — **Workspaces → Projects → Tasks** — similar in spirit to tools like Jira or Trello.

Users can create workspaces, spin up projects inside them, break projects down into tasks, assign tasks to teammates, set priorities, and track progress across **Todo → In Progress → Done** columns.

## Features

- 🔐 **Authentication** — secure registration and login with JWT-based sessions and bcrypt password hashing
- 🗂️ **Workspaces** — create and manage top-level containers for projects
- 📁 **Projects** — organize related work inside a workspace
- ✅ **Tasks** — create, assign, prioritize, and move tasks through status columns
- 🎯 **Priorities** — Low / Medium / High task prioritization
- 📊 **Dashboard** — at-a-glance view of workspaces and project statistics
- 🔒 **Protected routes** — backend middleware verifies every request before touching data

<img width="935" height="673" alt="Screenshot 2026-09-19 at 4 36 48 PM" src="https://github.com/user-attachments/assets/1f3b4cca-e520-4e6f-875c-e0e22dbd84b0" />

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, React Router, Tailwind CSS, Axios, Context API |
| **Backend** | Node.js, Express.js, JWT, bcrypt |
| **Database** | MongoDB, Mongoose |

## FlowDesk Architecture

```
                       │
          ┌────────────┴────────────┐
          │                         │
      FRONTEND                  BACKEND
       React                   Node.js
         │                       │
    React Router              Express
         │                       │
      Axios ───────────────► Routes
                                 │
                              Middleware
                                 │
                             Controllers
                                 │
                              Models
                                 │
                              Mongoose
                                 │
                              MongoDB
```

## Quick Start

Ensure you have **Node.js (v18+)** installed.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at [http://localhost:5173](http://localhost:5173)

## 📄 License

This project is open-source.
