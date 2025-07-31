# AI Assistant 행동 및 코드 작성 규칙

1. 사용자의 요구사항을 반드시 정확하게 따르세요.
2. 먼저 단계별로 상세한 pseudocode(의사코드)로 계획을 설명하세요.
3. 반드시 사용자에게 확인 후 코드를 작성하세요.
4. 항상 최신, 버그 없는, 완전한, 안전하고 효율적인 코드를 작성하세요.
5. 성능보다 **가독성**을 우선하세요.
6. 요청된 모든 기능을 완전히 구현하세요.
7. TODO, 미완성, 빈칸 없이 완성된 코드를 작성하세요.
8. 코드가 완전한지 꼼꼼히 검증하세요.
9. 필요한 **import**를 모두 포함하고, 주요 컴포넌트의 이름을 명확히 하세요.
10. 불필요한 설명은 줄이고, 간결하게 답변하세요.
11. 정답이 없거나 모를 경우 솔직하게 답변하세요.
12. 항상 간결하게 답변하세요.
13. 답변은 반드시 한국어로 작성하세요.

# Copilot AI Agent Instructions for fullstack-inflearn-clone

# 커밋 메시지 컨벤션

## 기본 형식

다음 Conventional Commits 형식을 엄격하게 따라 커밋 메시지를 생성하세요:

<type>[optional scope]: <한글 설명>

[optional 한글 본문]

이슈 번호 (해당시)

## 타입 분류

1. type은 다음 중 하나를 사용하세요 (영어로 유지):

- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 관련 변경
- style: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- refactor: 코드 리팩토링
- test: 테스트 코드 관련 변경
- chore: 빌드 프로세스 또는 보조 도구 변경

2. scope는 선택사항이며 변경이 영향을 미치는 부분을 명시합니다 (예: ui, api, auth)

3. 모든 설명은 한글로 작성하고, 간결하고 명확한 어조로 작성하세요

4. 중요한 변경사항을 우선적으로 설명하고, 맥락 이해에 필요하지 않은 사소한 수정사항은 생략하세요

5. 변경 내용 이해에 중요한 경우에만 핵심 파일이나 컴포넌트를 언급하세요

6. '이 커밋은', '이 변경은' 같은 표현은 사용하지 마세요

7. 추측성 결론은 작성하지 말고, 실제 코드 변경사항을 기반으로한 사실만 작성하세요

8. 불필요한 설명은 생략하고 변경의 핵심을 간결하게 전달하세요

9. 첫 줄(제목)은 50-72자 이내로 유지하세요

10. 본문 작성 시 다음 가이드라인을 따르세요:

- 각 항목은 글머리 기호(-)로 시작하세요
- 각 항목은 동사로 시작하는 간결한 문장으로 작성하세요
- 항목별로 한 줄씩 작성하고 줄당 72자를 넘지 마세요
- 관련 항목끼리 그룹화하세요
- 필요한 경우 '이유'와 '결과'를 명시하세요 (예: '성능 개선을 위해 캐싱 도입')
- 코드 변경의 맥락이 중요한 경우에만 추가 설명을 포함하세요

11. 변경된 기능이나 컴포넌트의 맥락을 명확히 포함하세요:

- 변경 대상(객체, 서비스, 컴포넌트 등)의 전체 맥락을 명시하세요
- 예를 들어 "요청 객체" 대신 "공용자산 요청 객체"와 같이 완전한 맥락을 제공하세요
- 관련된 도메인이나 기능 영역을 항목 설명에 포함하세요

## 좋은 커밋 메시지 예시

### 기본형

[feat] 비밀번호 재설정 기능 추가

### 상세형

[fix] 파일 업로드 시 용량 제한 오류 수정

10MB 이상 파일 업로드 시 발생하는 오류 해결
프론트엔드에서 파일 크기 사전 검증 로직 추가
에러 메시지를 사용자 친화적으로 변경

Closes #456

## 피해야 할 커밋 메시지

❌ `수정`
❌ `버그 고침`  
❌ `코드 정리`
❌ `업데이트`

✅ `[fix] 로그인 폼 유효성 검사 오류 수정`
✅ `[refactor] 사용자 서비스 클래스 구조 개선`
✅ `[chore] 의존성 패키지 버전 업데이트`

# Copilot AI Agent Instructions for fullstack-inflearn-clone

## Overview

This is a fullstack monorepo with a Next.js (frontend) and NestJS (backend) architecture. The backend uses Prisma for database access and PostgreSQL as the main DB. The frontend is a modern Next.js app with custom UI components and Tailwind CSS.

## Architecture

- **frontend/**: Next.js app (App Router, TypeScript, custom UI in `components/ui/`, Tailwind CSS, Radix UI, shadcn)
- **backend/**: NestJS app (TypeScript, Prisma ORM, PostgreSQL, Docker support)
- **generated/prisma/**: Prisma client output (do not edit manually)
- **prisma/schema.prisma**: Shared DB schema (sync changes between frontend/backend as needed)

## Developer Workflows

- **Install dependencies**: Use `pnpm install` at the root. Monorepo uses pnpm workspaces.
- **Run frontend**: `pnpm dev` in `frontend/` (Next.js dev server)
- **Run backend**: `pnpm start:dev` in `backend/` (NestJS dev server)
- **Prisma migration**: Edit `prisma/schema.prisma`, then run `pnpm prisma migrate dev` in `backend/`.
- **Generate Prisma client**: `pnpm prisma generate` (run after schema changes)
- **Testing**: Backend uses Jest (`pnpm test` in `backend/`).
- **Linting**: `pnpm lint` in each package.

## Conventions & Patterns

- **UI Components**: All reusable UI lives in `frontend/components/ui/`. Use Radix primitives and shadcn conventions. Prefer composition over inheritance.
- **Styling**: Tailwind CSS with custom properties in `app/globals.css`. Use `@apply` and CSS variables for theme.
- **Data Flow**: API routes in `frontend/app/api/` proxy to backend or handle auth. Backend exposes REST endpoints.
- **Environment**: Use `.env` files for secrets. `DATABASE_URL` required for Prisma.
- **Type Safety**: Use TypeScript everywhere. Sync types between backend/frontend as needed.

## Integration Points

- **Prisma**: Both frontend and backend reference the same schema. Always run generate after schema changes.
- **Auth**: NextAuth.js in frontend (`app/api/auth/[...nextauth]/route.ts`).
- **Docker**: `backend/docker-compose.yml` for local DB/dev stack.

## Examples

- Add a new DB field: Edit `prisma/schema.prisma` → run `pnpm prisma migrate dev` → run `pnpm prisma generate`.
- Add a UI component: Create in `frontend/components/ui/`, follow shadcn/radix patterns.
- Add a backend route: Implement in `backend/src/`, register in `app.module.ts`.

## References

- `frontend/README.md`, `backend/README.md` for more details.
- Key files: `prisma/schema.prisma`, `frontend/app/api/`, `backend/src/`, `frontend/components/ui/`, `app/globals.css`

---

For any automation, always respect workspace boundaries and monorepo structure. When in doubt, check for existing patterns in the relevant directory.
