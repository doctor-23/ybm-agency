# YMB Agency — Next.js проект

Проект на базе Next.js 15 и React 19 с TypeScript и SCSS-модулями. Поддержаны unit-тесты (Vitest + Testing Library) и e2e-тесты (Playwright).

## Стек

- Next.js 15 (`next`)
- React 19 (`react`, `react-dom`)
- TypeScript
- SCSS-модули (`sass`)
- Юнит-тесты: Vitest + Testing Library (`vitest`, `@testing-library/*`, `jsdom`)
- E2E: Playwright (`@playwright/test`)
- Утилиты: `classnames`, `react-responsive`, `swiper`, `dompurify`
- Линтинг: `eslint`, `eslint-config-next`

## Требования

- Node.js (LTS)
- npm (или совместимый менеджер пакетов)

## Установка

```bash
npm install
# (однократно) установка браузеров Playwright
npm run test:e2e:install
```

## Скрипты

- Разработка: `npm run dev` (http://localhost:3000)
- Сборка: `npm run build`
- Продакшн-билд: `npm run deploy`
- Продакшн-сервер: `npm run start`
- Линтинг: `npm run lint`
- Юнит-тесты:
  - Разовый прогон: `npm run test:unit`
  - Watch-режим: `npm run test:unit:watch`
- E2E:
  - Headless: `npm run test:e2e`
  - UI-режим: `npm run test:e2e:ui`
- Все тесты: `npm run test:all`

## Структура проекта

- `src/app/` — маршрутизация и страницы Next.js App Router
- `src/context/` — контексты React (например, `SliderContext.tsx`)
- `src/data/` — данные/константы (например, `sliderItems.ts`)
- `src/hooks/` — пользовательские хуки (например, `useMainHeight.ts`, `useContainerWidth.ts`)
- `src/styles/` — глобальные стили (`globals.scss`)
- `src/ui/` — UI-компоненты/модули (SCSS-модули)
- `public/` — статические файлы (изображения, svg)
- `e2e/` — E2E-тесты Playwright
- `test-results/` — артефакты тестов (если включены)
- Конфиги:
  - `next.config.ts` — настройки Next.js
  - `vite.config.ts` — конфиг Vitest (секция `test`) + alias `@ -> ./src`
  - `playwright.config.ts` — конфиг Playwright
  - `tsconfig.json`, `eslint.config.mjs`, `package.json`

## Разработка

```bash
npm run dev
# откройте http://localhost:3000
```

Основная страница: `src/app/page.tsx`. Стили: SCSS/SCSS-модули. Глобальные стили — `src/styles/globals.scss`.

## Тестирование

- Юнит:
  ```bash
  npm run test:unit
  npm run test:unit:watch
  ```
  Конфиг: `vite.config.ts` (секция `test`), сетап: `src/setupTests.ts`.
  Примеры: `src/context/SliderContext.test.tsx`, `src/hooks/__tests__/useMainHeight.test.tsx`.

- E2E:
  ```bash
  npm run test:e2e:install  # один раз
  npm run test:e2e          # headless
  npm run test:e2e:ui       # UI-режим
  ```
  Конфиг: `playwright.config.ts`, примеры: `e2e/home.spec.ts`.

Playwright поднимет dev-сервер автоматически (см. `webServer` в `playwright.config.ts`).

## Сборка и запуск

```bash
npm run build
npm run start
```

## Линтинг

```bash
npm run lint
```

## Переменные окружения

На текущий момент специальных переменных окружения не требуется. Для добавления создайте файлы `.env*` и используйте `process.env.NEXT_PUBLIC_*` для браузерной части.

## Полезное

- SCSS-модули включены; глобальные стили — через `src/styles/globals.scss`.
- Alias `@` указывает на `./src` (используется Vitest/Vite; для импорта в приложении можно также использовать относительные пути или настроить `tsconfig.json` `paths` при необходимости).
- Для безопасной вставки HTML используйте `dompurify`.

## Лицензия

Внутренний тестовый проект.
