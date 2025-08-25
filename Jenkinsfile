pipeline {
    agent {
        docker {
            //image 'mcr.microsoft.com/playwright:v1.47.0-jammy'
            image 'mcr.microsoft.com/playwright:v1.55.0-noble'
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
                publishHTML(target: [
            allowMissing: false,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright Test Report'
        ])
            }
        }
    }
}
