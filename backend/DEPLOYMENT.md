# ClearHire Backend Deployment Guide

## Environment Variables Setup

### For Local Development
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your actual values:
   ```env
   OPENAI_API_KEY=your_actual_openai_api_key_here
   MONGODB_URI=mongodb://localhost:27017/clearhire
   JWT_SECRET=your_secure_jwt_secret_here
   ```

### For Render Deployment

1. **Environment Variables to Set on Render:**
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `MONGODB_URI`: Your MongoDB connection string (keep your current Atlas URI)
   - `JWT_SECRET`: A secure JWT secret key (generate a new long random string)
   - `SERVER_PORT`: `8080` (or leave empty, Render will set it)
   - `CORS_ALLOWED_ORIGINS`: Your frontend URL (e.g., `https://your-frontend.vercel.app`)

2. **Render Deployment Steps:**
   - Connect your GitHub repository to Render
   - Select "Web Service"
   - Set the build command: `cd backend && mvn clean package -DskipTests`
   - Set the start command: `cd backend && java -jar target/backend-0.0.1-SNAPSHOT.jar`
   - Add all the environment variables listed above

3. **Important Notes:**
   - Make sure your `.env` file is in `.gitignore` (already done)
   - The backend will automatically use environment variables on Render
   - Update your frontend API base URL to point to your Render backend URL

## Local Development

1. **Start the backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **The backend will run on:** `http://localhost:8080`

## API Endpoints

- **Resume Upload**: `POST /api/resume/upload`
- **Get Resume**: `POST /api/resume/getResumeByEmail`
- **User Authentication**: `POST /api/auth/login`, `POST /api/auth/signup`

## Troubleshooting

- If you get "OPENAI_API_KEY not found" error, make sure the environment variable is set correctly
- For CORS issues, ensure your frontend URL is added to `CORS_ALLOWED_ORIGINS`
- Check Render logs for any deployment issues
