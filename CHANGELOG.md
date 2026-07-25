# Changelog

All notable changes to the Zyren project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2025-01 (Current)

### 🤖 Added - AI Integration
- **AI Title Generation**: Automatically generate descriptive titles for pastes using Groq's LLaMA 3.3 70B model
- **AI Content Summarization**: Get comprehensive summaries with word count and content type detection
- **AI Vision Analysis**: Analyze images, PDFs, and video thumbnails with Groq Vision (LLaMA 4 Maverick 17B) and Google Gemini fallback
- **AI Chat Assistant**: Interactive Q&A about paste content with context awareness and vision support
- **Multi-Provider Fallback System**: Groq as primary with automatic Google Gemini fallback for reliability
- **Configurable AI Models**: Support for multiple Gemini Flash models (3.6, 3.5, 3.5-lite, 3.1-lite, 3, 2.5)
- **Rate Limit Handling**: Intelligent quota management and model switching

### 🎨 Enhanced - Frontend
- **AI Components**:
  - `AITitleGenerator`: Button to generate titles with loading states
  - `AISummaryCard`: Collapsible summary cards with content type badges
  - `AIChatPanel`: Full-featured chat interface with vision context
- **React 19.1.0**: Upgraded to latest React version
- **Framer Motion 12.15.0**: Added smooth animations and transitions
- **React Three Fiber 9.1.2**: 3D graphics support
- **Enhanced Media Preview**: Better image/video/PDF display
- **Improved Loading States**: Real-time AI feedback indicators

### 🔧 Backend Updates
- **Spring Boot 3.5.7**: Latest stable version
- **AI Service Layer**: Comprehensive `AIService` with multiple AI operations
- **AI Controller**: RESTful endpoints for all AI features
- **Model Configuration**: Environment-driven AI model selection
- **Error Handling**: Graceful fallback and user-friendly error messages
- **Vision Processing**: Base64 image encoding for Gemini API

### 📦 Dependencies Updated
- React: 19.1.0
- Vite: 6.3.5
- TypeScript: 5.8.3
- Tailwind CSS: 4.1.8
- Axios: 1.9.0
- Zod: 3.25.46
- React Router: 7.6.1
- Lucide React: 0.511.0
- PostgreSQL Driver: 42.7.3
- OkHttp: 4.12.0
- Resend: 3.1.0
- Cloudinary: 1.37.0

---

## [1.1.0] - 2024-12

### Added
- **Media Upload Support**: Cloudinary integration for images, videos, and PDFs
- **Media Preview Component**: Display uploaded media with type-specific rendering
- **Media Deletion**: Secure media removal with ownership verification
- **Enhanced Paste Management**: Media metadata stored with pastes
- **OAuth2 Success Page**: Improved Google sign-in flow

### Enhanced
- **UI/UX Improvements**: Better responsive design
- **Dark Mode**: Persistent theme preference in localStorage
- **Error Handling**: Comprehensive error messages with Sonner toasts
- **Form Validation**: Improved Zod schemas and React Hook Form integration

---

## [1.0.0] - 2024-11

### Initial Release

#### Core Features
- **Authentication System**:
  - User registration and login with JWT
  - Google OAuth2 integration
  - Password reset via email (Resend API)
  - Role-based access (USER, ADMIN)

- **Paste Management**:
  - Create, edit, delete pastes
  - Optional expiry with auto-cleanup
  - Public access via unique codes
  - Code auto-generation (8 characters)
  - Custom code support

- **Admin Panel**:
  - User management
  - View user pastes
  - Delete users with cascade cleanup

- **Backend**:
  - Spring Boot 3.5.x
  - Spring Security with JWT
  - PostgreSQL (Render) / Oracle (local)
  - RESTful API design

- **Frontend**:
  - React 19 with Vite 6
  - TypeScript
  - Tailwind CSS v4
  - Radix UI components
  - React Router v7

- **Deployment**:
  - Frontend: Netlify
  - Backend: Render
  - Database: Render PostgreSQL

---

## Upgrade Notes

### From 1.1.0 to 1.2.0

**Environment Variables Required:**
Add these new variables to your `.env`:
```env
# AI Services (Required for AI features)
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

# Optional: Configure specific models (defaults provided)
GEMINI_VISION_PRIMARY=gemini-3.6-flash
GEMINI_TEXT_PRIMARY=gemini-3.5-flash-lite
GROQ_TEXT_MODEL=llama-3.3-70b-versatile
GROQ_VISION_MODEL=meta-llama/llama-4-maverick-17b-128e-instruct
```

**Backend:**
- Run `mvn clean install` to update dependencies
- Restart backend service to apply new AI configurations

**Frontend:**
- Run `npm install` to update React 19 and other dependencies
- No breaking changes in API contracts

**Database:**
- No schema changes required
- Existing pastes work with new AI features

**API Compatibility:**
- All existing endpoints remain unchanged
- New AI endpoints added under `/api/ai/*`
- Backward compatible with 1.1.0 clients

---

## Security Updates

### 1.2.0
- AI API key security: Environment variable configuration
- Rate limiting for AI endpoints
- Input validation for AI prompts
- Secure media URL handling in vision analysis

### 1.1.0
- Media upload validation and size limits
- Secure Cloudinary integration
- Media deletion authorization checks

### 1.0.0
- JWT token security
- Password strength validation
- CORS configuration
- SQL injection prevention

---

## Known Issues

### 1.2.0
- AI vision analysis may occasionally timeout on very large images (>10MB)
- Groq API rate limits may affect high-volume users (fallback to Gemini automatic)
- First AI request may be slower due to cold start

### Workarounds
- Resize large images before upload
- Monitor AI usage and adjust rate limits
- Consider caching AI responses for frequently accessed pastes

---

## Contributors

- **Rakin Mohammed Rafeeq** - Lead Developer
  - Email: rakinmohammedrafeeq@gmail.com
  - LinkedIn: [rakinmohammedrafeeq](https://www.linkedin.com/in/rakinmohammedrafeeq)
  - GitHub: [@rakinmohammedrafeeq](https://github.com/rakinmohammedrafeeq)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
