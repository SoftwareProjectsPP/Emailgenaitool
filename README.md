# Email AI Utility Tool

A modern web-based email composition tool with intelligent spell checking and grammar correction capabilities. Built with React frontend and Spring Boot backend.

## Features

### ✅ Implemented
- **Smart Spell Check**: JavaScript-based spell checking using typo-js library with Hunspell dictionaries
- **Text Selection Validation**: Spell check works only on selected text with user-friendly validation messages
- **Real-time Feedback**: Visual notifications for spell check results and validation messages
- **Loading States**: Proper loading indicators and error handling for dictionary initialization
- **Responsive UI**: Clean, modern interface with intuitive user experience

### 🚧 Planned
- **Grammar Correction**: AI-powered grammar checking and suggestions
- **Email Templates**: Pre-built templates for common email types
- **Auto-save**: Automatic saving of draft emails
- **Export Options**: Save emails in various formats

## Technology Stack

### Frontend
- **React 19.1.1** with TypeScript
- **Vite 7.1.2** for fast development and building
- **typo-js** for spell checking with Hunspell dictionaries
- **CSS3** for styling and responsive design

### Backend
- **Spring Boot 3.1.5** with Java 17
- **H2 Database** for in-memory data storage
- **Maven** for dependency management

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Java 17
- Maven 3.6+

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SoftwareProjectsPP/Emailgenaitool.git
   cd Emailgenaitool
   ```

2. **Start the Backend Server**
   ```bash
   cd backend/email-backend
   mvn spring-boot:run
   ```
   Backend will be available at `http://localhost:8080`

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

### Development Commands

```bash
# Frontend
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint checks
npm run preview      # Preview production build

# Backend
cd backend/email-backend
mvn spring-boot:run  # Start development server
mvn compile          # Compile Java code
mvn test             # Run unit tests
```

## Usage Guide

### Spell Check Functionality

1. **Compose Email**: Enter your email content in the text area
2. **Select Text**: Highlight the text you want to spell check
3. **Check Spelling**: Click the "Check Spelling" button
4. **Review Results**: 
   - ✅ Green message: No spelling errors found
   - ⚠️ Yellow message: Potential spelling errors listed
   - ❌ Red message: Validation errors or issues

### Text Selection Tips
- Select specific words or phrases for targeted spell checking
- Use Ctrl+A (Cmd+A on Mac) to select all text
- The spell checker will prompt you to select text if none is selected

## Project Structure

```
Emailgenaitool/
├── frontend/                 # React TypeScript application
│   ├── public/              # Static assets and dictionary files
│   │   ├── en_US.aff       # Hunspell affix rules (3KB)
│   │   └── en_US.dic       # English dictionary (551KB)
│   ├── src/
│   │   ├── App.tsx         # Main application component
│   │   ├── App.css         # Application styles
│   │   └── main.tsx        # Application entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
├── backend/
│   └── email-backend/      # Spring Boot application
│       ├── src/main/java/com/emailtool/
│       │   └── App.java    # Main Spring Boot application
│       └── pom.xml         # Maven dependencies
└── README.md              # This file
```

## Technical Details

### Spell Check Implementation
- Uses **typo-js** library with Hunspell-style dictionaries
- Loads English (en_US) dictionary files asynchronously from public directory
- Implements proper error handling and loading states
- Validates text selection before processing
- Filters out duplicate misspellings in results

### Dictionary Files
- **en_US.aff** (3KB): Hunspell affix rules for English word variations
- **en_US.dic** (551KB): Comprehensive English word dictionary
- Files are served statically from the public directory for browser access

### Known Limitations
- Dictionary files increase repository size significantly
- Spell check currently supports English only
- Grammar check functionality is not yet implemented

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Run linting: `npm run lint` (frontend) and `mvn compile` (backend)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Notes

### Recent Updates
- ✅ Fixed typo-js dictionary loading issue where common English words were incorrectly flagged
- ✅ Enhanced spell check to work only on selected text
- ✅ Replaced browser alerts with React-based visual notifications
- ✅ Added proper loading states and error handling
- ✅ Implemented comprehensive text selection validation

### Testing
The application includes comprehensive spell check testing:
- Common English words (e.g., "hello", "world", "and") should not be flagged
- Misspelled words (e.g., "recieve", "seperate", "teh") should be detected
- Text selection validation prevents empty or unselected text processing

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions, issues, or contributions, please:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact the development team

---

**Live Demo**: Available during development sessions
**Repository**: https://github.com/SoftwareProjectsPP/Emailgenaitool
