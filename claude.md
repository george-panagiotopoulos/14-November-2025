# Code Preferences and Standards for TravelHub

## Project Overview
TravelHub is a travel portal application with a frontend UI (HTML/CSS/JavaScript) and a Django backend API.

## Technology Stack
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Django (Python)
- **Internationalization**: Custom i18n library (js/i18n.js)
- **Data Format**: JSON files for translations and mock data

## Code Style and Standards

### JavaScript
- Use ES6+ modern JavaScript syntax
- Prefer `const` and `let` over `var`
- Use arrow functions where appropriate
- Use async/await for asynchronous operations
- Use template literals for string interpolation
- Function naming: camelCase (e.g., `getCurrentUser`, `loadData`)
- Class naming: PascalCase (e.g., `I18n`)
- Constants: UPPER_SNAKE_CASE for true constants
- Always use semicolons at the end of statements
- Use strict equality (`===`, `!==`) instead of loose equality
- Add JSDoc comments for complex functions

### HTML
- Use semantic HTML5 elements
- Include proper meta tags and accessibility attributes
- Use `data-i18n` attributes for translatable text
- Use `data-i18n-placeholder` for input placeholders
- Use `data-i18n-title` for title attributes
- Always include alt text for images
- Use proper form validation attributes (required, type, etc.)
- Indent with 4 spaces

### CSS
- Use CSS custom properties (CSS variables) for theming
- Prefix custom properties with `--` (e.g., `--primary-color`)
- Use BEM-like naming for complex components
- Mobile-first responsive design approach
- Use flexbox and grid for layouts
- Keep specificity low, avoid deep nesting
- Group related properties together

### File Organization
```
travel_portal_ui/
├── css/              # Stylesheets
├── js/               # JavaScript files
│   ├── i18n.js      # Internationalization library
│   ├── main.js      # Core utilities and navigation
│   ├── auth.js      # Authentication logic
│   ├── search.js    # Search functionality
│   └── ...          # Page-specific scripts
├── data/            # JSON data files
│   ├── translations/
│   │   ├── en.json  # English translations
│   │   └── zh.json  # Chinese translations
│   └── ...          # Other data files
├── *.html           # HTML pages
├── .env             # Environment variables (not committed)
└── start.sh         # Application startup script
```

## Environment Variables
- **NEVER** hardcode sensitive information (API keys, passwords, URLs)
- **ALWAYS** use environment variables from `.env` file
- **NEVER** commit `.env` file to version control
- Use meaningful variable names in UPPER_SNAKE_CASE
- Document all environment variables in `.env.example`

## Internationalization (i18n)
- All user-facing text must be translatable
- Use `data-i18n` attributes in HTML for static text
- Use `i18n.t(key, defaultText)` in JavaScript for dynamic content
- Translation keys use dot notation (e.g., `nav.home`, `search.destination`)
- Keep translation files organized by feature/section
- Always provide English as the fallback language
- Supported languages: English (en), Mandarin Chinese (zh)

## API Integration
- Backend API runs on Django
- Use async/await for all API calls
- Always handle errors gracefully with try/catch
- Show user-friendly error messages
- Store authentication tokens in localStorage
- Never expose API credentials in frontend code

## Local Storage Usage
- `currentUser` - Stores logged-in user information
- `language` - Stores user's preferred language (en/zh)
- Always check if data exists before parsing
- Use try/catch when parsing JSON from localStorage

## Security Best Practices
- Validate all user inputs on both frontend and backend
- Use HTTPS in production
- Sanitize user-generated content to prevent XSS
- Never trust client-side validation alone
- Use parameterized queries to prevent SQL injection (backend)
- Implement CSRF protection (backend)
- Set proper CORS headers

## Development Workflow
1. Always start the application using `./start.sh`
2. Run on port 8787 (configured in .env)
3. Test in multiple browsers
4. Test language switching between English and Mandarin
5. Verify mobile responsiveness
6. Check console for errors before committing

## Git Commit Standards
- Use clear, descriptive commit messages
- Reference issue numbers when applicable
- Commit message format: `<type>: <description>`
  - feat: New feature
  - fix: Bug fix
  - docs: Documentation changes
  - style: Code style changes (formatting, etc.)
  - refactor: Code refactoring
  - test: Adding tests
  - chore: Maintenance tasks

## Testing Checklist
- [ ] All pages load without console errors
- [ ] Language switcher works on all pages
- [ ] Navigation links work correctly
- [ ] Forms validate properly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Authentication flow works correctly
- [ ] API calls handle errors gracefully

## Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

## Performance Guidelines
- Minimize HTTP requests
- Optimize images (use appropriate formats and sizes)
- Lazy load images when possible
- Minimize JavaScript file sizes
- Use CSS minification in production
- Cache static assets appropriately

## Accessibility Standards
- Follow WCAG 2.1 Level AA guidelines
- Ensure keyboard navigation works
- Provide sufficient color contrast
- Include ARIA labels where appropriate
- Test with screen readers

## Code Review Checklist
- [ ] Code follows style guidelines
- [ ] No hardcoded values (use .env)
- [ ] All text is translatable
- [ ] Error handling is implemented
- [ ] Code is properly commented
- [ ] No console.log statements in production
- [ ] Security best practices followed
- [ ] Responsive design tested

## Port Configuration
- **Frontend Development Server**: Port 8787 (configured in .env)
- **Backend Django Server**: Port 8000 (default)
- Always use the start.sh script to ensure correct port configuration

## Notes for AI Assistants
- Always respect these code preferences
- Never hardcode values that should be in .env
- Always add i18n support for new user-facing text
- Follow the established file organization
- Maintain consistency with existing code style
- Ask for clarification if requirements conflict with these standards
