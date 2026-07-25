<p align="center">
  <img src="frontend/public/logo.svg" alt="Zyren Logo" width="140"/>
</p>

<h1 align="center">Zyren – AI-Powered Secure Paste Sharing Platform</h1>

<p align="center">
  <a href="https://zyren.netlify.app"><img src="https://img.shields.io/badge/Demo-Live-success?style=for-the-badge" alt="Live Demo"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License"/></a>
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/Version-1.2.0-orange.svg?style=for-the-badge" alt="Version"/></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg?style=for-the-badge" alt="Contributions"/></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-red?logo=openjdk&logoColor=white" alt="Java 21"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-3.5.7-green?logo=springboot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/React-19.1-blue?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-6.3-purple?logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Tailwind-4.1-cyan?logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Active-blue?logo=postgresql&logoColor=white" alt="PostgreSQL"/>
</p>

---

Zyren is a modern, full-stack paste-sharing platform with AI-powered content analysis. Create, manage, and share text/code snippets with optional expiration, public access via unique codes, intelligent title generation, content summarization with vision support, and an interactive AI chat assistant. Built with Spring Boot 3.5.7, React 19, PostgreSQL, Groq AI, Google Gemini, and Cloudinary for secure media handling.

**Key Highlights:**
- 🤖 **AI Integration**: Groq API + Google Gemini for title generation, summarization, vision analysis, and chat
- 🔒 **Secure**: JWT authentication + Google OAuth2 with role-based access control
- 📸 **Media Support**: Upload images, PDFs, videos via Cloudinary with AI vision analysis
- ⏰ **Smart Expiry**: Set automatic expiration with scheduled cleanup
- 🌐 **Public Sharing**: Generate unique shareable codes for instant access
- 🎨 **Modern UI**: React 19 + Tailwind CSS v4 with dark/light mode and Framer Motion animations
- 👥 **Admin Panel**: User and paste management with full CRUD operations

---

## What's New in v1.2 🚀

### AI-Powered Intelligence
Zyren now features comprehensive AI integration to enhance your paste management experience:

- **🎯 Smart Title Generation**: Let AI create perfect titles for your pastes instantly
- **📊 Intelligent Summaries**: Get comprehensive content summaries with word counts and type detection
- **👁️ Vision Analysis**: AI can now "see" and describe images, PDFs, and videos in your pastes
- **💬 Interactive Chat**: Ask questions about your paste content and get intelligent answers
- **⚡ Lightning Fast**: Groq API ensures near-instant AI responses
- **🔄 Always Available**: Automatic fallback to Google Gemini ensures 99.9% uptime

### Technical Improvements
- **React 19**: Latest React features and performance improvements
- **Modern Animations**: Framer Motion brings smooth, professional transitions
- **Enhanced UI**: New Radix UI components for better accessibility
- **Better Error Handling**: User-friendly error messages with fallback options

For full release notes, see [CHANGELOG.md](CHANGELOG.md).

---

## Key Features

### Authentication & Roles
- User registration and login with JWT authentication  
- Google OAuth2 sign-in (creates/links accounts and issues JWT on success)
- Role-based access: USER and ADMIN  
- Admin-only access for user and paste management

### Paste Management
- Create, edit, delete personal pastes  
- Optional expiry (in minutes)  
- Auto-expiration scheduler and nightly cleanup  
- Public access using paste codes (auto-generates an 8-character code if left empty; supports letters, numbers, '-', and '_')
- Fetch public pastes without authentication
- Optional media metadata stored on pastes (URL + publicId + media type)

### Media Uploads (Cloudinary)
- Upload media via backend endpoint (multipart/form-data)
- Supported types (server-side): JPEG, PNG, WebP, MP4/MOV, PDF
- Size limits:
  - Backend: 20MB (`spring.servlet.multipart.*`)
  - UI guardrails: 15MB
- Attach uploaded media to a paste (stored as `mediaUrl`, `mediaPublicId`, `mediaType`)
- Secure deletion: only the paste owner (or an admin) can delete media, and the backend verifies the media belongs to the paste before deleting

