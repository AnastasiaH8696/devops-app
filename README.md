# Practicing DevOps Fundamentals
This project purpose is to practice the basic DevOps fundamentals.

## What this project includes
* Simple application developed using the Microservices architecture (Backend: Express.js, Frontend: React)
* Jenkinsfile for the basic CI/CD pipeline we run using Jenkins on Docker container
* deploymentservice.yaml for k8s cluster
* docker-compose.yml for playing with the app locally

## Jenkins on Docker container
You can use the image we created for this practice:
https://github.com/AnastasiaH8696/jenkins-docker

## Starting the app using docker-compose
if you are using docker compose, update the proxy  property inside the frontend/package.json to:
"proxy": "http://backend:5000"

## Important note
You cannot run the full flow we presented here (unless you have the credentials of the images publisher and you are a collaborator in the used Google Cloud account).

But if you can use this project as a reference for your own needs.

