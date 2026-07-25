# Contributing to Zyren 🤝

First off, thank you for considering contributing to Zyren! It's people like you that make Zyren such a great tool.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

---

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive.

### Standards
**Examples of behavior that contributes to a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## How Can I Contribute?

### Reporting Bugs 🐛

**Before submitting a bug report:**
- Check the documentation
- Search existing issues to avoid duplicates
- Try to reproduce with the latest version

**When submitting a bug report, include:**
- Clear, descriptive title
- Steps to reproduce the behavior
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, versions)
- Error messages and stack traces

**Template:**
```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
What you expected to happen

**Actual Behavior:**
What actually happened

**Environment:**
- OS: [e.g., Windows 11, macOS 14, Ubuntu 22.04]
- Browser: [e.g., Chrome 120, Firefox 121]
- Zyren Version: [e.g., 1.2.0]
- Java Version: [e.g., 21.0.1]
- Node Version: [e.g., 20.10.0]

**Additional Context:**
Any other relevant information
```

### Suggesting Features 💡

**Before submitting a feature request:**
- Check if it's already been suggested
- Consider if it fits Zyren's scope and vision
- Think about how it benefits most users

**When suggesting a feature, include:**
- Clear, descriptive title
- Detailed description of the feature
- Use cases and examples
- Why this feature would be useful
- Potential implementation approach (optional)
- Mockups or diagrams (if applicable)

### Contributing Code 🔧

**Types of contributions we're looking for:**
- Bug fixes
- Feature implementations
- Performance improvements
- Documentation improvements
- Test coverage expansion
- UI/UX enhancements
- Accessibility improvements

---

## Development Setup

### Prerequisites
- Java 21 or higher
- Node.js 18+ and npm/pnpm
- PostgreSQL (or Oracle for local dev)
- Git
- Your favorite IDE (IntelliJ IDEA, VS Code recommended)

### Fork and Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/zyren.git
cd zyren

# Add upstream remote
git remote add upstream https://github.com/rakinmohammedrafeeq/zyren.git
```

### Backend Setup
```bash
cd backend

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your settings

# Install dependencies and run
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run dev
```

### Verify Setup
- Backend: http://localhost:8080/actuator/health should return `{"status":"UP"}`
- Frontend: http://localhost:5173 should load the app
- Create a test paste to verify everything works

---

## Coding Standards

### Backend (Java/Spring Boot)

#### General Guidelines
- Follow Spring Boot best practices
- Use constructor injection over field injection
- Keep controllers thin, business logic in services
- Use DTOs for API request/response
- Implement proper exception handling

#### Naming Conventions
```java
// Classes: PascalCase
public class PasteService { }

// Methods: camelCase
public Paste createPaste(PasteRequest request) { }

// Constants: UPPER_SNAKE_CASE
private static final String DEFAULT_CODE_LENGTH = "8";

// Variables: camelCase
String pasteContent = "example";
```

#### Code Example
```java
@Service
@RequiredArgsConstructor
public class PasteService {
    private final PasteRepository pasteRepository;
    
    /**
     * Creates a new paste with the given content.
     * 
     * @param request the paste creation request
     * @return the created paste entity
     * @throws InvalidPasteException if validation fails
     */
    public Paste createPaste(PasteRequest request) {
        // Validate input
        validatePasteRequest(request);
        
        // Build entity
        Paste paste = Paste.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .code(generateUniqueCode())
            .build();
            
        // Save and return
        return pasteRepository.save(paste);
    }
}
```

### Frontend (TypeScript/React)

#### General Guidelines
- Use functional components with hooks
- Keep components small and focused (< 200 lines)
- Extract reusable logic into custom hooks
- Use TypeScript strictly (no `any` types)
- Follow React 19 best practices

#### Naming Conventions
```typescript
// Components: PascalCase
export default function PasteCard() { }

// Hooks: camelCase starting with 'use'
export function usePasteData() { }

// Functions: camelCase
function handleSubmit() { }

// Constants: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 15 * 1024 * 1024;

