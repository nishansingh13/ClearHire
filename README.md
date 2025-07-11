# ClearHire - AI-Powered Resume Parsing & Recruitment Platform

![ClearHire](frontend/public/header_resume.svg)

ClearHire is a modern, AI-powered recruitment platform that revolutionizes the hiring process by automatically parsing resumes, matching candidates with job roles, and providing an intuitive interface for both job seekers and recruiters.

## 🚀 Features

### For Job Seekers (Candidates)
- **Smart Resume Upload**: AI-powered PDF resume parsing with role-specific optimization
- **Multi-format Support**: Upload PDF resumes up to 10MB
- **Automated Data Extraction**: Extract personal information, skills, experience, and education
- **Role-based Matching**: Select job roles for targeted matching
- **Profile Management**: Update personal information, bio, and contact details
- **Secure Authentication**: JWT-based authentication with HTTP-only cookies

### For Recruiters
- **Candidate Discovery**: Browse and search through a curated pool of candidates
- **Advanced Filtering**: Filter candidates by role, skills, and experience
- **Detailed Profiles**: View comprehensive candidate profiles with parsed resume data
- **Quick Actions**: Schedule interviews, send messages, and download resumes
- **Real-time Statistics**: Track placement success rates and hiring metrics

### AI-Powered Features
- **Resume Parsing**: Powered by OpenAI GPT-4 for accurate data extraction
- **Smart Matching**: AI-driven candidate-job role matching
- **Skills Recognition**: Automatic skill identification and categorization
- **Experience Analysis**: Intelligent parsing of work experience and education

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for modern, responsive styling
- **React Router DOM** for navigation
- **Axios** for API communication
- **Sonner** for toast notifications
- **Lucide React** for icons

### Backend
- **Spring Boot 3.5.3** with Java 21
- **Spring Security** for authentication and authorization
- **MongoDB** for data storage
- **JWT** for token-based authentication
- **Apache PDFBox** for PDF text extraction
- **OpenAI API** (via GitHub Models) for AI-powered resume parsing
- **Maven** for dependency management

### Database
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- Collections: `users`, `resumes`

### Deployment
- **Frontend**: Vercel (Production-ready)
- **Backend**: Render (Docker containerized)
- **Database**: MongoDB Atlas (Cloud)

## 📁 Project Structure

```
ClearHire/
├── frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── clients/        # Candidate-related components
│   │   │   ├── recruiters/     # Recruiter-related components
│   │   │   ├── configContext/  # Configuration provider
│   │   │   └── protect/        # Protected route components
│   │   ├── assets/             # Static assets
│   │   └── main.tsx           # Application entry point
│   ├── public/                 # Public assets
│   └── package.json           # Frontend dependencies
├── backend/                    # Spring Boot backend
│   ├── src/main/java/com/clearhire/backend/
│   │   ├── config/            # Configuration classes
│   │   ├── controller/        # REST controllers
│   │   ├── models/           # Data models
│   │   ├── Repository/       # Data repositories
│   │   ├── service/          # Business logic services
│   │   └── util/             # Utility classes
│   ├── src/main/resources/    # Configuration files
│   ├── Dockerfile            # Docker configuration
│   └── pom.xml              # Maven dependencies
└── README.md                 # This file
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Java 21**
- **Maven** 3.6+
- **MongoDB** (local or Atlas)
- **OpenAI API Key** (via GitHub Models)

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd ClearHire
```

#### 2. Backend Setup
```bash
cd backend

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: Strong JWT secret key
# - GITHUB_TOKEN: GitHub Models API token
# - CORS_ALLOWED_ORIGINS: Frontend URLs

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clearhire
JWT_SECRET=your-super-secret-jwt-key-here
GITHUB_TOKEN=your-github-models-api-token
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Frontend (ConfigProvider)
The frontend uses a configuration context that automatically detects the environment:
- **Development**: `http://localhost:8080`
- **Production**: Your deployed backend URL

## 🐳 Docker Deployment

### Backend Dockerfile
```dockerfile
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/backend-*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

### Build and Deploy
```bash
# Backend
cd backend
mvn clean package
docker build -t clearhire-backend .
docker run -p 8080:8080 --env-file .env clearhire-backend