### AI-Powered Features
- **AI Title Generation**: Automatically generate descriptive titles for your pastes using Groq's fast language model
- **AI Content Summarization**: Get comprehensive summaries of your content with support for both text and media analysis
- **AI Vision Analysis**: Analyze images, PDFs, and video thumbnails attached to pastes with multimodal AI (Groq Vision + Google Gemini fallback)
- **AI Chat Assistant**: Ask questions about your paste content and get intelligent answers with context awareness
- **Multi-Provider Fallback**: Groq as primary (fast processing) with Google Gemini as fallback for reliability
- **Configurable AI Models**: Support for multiple Gemini models (Flash 3.6, 3.5, 3, 2.5) and Groq models (LLaMA 3.3 70B, LLaMA 4 Maverick)

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

### AI-Powered Enhancements
- Automatic title generation from paste content
- Intelligent content summarization with word count and type detection
- Visual content analysis for images, PDFs, and videos
- Interactive AI chat to ask questions about paste content
- Multi-provider AI system (Groq + Google Gemini) with automatic fallback
- Rate limit handling and quota management for reliability
- Content type detection (code, recipe, notes, article, etc.)

### UI/UX
- React 19 + Tailwind CSS v4 with modern animations  
- Dark/Light mode (saved in localStorage)  
- Responsive layout with modern design and Framer Motion animations
- Smooth transitions, toasts (Sonner), and clean navigation
- Interactive 3D elements using React Three Fiber
- Accessible UI components built with Radix UI
- Real-time AI feedback with loading states

### Integrations
- **AI Services**: Groq API (primary) + Google Gemini API (fallback) for title generation, summarization, chat, and vision analysis
- **Email**: Resend API for password reset and contact form
- **Media Storage**: Cloudinary for secure media uploads with automatic deletion
- **Authentication**: JWT tokens with refresh logic + Google OAuth2
- **HTTP Client**: Axios with JWT interceptors + consistent error handling
- **Form Validation**: Zod schemas + React Hook Form for robust client-side validation

---

## Feature Comparison

| Feature | Free Version | Description |
|---------|-------------|-------------|
| **Core Paste Management** | ✅ | Create, edit, delete pastes with full CRUD operations |
| **Public Sharing** | ✅ | Generate unique shareable codes for instant access |
| **Expiring Pastes** | ✅ | Set automatic expiration with scheduled cleanup |
| **Media Uploads** | ✅ | Images, PDFs, videos up to 20MB via Cloudinary |
| **Authentication** | ✅ | JWT + Google OAuth2 with role-based access |
| **AI Title Generation** | ✅ | Automatic title creation from content |
| **AI Summarization** | ✅ | Comprehensive content summaries |
| **AI Vision Analysis** | ✅ | Analyze images, PDFs, videos with AI |
| **AI Chat Assistant** | ✅ | Interactive Q&A about your pastes |
| **Admin Panel** | ✅ | User and paste management for admins |
| **Dark/Light Mode** | ✅ | Persistent theme preference |
| **Responsive Design** | ✅ | Works on desktop, tablet, mobile |
| **Email Notifications** | ✅ | Password reset and contact form |
| **API Access** | ✅ | Full RESTful API for all features |

*All features are currently free during beta. Future premium features may be added.*

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React 19)                  │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Pages     │  │  Components  │  │  AI Features │       │
│  │ Auth, Paste │  │  UI, Forms   │  │  Chat, Gen   │       │
│  └─────────────┘  └──────────────┘  └──────────────┘       │
│         │                 │                    │             │
│         └─────────────────┴────────────────────┘             │
│                           │                                  │
│                    Axios + JWT                               │
└───────────────────────────┼──────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │   REST API    │
                    │  Spring Boot  │
                    └───────┬───────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐
│   PostgreSQL   │  │  Cloudinary │  │   AI Providers  │
│   Database     │  │   Media     │  │ Groq + Gemini   │
└────────────────┘  └─────────────┘  └─────────────────┘
```

### Data Flow
1. **User Action** → Frontend React components
2. **API Request** → Axios with JWT interceptor
3. **Backend Processing** → Spring Boot controllers
4. **Business Logic** → Services (Auth, Paste, AI, Media)
5. **Data Persistence** → PostgreSQL database
6. **External Services** → Cloudinary, Groq/Gemini, Resend
7. **Response** → JSON data back to frontend
8. **UI Update** → React state management + re-render

---

## API Documentation

All backend routes are under the `/api` prefix unless noted.

### Auth
- `POST /api/auth/register` (form params: `email`, `password`)
- `POST /api/auth/login` (form params: `email`, `password`) → returns `{ token, email, role }`
- `POST /api/auth/forgot-password` (JSON body: `{ "email": "..." }`)
- `POST /api/auth/reset-password?token=...` (JSON body: `{ "newPassword": "..." }`)

### OAuth2 (Google)
- `GET /oauth2/authorization/google` (starts OAuth flow)
- OAuth callback: handled by Spring Security (`/login/oauth2/code/google`)
- Success handler redirects to the frontend route:
  - `GET /oauth-success?token=...` (frontend)

> Note: the backend OAuth2 success handler currently redirects to `http://localhost:5173/oauth-success?token=...`. For production, this should be made environment-driven.

### Paste
- `POST /api/paste` (form params: `title`, `content`, optional `expiryMinutes`, optional `code`, optional `mediaUrl`, `mediaPublicId`, `mediaType`)
- `GET /api/paste/me` (list your pastes)
- `PUT /api/paste/{id}` (update title/content + optional media fields)
- `DELETE /api/paste/{id}` (delete your paste)
- `DELETE /api/paste/admin/{id}` (admin-only delete)

### Public paste
- `GET /api/public/{code}` (no auth)

### Media
- `POST /api/media/upload` (multipart `file`) → returns `{ secureUrl, publicId, resourceType }`
- `DELETE /api/media/delete?pasteId=...&publicId=...`

### Admin
- `GET /api/admin/users`
- `GET /api/admin/users/{id}/pastes`
- `DELETE /api/admin/users/{id}`

### AI Features
- `POST /api/ai/generate-title` (JSON body: `{ "content": "..." }`) → generates a short, descriptive title
- `POST /api/ai/summarize` (JSON body: `{ "content": "...", "mediaUrl": "...", "mediaType": "..." }`) → comprehensive summary with optional media analysis
- `POST /api/ai/chat` (JSON body: `{ "content": "...", "question": "...", "mediaUrl": "..." }`) → answer questions about content with optional vision context
- `POST /api/ai/translate` (JSON body: `{ "content": "...", "targetLanguage": "..." }`) → translate content to target language
- `POST /api/ai/detect-type` (JSON body: `{ "content": "..." }`) → detect content type (code, recipe, notes, article, etc.)

### Contact + Newsletter
- `POST /api/contact` (JSON body: contact form fields)
- `POST /api/newsletter/subscribe` (JSON body: `{ "email": "..." }`)

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
- Spring Boot 3.5.7  
- Spring Security (JWT + OAuth2 Client)  
- Spring Data JPA  
- JWT (jjwt 0.11.5)  
- Resend API (3.1.0)  
- Cloudinary (1.37.0)  
- PostgreSQL (42.7.3) / Oracle (23.2.0.0 for local development)  
- OkHttp (4.12.0)  
- Maven  
- Docker support

### AI Integration
- Groq API (LLaMA 3.3 70B Versatile for text, LLaMA 4 Maverick 17B for vision)
- Google Gemini API (Flash models: 3.6, 3.5, 3.5-lite, 3.1-lite, 3, 2.5)
- Multi-modal support (text, images, PDFs, videos)
- Intelligent fallback system for reliability
- Rate limit handling and quota management

### Frontend
- React 19.1.0 with Vite 6.3.5  
- TypeScript 5.8.3  
- Tailwind CSS v4.1.8  
- Radix UI (comprehensive component library)  
- lucide-react icons (0.511.0)  
- Axios (1.9.0) + interceptors  
- React Router v7.6.1  
- Zod (3.25.46) + React Hook Form (7.57.0)  
- Sonner notifications (2.0.4)
- Framer Motion (12.15.0) for animations
- React Three Fiber (9.1.2) for 3D graphics
- date-fns (4.1.0) for date handling

---

## Project Structure

