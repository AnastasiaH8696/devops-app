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
      // Authenticate with Google Cloud using gcloud
      sh '''
      gcloud auth activate-service-account --key-file=/var/jenkins_home/workspace/devops-app_master/devops-app-391512-2d7bc32cd4ba.json
      '''

      // Configure kubectl to use GKE cluster
      sh '''
      gcloud container clusters get-credentials autopilot-cluster-1 --region europe-west1 --project devops-app-391512
      '''

      // Execute Kubernetes deployment using kubectl
      sh '''
        kubectl apply -f deploymentservice.yaml
      '''
    }
  }
}

  }
}
