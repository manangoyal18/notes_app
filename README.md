# Notes App Backend

A Spring Boot REST API for managing notes with full CRUD functionality, optimistic locking for concurrent updates, and support for both H2 (development) and PostgreSQL (production) databases.

## Features

- ✅ Full CRUD operations for notes
- ✅ Optimistic locking to handle concurrent updates
- ✅ H2 in-memory database for development and testing
- ✅ PostgreSQL support for production
- ✅ Input validation and comprehensive error handling
- ✅ RESTful API design with proper HTTP status codes
- ✅ Layered architecture (Controller → Service → Repository → Entity)

## Tech Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: H2 (development) / PostgreSQL (production)
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven
- **Validation**: Bean Validation (JSR-303)

## Database Schema

```sql
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    version BIGINT NOT NULL DEFAULT 0  -- For optimistic locking
);
```

## API Endpoints

### Base URL: `http://localhost:8080`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/notes` | Create a new note | `{"title": "string", "content": "string"}` | Created note with timestamps |
| GET | `/notes` | Get all notes | None | Array of all notes |
| GET | `/notes/{id}` | Get note by ID | None | Single note object |
| PUT | `/notes/{id}` | Update existing note | `{"title": "string", "content": "string"}` | Updated note |
| DELETE | `/notes/{id}` | Delete note | None | 204 No Content |

### Sample Requests and Responses

#### 1. Create Note
```bash
POST /notes
Content-Type: application/json

{
  "title": "Shopping List",
  "content": "Milk, Eggs, Bread"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Shopping List",
  "content": "Milk, Eggs, Bread",
  "createdAt": "2023-12-07T10:30:00",
  "updatedAt": "2023-12-07T10:30:00",
  "version": 0
}
```

#### 2. Get All Notes
```bash
GET /notes
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Shopping List",
    "content": "Milk, Eggs, Bread",
    "createdAt": "2023-12-07T10:30:00",
    "updatedAt": "2023-12-07T10:30:00",
    "version": 0
  }
]
```

#### 3. Get Single Note
```bash
GET /notes/1
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Shopping List",
  "content": "Milk, Eggs, Bread",
  "createdAt": "2023-12-07T10:30:00",
  "updatedAt": "2023-12-07T10:30:00",
  "version": 0
}
```

#### 4. Update Note
```bash
PUT /notes/1
Content-Type: application/json

{
  "title": "Updated Shopping List",
  "content": "Milk, Eggs, Bread, Butter"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Updated Shopping List",
  "content": "Milk, Eggs, Bread, Butter",
  "createdAt": "2023-12-07T10:30:00",
  "updatedAt": "2023-12-07T10:35:00",
  "version": 1
}
```

#### 5. Delete Note
```bash
DELETE /notes/1
```

**Response (204 No Content)**

### Error Responses

#### Validation Error (400 Bad Request)
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "fieldErrors": {
    "title": "Title is required"
  },
  "timestamp": "2023-12-07T10:30:00"
}
```

#### Not Found Error (404 Not Found)
```json
{
  "code": "NOT_FOUND",
  "message": "Note not found with id: 999",
  "timestamp": "2023-12-07T10:30:00"
}
```

#### Optimistic Lock Error (409 Conflict)
```json
{
  "code": "CONFLICT",
  "message": "The note was modified by another user. Please refresh and try again.",
  "timestamp": "2023-12-07T10:30:00"
}
```

## Race Conditions and Mitigation

### Problem: Concurrent Updates
When multiple users try to update the same note simultaneously, race conditions can occur, potentially causing data loss or inconsistent state.

### Solution: Optimistic Locking
This application implements **optimistic locking** using JPA's `@Version` annotation:

1. **Version Field**: Each note has a `version` field that increments on every update
2. **Conflict Detection**: When updating, Hibernate checks if the version matches the expected value
3. **Exception Handling**: If versions don't match, an `OptimisticLockException` is thrown
4. **User Notification**: The API returns a 409 Conflict status with a clear error message

**Flow Example:**
```
User A reads note (version: 1)
User B reads note (version: 1)
User A updates note → Success (version becomes 2)
User B tries to update → OptimisticLockException → 409 Conflict
```

## Authentication & Security

### Current Implementation
This demo version has **no authentication** for simplicity and quick testing.

### Production Recommendation: JWT with Spring Security

For production use, implement JWT-based authentication:

```java
// Add to pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
</dependency>
```

**Architecture:**
1. **User Registration/Login** → Returns JWT token
2. **Protected Endpoints** → Require `Authorization: Bearer <token>` header
3. **Token Validation** → Custom filter validates JWT on each request
4. **User Context** → Associate notes with authenticated users

**Security Benefits:**
- Stateless authentication
- Scalable across multiple server instances
- Fine-grained access control
- Token expiration for enhanced security

## Running Locally

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd notes-app
   ```

2. **Run with H2 (Development):**
   ```bash
   mvn spring-boot:run
   ```

3. **Run with PostgreSQL:**
   ```bash
   # First, ensure PostgreSQL is running and create database
   createdb notesdb
   
   # Run with postgres profile
   mvn spring-boot:run -Dspring-boot.run.profiles=postgres
   ```

4. **Access the application:**
   - API Base URL: `http://localhost:8080`
   - H2 Console: `http://localhost:8080/h2-console` (username: `sa`, password: empty)

### Testing the API

Using curl:
```bash
# Create a note
curl -X POST http://localhost:8080/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"This is a test"}'

# Get all notes
curl http://localhost:8080/notes

# Get specific note
curl http://localhost:8080/notes/1

# Update note
curl -X PUT http://localhost:8080/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Note","content":"Updated content"}'

# Delete note
curl -X DELETE http://localhost:8080/notes/1
```

## Deployment

### Heroku Deployment

1. **Create Heroku app:**
   ```bash
   heroku create your-notes-app
   ```

2. **Add PostgreSQL addon:**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set SPRING_PROFILES_ACTIVE=postgres
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

### Render Deployment

1. **Create a new Web Service** on Render
2. **Connect your repository**
3. **Configure build settings:**
   - Build Command: `mvn clean package`
   - Start Command: `java -jar target/notes-app-0.0.1-SNAPSHOT.jar`
4. **Add environment variables:**
   - `SPRING_PROFILES_ACTIVE`: `postgres`
   - `DB_USERNAME`: (from PostgreSQL service)
   - `DB_PASSWORD`: (from PostgreSQL service)

### Environment Variables for Production

```bash
# Database Configuration
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/database

# Profile Selection
SPRING_PROFILES_ACTIVE=postgres

# Optional: Custom port
PORT=8080
```

## Development

### Project Structure
```
src/
├── main/
│   ├── java/com/example/notesapp/
│   │   ├── NotesAppApplication.java      # Main class
│   │   ├── controller/                   # REST controllers
│   │   ├── service/                      # Business logic
│   │   ├── repository/                   # Data access
│   │   ├── entity/                       # JPA entities
│   │   ├── dto/                          # Data transfer objects
│   │   └── exception/                    # Error handling
│   └── resources/
│       ├── application.properties        # H2 config
│       ├── application-postgres.properties # PostgreSQL config
│       └── data.sql                      # Sample data
└── test/
    └── java/com/example/notesapp/       # Unit tests
```

### Adding New Features

1. **Entity Changes**: Modify `Note.java` and create migration scripts
2. **New Endpoints**: Add methods to `NoteController.java`
3. **Business Logic**: Implement in `NoteService.java`
4. **Database Queries**: Add to `NoteRepository.java`
5. **Validation**: Use Bean Validation annotations
6. **Error Handling**: Update `GlobalExceptionHandler.java`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details