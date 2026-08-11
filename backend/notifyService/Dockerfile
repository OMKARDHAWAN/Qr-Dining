# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Limit memory to prevent Maven from overloading the 1GB RAM instance
ENV MAVEN_OPTS="-Xmx512m -XX:MaxMetaspaceSize=128m"

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build production package
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
