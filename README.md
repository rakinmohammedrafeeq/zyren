# Zyren – Secure Paste Sharing Platform

Zyren is a full-stack paste-sharing platform that allows users to create, manage, and share text/code snippets with optional expiration, public access via unique codes, and authentication with role-based admin control.  
It is built using Spring Boot, React, PostgreSQL (Render), and Resend for email workflows, with optional Oracle DB for local development.

---

## Key Features

### Authentication & Roles
- User registration and login with JWT authentication  
- Role-based access: USER and ADMIN  
- Admin-only access for user and paste management

### Paste Management
- Create, edit, delete personal pastes  
- Optional expiry (in minutes)  
- Auto-expiration scheduler and nightly cleanup  
- Public access using unique 8-character paste codes  
- Fetch public pastes without authentication

### Public Paste Access
- Dedicated page to enter and view pastes by code  
- Shareable link generation

### Admin Panel
- List all users except the current admin  
- View a user’s pastes  
- Delete users with cascade cleanup (tokens + pastes)

### Password Reset System
- Forgot password: email reset link using Resend  
- Token validation with 30-minute expiry and single-use  
- Strong server-side password validation

### UI/UX
- React + Tailwind CSS v4  
- Dark/Light mode (saved in localStorage)  
- Responsive layout with modern design  
- Smooth transitions, toasts, and clean navigation  

### Integrations
- Resend email API  
- Axios with JWT interceptors  
- Contact form and newsletter subscription endpoints

---

## Live Deployments

- Frontend (Netlify): https://zyren.netlify.app/  
- Backend (Render): https://zyren-backend.onrender.com  
- PostgreSQL DB (Render): dpg-d4a7gdje5dus739uqnv0-a  
- Local DB (Optional): Oracle Free via Docker

---

## Technologies Used

### Backend
- Java 21  
- Spring Boot 3.5.x  
- Spring Security  
- Spring Data JPA  
- JWT (jjwt)  
- Resend API  
- PostgreSQL (production) / Oracle (local development)  
- Maven  
- Docker support

### Frontend
- React 19 with Vite 6  
- TypeScript  
- Tailwind CSS v4  
- Radix UI  
- lucide-react icons  
- Axios + interceptors  
- React Router v7  
- Zod + React Hook Form  
- Sonner notifications  

---

## Project Structure

```
Zyren/
│
├── docker-compose.yml           # Oracle Free DB for local development
├── oradata/                     # Oracle DB pre-config files
│
├── backend/
│   ├── pom.xml
│   ├── Dockerfile               # Multi-stage Maven build
│   ├── docker-compose.yml       # Backend container config
│   ├── src/main/resources/
│   │   └── application.yaml     # DB, JWT, mail, Resend config
│   └── src/main/java/com/zyren/backend/
│       ├── ZyrenApplication.java
│       ├── config/              # Security, JWT, DataInitializer
│       ├── auth/                # Login, register, reset password
│       ├── user/                # User entity, admin controllers
│       ├── paste/               # Paste CRUD + public access
│       ├── contact/             # Contact + newsletter
│       ├── exception/           # Global exception handling
│       └── mail/                # Resend email service
│
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── main.tsx
        ├── contexts/AuthContext.tsx
        ├── api/axios.ts
        ├── lib/api.ts
        ├── components/
        ├── pages/ (Auth, Paste, Public, Admin)
        ├── ui/
        └── index.css
```

---

## Setup & Installation

### Backend Requirements
- Java 21  
- Maven  
- PostgreSQL or Oracle  
- Required environment variables:
```
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

JWT_SECRET=
JWT_EXPIRATION=

ZYREN_ADMIN_EMAIL=
ZYREN_ADMIN_PASSWORD=

RESEND_API_KEY=
MAIL_TO=
RESET_BASE_URL=

PORT=
```

---

## Local Development

### Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:
```
http://localhost:5173
```

The backend will run at:
```
http://localhost:8080
```

---

## Deployment

### Live Production URLs

- **Frontend (Netlify):** https://zyren.netlify.app  
- **Backend (Render Web Service):** https://zyren-backend.onrender.com  
- **Database (Render PostgreSQL):** dpg-d4a7gdje5dus739uqnv0-a

Your deployment setup includes:

- Netlify → Hosts the React (Vite) frontend  
- Render → Hosts the Spring Boot backend (Dockerfile build)  
- Render → Provides PostgreSQL as the production database  
- Local Oracle DB via Docker → For local development option  

---

## Security Policy

For the complete security policy, refer to **SECURITY.md**.  
It outlines:

- Supported versions  
- Responsible disclosure guidelines  
- Private reporting process  
- Required information when reporting vulnerabilities  
- Response timelines  

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact  

**For any questions or suggestions, feel free to reach out:**   
- **Email:** rakinmohammedrafeeq@gmail.com  
- **LinkedIn:** https://www.linkedin.com/in/rakinmohammedrafeeq  
- **GitHub:** https://github.com/rakinmohammedrafeeq

---

## Support  

If you find this project useful, consider giving it a ⭐ on GitHub or supporting my work:  

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/rakinmohammedrafeeq)
