FROM openjdk:8-jdk-oracle as builder
# COPY gradlew .
# COPY gradle gradle
# COPY build.gradle .
# COPY settings.gradle .
# COPY src src
WORKDIR /var/jenkins_home/workspace/ggotmari/backend
RUN ls ./
RUN chmod +x ./gradlew
RUN ./gradlew bootJAR

COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
