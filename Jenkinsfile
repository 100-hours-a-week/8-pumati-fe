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
          def branchName = env.BRANCH_NAME ?: env.GIT_BRANCH?.replaceFirst(/^origin\//, '')
          env.BRANCH = branchName

          if (branchName == 'main') {
            env.ENV_LABEL = 'prod'
          } else if (branchName == 'dev') {
            env.ENV_LABEL = 'dev'
          } else if (branchName == 'test-a') {
            env.ENV_LABEL = 'test'
            echo "🧪 테스트 브랜치에서 실행 중입니다 (${branchName})"
          } else {
            error "⛔ 지원되지 않는 브랜치입니다: ${branchName}"
          }
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
              webhookURL: "$DISCORD"
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
        sh 'corepack enable && corepack prepare pnpm@latest --activate'
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
        withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD')]) {
          discordSend(
            description: "✅ ${env.SERVICE_NAME} (${env.ENV_LABEL}) 빌드 성공 및 S3 업로드 완료",
            link: env.BUILD_URL,
            title: "S3 업로드 성공",
            webhookURL: "$DISCORD"
          )
        }
      }
    }

    failure {
      script {
        withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD')]) {
          discordSend(
            description: "❌ ${env.SERVICE_NAME} (${env.ENV_LABEL}) 빌드 실패",
            link: env.BUILD_URL,
            title: "빌드 실패",
            webhookURL: "$DISCORD"
          )
        }
      }
    }
  }
}
