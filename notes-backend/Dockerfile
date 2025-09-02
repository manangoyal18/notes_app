# -----------------------
# Build stage
# -----------------------
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (better caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the app
RUN mvn clean package -DskipTests

# -----------------------
# Runtime stage
# -----------------------
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the built JAR and rename it to app.jar
COPY --from=build /app/target/*.jar app.jar

# Expose Spring Boot's default port
EXPOSE 8080

# Run the application
CMD ["java", "-Dspring.profiles.active=postgres", "-jar", "app.jar"]
