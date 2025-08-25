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

        stage('Publish report') {
            steps {
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

    post {
        always {
            echo 'Pipeline finalizada (sucesso ou falha)'
        }
        success {
            echo '✅ Testes concluídos com sucesso!'
        }
        failure {
            echo '❌ Falha nos testes!'
        }
    }
}
