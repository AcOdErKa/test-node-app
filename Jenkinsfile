@Library('jenkins-shared-library@main') _

pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                build()
            }
        }
        stage('Test') {
            steps {
                test()
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '**/build/*, **/test-reports/*.xml', allowEmptyArchive: true
        }
    }
}
