pipeline {
  agent any
  
  environment {
    dockerimagebackend = 'anastasiah8696/app-backend'
    dockerimagefrontend = 'anastasiah8696/app-frontend'
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
            dockerImageFrontend = docker.build dockerimagebackend
            dockerImageBackend = docker.build dockerimagefrontend
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
