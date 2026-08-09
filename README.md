# FlowDesk

FlowDesk is a full-stack project management application that lets authenticated users organize their work in a hierarchical structure — **Workspaces → Projects → Tasks** — similar in spirit to tools like Jira or Trello.

Users can create workspaces, spin up projects inside them, break projects down into tasks, assign tasks to teammates, set priorities, and track progress across **Todo → In Progress → Done** columns.

## Features

- 🔐 **Authentication** — secure registration and login with JWT-based sessions and bcrypt password hashing
- 🗂️ **Workspaces** — create and manage top-level containers for projects
- 📁 **Projects** — organize related work inside a workspace
- ✅ **Tasks** — create, assign, prioritize, and move tasks through status columns
- 👥 **Task assignment** — assign tasks to specific users
- 🎯 **Priorities** — Low / Medium / High task prioritization
- 📊 **Dashboard** — at-a-glance view of workspaces and project statistics
- 🔒 **Protected routes** — backend middleware verifies every request before touching data

<img width="895" height="635" alt="FlowDesk" src="https://github.com/user-attachments/assets/e35fad80-2350-4bc7-86e3-d60c0e47a306" />
 />

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
