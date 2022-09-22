FROM openjdk:8-jdk-alpine
WORKDIR /var/jenkins_home/workspace/ggotmari/backend

COPY build/libs/*.jar ./app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "./app.jar"]