// Types/Interfaces: PascalCase
interface Paste {
  id: number;
  title: string;
}
```

#### Code Example
```typescript
import { useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';

interface PasteFormProps {
  onSuccess?: () => void;
}

export default function PasteForm({ onSuccess }: PasteFormProps) {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post('/paste', formData);
      toast.success('Paste created successfully!');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create paste');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain dark/light mode compatibility
- Use semantic HTML elements

```tsx
// Good
<button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
  Submit
</button>

// Avoid custom CSS unless absolutely necessary
```

---

## Commit Guidelines

### Commit Message Format
```
type(scope): brief description

Optional detailed explanation of the changes.
Can span multiple lines.

- List specific changes made
- Reference issues: Closes #123, Relates to #456

Types: feat, fix, docs, style, refactor, test, chore, perf
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring (no feature change)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, build, etc.)
- **perf**: Performance improvements

### Examples
```bash
# Good commits
feat(ai): add support for PDF vision analysis
fix(auth): resolve JWT token expiration bug
docs(readme): update API endpoint documentation
style(frontend): format code with prettier
refactor(paste): extract validation logic to utility
test(api): add integration tests for paste endpoints
chore(deps): upgrade Spring Boot to 3.5.7
perf(db): optimize paste query with indexes

# Bad commits
fix: fixed stuff
update: changes
wip: work in progress
```

### Commit Best Practices
- Make atomic commits (one logical change per commit)
- Write clear, descriptive messages
- Reference issues when applicable
- Keep commits focused and small
- Test before committing

---

## Pull Request Process

### Before Submitting

1. **Update your fork:**
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create a feature branch:**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

3. **Make your changes:**
- Write clean, documented code
- Follow coding standards
- Add tests if applicable
- Update documentation

4. **Test thoroughly:**
```bash
# Backend
cd backend
./mvnw test

# Frontend
cd frontend
npm run lint
npm run build
```

5. **Commit your changes:**
```bash
git add .
git commit -m "feat(scope): your commit message"
```

6. **Push to your fork:**
```bash
git push origin feature/your-feature-name
```

### Submitting the PR

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing
How has this been tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed my own code
- [ ] Commented complex code sections
- [ ] Updated documentation
- [ ] No new warnings or errors
- [ ] Added tests for new features
- [ ] All tests pass locally

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #123
Relates to #456
```

### After Submitting

- **Respond to feedback:** Address review comments promptly
- **Update as needed:** Push additional commits if requested
- **Keep it updated:** Merge upstream changes if needed
- **Be patient:** Reviews may take a few days

### Review Process

1. **Initial Review:** Maintainer checks for completeness
2. **Code Review:** Detailed code examination
3. **Testing:** Verify functionality works as expected
4. **Approval:** PR is approved and merged

---

## Community

### Communication Channels

- **GitHub Issues:** Bug reports and feature requests
- **GitHub Discussions:** General questions and ideas
- **Pull Requests:** Code contributions and reviews
- **Email:** rakinmohammedrafeeq@gmail.com for sensitive topics

### Getting Help

**Stuck or need guidance?**
- Check the documentation first
- Search closed issues for similar problems
- Ask in GitHub Discussions
- Reach out via email if needed

**Response Times:**
- Issues: Within 2-3 days
- PRs: Within 3-5 days
- Discussions: Within 1 week

---

## Recognition

Contributors will be recognized in several ways:
- Listed in CONTRIBUTORS.md (coming soon)
- Mentioned in release notes
- GitHub contributor badge
- Our eternal gratitude! 🙏

---

## Questions?

Don't hesitate to ask! We're here to help:
- **Email:** rakinmohammedrafeeq@gmail.com
- **LinkedIn:** [linkedin.com/in/rakinmohammedrafeeq](https://www.linkedin.com/in/rakinmohammedrafeeq)
- **GitHub:** [@rakinmohammedrafeeq](https://github.com/rakinmohammedrafeeq)

---

**Thank you for contributing to Zyren! 🚀**

*Every contribution, no matter how small, makes a difference.*