```
Zyren/
│
├── backend/                         # Spring Boot backend
│   ├── pom.xml
│   ├── Dockerfile                   # Multi-stage Maven build for Render
│   ├── docker-compose.yml           # Backend container config (optional local)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/zyren/backend/
│   │   │   │   ├── ZyrenApplication.java
│   │   │   │   ├── config/          # Security, JWT, CORS, initializers
│   │   │   │   ├── auth/            # Login, register, reset-password, OAuth handlers
│   │   │   │   ├── user/            # User entity, admin controllers
│   │   │   │   ├── paste/           # Paste CRUD + public access API
│   │   │   │   ├── media/           # Cloudinary upload/delete endpoints
│   │   │   │   ├── ai/              # AI services (Groq + Gemini integration)
│   │   │   │   ├── contact/         # Contact & newsletter endpoints
│   │   │   │   ├── exception/       # Global exception handling
│   │   │   │   └── mail/            # Resend email service
│   │   └── resources/
│   │       └── application.yaml     # DB, JWT, Resend, Cloudinary config
│
├── frontend/                        # React + Vite frontend
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── contexts/                # AuthContext (JWT + role/provider state)
│       ├── api/                     # Axios client with interceptors + AI API
│       ├── lib/                     # Centralized API helper & utilities
│       ├── components/              # Reusable UI components
│       │   ├── ui/                  # Radix-style components
│       │   ├── AIChatPanel.tsx      # AI chat assistant interface
│       │   ├── AISummaryCard.tsx    # AI-powered content summaries
│       │   ├── AITitleGenerator.tsx # AI title generation component
│       │   ├── MediaPreview.tsx     # Media display component
│       │   └── ...                  # Other shared components
│       ├── pages/                   # Auth, Paste, Public, Admin pages
│       ├── hooks/                   # Custom React hooks
│       ├── types/                   # TypeScript type definitions
│       └── index.css                # Tailwind v4 config + themes
│
├── oradata/                          # Oracle Free DB data dir for local dev
│
├── docker-compose.yml                # Oracle database local setup
│
├── README.md                         # Project documentation
├── CHANGELOG.md                      # Version history and updates
├── SECURITY.md                       # Security policy
├── LICENSE                           # MIT License
└── .gitignore                        # Git ignore rules
```

---

## Quick Start Guide

### Prerequisites
- **Java 21** or higher
- **Node.js 18+** and npm/pnpm
- **PostgreSQL** (or Oracle for local development)
- **API Keys**: Groq, Google Gemini, Cloudinary, Resend (see below)

### 1. Clone the Repository
```bash
git clone https://github.com/rakinmohammedrafeeq/zyren.git
cd zyren
```

### 2. Set Up Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories:

**Backend `.env`:**
```env
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/zyren
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password

# JWT
JWT_SECRET=your-secret-key-min-256-bits
JWT_EXPIRATION=86400000

# Admin Accounts
ZYREN_ADMIN_EMAIL_1=admin@example.com
ZYREN_ADMIN_PASSWORD_1=strongpassword

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
MAIL_TO=support@example.com
RESET_BASE_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI Services
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

# CORS
APP_CORS_ALLOWED_ORIGINS=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

**Frontend `.env`:**
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Start Backend
```bash
cd backend
./mvnw spring-boot:run
# Backend runs on http://localhost:8080
```

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Health Check**: http://localhost:8080/actuator/health

### Getting API Keys

#### Groq API (Primary AI Provider)
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Generate API key from dashboard
4. Free tier: 30 requests/minute

#### Google Gemini API (Fallback AI Provider)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Create new API key
4. Free tier: 60 requests/minute

#### Cloudinary (Media Storage)
1. Visit [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Get credentials from dashboard
4. Free tier: 25 GB storage, 25 GB bandwidth/month

#### Resend (Email Service)
1. Visit [Resend](https://resend.com/)
2. Sign up for free account
3. Generate API key
4. Free tier: 100 emails/day

---

## Setup & Installation

### Backend Requirements
- Java 21  
- Maven  
- PostgreSQL or Oracle

### Required environment variables

> Note: The backend reads most configuration from environment variables (and also supports loading from a local `.env` via `java-dotenv`).

```
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

JWT_SECRET=
JWT_EXPIRATION=

# Admin accounts (supports 2 configured admins)
ZYREN_ADMIN_EMAIL_1=
ZYREN_ADMIN_PASSWORD_1=
ZYREN_ADMIN_EMAIL_2=
ZYREN_ADMIN_PASSWORD_2=

