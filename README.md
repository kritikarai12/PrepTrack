# 🎯 PrepTrack — Placement Preparation Tracker

A full stack web application for college students to track and manage their campus placement preparation in one place. Built with React, Node.js, Express, MongoDB and JWT authentication.

---

## 🚀 Features

- **DSA Practice** — Live problems fetched from Codeforces API filtered by topic and difficulty rating, plus curated LeetCode problems with Easy / Medium / Hard badges
- **Aptitude Practice** — Topic wise IndiaBix links for Quantitative, Logical and Verbal sections with in-app MCQ quizzes using Open Trivia DB API
- **Core Subjects** — GFG topic learning links and IndiaBix practice for OS, DBMS, Computer Networks, OOP, Data Structures, Software Engineering and Computer Architecture
- **Progress Tracking** — Mark topics as done, progress saved to MongoDB Atlas, persists across sessions and devices
- **Placement Readiness Score** — Dashboard shows overall score out of 100 calculated from all three sections
- **JWT Authentication** — Secure login and registration, each student sees only their own data
- **Student Profile** — Edit personal details, add skills, upload resume, track placement offers received

---

## 🛠️ Tech Stack

| Part | Technology |
|---|---|
| Frontend | React.js, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT, bcryptjs |
| External APIs | Codeforces API, Open Trivia DB API |
| Data Sources | LeetCode JSON, GFG JSON, IndiaBix JSON |

---

## 📁 Project Structure

```
PrepTrack/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Quiz.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DSA.jsx
│   │   ├── Aptitude.jsx
│   │   ├── CoreSubjects.jsx
│   │   └── Profile.jsx
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   ├── api.js
│   │   ├── codeforcesApi.js
│   │   └── triviaApi.js
│   ├── data/
│   │   ├── dsa-topics.json
│   │   ├── aptitude-topics.json
│   │   └── core-subjects.json
│   └── styles/
│       ├── Auth.css
│       ├── Navbar.css
│       ├── Dashboard.css
│       ├── DSA.css
│       ├── Aptitude.css
│       ├── CoreSubjects.css
│       ├── Profile.css
│       └── Quiz.css
└── backend/
    ├── routes/
    │   ├── auth.js
    │   └── progress.js
    ├── models/
    │   ├── Student.js
    │   └── Progress.js
    ├── middleware/
    │   └── authMiddleware.js
    └── server.js
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v16 or above
- MongoDB Atlas account (free tier)
- Git

### Step 1 — Clone the repository
```bash
git clone https://github.com/kritikarai12/PrepTrack.git
cd PrepTrack
```

### Step 2 — Frontend Setup
```bash
npm install
npm start
```
Frontend runs at **http://localhost:3000**

### Step 3 — Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:
```
PORT=5000
JWT_SECRET=your_secret_key_here
MONGODB_URI=your_mongodb_atlas_connection_string
```

```bash
nodemon server.js
```
Backend runs at **http://localhost:5000**

---

## 🗄️ Database Collections

### Students Collection
| Field | Type | Description |
|---|---|---|
| name | String | Full name of student |
| email | String | College email — unique |
| password | String | Bcrypt encrypted |
| branch | String | CSE, IT, ECE etc. |
| year | String | 1st to 4th year |
| college | String | College name |
| skills | Array | List of technical skills |
| cgpa | String | Current CGPA |
| offers | Array | Placement offers received |

### Progress Collection
| Field | Type | Description |
|---|---|---|
| studentId | ObjectId | Reference to Student |
| section | String | dsa, aptitude or core |
| topicId | Number | Topic identifier |
| status | String | done or in-progress |

---

## 📡 API Endpoints

### Auth Routes — /api/auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /register | Register new student |
| POST | /login | Login existing student |
| PUT | /update | Update student profile |

### Progress Routes — /api/progress
| Method | Endpoint | Description |
|---|---|---|
| POST | /save | Save topic completion |
| DELETE | /remove | Remove topic completion |
| GET | /get | Get all student progress |
| GET | /stats | Get dashboard statistics |

---

## 📸 Pages

| Page | Description |
|---|---|
| Login | Student login with email and password |
| Register | New student registration with branch and year |
| Dashboard | Overall readiness score, section progress bars, student info |
| DSA | 12 topics with live Codeforces problems and curated LeetCode problems |
| Aptitude | 19 topics across Quant, Logical and Verbal with IndiaBix links and quizzes |
| Core Subjects | 7 subjects with GFG learning links, quizzes and IndiaBix practice |
| Profile | Personal details, skills, resume upload and placement offers |

---

## 🔗 External APIs Used

| API | Purpose | Cost |
|---|---|---|
| Codeforces API | Fetch live DSA problems by tag and difficulty | Free, no key needed |
| Open Trivia DB | Fetch MCQ questions for Aptitude and Core quizzes | Free, no key needed |

---

## 📝 Resume Entry

**PrepTrack** | React, Node.js, Express, MongoDB, JWT
- Built a full stack placement preparation tracker for college students with progress tracking and dashboard.
- Integrated Codeforces and Open Trivia DB APIs for live DSA problems and in-app MCQ quizzes, curated 100+ LeetCode problems by topic.
- Implemented topic wise practice links for Aptitude and Core Subjects using IndiaBix and GFG.
- Implemented JWT authentication and stored student progress and scores using MongoDB.

---

## 👩‍💻 Developer

**Kritika Rai**
# 🎯 PrepTrack — Campus Placement Preparation Tracker

A full stack web application for college students to track and manage their campus placement preparation in one place. Built with React, Node.js, Express, MongoDB and JWT authentication.

---

## 🚀 Features

- **DSA Practice** — Live problems fetched from Codeforces API filtered by topic and difficulty rating, plus curated LeetCode problems with Easy / Medium / Hard badges
- **Aptitude Practice** — Topic wise IndiaBix links for Quantitative, Logical and Verbal sections with in-app MCQ quizzes using Open Trivia DB API
- **Core Subjects** — GFG topic learning links and IndiaBix practice for OS, DBMS, Computer Networks, OOP, Data Structures, Software Engineering and Computer Architecture
- **Progress Tracking** — Mark topics as done, progress saved to MongoDB Atlas, persists across sessions and devices
- **Placement Readiness Score** — Dashboard shows overall score out of 100 calculated from all three sections
- **JWT Authentication** — Secure login and registration, each student sees only their own data
- **Student Profile** — Edit personal details, add skills, upload resume, track placement offers received

---

## 🛠️ Tech Stack

| Part | Technology |
|---|---|
| Frontend | React.js, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT, bcryptjs |
| External APIs | Codeforces API, Open Trivia DB API |
| Data Sources | LeetCode JSON, GFG JSON, IndiaBix JSON |

---

## 📁 Project Structure

```
PrepTrack/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Quiz.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DSA.jsx
│   │   ├── Aptitude.jsx
│   │   ├── CoreSubjects.jsx
│   │   └── Profile.jsx
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   ├── api.js
│   │   ├── codeforcesApi.js
│   │   └── triviaApi.js
│   ├── data/
│   │   ├── dsa-topics.json
│   │   ├── aptitude-topics.json
│   │   └── core-subjects.json
│   └── styles/
│       ├── Auth.css
│       ├── Navbar.css
│       ├── Dashboard.css
│       ├── DSA.css
│       ├── Aptitude.css
│       ├── CoreSubjects.css
│       ├── Profile.css
│       └── Quiz.css
└── backend/
    ├── routes/
    │   ├── auth.js
    │   └── progress.js
    ├── models/
    │   ├── Student.js
    │   └── Progress.js
    ├── middleware/
    │   └── authMiddleware.js
    └── server.js
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v16 or above
- MongoDB Atlas account (free tier)
- Git

