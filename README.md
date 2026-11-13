# Weekly To-Do (Monorepo)

A fullstack MERN to-do application with tasks grouped by week (Mon–Sun), open/completed counts, create, edit, delete, and search capabilities.

- **Frontend (`client`)**: React + Tailwind CSS + Vite
- **Backend (`server`)**: Express + Mongoose
- **Serverless API (`netlify/functions`)**: Express app adapted for Netlify Functions with `serverless-http` to serve both frontend and backend on a single domain.

---

## 📁 Repository Structure

```text
├── client/                 # React + Vite frontend application
│   ├── src/                # UI components, screens, and API client
│   ├── index.html          # HTML entry point
│   ├── vite.config.js      # Vite build & local dev proxy configuration
│   └── package.json        # Frontend dependencies
├── server/                 # Express backend application
│   ├── src/
│   │   ├── app.js          # Express app definition & routes (/api/tasks)
│   │   ├── Task.js         # Mongoose schema and model
│   │   └── index.js        # Local standalone server entry (port 5000)
│   └── package.json        # Backend dependencies
├── netlify/
│   └── functions/
│       └── api.js          # Serverless entry point wrapping the Express app
├── .env.example            # Environment variables template (safe to commit)
├── .gitignore              # Rules ignoring node_modules, build outputs, secrets & Netlify artifacts
├── netlify.toml            # Netlify deployment, build, and redirection rules
└── package.json            # Monorepo workspaces and unified orchestration scripts
```

---

## 🔒 Security & Git Ignore

The repository includes a comprehensive [.gitignore](file:///home/ritik/projects/todolist/.gitignore) configured for this monorepo:
- **Secrets & Credentials**: `.env`, `.env.local`, and all `*.env` files are ignored to prevent leaking database credentials (only [.env.example](file:///home/ritik/projects/todolist/.env.example) is committed).
- **Dependencies**: All root and workspace `node_modules/` are excluded.
- **Build Artifacts**: Production build directories (`dist/`, `client/dist/`, `build/`) are ignored.
- **Netlify & Edge Artifacts**: Local Netlify CLI folders (`.netlify/`) and generated edge lockfiles (`deno.lock`) are ignored.
- **System & Cache Files**: OS files (`.DS_Store`, `Thumbs.db`), editor caches (`.vscode/`, `.idea/`), and bundler caches (`.vite/`) are excluded.

---

## 🚀 Quick Start (Single Command)

### 1. Install Dependencies
Run from the root directory to install dependencies across the monorepo:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to create your local `.env`:
```bash
cp .env.example .env
```

By default, `.env` connects to your local MongoDB instance:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/todo
PORT=5000
```

### 3. Run Locally with a Single Command
```bash
npm run dev
```
> Runs both the Express backend (`http://localhost:5000`) and the Vite frontend (`http://localhost:5173`) simultaneously in one terminal with unified, color-coded logging.

Alternatively, to test the production Netlify Functions environment locally:
```bash
npm run dev:netlify
```
> Emulates Netlify's CDN, edge redirects, and serverless functions locally at `http://localhost:8888`.

---

## 🍃 Switching from Local MongoDB to MongoDB Atlas

When you are ready to migrate from local MongoDB to MongoDB Atlas:

1. **Create an Atlas Cluster**:
   - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Under **Database Access**, create a database user and password.
   - Under **Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`) so Netlify serverless functions can connect.

2. **Update Connection String Locally**:
   In your root `.env`, update `MONGODB_URI`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/todo?retryWrites=true&w=majority
   ```

3. **Set Atlas URI on Netlify**:
   - Go to your Netlify dashboard: **Site configuration > Environment variables > Add a variable**.
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/todo?retryWrites=true&w=majority`

---

## 🌐 Deploy to Netlify

### Option A: Via GitHub (Recommended)
1. Push your repository to GitHub.
2. In Netlify, click **Add new site > Import an existing project > GitHub**.
3. Select this repository. Build settings are automatically loaded from [netlify.toml](file:///home/ritik/projects/todolist/netlify.toml):
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
   - **Functions directory**: `netlify/functions`
4. Add the `MONGODB_URI` environment variable.
5. Click **Deploy**.

### Option B: Via Netlify CLI (Single Command)
- **Deploy a draft preview**:
  ```bash
  npm run deploy
  ```
- **Deploy directly to production**:
  ```bash
  npm run deploy:prod
  ```

---

## 🛠 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Runs client and server concurrently in a single terminal |
| `npm run dev:client` | Runs only the Vite frontend dev server (`:5173`) |
| `npm run dev:server` | Runs only the Express backend dev server (`:5000`) |
| `npm run dev:netlify` | Runs Netlify Dev local emulator (`:8888`) |
| `npm run build` | Builds the client frontend into `client/dist` |
| `npm run build:netlify` | Builds frontend and packages Netlify Functions |
| `npm run deploy` | Deploys a draft preview to Netlify |
| `npm run deploy:prod` | Deploys directly to production on Netlify |

---

## 📡 API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | Get all tasks sorted by due date |
| `POST` | `/api/tasks` | Create a task (`title` and `dueAt` required) |
| `PUT` | `/api/tasks/:id` | Update task details or toggle completion status |
| `DELETE` | `/api/tasks/:id` | Delete task by ID |
