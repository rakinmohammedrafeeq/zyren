# Security Policy

## Supported Versions

Current actively supported version of Zyren:

| Version | Supported | Release Date |
|---------|-----------|--------------|
| 1.2.x (with AI) | ✅ | 2025-01 |
| 1.1.x | ✅ | 2024-12 |
| 1.0.x | ⚠️ Limited | 2024-11 |
| < 1.0 | ❌ | - |

## Reporting a Vulnerability

If you discover a security vulnerability in Zyren, especially involving:

- Authentication, JWT handling, or authorization rules
- Public paste access or code-based retrieval
- Paste expiration logic or scheduled cleanup
- Admin-only endpoints or privilege escalation risks
- Email reset tokens, expiration, or validation flow
- Database exposure, configuration leakage, or environment variables
- Cross-site scripting, CSRF, or public page injection risks
- React/Frontend handling of user input or code pastes
- API rate-limiting or brute-force login concerns
- AI API key exposure or unauthorized AI service access
- Media upload vulnerabilities or unauthorized media access
- AI prompt injection or malicious content processing

Please do not open a public issue.

Report it privately through:

- LinkedIn: https://www.linkedin.com/in/rakinmohammedrafeeq

## Response Commitment

- You will receive an initial response within 48 hours.
- Vulnerabilities are assessed and addressed within 7–10 days depending on severity.

## What to Include in Your Report

Providing the following helps speed up resolution:

- Steps to reproduce the issue  
- Expected vs. actual behavior  
- Endpoint, user role, or paste ID involved  
- Logs, screenshots, or network traces if available  
- Frontend or backend environment used (local, Render, Netlify)

## Security Best Practices for Users

- Do not share your JWT token or credentials.
- Avoid pasting sensitive information in public pastes.
- Use strong passwords and update them regularly.
- Log out when using shared or public systems.
- Keep your browser and operating system updated.
- Be aware that AI features analyze paste content - avoid sharing confidential information.
- Uploaded media files are processed by AI vision models for analysis.

## Security Measures in Place

- JWT-based authentication with secure token handling
- Password strength validation with server-side enforcement
- Role-based access control (USER and ADMIN roles)
- Environment variable-based configuration for secrets
- Secure media upload with type and size validation
- AI API rate limiting and quota management
- Automatic paste expiration and cleanup
- CORS configuration for frontend-backend communication
- Input validation and sanitization on all endpoints

Thank you for helping keep Zyren secure.
