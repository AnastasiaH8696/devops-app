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
      // Define the credentials file path
      def credentialsFile = 'gcp-key.json'

      // Write the credential to a file
      writeFile file: credentialsFile, text: '{
      "type": "service_account",
        "project_id": "devops-app-391512",
          "private_key_id": "2d7bc32cd4bad700fc6e9cae8fd0d2eda52c024b",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCnGgIfoyv3GFTs\nNgxo32ZA991efRh6KdoqY87wd85b18BHF8H5eg0LKiTZbzZVcOYS4Vwvq+4A3392\niSq40nXHfIP+pOyUWZb4dBUuf7Gz7B066rg25s8T4w+1MUK9y9IQ2hr2tq7nfOpj\n7l/jhRfyjUuihUD+/XFh7xSQdvOo21vT890qtSh+55B96Q8ZfPj0UiPSQ6MCbfkH\nhprcmA31LIMf9yZIEUmGZjg59j03sxsyg1gEm+0j32OGY3ZJ0YMGFZJJNBcVD14y\nycW5GSuoN8sRr+0gxY2Pgo9kLbWX97ZSQapMPaqeP8GASu+Qobh/eEZGuFsPTDbx\nCE7k32N5AgMBAAECggEAMX91w5NdEZumhDXaZTJPos0JSNT7bCx7kHTyNq72dKQr\nM6Po9JJfzL/WHIZh7Ns9e7g/y2s9XArYQe+NtSO6ebX7j3GhFqyXGM+h+p0esXIu\nkmY23SRvkK+A1qZZ48i9V/qTZCNnGfEZqTJSOx4QouuRzPl18FJ4xI7CY6yoroqY\nRTEsCDU9+rZig6vxog43rGQm0NrW45ehvciBTssMOBcqngQzVCZt4bLdZtPTV1SK\nRtfty5j6n7rPOphPQofODLfQy2VT/G1wJclUFo2cbNbCH0CvpXmCBRgZjPbOdusQ\nNAjJ2Hkob8MDGZtCTfCDhT8w0LyCPPtK9lLPKe+dhQKBgQDsDBUJy0xGDdrKF4E9\nq+d8p0Tk+YqJfK12ErHkOsh0qmpRVvorOz1s/EiUw/XCNsFxLBvAwgrXa5eEqvli\nXbBbmwrk2sAOsT4RpPIH1+TGCx+NTJkO6lB6Q6bTDRtgkQElDPCGbweI/kPo3f5j\nsbOMC9O367ekBj2YnlGxu2ioTwKBgQC1Ofw3dRKIiHBcS93/DiNa9MROJLl46W0L\n3zbPgxf4F4I2/dghq5pMtO/70XN0wD/8t0Q6XRNesAUa59D3C3zIduzNU/+Zb/hu\nOxZ5X+WDKO156nNjvhjg1bNtd7RvTKZSnivcppB2uNJ+VYuzRWVkP87wOwvbvduL\nuKOUHnf9twKBgGsIa32+bn6Rh7T9hYAGc/gFDOta7+O54hnZDkr0ELM+Ful9LADw\nYsEJgIvcc5K2K2761jbIhgv6YIEq2dwtqWtQWVc+jbnbys5LYegGkFjw8EStB/ZI\nb2eRR5MJrXFTLxay0FnU/LC0wuxTxSdFi6mkL0OFogbBQarzlw2lciZnAoGAKO/U\nPWLAsP7BAthQaVD0Q5OO1GgPTXTNISVm6DEgtPX6gBmPPOvaiwFERInnnrPewGNV\nkil8OqNgQ9ehqGx733yduTQERNC6OYw3Y2t6GMqh+iwvrJRAYmljgpLLu2iBGaCJ\nH+qwL2FIiykfyXsfkCmpwTJVV2nnsgQfT1IioLkCgYAgIrVgcoto9U6Gx0tjfHP/\nCiw+Ep6M2MXgonldWK8MH5O5B3T6vRmyaAkWTo2u16I/tIfOFy7XcXa1r1aVJP9v\nMpFD/OxPGGEgbTWx6Y8P2vS7FrqFPao9zT8Gi183LizHQ1xiwret5/VMYVKkXWCy\nvUulKwBLU9RoqB/HHysZ4A==\n-----END PRIVATE KEY-----\n",
              "client_email": "469657716063-compute@developer.gserviceaccount.com",
                "client_id": "117691250549848367665",
                  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/469657716063-compute%40developer.gserviceaccount.com",
                          "universe_domain": "googleapis.com"}'

      // Authenticate with Google Cloud using gcloud
      sh '''
        ./google-cloud-sdk/bin/gcloud auth activate-service-account --key-file=${credentialsFile}
      '''

      // Configure kubectl to use GKE cluster
      sh '''
        ./google-cloud-sdk/bin/gcloud container clusters get-credentials autopilot-cluster-1 --region europe-west1 --project devops-app-391512
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
