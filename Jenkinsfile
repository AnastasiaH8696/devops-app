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

   /* stage('Deploy to GKE') {
      steps {
        script {
          def gcpCredential = credentials('devops-app')
          withEnv([
            'GOOGLE_APPLICATION_CREDENTIALS=' + gcpCredential,
            'PATH=/google-cloud-sdk/bin:${env.PATH}'
          ]) {
            sh '''
              echo "Running command gcloud..."
              gcloud container clusters get-credentials autopilot-cluster-1 --region europe-west1 --project devops-app-391512
              echo "Finished command gcloud..."
              echo "Running command kubectl..."
              kubectl apply -f deploymentservice.yaml
              echo "Finished command kubectl..."
            '''
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "kubernetes")
        }
      }
    }*/

    stage('Build and Deploy') {
      steps {
          sh 'docker-compose up -d'
      }
    }    
  }
}
