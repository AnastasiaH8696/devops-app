pipeline {
  agent any
  
  environment {
    dockerimage = 'anastasiah8696/app-backend'
    dockerImageBackend = ''
    dockerImageFrontend = ''
  }

  stages {
    stage('Checkout Source') {
      steps {
        git 'https://github.com/AnastasiaH8696/devops-app.git'
      }
    }

    stage('Build image') {
      steps {
        script {
          dockerImageBackend = docker.build("-f backend/Dockerfile ${dockerimage}")
          dockerimage = 'anastasiah8696/app-frontend'
          dockerImageFrontend = docker.build("-f frontend/Dockerfile ${dockerimage}")
        }
      }
    }

    stage('Pushing Image') {
      environment {
        registryCredential = 'dockerhub-credentials'
      }
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
            dockerImageFrontend.push('latest')
            dockerImageBackend.push('latest')
          }
        }
      }
    } 

    /*stage('Deploying notes-app container to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: 'deploymentservice.yml', kubeconfigId: 'kubernetes')
        }
      }
    }*/
  }
}