# Frontend
cd frontend
npm run build
# Deploy dist/ folder to Vercel or similar
```

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register new user |
| POST | `/users/login` | User login |
| GET | `/users/logout` | User logout |
| GET | `/users/token` | Validate JWT token |
| GET | `/users/profile` | Get user profile |
| PUT | `/users/update` | Update user profile |

### Resume Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/upload` | Upload and parse resume |
| POST | `/api/resume/save` | Save parsed resume data |
| GET | `/api/resume/getResumeData` | Get all resumes |
| POST | `/api/resume/getResumeByEmail` | Get resume by email |

## 🎯 User Flows

### Candidate Journey
1. **Registration/Login** → Create account or sign in
2. **Role Selection** → Choose target job role
3. **Resume Upload** → Upload PDF resume for AI parsing
4. **Profile Review** → Review and edit extracted information
5. **Profile Management** → Update personal details and bio

### Recruiter Journey
1. **Login** → Access recruiter dashboard
2. **Browse Candidates** → View all available candidates
3. **Filter & Search** → Find candidates by role, skills, name
4. **View Profiles** → Access detailed candidate information
5. **Take Action** → Schedule interviews, send messages, download resumes

## 🔧 Configuration

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **HTTP-Only Cookies**: Prevents XSS attacks
- **CORS Protection**: Configurable cross-origin resource sharing
- **Password Encryption**: BCrypt hashing for secure password storage
- **Cross-Origin Cookies**: Secure authentication for deployed applications

### AI Integration
- **GitHub Models**: Utilizes OpenAI GPT-4 via GitHub's AI models
- **Resume Parsing**: Intelligent extraction of structured data from PDF resumes
- **Error Handling**: Fallback mechanisms for parsing failures
- **Content Validation**: Ensures extracted data quality and completeness

## 🚀 Deployment

### Production Environment

#### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Set environment variables if needed
4. Deploy automatically on git push

#### Backend (Render)
1. Create new Web Service on Render
2. Connect GitHub repository
3. Configure deployment:
   - Runtime: Docker
   - Dockerfile path: `backend/Dockerfile`
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GITHUB_TOKEN`
   - `CORS_ALLOWED_ORIGINS`

### Environment-Specific Configuration
The application automatically adapts to different environments:
- **Development**: Uses localhost URLs
- **Production**: Uses deployed service URLs
- **Cross-Origin**: Handles CORS for different domain deployments

## 📊 Data Models

### User Model
```java
{
  "email": "user@example.com",      // Primary key
  "name": "John Doe",
  "phone": "+1234567890",
  "experience": "Senior Level (5-8 years)",
  "location": "San Francisco, CA",
  "bio": "Experienced software developer...",
  "password": "encrypted_password"
}
```

### Resume Model
```java
{
  "email": "user@example.com",      // Primary key
  "name": "John Doe",
  "phone": "+1234567890",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": ["**Senior Developer**: Led team of 5...", "**Software Engineer**: Built scalable..."],
  "education": ["BS Computer Science - Stanford University"],
  "role": "Full Stack Developer"
}
```

## 🔍 Troubleshooting

### Common Issues

#### Authentication Issues
- **Problem**: Cookies not being set in production
- **Solution**: Ensure `secure: true` and `sameSite: "None"` for cross-origin deployments

#### Resume Parsing Failures
- **Problem**: AI parsing returns incomplete data
- **Solution**: Check GitHub Models API key and rate limits

#### CORS Errors
- **Problem**: Frontend can't connect to backend
- **Solution**: Verify `CORS_ALLOWED_ORIGINS` includes frontend URL

#### Database Connection
- **Problem**: MongoDB connection failures
- **Solution**: Check `MONGODB_URI` format and network access

### Development Tips
- Use browser developer tools to inspect network requests
- Check backend logs for detailed error messages
- Verify environment variables are loaded correctly
- Test API endpoints using tools like Postman

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenAI** for powerful AI models via GitHub Models
- **Spring Boot** for robust backend framework
- **React** for modern frontend development
- **MongoDB** for flexible data storage
- **Vercel** and **Render** for reliable hosting platforms

---

**ClearHire** - Making hiring transparent and efficient for everyone. 🚀

For support or questions, please open an issue in the repository.
