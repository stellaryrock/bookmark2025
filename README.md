# Practical Project

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Project Setup Scripts
1. create next project

```bash
pnpm dlx create-next-app@latest bookmark2025
```

```bash
cd bookmark2025
```

2. prettier & eslint setting

```bash
pnpm add -D prettier eslint-config-prettier 
```

```bash
pnpm add -D @trivago/prettier-plugin-sort-imports
```

.prettierrc

```json
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "parser": "typescript",
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "importOrder": [
    "^next$",
    "^next/\\w*$",
    "^next/(.*)$",
    "^react$",
    "^react/(.*)$",
    "^lucide-react$",
    "^@/lib/(.*)$",
    "^[./]"
  ]
}
```

.prettierignore
```
# Markdown 파일 제외
*.md
*.css

# 이미지, JSON, log 제외
*.png
*.jpg
*.json
*.log
*.ico
*.svg

# node_modules와 빌드 폴더 제외
node_modules
dist
build
LICENSE

.*
*.sql
*.yaml
*.yml
*.json
*.prisma
```

package.json에 format script 걸기
```json
"format": "prettier --write .",
```

```bash
vi eslint.config.mjs
```

```javascript
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/typescript', 'prettier'],
    rules: {}
  }),
]

export default eslintConfig
```

3. node setting

```bash
vi .nvmrc
```

```
v22
```

4. pnpm hoisting setting (for eslint)

```bash
vi .npmrc
```

```
public-hoist-pattern[]=*eslint*
```

5. 새롭게 pnpm 으로 설치
```bash
pnpm install
```

6. shadcn 설치

```bash
pnpm dlx shadcn@latest init
```

```bash 모든 컴포넌트 설치
pnpx shadcn@latest add dashboard-01
```

7. 테마(Dark/Light)
```bash
pnpm add next-themes
```

components/theme-provider.tsx

```typescript
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ComponentProps } from 'react';

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

app/layout.tsx
```typescript
<ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
  ...
</ThemeProvider>
```

components/theme-changer.tsx

```typescript
import { useTheme } from 'next-themes';
const THEMES = ['light', 'system', 'dark'];
const { theme, setTheme } = useTheme();
```

8. next-auth

```bash
pnpm add next-auth@beta
```

lib/auth.ts

```typescript
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    // signIn: '/login',
  },
  providers: [Google, GitHub, Naver, Kakao],
});
```

Auth key 생성 (.env.local에 자동으로 생성)
```bash
pnpm dlx auth secret
```

.env.local
```
DATABASE_URL="mysql://bookmarker@--@127.0.0.1:3309/bookmarkdb?connection_limit=5&pool_timeout=10"

AUTH_SECRET="FzF89ROlg5pOU/GBwHLxvJN"

AUTH_GOOGLE_ID="641566194982-20b29cu2ssn8.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET=GOCSPX-pTpVkTlLswWi9X7

AUTH_GITHUB_ID=Ov23lilo1Te
AUTH_GITHUB_SECRET=3f776e98adfe551f474115d75ebf

AUTH_NAVER_ID="t7BZF1kwdh3"
AUTH_NAVER_SECRET="wMIch8ci"

AUTH_KAKAO_ID="d3134d7758c891199f62c9820"
AUTH_KAKAO_SECRET="7WoTBDPzI9MdtmfsyrqIlSTP"
```

app/api/auth/[...nextauth]/route.ts

```typescript
export { GET, POST } from '@/lib/auth';
// export const runtime = 'edge'; // 'nodejs'
```

app/layout.tsx 에 SessionProvider 걸기

```typescript
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';

const session = use(auth());
...
<SessionProvider session={session}>
  ...
</SessionProvider>
```

middleware.ts 생성

```typescript
import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;
  if (!didLogin) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|login|regist|$).*)',
  ],
};
```

9. next.config.ts 에 이미지 domain 설정

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*.googleusercontent.com' },
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'phinf.pstatic.net' },
      { hostname: '*.kakaocdn.net' },
    ],
  },
};

export default nextConfig;
```

10. prisma setting
```bash
pnpm add -D prisma
```

```bash
pnpm dlx prisma init --datasource-provider mysql
# ==> 이런 후 .env 지우고 .env.local에 연결정보 세팅
```

eslint.config.mjs  (to build project)

```
ignorePatterns: ['lib/generated/prisma/**'],
```

table 생성 (sqls/ddl.sql)

package.json에 script 설정 
```json
"scripts": {
  "db:pull": "dotenv -e .env.local prisma db pull",
  "db:gen": "dotenv -e .env.local prisma generate",
  "db:push": "dotenv -e .env.local prisma db push",
  "db:reset": "dotenv -e .env.local prisma migrate reset",
  "db:seed": "dotenv -e .env.local prisma db seed"
},
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```

```
pnpm db:pull
```

generate해서 prisma-client 설치
```
pnpm db:gen
# ==> prisma/schema.prisma 생성
```

prisma client (lib/db.ts)

```typescript
import { PrismaClient } from '@/lib/generated/prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

seed data (prisma/seed.ts)

```typescript
async function main() {
  const sico = await prisma.member.upsert({
    where: { email: 'indiflex.sico@gmail.com' },
    update: {},
    create: {
      email: 'indiflex.sico@gmail.com',
      nickname: 'sico',
      Books: {
        create: {
          title: 'sico first book',
          withdel: false,
          Marks: {
            create: {
              url: 'https://naver.com',
              title: 'Naver',
              descript: 'seeding...',
            },
          },
        },
      },
    },
  });

  const indiflex = await prisma.member.upsert({
    where: { email: 'indiflex.corp@gmail.com' },
    update: {},
    create: {
      email: 'indiflex.corp@gmail.com',
      nickname: 'indiflex',
      Books: {
        create: [
          {
            title: 'indiflex first book',
            withdel: false,
          },
          {
            title: 'indiflex second book',
            withdel: true,
          },
        ],
      },
    },
  });

  console.log({ sico, indiflex });
}
```

11. encrypt password

```bash
pnpm add bcryptjs  
```

```typescript
import { compare, hash } from 'bcryptjs';

const encPasswd = await hash(passwd, 10);

const isValid = 
      await compare(passwd, encPasswd);
```

12. zod
```bash
pnpm add zod
```

13. login & regist (feat. next-auth)
 1. auth.ts
 1. sign.ts (server action)
 1. app/login/page.tsx 작성