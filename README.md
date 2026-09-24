# HireLens - Job Posting Risk Assessment Platform

HireLens is a production-quality full-stack SaaS platform designed to help job seekers identify potentially suspicious, fraudulent, or high-risk recruitment opportunities before applying or sharing sensitive personal and financial details.

---

## Architecture Overview

HireLens is built using a modern decoupled MERN architecture with strict security parameters:

```text
HireLens/
│
├── client/                      # React + Vite + Tailwind CSS SPA
│   ├── src/
│   │   ├── components/          # Modular component library
│   │   │   ├── common/          # Reusable UI elements
│   │   │   ├── layout/          # Navbar, Footer, Dashboard Layout & Responsive Sidebar
│   │   │   ├── auth/            # Auth forms and security widgets
│   │   │   ├── dashboard/       # Stat cards, quick actions, checklist
│   │   │   └── profile/         # User profile management
│   │   │
│   │   ├── pages/               # Routed pages (Landing, Login, Register, Dashboard, Profile, 404)
│   │   ├── context/             # AuthContext with session refresh & auth state
│   │   ├── routes/              # ProtectedRoute & PublicOnlyRoute wrappers
│   │   ├── services/            # Axios API service with credentials & error normalization
│   │   ├── App.jsx              # Routing configurations
│   │   └── main.jsx             # React entry point
│   ├── .env                     # Frontend environment variables
│   ├── .env.example
│   └── package.json
│
├── server/                      # Express.js REST API
│   ├── config/                  # MongoDB Atlas connection manager
│   ├── controllers/             # Auth & User business logic controllers
│   ├── middleware/              # JWT auth protection, rate limiting & error handling
│   ├── models/                  # Mongoose User schema with bcrypt pre-hooks
│   ├── routes/                  # Modular authRoutes and userRoutes
│   ├── utils/                   # JWT & HttpOnly cookie generator
│   ├── .env                     # Backend environment variables
│   ├── .env.example
│   └── server.js                # Express app bootstrap & security middlewares
│
├── .gitignore
└── README.md
```

---

## Tech Stack

### Frontend
- **Framework**: React.js (via Vite)
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 (Modern dark SaaS theme)
- **Icons**: Lucide React
- **HTTP Client**: Axios with `withCredentials: true`

### Backend
- **Runtime & Framework**: Node.js & Express.js
- **Database**: MongoDB Atlas via Mongoose
- **Authentication**: Stateless JSON Web Tokens (JWT) stored in secure `HttpOnly` cookies
- **Password Hashing**: `bcryptjs` (salt factor 12)
- **Security**:
  - `helmet` for secure HTTP headers
  - `cors` restricted to authorized `CLIENT_URL`
  - `express-rate-limit` for DDoS & brute-force mitigation
  - `cookie-parser` for cookie parsing
  - Centralized error handling without stack leakage

---

## Security & Authentication Flow

1. **Registration**: Validates input on client and server. The password is encrypted using a 12-round bcrypt salt. The user is assigned the immutable role `"user"`.
2. **Login**: Credentials verified against hashed password. A signed JWT containing only `{ userId, role }` is generated.
3. **Session Cookie**: The JWT is set in an `HttpOnly`, `SameSite`, and `Secure` cookie, preventing XSS-based credential theft.
4. **Session Hydration**: On app startup, frontend requests `GET /api/auth/me`. If a valid cookie exists, user session is restored without UI flickering.
5. **Route Protection**: Protected routes (`/dashboard`, `/profile`, `/analyze`, etc.) redirect unauthenticated visitors to `/login`, while authenticated users are redirected away from auth pages.
6. **Logout**: Clears the authentication cookie instantly.

---

## API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public (Rate Limited) | Registers a new user and sets JWT cookie |
| `POST` | `/api/auth/login` | Public (Rate Limited) | Authenticates user and sets JWT cookie |
| `POST` | `/api/auth/logout` | Public | Clears authentication cookie |
| `GET` | `/api/auth/me` | Private | Returns currently authenticated user session |

### User Profile (`/api/users`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Private | Retrieves full user profile |
| `PUT` | `/api/users/profile` | Private | Updates editable fields (`name`, `avatar`) |

---

## Environment Variables

### Backend (`server/.env`)
```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hirelens?retryWrites=true&w=majority
JWT_SECRET=your_long_random_production_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5001/api
```

---

## Local Development Setup

### 1. Clone & Setup Backend
```bash
cd server
npm install
# Create .env based on .env.example
npm run dev
# Server runs on http://localhost:5001
```

### 2. Setup Frontend
```bash
cd client
npm install
# Create .env based on .env.example
npm run dev
# Client runs on http://localhost:5173
```

---

## Future Roadmap & ML Architecture

The current implementation provides the core foundation. Future iterations will incorporate:
- **Rule-Based Risk Engine**: Domain correlation, salary benchmarking, and contact handle validation.
- **Machine Learning NLP Classifier**: NLP pipeline for job description phishing heuristics and deceptive pattern recognition.
- **Community Threat Intelligence**: Crowdsourced reporting and recruiter verification registry.