# Email (Resend)
RESEND_API_KEY=
MAIL_TO=
RESET_BASE_URL=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# AI Services
GEMINI_API_KEY=
GROQ_API_KEY=

# Optional: Configure specific AI models (defaults shown)
GEMINI_VISION_PRIMARY=gemini-3.6-flash
GEMINI_TEXT_PRIMARY=gemini-3.5-flash-lite
GROQ_TEXT_MODEL=llama-3.3-70b-versatile
GROQ_VISION_MODEL=meta-llama/llama-4-maverick-17b-128e-instruct

# CORS (comma-separated)
APP_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
FRONTEND_URL=http://localhost:5173

PORT=
```

---

## Local Development

### Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Environment Variables

The frontend requires a single environment variable:
```
VITE_API_BASE_URL=
```

If not provided, the frontend defaults to:
```
http://localhost:8080/api
```

Create a `.env` file inside the **frontend/** folder:
```
frontend/.env
```

Add:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

For production (Netlify), set the variable in **Netlify → Site Settings → Environment Variables**.

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

## Troubleshooting

### Common Issues

#### Backend Won't Start
- **Check Java Version**: Ensure Java 21+ is installed (`java -version`)
- **Database Connection**: Verify PostgreSQL is running and credentials are correct
- **Port Conflict**: Ensure port 8080 is not in use by another application
- **Environment Variables**: Double-check all required variables in `.env`

#### Frontend Build Errors
- **Node Version**: Ensure Node.js 18+ is installed (`node -version`)
- **Clear Cache**: Try `rm -rf node_modules package-lock.json && npm install`
- **Vite Issues**: Delete `.vite` cache folder and restart dev server

#### AI Features Not Working
- **API Keys**: Verify Groq and Gemini API keys are correct and active
- **Rate Limits**: Check if you've exceeded API quotas (wait and retry)
- **Network Issues**: Ensure backend can reach external AI APIs
- **Model Configuration**: Verify model names in `application.yaml` are correct

#### Media Upload Fails
- **File Size**: Ensure file is under 15MB (frontend) / 20MB (backend)
- **File Type**: Only JPEG, PNG, WebP, MP4, MOV, PDF are supported
- **Cloudinary Config**: Verify API credentials and cloud name
- **Network**: Check internet connection for Cloudinary uploads

#### OAuth2 Login Issues
- **Redirect URI**: Ensure Google Console has correct redirect URI configured
- **Client Credentials**: Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- **Scope**: Check that email and profile scopes are enabled
- **Frontend URL**: Ensure `FRONTEND_URL` in backend matches your actual URL

### Debug Mode

Enable detailed logging by adding to `application.yaml`:
```yaml
logging:
  level:
    com.zyren.backend: DEBUG
    org.springframework.web: DEBUG
