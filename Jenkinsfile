pipeline {
  agent any

  environment {
    PROJECT_NAME     = "pumati"                       // 프로젝트명
    SERVICE_NAME     = "frontend"                     // 서비스명
    ENV_LABEL        = ""                             // dev / prod (브랜치에 따라 설정됨)
    BUILD_FILE       = ""                             // S3에 업로드할 zip 파일 이름
    S3_BUCKET        = "s3-pumati-common-storage"     // S3 버킷
    AWS_REGION       = "ap-northeast-2"
  }

  stages {
    stage('Set Branch & Environment') {
      steps {
        script {
          // Git 브랜치명 가져오기 (origin/ 접두사 제거)
          def branchName = env.BRANCH_NAME ?: env.GIT_BRANCH?.replaceFirst(/^origin\//, '')
          def label = ''

          // 브랜치명에 따라 환경 라벨 설정
          if (branchName == 'main') {
            label = 'prod'
          } else if (branchName == 'dev') {
            label = 'dev'
          } else if (branchName == 'test-a') {
            label = 'test'
            echo "🧪 테스트 브랜치에서 실행 중입니다 (${branchName})"
          } else {
            error "⛔ 지원되지 않는 브랜치입니다: ${branchName}"
          }

          // 공유 환경 변수에 반영
          env.BRANCH = branchName
          env.ENV_LABEL = label
        }
      }
    }

    stage('Notify Before Start') {
      steps {
        script {
          withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD')]) {
            discordSend(
              description: "🚀 배포가 곧 시작됩니다: ${env.SERVICE_NAME} - ${env.ENV_LABEL} 환경",
              link: env.BUILD_URL,
              title: "배포 시작",
              webhookURL: DISCORD
            )
          }
        }
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'pnpm install'
      }
    }

    stage('Fetch .env from AWS Secrets Manager') {
      steps {
        script {
          def secret = sh(
            script: """
              aws secretsmanager get-secret-value \
                --secret-id ${env.PROJECT_NAME}-${env.ENV_LABEL}-${env.SERVICE_NAME}-.env \
                --region ${env.AWS_REGION} \
                --query SecretString \
                --output text
            """,
            returnStdout: true
          ).trim()

          writeFile file: '.env', text: secret
        }
      }
    }

    stage('Build') {
      steps {
        sh 'pnpm build'
      }
    }

    stage('Archive & Upload to S3') {
      steps {
        script {
          def timestamp = new Date().format("yyyyMMdd-HHmmss", TimeZone.getTimeZone('Asia/Seoul'))
          def shortHash = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          env.BUILD_FILE = "output-${timestamp}-${shortHash}.zip"

          sh """
            zip -r ${env.BUILD_FILE} .next public package.json .env
            aws s3 cp ${env.BUILD_FILE} s3://${env.S3_BUCKET}/CI/${env.ENV_LABEL}/${env.SERVICE_NAME}/${env.BUILD_FILE} --region ${env.AWS_REGION}
          """
        }
      }
    }
  }

  post {
    success {
      script {
        if (env.BRANCH in ['main', 'dev']) {
          withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD')]) {
            discordSend description: """
            제목 : ${currentBuild.displayName}
            결과 : ${currentBuild.result}
            실행 시간 : ${currentBuild.duration / 1000}s
            """,
            link: env.BUILD_URL, result: currentBuild.currentResult,
            title: "${env.JOB_NAME} : ${currentBuild.displayName} 성공",
            webhookURL: DISCORD
          }
        }
      }
    }

    failure {
      script {
        if (env.BRANCH in ['main', 'dev']) {
          withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD')]) {
            discordSend description: """
            제목 : ${currentBuild.displayName}
            결과 : ${currentBuild.result}
            실행 시간 : ${currentBuild.duration / 1000}s
            """,
            link: env.BUILD_URL, result: currentBuild.currentResult,
            title: "${env.JOB_NAME} : ${currentBuild.displayName} 실패",
            webhookURL: DISCORD
          }
        }
      }
    }
  }
}