### Step 1 — Clone the repository
```bash
git clone https://github.com/kritikarai12/PrepTrack.git
cd PrepTrack
```

### Step 2 — Frontend Setup
```bash
npm install
npm start
```
Frontend runs at **http://localhost:3000**

### Step 3 — Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:
```
PORT=5000
JWT_SECRET=your_secret_key_here
MONGODB_URI=your_mongodb_atlas_connection_string
```

```bash
nodemon server.js
```
Backend runs at **http://localhost:5000**

---

## 🗄️ Database Collections

### Students Collection
| Field | Type | Description |
|---|---|---|
| name | String | Full name of student |
| email | String | College email — unique |
| password | String | Bcrypt encrypted |
| branch | String | CSE, IT, ECE etc. |
| year | String | 1st to 4th year |
| college | String | College name |
| skills | Array | List of technical skills |
| cgpa | String | Current CGPA |
| offers | Array | Placement offers received |

### Progress Collection
| Field | Type | Description |
|---|---|---|
| studentId | ObjectId | Reference to Student |
| section | String | dsa, aptitude or core |
| topicId | Number | Topic identifier |
| status | String | done or in-progress |

---

## 📡 API Endpoints

### Auth Routes — /api/auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /register | Register new student |
| POST | /login | Login existing student |
| PUT | /update | Update student profile |

### Progress Routes — /api/progress
| Method | Endpoint | Description |
|---|---|---|
| POST | /save | Save topic completion |
| DELETE | /remove | Remove topic completion |
| GET | /get | Get all student progress |
| GET | /stats | Get dashboard statistics |

---

## 📸 Pages

| Page | Description |
|---|---|
| Login | Student login with email and password |
| Register | New student registration with branch and year |
| Dashboard | Overall readiness score, section progress bars, student info |
| DSA | 12 topics with live Codeforces problems and curated LeetCode problems |
| Aptitude | 19 topics across Quant, Logical and Verbal with IndiaBix links and quizzes |
| Core Subjects | 7 subjects with GFG learning links, quizzes and IndiaBix practice |
| Profile | Personal details, skills, resume upload and placement offers |

---

## 🔗 External APIs Used

| API | Purpose | Cost |
|---|---|---|
| Codeforces API | Fetch live DSA problems by tag and difficulty | Free, no key needed |
| Open Trivia DB | Fetch MCQ questions for Aptitude and Core quizzes | Free, no key needed |

---

## 📝 Resume Entry

**PrepTrack** | React, Node.js, Express, MongoDB, JWT
- Built a full stack placement preparation tracker for college students with progress tracking and dashboard.
- Integrated Codeforces and Open Trivia DB APIs for live DSA problems and in-app MCQ quizzes, curated 100+ LeetCode problems by topic.
- Implemented topic wise practice links for Aptitude and Core Subjects using IndiaBix and GFG.
- Implemented JWT authentication and stored student progress and scores using MongoDB.

---

## 👩‍💻 Developer

**Kritika Rai**
📧 kritikarai9794@gmail.com

---
