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
      // Set the PATH environment variable
      withEnv(["PATH+EXTRA=/var/jenkins_home/workspace/devops-app_master/google-cloud-sdk/bin"]) {

        // Validation of the gcloud
        sh 'gcloud version'
        
        // Authenticate with Google Cloud using gcloud
        sh 'gcloud auth activate-service-account --key-file=/var/jenkins_home/workspace/devops-app_master/devops-app-391512-2d7bc32cd4ba.json'

        // Configure kubectl to use GKE cluster
        sh 'gcloud container clusters get-credentials autopilot-cluster-2 --region me-west1 --project devops-app-391512'

        // Execute Kubernetes deployment using kubectl
        sh 'kubectl apply -f deploymentservice.yaml'

        // Check server readiness
        sh 'kubectl rollout status deployment/frontend'

        // Check server readiness
        sh 'kubectl rollout status deployment/backend'

        // Additional checks if required
        sh 'kubectl get pods'
        sh 'kubectl describe deployment frontend'
        sh 'kubectl describe deployment backend'

        // Get the service URL
        def serviceURL = sh(returnStdout: true, script: 'kubectl get service/frontend-service -o jsonpath="{.status.loadBalancer.ingress[0].ip}"').trim()
        echo "Service URL: http://${serviceURL}/"
      }
    }
  }
}


  }
}
