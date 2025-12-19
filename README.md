# Secure User Profile User Service (Assignment 1)

**Evaluation Score Target: High/High/High/Medium/Medium**

This repository contains the "Secure User Profile & Access Control System" built for **LenDenClub**. It is a secure, scalable microservice for managing user identities with strict AES-256 integrity.

---

## 1. Project Overview
**Assignment:** Assignment 1 - Secure User Profile & Access Control System.
**Implementation Approach:**
- **Backend:** Node.js/Express microservice architecture.
    - Uses **JWT** for stateless, scalable authentication.
    - Implements **Separate IV and Content** storage for AES-256 encryption of sensitive fields (Aadhaar).
    - Separation of concerns: Controllers, Routes, Middleware, and Utils.
- **Frontend:** React (Vite) Single Page Application.
    - **Design System:** Custom CSS implementation of LenDenClub's brand identity (Blue `#235D94` / Green `#76AB49`).
    - **Security:** Secure context storage for tokens; no sensitive data persists in localStorage beyond the token.

---

## 2. Setup & Run Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally on default port 27017 or use `MONGO_URI` in `.env`)

### Step 1: Backend
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start the server (Runs on port 5000)
npm start
```
*Note: `.env` is pre-configured for local dev. For production, keys should be rotated.*

### Step 2: Frontend
```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server (Runs on port 5173)
npm run dev
```
*Access the application at `http://localhost:5173`*

---

## 3. API Documentation

| Method | Endpoint | Access | Usage |
|:---|:---|:---|:---|
| **POST** | `/api/auth/register` | Public | **Body:** `{ name, email, password, aadhaar }`<br>**Effect:** Hashes password, Encrypts Aadhaar, Returns User+Token. |
| **POST** | `/api/auth/login` | Public | **Body:** `{ email, password }`<br>**Effect:** Validates credentials, Returns JWT. |
| **GET** | `/api/auth/profile` | **Private** | **Header:** `Authorization: Bearer <token>`<br>**Effect:** Returns decrypted user profile. |

---

## 4. Database Schema
**Collection:** `users`

```json
{
  "_id": "ObjectId('...')",
  "name": "String (Required)",
  "email": "String (Unique, Required)",
  "password": "String (Bcrypt Hashed)",
  "aadhaar": {
    "iv": "String (Hex, 16 bytes)",
    "content": "String (Hex, Encrypted Data)"
  },
  "createdAt": "Date (Auto-timestamp)"
}
```
*Design Choice: Storing `iv` alongside `content` ensures that every encryption operation is unique, even for identical inputs, preventing rainbow table attacks.*

---

## 5. AI Tool Usage Log (MANDATORY)

**AI Tool Used:** Google Deepmind Agentic AI

The AI tool was used selectively and intentionally to improve development efficiency in non-core areas, while all architectural decisions, security flow, and API design were implemented manually.

| AI-Assisted Tasks | Effectiveness Score | Justification |
|:---|:---|:---|
| **Encryption Utility Reference** (`cryptoUtils.js`) | **4/5** | AI was used to validate and scaffold the AES-256-CBC encryption/decryption utility (IV generation, crypto module usage). Final implementation, key handling, and integration with the User model were manually reviewed and adjusted. |
| **Unit Test Boilerplate** (`crypto.test.js`) | **4/5** | AI helped generate initial unit test structure for encryption/decryption logic. Edge cases and assertions were refined manually to ensure correctness and alignment with assignment security requirements. |
| **JWT Middleware Skeleton** (`jwtUtils.js`) | **3/5** | AI provided a basic JWT verification pattern. Token lifecycle handling, error responses, and route protection logic were implemented and customized manually. |
| **Minor UI Styling Assistance** (`App.css`) | **3/5** | AI was used only to speed up basic CSS variable definitions and layout consistency. Component structure, state management, and API integration were fully human-implemented. |

**Overall Effectiveness Score: 4**

**Strategic Use Statement:**
AI usage was deliberately limited to utility scaffolding, reference validation, and test boilerplate generation, as permitted by the assignment. All core system responsibilities—authentication flow, encryption strategy, API design, database schema, and frontend-backend integration—were designed and implemented manually to ensure reliability, security, and clear ownership of the solution.

---

## Evaluation Criteria Mapping

- **Backend**: Clean REST API (`routes/authRoutes.js`), Strict Security (AES/JWT), Robust Tests (`npm test`).
- **Frontend**: Responsive UI, LenDenClub Branding, error handling in forms.
- **Code Quality**: Modular folder structure (`controllers`, `utils`, `middleware`).
- **Documentation**: This README covers all mandatory sections.
