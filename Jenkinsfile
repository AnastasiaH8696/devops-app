pipeline {
  agent any
  
  environment {
    dockerImageBackend = 'anastasiah8696/app-backend'
    dockerImageFrontend = 'anastasiah8696/app-frontend'
    PROJECT_ID = 'devops-app-391512'
    CLUSTER_NAME = 'autopilot-cluster-1'
    LOCATION = '<YOUR_CLUSTER_LOCATION>'
    CREDENTIALS_ID = 'devops-app'
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
          dockerImageBackend = docker.build("${dockerImageBackend}", "-f backend/Dockerfile .")
          dockerImageFrontend = docker.build("${dockerImageFrontend}", "-f frontend/Dockerfile .")
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
       // Authenticate with GKE
       gkeCluster(
         name: 'autopilot-cluster-1',
         projectID: 'devops-app-391512',
         credentialsID: 'devops-app'
       ) {
         // Run kubectl commands or apply deployment YAML
         withEnv(["PATH+KUBECTL=/usr/local/bin"]) {
           sh 'kubectl apply -f deploymentservice.yaml'
         }
       }
     }
   }
  }
}
