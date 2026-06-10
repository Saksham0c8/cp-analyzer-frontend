# API Reference

This document describes the backend API endpoints that the Competitive Programming Analyzer frontend expects.

## Base URL

Configure via environment variable:
```
VITE_API_BASE_URL=http://localhost:8080
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer {token}
```

---

## Endpoints

### 1. Register User

**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "johndoe"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid input data
- `409 Conflict` - Username or email already exists

---

### 2. Login User

**POST** `/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "johndoe"
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid credentials
- `400 Bad Request` - Missing required fields

---

### 3. Get Dashboard Analytics

**GET** `/dashboard/{appUsername}/{leetcodeUsername}`

Fetch comprehensive analytics for a user's competitive programming performance.

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `appUsername` (string) - The user's app username
- `leetcodeUsername` (string) - The user's LeetCode username

**Response:** `200 OK`
```json
{
  "analytics": {
    "totalSubmissions": 20,
    "acceptedSubmissions": 12,
    "accuracy": 60.0,
    "difficultyStats": {
      "EASY": 5,
      "MEDIUM": 10,
      "HARD": 5
    },
    "topicStats": {},
    "activityStats": {
      "last7Days": 6,
      "last30Days": 20,
      "activeDays": 20
    },
    "consistency": {
      "activeDays": 20,
      "longestStreak": 20,
      "score": 100.0
    },
    "consistencyScore": 100.0,
    "improvementArea": "Sliding Window",
    "skillLevel": "Intermediate",
    "strongestTopic": "Arrays",
    "topicStrength": {
      "Arrays": {
        "attempted": 2,
        "solved": 2,
        "accuracy": 100.0
      },
      "Dynamic Programming": {
        "attempted": 5,
        "solved": 3,
        "accuracy": 60.0
      }
    },
    "weakTopics": ["Stack", "Sliding Window"],
    "weakestTopic": "Sliding Window"
  },
  "codeforces": null,
  "leetcode": {
    "easySolved": 31,
    "hardSolved": 4,
    "mediumSolved": 42,
    "ranking": 1881311,
    "totalSolved": 77,
    "username": "saksham_05"
  },
  "recommendations": {
    "recommendedProblems": [
      {
        "title": "Valid Parentheses",
        "difficulty": "Easy",
        "topic": "Stack",
        "platform": "LeetCode"
      },
      {
        "title": "Sliding Window Maximum",
        "difficulty": "Hard",
        "topic": "Sliding Window",
        "platform": "LeetCode"
      }
    ]
  },
  "summary": "You are currently at Intermediate level. Your accuracy is 60.0%. Your strongest topic is Arrays. Focus more on Sliding Window. Excellent consistency."
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing token
- `404 Not Found` - User or LeetCode profile not found
- `500 Internal Server Error` - Server error fetching data

---

## Data Models

### Analytics
```typescript
{
  totalSubmissions: number;
  acceptedSubmissions: number;
  accuracy: number;
  difficultyStats: {
    EASY: number;
    MEDIUM: number;
    HARD: number;
  };
  topicStats: Record<string, any>;
  activityStats: {
    last7Days: number;
    last30Days: number;
    activeDays: number;
  };
  consistency: {
    activeDays: number;
    longestStreak: number;
    score: number;
  };
  consistencyScore: number;
  improvementArea: string;
  skillLevel: string;
  strongestTopic: string;
  topicStrength: Record<string, {
    attempted: number;
    solved: number;
    accuracy: number;
  }>;
  weakTopics: string[];
  weakestTopic: string;
}
```

### LeetCode Profile
```typescript
{
  easySolved: number;
  hardSolved: number;
  mediumSolved: number;
  ranking: number;
  totalSolved: number;
  username: string;
}
```

### Recommended Problem
```typescript
{
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  platform: "LeetCode" | "Codeforces";
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "message": "Error description here",
  "error": "ERROR_CODE",
  "statusCode": 400
}
```

Common error codes:
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## CORS Configuration

The backend should allow requests from the frontend origin:

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## Rate Limiting

Consider implementing rate limiting on authentication endpoints:
- Login: 5 requests per minute per IP
- Register: 3 requests per minute per IP
- Dashboard: 60 requests per minute per user

---

## Testing Endpoints

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**Get Dashboard:**
```bash
curl http://localhost:8080/dashboard/testuser/leetcode_username \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman/Thunder Client

1. Create a new request
2. Set method and URL
3. Add headers (Content-Type, Authorization)
4. Add request body (for POST requests)
5. Send and verify response

---

## Security Considerations

1. **JWT Tokens**
   - Use strong secret keys
   - Set appropriate expiration times (e.g., 24 hours)
   - Implement token refresh mechanism

2. **Password Security**
   - Hash passwords with bcrypt (cost factor 10-12)
   - Never return passwords in responses
   - Enforce password strength requirements

3. **Input Validation**
   - Validate all user inputs
   - Sanitize strings to prevent injection
   - Use schema validation libraries

4. **HTTPS**
   - Use HTTPS in production
   - Enforce secure cookie settings
   - Set appropriate CORS policies

---

## Implementation Notes

### Backend Stack Suggestions
- **Node.js + Express** - Popular choice
- **Python + FastAPI** - Modern async framework
- **Java + Spring Boot** - Enterprise solution
- **Go + Gin** - High performance

### Database
- Store user credentials securely
- Cache LeetCode/Codeforces data
- Track historical analytics
- Store user preferences

### External APIs
- LeetCode API (or scraping)
- Codeforces API
- Implement caching to reduce API calls
- Handle rate limits from external services

---

## Future Endpoints (Planned)

- `GET /profile/{username}` - Get user profile
- `PUT /profile/{username}` - Update user profile
- `GET /history/{username}` - Get submission history
- `POST /compare` - Compare two users
- `GET /leaderboard` - Global leaderboard

---

## Support

For backend implementation questions or issues, refer to:
- Backend repository documentation
- API endpoint testing suite
- Development team contact
