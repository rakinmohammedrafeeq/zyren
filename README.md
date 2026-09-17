<p align="center">
  <img src="public/logo.png" alt="Zyren Logo" width="160">
</p>

<h1 align="center">Zyren — AI-Powered Enterprise Paste Sharing & Multimodal Content Intelligence Platform</h1>

<p align="center">
  <b>Modern Pastebin Alternative • Multi-Tier Cross-Provider AI Fallbacks • Multimodal Media Analysis • Real-Time Code Collaboration</b>
</p>

<p align="center">
  <a href="https://zyren.netlify.app"><img src="https://img.shields.io/badge/Demo-Live_Application-success?style=for-the-badge&logo=vercel" alt="Live Demo"/></a>
  <a href="https://rakinmohammedrafeeq.vercel.app"><img src="https://img.shields.io/badge/Portfolio-Visit_Website-purple?style=for-the-badge&logo=vercel" alt="Portfolio"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License"/></a>
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/Version-1.2.0-orange.svg?style=for-the-badge" alt="Version"/></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg?style=for-the-badge" alt="Contributions"/></a>
</p>

<div align="center">

  [![Java](https://img.shields.io/badge/Java-21+-orange.svg?logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-brightgreen.svg?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
  [![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.4.3-646CFF.svg?logo=vite&logoColor=white)](https://vite.dev/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Neon](https://img.shields.io/badge/Neon-Serverless%20Postgres-00E599.svg?logo=neon&logoColor=white)](https://neon.tech/)
  [![Groq](https://img.shields.io/badge/Groq-LPU%20Inference-F55036.svg)](https://groq.com/)
  [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-3.6%20Flash-4285F4.svg?logo=google&logoColor=white)](https://ai.google.dev/)
  [![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN%20Storage-3448C5.svg?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
  [![Resend](https://img.shields.io/badge/Resend-Email%20API-000000.svg?logo=resend&logoColor=white)](https://resend.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📑 Table of Contents

- [Executive Overview](#-executive-overview)
  - [What is Zyren in Simple Terms?](#what-is-zyren-in-simple-terms)
  - [Real-World Use Cases](#real-world-use-cases)
  - [Why Zyren Solves Modern Paste & Sharing Pain Points](#why-zyren-solves-modern-paste--sharing-pain-points)
- [System Architecture](#-system-architecture)
  - [1. High-Level System Architecture](#1-high-level-system-architecture)
  - [2. Multi-Tier Cross-Provider AI Fallback Engine](#2-multi-tier-cross-provider-ai-fallback-engine)
  - [3. Paste Creation, Sharing & Media Lifecycle](#3-paste-creation-sharing--media-lifecycle)
  - [4. Security, OAuth2, and Access Control Architecture](#4-security-oauth2-and-access-control-architecture)
  - [5. Database Entity-Relationship Diagram (ERD)](#5-database-entity-relationship-diagram-erd)
- [Key Features Breakdown](#-key-features-breakdown)
- [Active & Verified AI Model Matrix (2026 Verified)](#-active--verified-ai-model-matrix-2026-verified)
- [Technology Stack](#-technology-stack)
- [Repository Structure](#-repository-structure)
- [Environment Configuration](#-environment-configuration)
- [Local Development & Quickstart](#-local-development--quickstart)
- [REST API Reference](#-rest-api-reference)
- [Production Deployment](#-production-deployment)
- [Performance & Security Hardening](#-performance--security-hardening)
- [Troubleshooting & FAQ](#-troubleshooting--faq)
- [Technology Decisions & Rationale](#-technology-decisions--rationale)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)
- [Support](#-support)

---

## 🌟 Executive Overview

### What is Zyren in Simple Terms?

Imagine a **next-generation code and text sharing platform** equipped with a built-in AI intelligence team working 24/7:

1. **You paste code, server logs, or architecture drafts** — Zyren automatically generates clean, descriptive titles (e.g. *"Spring Boot Security Filter Implementation"*) and detects language categories (`code`, `notes`, `article`, `recipe`) in sub-second time.
2. **You attach screenshots, architectural diagrams, or multi-page PDFs** — Zyren uses state-of-the-art multimodal vision models (`gemini-3.6-flash` and `qwen/qwen3.8-27b`) to synthesize visual summaries, read embedded diagrams, and transcribe OCR text accurately.
3. **You chat directly with any paste** (*"Explain what this regex does"* or *"Find memory leak risks in this Java class"*) — Zyren answers your questions in real-time, grounded entirely in the text and visual content of the paste.
4. **You share sensitive credentials or keys securely** — Set a custom password, an expiration timer (from 10 minutes to 1 month), or enable **Burn-After-Reading** (self-destructs instantly after a single view).
5. **Zero Downtime Guaranteed** — If Groq or Gemini suffers an outage, rate limit, or model decommissioning, Zyren’s cross-provider fallback engine seamlessly switches providers and backup models without user interruption.

---

### Real-World Use Cases

| Persona / Role | The Challenge | How Zyren Solves It |
| :--- | :--- | :--- |
| **Software Engineers & DevOps** | Traditional pastebins format code poorly, leak credentials, and offer zero automated synthesis. | Syntax-highlighted pastes, line numbering, instant copy, and one-click AI code explanation and bug analysis. |
| **Technical Writers & Educators** | Need to share documents with attached diagrams, slides, or PDF references. | Upload PDFs and screenshots alongside markdown; AI extracts diagrams and produces combined multimodal summaries. |
| **Security-Conscious Teams** | Sharing sensitive API tokens, configuration files, and temporary passwords over unencrypted chat. | Encrypted password-protected links with optional Burn-After-Reading self-destruction and automated TTL cleanup. |
| **Global Distributed Teams** | Language barriers across global contributors reading technical specifications. | Built-in AI translation engine translates pastes into any target language with preserved formatting. |
| **Enterprise Administrators** | Rate limit crashes, API quota exhaustion, and unmonitored pastes. | Bidirectional multi-tier fallback between Groq LPU and Google Gemini, Google OAuth2 login, and automated database pruning. |

---

### Why Zyren Solves Modern Paste & Sharing Pain Points

- **Zero-Downtime Multi-Provider AI Fallback:** Never experience service interruptions when upstream AI models hit rate limits (HTTP 429), encounter server errors (HTTP 503), or are decommissioned (HTTP 404). Zyren automatically navigates prioritized fallback chains across Groq and Google Gemini.
- **Multimodal Visual Intelligence:** Unlike legacy text-only pastebins, Zyren seamlessly integrates Cloudinary CDN media hosting with Google Gemini and Groq Vision models to inspect images, documents, and code simultaneously.
- **Burn-After-Reading Privacy Guarantee:** Critical credentials and secrets can be shared safely. As soon as the recipient accesses the link, the paste and its media references are permanently purged from the database.
- **Decoupled Modern Architecture:** High-performance Spring Boot 3 backend paired with a blazing-fast React 19 + Vite frontend delivering sub-second page loads, responsive dark mode, and seamless OAuth2 onboarding.

---

## 🏗 System Architecture

### 1. High-Level System Architecture

Zyren follows a clean, decoupled **Modular Monolith** architecture backed by a modern Single Page Application (SPA) frontend, cloud edge media delivery, and serverless relational persistence:

```mermaid
graph TB
    subgraph Client_Tier["Client Layer (Frontend)"]
        UI["Vite + React 19 + TypeScript SPA"]
        CodeEditor["Syntax Highlighting & Markdown Viewer"]
        AIChat["Interactive AI Assistant & Chat Drawer"]
        UI --> CodeEditor
        UI --> AIChat
    end

    subgraph Security_Gate["Security & Gateway Layer"]
        CORS["CORS & Origin Filter"]
        JWT_Filter["Stateless JWT Token Filter"]
        OAuthHandler["Google OAuth 2.0 Flow Handler"]
        PasswordGuard["BCrypt Paste Password Verifier"]
    end

    subgraph Core_Backend["Spring Boot 3.5.7 Backend Services"]
        PasteController["PasteController (CRUD, Burn, Views)"]
        AIController["AIController (Title, Summary, Chat, Translate)"]
        AuthController["AuthController (Register, Login, Password Reset)"]
        MediaController["MediaController (Cloudinary CDN Uploader)"]
        ContactController["ContactNewsletterController (Support & Updates)"]
    end

    subgraph AI_Intelligence["Multi-Tier Cross-Provider AI Engine"]
        AIService["AIService (Bidirectional Failover Orchestrator)"]
        GroqEngine["Groq LPU Engine (~280 tokens/sec)"]
        GeminiEngine["Google Gemini Multimodal Engine"]
        AIService <-->|Primary / Failover| GroqEngine
        AIService <-->|Primary / Failover| GeminiEngine
    end

    subgraph Storage_Cloud["Data & Cloud Infrastructure"]
        NeonDB[("Neon Serverless PostgreSQL 16+")]
        Cloudinary["Cloudinary CDN (Encrypted Media Storage)"]
        Resend["Resend API (Transactional Email Gateway)"]
    end

    %% Client communication
    UI -->|HTTPS / REST API| CORS
    CORS --> JWT_Filter
    JWT_Filter --> Core_Backend
    OAuthHandler <-->|Social Sign-In| UI

    %% Backend to Internal Layers
    PasteController --> PasswordGuard
    PasteController --> NeonDB
    AIController --> AIService
    MediaController --> Cloudinary
    AuthController --> Resend
    AuthController --> NeonDB

    %% Media routing
    GeminiEngine -.->|Inspect Media Stream| Cloudinary
    GroqEngine -.->|Inspect Base64 Data| Cloudinary
```

---

### 2. Multi-Tier Cross-Provider AI Fallback Engine

Zyren implements an enterprise-grade **bidirectional fallback architecture**. If a primary model encounters a rate limit (HTTP 429), quota exhaustion, service error (HTTP 503), or model deprecation (HTTP 404), the engine automatically tries sequential backup models before crossing over to the alternate provider:

```mermaid
flowchart TD
    subgraph Request_Routing["Incoming AI Intent Routing"]
        InText["Text Request (Title, Summary, Chat, Translate)"]
        InVision["Vision Request (Image/PDF Summary, Visual Q&A)"]
    end

    subgraph Groq_Text_Chain["Groq Primary Text Chain (Ultra-Fast LPU)"]
        G1["1. groq/compound-mini (Primary)"]
        G2["2. openai/gpt-oss-120b (High Reasoning)"]
        G3["3. openai/gpt-oss-20b (Fast Reasoning)"]
        G4["4. qwen/qwen3.8-27b (High Capacity)"]
        G5["5. groq/compound (Extended Context)"]
        G1 -->|On 404 / 429 / 503| G2
        G2 -->|On 404 / 429 / 503| G3
        G3 -->|On 404 / 429 / 503| G4
        G4 -->|On 404 / 429 / 503| G5
    end

    subgraph Gemini_Text_Chain["Gemini Text Fallback Chain"]
        GT1["6. gemini-3.6-flash (Primary Google Engine)"]
        GT2["7. gemini-flash-latest"]
        GT3["8. gemini-3.8-flash"]
        GT4["9. gemini-3.5-flash-lite"]
        GT5["10. gemini-3.1-flash-lite"]
        GT1 -->|On Error / Quota| GT2
        GT2 -->|On Error / Quota| GT3
        GT3 -->|On Error / Quota| GT4
        GT4 -->|On Error / Quota| GT5
    end

    subgraph Groq_Vision_Chain["Groq Vision Engine"]
        GV1["1. qwen/qwen3.8-27b (Multimodal LPU)"]
    end

    subgraph Gemini_Vision_Chain["Gemini Vision Fallback Chain"]
        GVT1["2. gemini-3.6-flash (Primary Multimodal)"]
        GVT2["3. gemini-flash-latest"]
        GVT3["4. gemini-3.8-flash"]
        GVT4["5. gemini-3.5-flash-lite"]
        GVT5["6. gemini-3.1-flash-lite"]
        GVT1 -->|On Error / Quota| GVT2
        GVT2 -->|On Error / Quota| GVT3
        GVT3 -->|On Error / Quota| GVT4
        GVT4 -->|On Error / Quota| GVT5
    end

    subgraph Graceful_Degrade["Graceful Degradation Safeguard"]
        TextDegrade["Text-Only Analysis Degradation"]
    end

    %% Routing connections
    InText --> G1
    G5 -->|All Groq Models Failed -> Shift to Gemini| GT1
    
    InVision --> GV1
    GV1 -->|Vision Failover -> Shift to Gemini| GVT1
    GVT5 -->|All Vision Models Failed| TextDegrade

    %% Success Outputs
    OutputSuccess["Sanitized JSON / Formatted Response Output"]
    G1 -.->|Success| OutputSuccess
    G2 -.->|Success| OutputSuccess
    G3 -.->|Success| OutputSuccess
    G4 -.->|Success| OutputSuccess
    GT1 -.->|Success| OutputSuccess
    GV1 -.->|Success| OutputSuccess
    GVT1 -.->|Success| OutputSuccess
    TextDegrade -.->|Success| OutputSuccess
```

---

### 3. Paste Creation, Sharing & Media Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Developer
    participant UI as Frontend (React 19)
    participant MediaCtrl as MediaController
    participant Cloudinary as Cloudinary CDN
    participant PasteCtrl as PasteController
    participant AISvc as AIService
    participant PG as PostgreSQL (Neon)

    User->>UI: Types code & attaches architecture screenshot
    
    opt Has Media Attachment
        UI->>MediaCtrl: POST /api/media/upload (multipart/form-data)
        MediaCtrl->>Cloudinary: Upload & encrypt media asset
        Cloudinary-->>MediaCtrl: Secure HTTPS CDN URL & public_id
        MediaCtrl-->>UI: MediaUploadResponse { secure_url, format }
    end

    opt Auto-Generate Title
        UI->>AISvc: POST /api/ai/generate-title { content }
        AISvc->>AISvc: Execute Groq -> Gemini fallback chain
        AISvc-->>UI: "Spring Security OAuth2 Integration"
    end

    User->>UI: Clicks "Create Paste" (with Password / Burn-After-Reading)
    UI->>PasteCtrl: POST /api/pastes { title, content, mediaUrl, isBurnAfterReading, password, ttl }
    PasteCtrl->>PasteCtrl: Hash password with BCrypt (if present)
    PasteCtrl->>PG: INSERT INTO pastes VALUES (...)
    PG-->>PasteCtrl: Saved Paste Entity (UUID)
    PasteCtrl-->>UI: 201 Created { id, url, burnAfterReading, expiresAt }
    UI-->>User: Display shareable URL & copy badge

    rect rgb(255, 245, 245)
        note over User,PG: Burn-After-Reading View Flow
        actor Recipient as Recipient User
        Recipient->>UI: Navigates to /paste/{id}
        UI->>PasteCtrl: GET /api/pastes/{id}
        PasteCtrl->>PG: SELECT * FROM pastes WHERE id = ?
        PasteCtrl->>PG: DELETE FROM pastes WHERE id = ? (Instant Burn!)
        PasteCtrl-->>UI: Paste Content (Delivered Once)
        UI-->>Recipient: Content displayed with "This paste has burned" alert
    end
```

---

### 4. Security, OAuth2, and Access Control Architecture

```mermaid
flowchart LR
    subgraph Auth_Methods["Authentication Gateways"]
        A1["Email + Password"]
        A2["Google OAuth 2.0"]
        A3["OTP Password Reset"]
        A4["Anonymous Pasting"]
    end

    subgraph Security_Filters["Security Filter Chain"]
        B1["CORS Origin Validation"]
        B2["JwtAuthenticationFilter\n(Bearer Token Extraction)"]
        B3["BCrypt Password Encoder\n(Cost Factor: 10)"]
        B4["Paste Access Guard\n(Password & Expiration Validation)"]
    end

    subgraph Access_Matrix["Access Permissions"]
        C1{"User Role"}
        C2{"Paste Visibility"}
        
        C1 -->|ADMIN| P1["Platform Admin Console\nManage All Pastes & Telemetry"]
        C1 -->|USER| P2["Personal Dashboard\nManage Owned Pastes & Analytics"]
        C1 -->|ANONYMOUS| P3["Read Public Pastes &\nCreate Temporary Pastes"]

        C2 -->|PUBLIC| V1["Open Access Link"]
        C2 -->|PASSWORD_PROTECTED| V2["Requires BCrypt Unlock Modal"]
        C2 -->|BURN_AFTER_READING| V3["Single-Use Self-Destruct Token"]
        C2 -->|EXPIRED_TTL| V4["HTTP 410 Gone / Auto-Purged"]
    end

    Auth_Methods --> Security_Filters
    Security_Filters --> Access_Matrix
```

---

### 5. Database Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    users ||--o{ pastes : "creates / owns"
    users ||--o{ password_reset_tokens : "requests"
    pastes ||--o{ paste_views : "records"

    users {
        bigint id PK
        varchar email UK
        varchar password
        varchar name
        varchar role "ADMIN, USER"
        varchar auth_provider "LOCAL, GOOGLE"
        varchar provider_id
        timestamp created_at
        timestamp updated_at
    }

    pastes {
        varchar id PK "Generated alphanumeric ID"
        bigint user_id FK "Nullable for anonymous pastes"
        varchar title
        text content
        varchar language "java, ts, python, etc."
        varchar media_url
        varchar password_hash "BCrypt hashed"
        boolean is_password_protected
        boolean is_burn_after_reading
        integer view_count
        timestamp expires_at
        timestamp created_at
        timestamp updated_at
    }

    paste_views {
        bigint id PK
        varchar paste_id FK
        varchar ip_address
        varchar user_agent
        timestamp viewed_at
    }

    password_reset_tokens {
        bigint id PK
        bigint user_id FK
        varchar token UK
        timestamp expires_at
        timestamp created_at
    }
```

---

## ⚡ Key Features Breakdown

### 1. 🤖 Multi-Provider AI Engine with 10-Tier Failover
- **Intelligent Dual-Provider Orchestration:** Primary text requests flow to lightning-fast Groq LPU models (`groq/compound-mini`, `openai/gpt-oss-120b`), while vision requests leverage multimodal engines (`qwen/qwen3.8-27b`, `gemini-3.6-flash`).
- **Seamless Provider Switching:** If Groq encounters downtime, unauthorized keys (401), or rate limits (429), Zyren dynamically shifts to Google Gemini's 5-model fallback chain without dropping the user's connection.
- **Configurable Primary Provider:** Set `AI_PRIMARY_PROVIDER=groq` or `AI_PRIMARY_PROVIDER=gemini` to match your infrastructure requirements.

### 2. 👁️ Multimodal Media & PDF Analysis (OCR & Visual Q&A)
- **High-Accuracy Vision Reasoning:** Analyze attached screenshots, infrastructure diagrams, error logs, and multi-page PDFs using `gemini-3.6-flash` and `qwen/qwen3.8-27b`.
- **Visual Question-Answering:** Ask questions specifically about the diagram or document (*"What microservices are in this topology?"*), and the AI synthesizes both the image and the surrounding text notes.
- **Graceful Vision Degradation:** If all vision models across both providers fail, the system automatically falls back to text-only analysis to ensure requests never crash.

### 3. 💬 In-Context AI Chat & Global Translation
- **Context-Grounded Answers:** Have an interactive conversation with any paste. The AI is primed with the exact code snippet, language context, and author notes.
- **Multilingual Code & Text Translation:** Translate technical documentation or code explanations into any natural language with preserved syntax formatting.
- **Automated Title & Category Detection:** Instantly suggests 8-word descriptive titles and categorizes pastes (`code`, `notes`, `article`, `recipe`, `poem`, `list`).

### 4. 🔒 Enterprise Security: Burn-After-Reading & TTL Expiration
- **Burn-After-Reading:** Share passwords, credentials, or API keys with complete confidence. Once loaded by the recipient, the paste is permanently deleted from PostgreSQL.
- **Password Protection:** Encrypt access to pastes with salted BCrypt password hashing.
- **Flexible Expiration Timers:** Configure pastes to expire after 10 minutes, 1 hour, 1 day, 1 week, 1 month, or keep them forever. Automated background jobs prune expired records.

### 5. 💻 Developer-First Syntax Highlighting & Tooling
- **Language Auto-Detection:** Automatically styles code for over 50 languages (Java, TypeScript, Python, Go, Rust, C++, Bash, SQL, JSON, YAML).
- **Line Numbers & Raw View:** Easy line-by-line inspection, one-click raw plaintext view, and instant clipboard copy.
- **Glassmorphic UI:** Modern dark/light theme designed with Tailwind CSS and responsive mobile layouts.

### 6. ☁️ Cloudinary CDN Media Delivery
- **Optimized Asset Delivery:** Attachments are automatically compressed, transcoded, and served via Cloudinary's global edge network.
- **Encrypted URLs:** Media files are linked to pastes via secure HTTPS endpoints with tamper-proof asset IDs.

---

## 🤖 Active & Verified AI Model Matrix (2026 Verified)

> **2026 Model Deprecation Notice:** Older models such as Groq's `llama-3.3-70b-versatile`, `llama-4-maverick`, and Google's `gemini-2.5-flash` have been decommissioned upstream and return `404 Not Found`. Zyren has been upgraded and live-verified against active production models:

### Groq Active Models & Modalities
| Model Identifier | Primary / Fallback Role | Modality | Best For | Status |
| :--- | :--- | :--- | :--- | :--- |
| `groq/compound-mini` | **Primary Text** | Text | Ultra-fast titles, summaries, chat | **Active & Free** |
| `openai/gpt-oss-120b` | **Text Fallback 1** | Text | Deep code reasoning & syntax analysis | **Active & Free** |
| `openai/gpt-oss-20b` | **Text Fallback 2** | Text | High-throughput low-latency inference | **Active & Free** |
| `qwen/qwen3.8-27b` | **Text Fallback 3 & Primary Vision** | Text + Vision | Multimodal image/diagram comprehension | **Active & Free** |
| `groq/compound` | **Text Fallback 4** | Text | Extended context window synthesis | **Active & Free** |

### Google Gemini Active Models & Modalities
| Model Identifier | Primary / Fallback Role | Modality | Best For | Status |
| :--- | :--- | :--- | :--- | :--- |
| `gemini-3.6-flash` | **Primary Vision & Text Fallback 1** | Text + Vision | Multimodal PDF/image OCR & synthesis | **Active & Free** |
| `gemini-flash-latest` | **Fallback 2 (Vision & Text)** | Text + Vision | Stable production general intelligence | **Active & Free** |
| `gemini-3.8-flash` | **Fallback 3 (Vision & Text)** | Text + Vision | High-speed structured output generation | **Active & Free** |
| `gemini-3.5-flash-lite` | **Fallback 4 (Vision & Text)** | Text + Vision | High rate-limit backup | **Active & Free** |
| `gemini-3.1-flash-lite` | **Fallback 5 (Vision & Text)** | Text + Vision | Lightweight emergency fallback | **Active & Free** |

### API Key Standards & Compatibility
- **Google Gemini Keys:** Zyren natively supports modern Google AI Studio keys starting with `AQ.` (e.g. `AQ.Ab8RN...`) as well as legacy `AIza` keys over the `v1beta` endpoint.
- **Groq Keys:** Fully compatible with official `gsk_` prefixed API keys over OpenAI-compatible chat endpoints.

---

## 💻 Technology Stack

| Layer | Technology | Version | Purpose & Rationale |
| :--- | :--- | :--- | :--- |
| **Backend Framework** | Java / Spring Boot | `21+` / `3.5.7` | Enterprise-grade stability, virtual threads capability, type safety, and robust security. |
| **Persistence & ORM** | Spring Data JPA / Hibernate | `3.5.7` | High-performance ORM, HikariCP connection pooling, and automated schema migration. |
| **Database** | PostgreSQL / Neon Serverless | `16+` | Cloud-native serverless PostgreSQL with connection pooling and SSL encryption. |
| **AI Cloud: Groq** | Groq LPU Inference | `REST / OpenAI Spec` | Blazing-fast inference speed (~280 tokens/sec) for code categorization, titles, and chat. |
| **AI Cloud: Google** | Google Gemini API | `v1beta` | Multimodal document comprehension and high-accuracy OCR for PDF and image analysis. |
| **Security & Auth** | Spring Security / JJWT | `6.x` / `0.12.5` | Stateless JWT tokens, BCrypt password hashing, and role-based endpoint authorization. |
| **Social Sign-In** | Google OAuth 2.0 | `v2` | Frictionless user onboarding via Google OAuth social login. |
| **Email Gateway** | Resend API Client | `3.0.0` | High-deliverability transactional email gateway for password reset verification. |
| **Media Management** | Cloudinary Java SDK | `1.38.0` | Encrypted image storage, automatic WebP format transcoding, and edge CDN acceleration. |
| **Frontend Framework** | React / TypeScript | `19.0.0` / `5.6.3` | Predictable state rendering, strict compile-time type safety, and modern hook abstractions. |
| **Build & Tooling** | Vite | `6.4.3` | Instant hot module replacement (HMR) and optimized rollup production bundles. |
| **Styling & UI** | Tailwind CSS / Lucide React | `4.x` / `Latest` | Clean modern glassmorphism, responsive navigation, and beautiful syntax highlighting. |

---

## 📁 Repository Structure

```text
zyren/
├── backend/                                # Spring Boot 3.5.7 Core Server
│   ├── src/main/java/com/zyren/backend/
│   │   ├── ZyrenApplication.java           # Application entrypoint & Dotenv loader
│   │   ├── ai/                             # Multi-Tier AI Provider & Model Fallback
│   │   │   ├── AIController.java           # REST endpoints for title, summary, chat, translate
│   │   │   ├── AIRequest.java              # AI payload contracts
│   │   │   ├── AIResponse.java             # AI response wrappers
│   │   │   └── AIService.java              # Bidirectional failover engine (Groq <-> Gemini)
│   │   ├── auth/                           # Security, JWT & OAuth2 Services
│   │   │   ├── AuthController.java         # Register, Login, OAuth2 social login
│   │   │   ├── AuthService.java            # Authentication logic & password reset
│   │   │   ├── OAuth2SuccessHandler.java   # Google OAuth redirect handler
│   │   │   └── PasswordValidator.java      # Password strength verification
│   │   ├── config/                         # Security & Infrastructure Configurations
│   │   │   ├── AdminConfiguration.java     # Admin credentials initialization
│   │   │   ├── CloudinaryConfig.java       # Cloudinary client bean setup
│   │   │   ├── DataInitializer.java        # DB bootstrap & seed data
│   │   │   ├── JwtAuthenticationFilter.java# Stateless JWT filter
│   │   │   ├── JwtUtil.java                # HMAC-SHA256 token manager
│   │   │   └── SecurityConfig.java         # Spring Security filter chain & CORS
│   │   ├── contact/                        # Support & Newsletter Endpoints
│   │   ├── media/                          # Cloudinary Upload Controller
│   │   ├── paste/                          # Core Paste Domain Model & Services
│   │   │   ├── Paste.java                  # JPA Entity (pastes table)
│   │   │   ├── PasteController.java        # CRUD, burn-after-reading, views
│   │   │   ├── PasteRepository.java        # Spring Data JPA queries
│   │   │   └── PasteService.java           # Expiration, burn logic & validation
│   │   └── user/                           # User Entity & Repository
│   ├── src/main/resources/
│   │   └── application.yaml                # Spring Boot application configuration
│   ├── src/test/java/com/zyren/backend/ai/ # AI Fallback & Live Integration Tests
│   │   ├── AIServiceFallbackTest.java      # Unit tests for null checks & model lists
│   │   └── AIServiceLiveTest.java          # Bidirectional Groq <-> Gemini live failover test
│   ├── Dockerfile                          # Multi-stage production container build
│   ├── docker-compose.yml                  # Local development container orchestration
│   ├── pom.xml                             # Maven dependency configuration
│   ├── validate-gemini-key.ps1             # Windows Gemini API validation utility
│   └── validate-gemini-key.sh              # Unix Gemini API validation utility
├── frontend/                               # React 19 + Vite SPA Client
│   ├── src/
│   │   ├── api/                            # Axios API Clients (pasteApi, aiApi, authApi)
│   │   ├── components/                     # Reusable UI Components (Navbar, AIChat, Editor)
│   │   ├── context/                        # AuthContext & ThemeContext providers
│   │   ├── pages/                          # Primary view routes (Home, Paste, Login, Dashboard)
│   │   └── types/                          # TypeScript interface contracts
│   ├── public/                             # Static assets, logo & redirects
│   ├── package.json                        # Frontend dependencies & scripts
│   └── vite.config.ts                      # Vite build optimization configuration
├── public/                                 # Repository branding & media assets (logo, icons)
├── docker-compose.yml                      # Root full-stack Docker Compose
└── README.md                               # Comprehensive project documentation
```

---

## ⚙️ Environment Configuration

Zyren uses environment variables for configuration. Create `.env` files in both `backend/` and `frontend/` directories.

### Backend Configuration (`backend/.env`)

```ini
# ===================================================================
# Database Configuration (Neon PostgreSQL / Local Postgres)
# ===================================================================
DB_URL=jdbc:postgresql://your-neon-host.aws.neon.tech/neondb?sslmode=require
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
SPRING_DATASOURCE_URL=jdbc:postgresql://your-neon-host.aws.neon.tech/neondb?sslmode=require
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password

# ===================================================================
# Security & JWT Token Configuration
# ===================================================================
JWT_SECRET=your-256-bit-secret-key-replace-this-in-production-environments
JWT_EXPIRATION=86400000

# ===================================================================
# Email Service (Resend API)
# ===================================================================
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_FROM_NAME=Zyren
MAIL_TO=admin@example.com

# ===================================================================
# Application Base URL & OAuth Redirection
# ===================================================================
APP_BASE_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173
RESET_BASE_URL=http://localhost:5173/reset-password
PORT=8080

# ===================================================================
# Multi-Provider AI Architecture & Fallback Chains
# ===================================================================
AI_PRIMARY_PROVIDER=groq

# Google Gemini API Configuration (Accepts AQ. or AIza keys)
GEMINI_API_KEY=your_gemini_api_key

# Gemini Multimodal Vision Models
GEMINI_VISION_PRIMARY=gemini-3.6-flash
GEMINI_VISION_FALLBACK1=gemini-flash-latest
GEMINI_VISION_FALLBACK2=gemini-3.8-flash
GEMINI_VISION_FALLBACK3=gemini-3.5-flash-lite
GEMINI_VISION_FALLBACK4=gemini-3.1-flash-lite

# Gemini Text Models
GEMINI_TEXT_PRIMARY=gemini-3.6-flash
GEMINI_TEXT_FALLBACK1=gemini-flash-latest
GEMINI_TEXT_FALLBACK2=gemini-3.8-flash
GEMINI_TEXT_FALLBACK3=gemini-3.5-flash-lite
GEMINI_TEXT_FALLBACK4=gemini-3.1-flash-lite

# Groq API Configuration (Ultra-Fast LPU Inference)
GROQ_API_KEY=your_groq_api_key

# Groq Text Models (Verified active free models: compound-mini, gpt-oss, qwen)
GROQ_TEXT_MODEL=groq/compound-mini
GROQ_TEXT_FALLBACK1=openai/gpt-oss-120b
GROQ_TEXT_FALLBACK2=openai/gpt-oss-20b
GROQ_TEXT_FALLBACK3=qwen/qwen3.8-27b
GROQ_TEXT_FALLBACK4=groq/compound
GROQ_TEXT_FALLBACKS=groq/compound-mini,openai/gpt-oss-120b,openai/gpt-oss-20b,qwen/qwen3.8-27b,groq/compound

# Groq Vision Models (Multimodal image/PDF support)
GROQ_VISION_MODEL=qwen/qwen3.8-27b
GROQ_VISION_FALLBACK1=qwen/qwen3.8-27b
GROQ_VISION_FALLBACKS=qwen/qwen3.8-27b

# ===================================================================
# Cloudinary CDN Media Storage (Image & PDF Attachments)
# ===================================================================
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_URL=cloudinary://key:secret@cloud_name

# ===================================================================
# Google OAuth 2.0 Social Sign-In (Optional)
# ===================================================================
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8080/login/oauth2/code/google

# ===================================================================
# Administrator Credentials
# ===================================================================
ZYREN_ADMIN_EMAIL_1=admin@zyren.local
ZYREN_ADMIN_PASSWORD_1=AdminPassword_2026!
```

### Frontend Configuration (`frontend/.env`)

```ini
# Backend API Base URL
VITE_API_URL=http://localhost:8080

# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## 🚀 Local Development & Quickstart

### Prerequisites
- **Java Development Kit (JDK):** Version 21 or higher
- **Node.js:** Version 18.0.0 or higher (`v20+` recommended) & `npm`
- **PostgreSQL Database:** Local instance or cloud database (such as [Neon.tech](https://neon.tech))

### 1. Clone the Repository
```bash
git clone https://github.com/rakinmohammedrafeeq/zyren.git
cd zyren
```

### 2. Configure Backend
Copy `.env.example` to `backend/.env` and update your database and API credentials:
```bash
cp backend/.env.example backend/.env
```

### 3. Launch Backend
```bash
cd backend

# Validate Gemini API Key configuration
.\validate-gemini-key.ps1    # On Windows PowerShell
# or: ./validate-gemini-key.sh # On macOS / Linux

# Build and start the Spring Boot server
./mvnw clean spring-boot:run
```
The backend API will start on **`http://localhost:8080`**.

### 4. Launch Frontend
Open a new terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The user interface will be live on **`http://localhost:5173`**.

### 5. Running with Docker Compose
To launch the entire platform in isolated containers:
```bash
docker-compose up --build
```

---

## 📡 REST API Reference

All protected requests must include standard headers:
```http
Content-Type: application/json
Authorization: Bearer <your_jwt_token>
```

### Paste Operations (`/api/pastes`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/pastes` | Create a new paste (supports password, burn, TTL, media) | No |
| `GET` | `/api/pastes/{id}` | Retrieve paste content (auto-burns if burn-after-reading) | No |
| `POST` | `/api/pastes/{id}/verify` | Unlock password-protected paste | No |
| `GET` | `/api/pastes/user/all` | List all pastes created by authenticated user | **Yes** |
| `DELETE` | `/api/pastes/{id}` | Permanently delete owned paste | **Yes** |
| `GET` | `/api/pastes/public` | List recent public pastes | No |

### AI Intelligence Operations (`/api/ai`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/generate-title` | Generate concise 8-word title from snippet | No |
| `POST` | `/api/ai/summarize` | Generate structured markdown summary of text | No |
| `POST` | `/api/ai/summarize-with-media` | Multimodal summary combining text notes and image/PDF | No |
| `POST` | `/api/ai/chat` | Contextual Q&A conversation grounded in paste content | No |
| `POST` | `/api/ai/chat-with-media` | Multimodal visual Q&A inspecting diagrams and code | No |
| `POST` | `/api/ai/translate` | Translate paste content into any natural language | No |
| `POST` | `/api/ai/detect-type` | Auto-detect content category (`code`, `notes`, `article`, etc.) | No |

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate with email and password | No |
| `POST` | `/api/auth/oauth2/google` | Google OAuth2 token exchange | No |
| `POST` | `/api/auth/forgot-password` | Request password reset verification link | No |
| `POST` | `/api/auth/reset-password` | Complete password reset using secure token | No |

### Media Uploads (`/api/media`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/media/upload` | Multipart upload for images/PDFs to Cloudinary CDN | No |

---

## 🌐 Production Deployment

Zyren is engineered for continuous deployment across modern cloud infrastructure:

```text
               ┌────────────────────────┐
               │  Netlify / Vercel Edge │
               │   (React 19 Client)    │
               └───────────┬────────────┘
                           │ HTTPS REST API Calls
                           ▼
               ┌────────────────────────┐
               │    Render Cloud Host   │
               │  (Dockerized Backend)  │
               └───────────┬────────────┘
         ┌─────────────────┼──────────────────┐
         ▼                 ▼                  ▼
┌─────────────────┐ ┌──────────────┐ ┌─────────────────┐
│ Neon Serverless │ │  Cloudinary  │ │   Resend API    │
│   PostgreSQL    │ │   Media CDN  │ │  Transactional  │
│      (16+)      │ │ (Attachments)│ │     Emails      │
└─────────────────┘ └──────────────┘ └─────────────────┘
```

### 1. Backend Deployment (Render / Docker)
The backend includes a multi-stage `Dockerfile` optimized for memory efficiency and sub-second startup:
```bash
# Build the Docker container locally
docker build -t zyren-backend ./backend

# Run the container
docker run -p 8080:8080 --env-file backend/.env zyren-backend
```
In Render, link your GitHub repository and configure environment variables matching `backend/.env`.

### 2. Frontend Deployment (Netlify / Vercel)
The frontend includes pre-configured `_redirects` and SPA fallback rules ensuring seamless client-side routing:
```bash
cd frontend
npm run build
```
Deploy via Netlify or Vercel CLI. Set `VITE_API_URL` to your production backend URL.

---

## 🔒 Performance & Security Hardening

- **Stateless Authorization:** Authenticates requests via cryptographically signed HMAC-SHA256 JWT tokens.
- **BCrypt Password Hashing:** Salted password encryption protects user credentials and password-guarded pastes.
- **Connection Pool Tuning:** Optimized HikariCP settings ensure low-latency connection recycling with Neon serverless PostgreSQL.
- **Lazy Initialization:** `spring.main.lazy-initialization=true` drastically reduces JVM startup time and cold boot overhead in cloud container environments.
- **CORS & Origin Filtering:** Explicit origin white-listing prevents unauthorized cross-site scripting and unauthorized iframe framing.

---

## ❓ Troubleshooting & FAQ

### Q: Why did Groq previously return a 404 "model_not_found" error?
**A:** Groq decommissioned older model checkpoints (including `llama-3.3-70b-versatile` and `llama-4-maverick`). Zyren resolves this with an automated fallback pipeline using verified active models (`groq/compound-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.8-27b`, `groq/compound`) that automatically shifts to Google Gemini if Groq is unavailable.

### Q: My Gemini API key starts with `AQ.` — is it valid?
**A:** Yes! Modern Google AI Studio keys start with `AQ.` (e.g. `AQ.Ab8RN...`). Zyren communicates over Google's `v1beta` endpoint which natively authenticates both `AQ.` and legacy `AIza` keys. Run `.\validate-gemini-key.ps1` to test your key against live endpoints.

### Q: How does Burn-After-Reading work?
**A:** When a user accesses a Burn-After-Reading paste, the backend serves the content to the client and immediately executes a transactional SQL `DELETE`. Once the browser tab is closed or refreshed, the paste can never be retrieved again.

### Q: What happens if an attached image fails during AI analysis?
**A:** Zyren features a graceful degradation mechanism: if all vision models across Groq and Gemini fail, the system automatically degrades to text-only analysis, ensuring the user still receives an accurate text summary without crashing.

---

## 💡 Technology Decisions & Rationale

### Why Spring Boot 3.5 & Java 21+?
Enterprise paste platforms demand strict security, high concurrency, and long-term maintainability. Spring Boot provides battle-tested JPA repository abstractions, declarative transaction boundaries, and a mature security ecosystem.

### Why Groq LPU + Google Gemini Dual AI Strategy?
Groq provides unmatched LPU inference speeds (~280 tokens/sec), making real-time code titles and instant summaries feel instantaneous. Google Gemini provides unmatched multimodal visual reasoning for complex architecture diagrams and PDFs. Combining both gives users the best of speed and vision intelligence with zero single-point-of-failure risk.

### Why React 19 + Vite?
Vite provides instant HMR and optimized asset bundling. React 19 provides modern concurrent rendering abstractions, delivering responsive code editing and fluid drawer transitions on mobile and desktop.

---

## 🤝 Contributing

Contributions are welcome! Whether fixing a bug, adding an AI feature, or improving documentation, your help is appreciated.

### How to Contribute
1. **Fork the Repository** on GitHub
2. **Clone your fork locally**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/zyren.git
   cd zyren
   ```
3. **Create a descriptive feature branch**:
   ```bash
   git checkout -b feature/AmazingPasteFeature
   ```
4. **Make your changes and verify with tests**:
   ```bash
   cd backend && ./mvnw clean test
   cd ../frontend && npm run build
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "Add AmazingPasteFeature with automated tests"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/AmazingPasteFeature
   ```
7. **Open a Pull Request** on GitHub

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and [SECURITY.md](./SECURITY.md) for full contribution guidelines.

---

## 📄 License

This project is licensed under the **[MIT License](LICENSE)**.

```text
MIT License — Copyright (c) 2024-2026 Rakin Mohammed Rafeeq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions...
```

See the [LICENSE](LICENSE) file for the full license text.

---

## 🙏 Acknowledgments

### Technologies & Frameworks
- [Spring Boot](https://spring.io/projects/spring-boot) — Enterprise backend framework
- [React](https://reactjs.org/) — Dynamic user interface rendering
- [PostgreSQL](https://www.postgresql.org/) & [Neon](https://neon.tech/) — Cloud-native serverless PostgreSQL
- [Groq](https://groq.com/) — Lightning-fast LPU inference platform
- [Google Gemini](https://ai.google.dev/) — Multimodal visual intelligence & document reasoning
- [Cloudinary](https://cloudinary.com/) — Global edge media delivery CDN
- [Resend](https://resend.com/) — Modern transactional email API
- [Tailwind CSS](https://tailwindcss.com/) — Modern styling and glassmorphic UI

### Vision & Inspiration
Engineered to prove that modern content-sharing tools can combine blazing-fast performance with enterprise-grade multi-provider AI resilience, multimodal intelligence, and privacy-first security.

---

## 📬 Contact

For inquiries, feature requests, or collaboration:

- **Author & Architect:** Rakin Mohammed Rafeeq
- **Portfolio Website:** [rakinmohammedrafeeq.vercel.app](https://rakinmohammedrafeeq.vercel.app)
- **Email:** [rakinmohammedrafeeq@gmail.com](mailto:rakinmohammedrafeeq@gmail.com)
- **LinkedIn:** [linkedin.com/in/rakinmohammedrafeeq](https://www.linkedin.com/in/rakinmohammedrafeeq)
- **GitHub:** [github.com/rakinmohammedrafeeq](https://github.com/rakinmohammedrafeeq)

---

## ☕ Support

If you find Zyren useful or inspiring, please consider supporting the project:

- ⭐ **Star the repository** on GitHub
- 🐛 **Report issues** and submit feature enhancements
- ☕ **Buy Me a Coffee:**

<p align="left">
  <a href="https://buymeacoffee.com/rakinmohammedrafeeq">
    <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee"/>
  </a>
</p>

---

<div align="center">
  <img src="public/logo.png" alt="Zyren Logo" width="48" height="48">
  <br/>
  <b>Zyren</b> — Intelligent Paste Sharing for Modern Engineering Teams.
  <br/>
  <i>Crafted with precision by <a href="https://rakinmohammedrafeeq.vercel.app">Rakin Mohammed Rafeeq</a></i>
</div>