```

### Getting Help

1. **Check Documentation**: Review README and CHANGELOG
2. **Search Issues**: Look for similar problems in GitHub Issues
3. **Check Logs**: Review backend console and browser console
4. **Contact Support**: Email rakinmohammedrafeeq@gmail.com
5. **Community**: Join discussions on GitHub

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

## Performance & Optimization

### Backend Performance
- **Lazy Initialization**: Spring Boot lazy loading for faster startup
- **Connection Pooling**: HikariCP for optimal database performance
- **JPA Optimization**: Hibernate query optimization and caching
- **Response Compression**: Automatic GZIP compression for API responses
- **AI Caching**: Consider implementing Redis cache for frequent AI requests

### Frontend Performance
- **Code Splitting**: Automatic route-based code splitting with Vite
- **Tree Shaking**: Unused code elimination in production builds
- **Image Optimization**: Cloudinary automatic optimization and CDN delivery
- **Lazy Loading**: Components and routes loaded on demand
- **Bundle Size**: Production build typically under 500KB gzipped

### Database Optimization
- **Indexes**: Proper indexing on frequently queried columns
- **Cascade Operations**: Efficient cascade delete for user cleanup
- **Connection Limits**: Configured max pool size for concurrent requests
- **Query Optimization**: N+1 query prevention with JPA fetch strategies

### Best Practices
- Use pagination for large paste lists
- Implement rate limiting for AI endpoints
- Cache AI responses for duplicate requests
- Optimize images before upload (resize to max 2000px)
- Set appropriate paste expiry to auto-cleanup old data
- Monitor API usage to stay within free tier limits

---

## FAQ (Frequently Asked Questions)

### General

**Q: Is Zyren free to use?**  
A: Yes, all features are currently free during beta. API costs are covered by free tiers of external services.

**Q: Can I self-host Zyren?**  
A: Absolutely! Zyren is designed for easy self-hosting. Follow the setup guide above.

**Q: What's the difference between Zyren and other paste services?**  
A: Zyren uniquely combines AI-powered features, media support, and modern tech stack with a focus on privacy and user control.

### Technical

**Q: Which database should I use for local development?**  
A: PostgreSQL is recommended as it matches production. Oracle is supported but requires Docker setup.

**Q: Can I use Zyren without AI features?**  
A: Yes, simply don't configure AI API keys. Core paste features work independently.

**Q: How do I upgrade from v1.1 to v1.2?**  
A: Follow the upgrade notes in CHANGELOG.md. Main change is adding AI API keys.

**Q: What's the maximum paste size?**  
A: No hard limit on text size, but very large pastes (>100KB) may have slower AI processing.

### Features

**Q: Can I edit pastes after creation?**  
A: Yes, full edit capability for title and content. Media can be added/removed during edit.

**Q: How long do public paste codes last?**  
A: Codes are permanent unless you delete the paste or set an expiry time.

**Q: Can I password-protect pastes?**  
A: Not yet, but this is planned for a future release.

**Q: Do I need to be logged in to view public pastes?**  
A: No, anyone with the code can view public pastes without authentication.

### AI Features

**Q: Which AI models does Zyren use?**  
A: Primary: Groq (LLaMA 3.3 70B text, LLaMA 4 Maverick vision). Fallback: Google Gemini (multiple Flash models).

**Q: Is my data sent to AI providers?**  
A: Yes, when using AI features, content is sent to Groq/Gemini for processing. Don't use AI on sensitive data.

**Q: How accurate is AI vision analysis?**  
A: Very accurate for most content. Best results with clear images, readable PDFs, and good quality videos.

**Q: Can AI translate my pastes?**  
A: Translation feature is available via API but not yet in the UI. Coming in v1.3.

### Privacy & Security

**Q: Who can see my pastes?**  
A: Private pastes: only you. Public pastes: anyone with the code.

**Q: How is my data protected?**  
A: JWT authentication, HTTPS encryption, secure password hashing, role-based access control.

**Q: Can admins see my pastes?**  
A: Admins can view and delete any paste but cannot edit user content.

**Q: Is my email shared with third parties?**  
A: No. Email is only used for account management and password resets via Resend.

---

## Security Policy

For the complete security policy, refer to **[SECURITY.md](SECURITY.md)**.  
It outlines:

- Supported versions  
- Responsible disclosure guidelines  
- Private reporting process  
- Required information when reporting vulnerabilities  
- Response timelines

---

## Roadmap 🗺️

### v1.3 (Planned - Q2 2025)
- [ ] **Password Protection**: Add optional password for public pastes
- [ ] **Paste Categories**: Organize pastes with custom categories/tags
- [ ] **Syntax Highlighting**: Code syntax highlighting for multiple languages
- [ ] **Export Options**: Export pastes as PDF, Markdown, HTML
- [ ] **AI Translation UI**: Translate button in paste view
- [ ] **Collaborative Editing**: Real-time collaborative paste editing
- [ ] **API Rate Limiting**: Built-in rate limiting for all endpoints

### v1.4 (Planned - Q3 2025)
- [ ] **Paste Templates**: Pre-built templates for common use cases
- [ ] **Search & Filter**: Advanced search across your pastes
- [ ] **Analytics Dashboard**: Usage statistics and insights
- [ ] **Mobile Apps**: Native iOS and Android apps
- [ ] **Webhook Integration**: Trigger webhooks on paste events
- [ ] **Version History**: Track paste edit history
- [ ] **Share via Email**: Direct email sharing from UI

### Future Considerations
- WebSocket support for real-time updates
- GraphQL API alongside REST
- Elasticsearch integration for full-text search
- S3 storage option for media
- Multi-language UI (i18n)
- Browser extensions (Chrome, Firefox)
- CLI tool for power users
- AI-powered code completion
- Paste encryption for sensitive data

### Community Requests
Want a feature? [Open an issue](https://github.com/rakinmohammedrafeeq/zyren/issues) on GitHub!

---

## Contributing 🤝

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about:
- Development setup and workflow
- Coding standards and guidelines  
- How to submit pull requests
- Community guidelines and code of conduct

Quick links:
- [Report a Bug](https://github.com/rakinmohammedrafeeq/zyren/issues/new?labels=bug)
- [Request a Feature](https://github.com/rakinmohammedrafeeq/zyren/issues/new?labels=enhancement)
- [View Roadmap](#roadmap-🗺️)
- [Read Full Contributing Guide](CONTRIBUTING.md)

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments 🙏

### Technologies & Services
- **Spring Boot** - Amazing Java framework by Pivotal/VMware
- **React** - Revolutionary UI library by Meta
- **Groq** - Blazing fast AI inference
- **Google Gemini** - Powerful multimodal AI
- **Cloudinary** - Reliable media management
- **Resend** - Developer-friendly email API
- **Render** - Seamless cloud deployment
- **Netlify** - Excellent static hosting
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Vite** - Next generation frontend tooling

### Inspiration
Inspired by services like Pastebin, GitHub Gist, and modern AI applications, with a focus on:
- User privacy and control
- Modern, accessible design
- AI-enhanced productivity
- Open source transparency

### Special Thanks
- The open source community for amazing tools and libraries
- Early testers and feedback providers
- Stack Overflow community for troubleshooting help
- All contributors who help make Zyren better

---

## Contact  

**Developer:** Rakin Mohammed Rafeeq

### Get in Touch
- 📧 **Email:** [rakinmohammedrafeeq@gmail.com](mailto:rakinmohammedrafeeq@gmail.com)
- 💼 **LinkedIn:** [linkedin.com/in/rakinmohammedrafeeq](https://www.linkedin.com/in/rakinmohammedrafeeq)
- 🐙 **GitHub:** [@rakinmohammedrafeeq](https://github.com/rakinmohammedrafeeq)
- 🌐 **Live Demo:** [zyren.netlify.app](https://zyren.netlify.app)

### Project Links
- 🚀 **Frontend:** [zyren.netlify.app](https://zyren.netlify.app)
- ⚙️ **Backend API:** [zyren-backend.onrender.com](https://zyren-backend.onrender.com)
- 📚 **Documentation:** This README
- 🐛 **Issues:** [GitHub Issues](https://github.com/rakinmohammedrafeeq/zyren/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/rakinmohammedrafeeq/zyren/discussions)

### Response Times
- **Bug Reports:** Within 48 hours
- **Feature Requests:** Within 1 week
- **Pull Requests:** Within 3-5 days
- **Security Issues:** Within 24 hours (via LinkedIn DM)

---

## Support the Project ⭐

If you find Zyren useful, consider:

### Show Your Support
- ⭐ **Star this repository** on GitHub
- 🐦 **Share** on social media
- 📝 **Write** a blog post or review
- 🗣️ **Tell** your friends and colleagues
- 💡 **Contribute** code, docs, or ideas

### Buy Me a Coffee ☕
Support ongoing development and server costs:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/rakinmohammedrafeeq)

Your support helps:
- 🔧 Maintain and improve Zyren
- 🚀 Add new features faster
- 📚 Create better documentation
- 🌐 Keep demo servers running
- 🧪 Test with premium API tiers

Every contribution, big or small, is greatly appreciated! 💙

---
<!--
## Project Stats 📊

![GitHub stars](https://img.shields.io/github/stars/rakinmohammedrafeeq/zyren?style=social)
![GitHub forks](https://img.shields.io/github/forks/rakinmohammedrafeeq/zyren?style=social)
![GitHub issues](https://img.shields.io/github/issues/rakinmohammedrafeeq/zyren)
![GitHub pull requests](https://img.shields.io/github/issues-pr/rakinmohammedrafeeq/zyren)
![License](https://img.shields.io/github/license/rakinmohammedrafeeq/zyren)
-->
### Built With ❤️ by Rakin Mohammed Rafeeq

**Version:** 1.2.0  
**Last Updated:** January 2025  
**Status:** Active Development 🚧

---

*Made with ❤️ and ☕ in India*
