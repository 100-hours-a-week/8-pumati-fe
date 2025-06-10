# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder

# 기본 패키지 설치
RUN apk add --no-cache libc6-compat

# 작업 디렉토리
WORKDIR /app

# 패키지 매니저 설치
RUN npm install -g pnpm

# 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 소스 복사
COPY . .
COPY next.config.ts ./

# 빌드 시점 환경변수 인자 정의
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_S3_HOSTNAME
ARG NEXT_PUBLIC_KATEBOO_CODE

# 환경변수 설정 (Next.js는 빌드 시점에 환경변수를 사용하므로 반드시 필요)
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_S3_HOSTNAME=$NEXT_PUBLIC_S3_HOSTNAME
ENV NEXT_PUBLIC_KATEBOO_CODE=$NEXT_PUBLIC_KATEBOO_CODE

# 빌드 실행
RUN pnpm build

# 2단계: 실행용 스테이지
FROM node:20-alpine AS runner

# 기본 패키지 설치
RUN apk add --no-cache libc6-compat

# 패키지 매니저 설치
RUN npm install -g pnpm

# 작업 디렉토리
WORKDIR /app

# 의존성 설치 (프로덕션에 필요한 최소 패키지만 설치)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# 빌드 결과물 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 런타임에서도 환경변수가 필요하므로 실행 이미지에도 설정
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_S3_HOSTNAME
ARG NEXT_PUBLIC_KATEBOO_CODE

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_S3_HOSTNAME=$NEXT_PUBLIC_S3_HOSTNAME
ENV NEXT_PUBLIC_KATEBOO_CODE=$NEXT_PUBLIC_KATEBOO_CODE

# 환경설정 및 포트 노출
ENV NODE_ENV=production
EXPOSE 3000

# 애플리케이션 실행
CMD ["pnpm", "start"]
