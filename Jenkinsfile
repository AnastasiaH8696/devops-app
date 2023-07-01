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
          dockerImageBackend = docker.build("${dockerimage}", "-f backend/Dockerfile .")
          dockerimage = 'anastasiah8696/app-frontend'
          dockerImageFrontend = docker.build("${dockerimage}", "-f frontend/Dockerfile .")
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

    stage('Deploy to GKE') {
      steps {
        script {
          def gcpCredential = credentials('devops-app')
          withEnv([
            'GOOGLE_APPLICATION_CREDENTIALS=' + gcpCredential,
            'PATH=/google-cloud-sdk/bin:${env.PATH}'
          ]) {
            sh '''
              gcloud container clusters get-credentials autopilot-cluster-1 --region europe-west1 --project devops-app-391512
              kubectl apply -f deploymentservice.yaml
            '''
          }
        }
      }
    }
  }
}
