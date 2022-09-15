FROM ubuntu:20.04

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get install dos2unix

FROM openjdk:8-jdk-oracle as builder
# COPY gradlew .
# COPY gradle gradle
# COPY build.gradle .
# COPY settings.gradle .
# COPY src src
WORKDIR /var/jenkins_home/workspace/ggotmari/backend
RUN dos2unix ./gradlew
RUN chmod +x ./gradlew
RUN ./gradlew build

COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
