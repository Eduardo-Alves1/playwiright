pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.47.0-jammy'
            args '-u root'
        }
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright install --with-deps'
                sh 'npm test'
            }
        }

        post {
            always {
                archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            }
        }
}
