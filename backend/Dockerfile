# Use lightweight OpenJDK base image
FROM openjdk:17-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the built jar from host to container
COPY target/*.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8082

# Define environment variables (optional defaults - override in runtime)
ENV SPRING_PROFILES_ACTIVE=prod

# Start the application with environment-aware config
ENTRYPOINT ["java", "-jar", "app.jar"]
