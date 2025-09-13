# AI-Powered Interview Coach

An **AI-Powered Interview Coach** that simulates role-specific mock interviews, generates dynamic questions via Google Gemini, evaluates candidate responses contextually, and tracks progress over time.  
Built with **Node.js, Express.js, MongoDB, and Vanilla JavaScript/CSS**.

---

## 🚀 Features
- **Dynamic Question Generation** – Role-based interview questions generated via Google Gemini API (SDE, ML, etc.).
- **Contextual Evaluation** – AI evaluates answers with structured rubric-based scoring (correctness, depth, clarity).
- **Interactive Frontend** – Chat-like interface built with Vanilla JavaScript & CSS.
- **Backend with Node.js & Express** – Manages sessions, responses, and evaluation flow.
- **MongoDB Integration** – Stores users, interview sessions, performance history.
- **Role-Based Question Sets** – Supports SDE, ML, and custom tracks.
- **Feedback Scoring** – Guides user improvement with actionable insights.

---

## 🏗️ Architecture
**Frontend**
- Vanilla JavaScript & CSS chat UI  
- Real-time feedback using Socket.io

**Backend (Node.js + Express)**
- Authentication & user session handling  
- Gemini API integration service  
- REST + WebSocket APIs

**Database (MongoDB)**
- Stores users, questions, interview sessions, performance history  

**Worker Queue (Redis + BullMQ)** *(Optional)*
- Asynchronous evaluation jobs  
- Retries, error handling, scalable workers  

**Data Flow**
1. User starts an interview session → selects role.  
2. Backend fetches/generates questions (Gemini + DB).  
3. User submits answer → queued for evaluation.  
4. Gemini evaluates & returns structured JSON score.  
5. Results stored in DB & displayed on frontend.  

---

## 📂 Project Structure
```
/backend
  /models          # MongoDB schemas (User, Session, Question, Evaluation)
  /routes          # Express API routes
  /services        # Gemini integration service
  /workers         # Background job processors (evaluation)
  server.js        # Entry point

/frontend
  index.html       # Chat-based UI
  style.css        # Custom CSS
  script.js        # Client-side logic (fetch + socket.io)

/config
  default.json     # Config (MongoDB URI, API keys)
```

---

## ⚡ Setup & Installation

### Prerequisites
- Node.js (>=16)
- MongoDB Atlas / Local MongoDB
- Redis (if using job queue)
- Google Gemini API key

### Steps
```bash
# Clone repo
git clone https://github.com/<your-username>/<repo-name>.git
cd ai-interview-coach

# Backend setup
cd backend
npm install
cp .env.example .env   # Add MongoDB URI & Gemini API key
npm run dev            # Start backend server

# Frontend setup (served via Express or simple static server)
cd frontend
# open index.html in browser
```

---

## 🔑 Environment Variables
Create `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` – User login (JWT)

### Sessions
- `POST /api/session` – Start new interview session
- `GET /api/session/:id` – Fetch session details
- `POST /api/session/:id/answer` – Submit an answer

### Questions
- `POST /api/generate-questions` – Generate role-based questions

### History
- `GET /api/history` – User’s past sessions & scores

---

## 🧪 Testing
- **Unit tests** – Jest + Supertest for API routes
- **Integration tests** – Mock Gemini calls for evaluation
- **E2E tests** – Cypress for frontend interaction

Run tests:
```bash
npm test
```

---

## 📈 Scalability & Future Improvements
- Support **voice input** & audio-based evaluation  
- Add **adaptive learning paths** for personalized interview plans  
- Implement **analytics dashboard** for tracking progress  
- Multi-tenant support for **team/company interviews**  

---

## 👨‍💻 Author
Shivam Maurya  
📧 Contact: shivamvision07@gmail.com  

---

## 📜 License
MIT License – Free to use and modify.
