# LMS 2.0.1

Минимальный слой данных для React/Vite с реальными компонентами Linear UI, Tailwind CSS v4 и Storybook.

## Запуск

```sh
npm ci
npm run dev              # http://localhost:5173
npm run storybook        # http://localhost:6006
```

Для браузерных проверок требуется установленный Google Chrome.

## Данные и контракты

- `src/core/domain.ts` — сущности, branded IDs, связи и `Provenance`.
- `src/core/data-source.ts` — заменяемый `DataSource` и `FixtureDataSource`.
- `src/core/fixtures.ts` — структурированные fixtures и отдельно текстовый контент.
- `src/core/actions.ts` — единый типизированный dispatcher действий.
- `src/core/view-contracts.ts` — состояние, данные и доступные действия.

`App` получает данные через `DataSource`, а действия проходят через единый типизированный dispatcher. API-адаптер может реализовать тот же контракт без изменения визуальной композиции.

## Дизайн-система

Исходники Linear UI находятся в `src/vendor/linear-ui`. Commit, происхождение и подтверждение разрешения на использование описаны в [UPSTREAM.md](src/vendor/linear-ui/UPSTREAM.md). Компоненты и исходные стили перенесены без визуальной имитации; отдельный пакет не создаётся.

Единые точки импорта:

```tsx
import { Button, Select, Badge, useTheme } from './ui';
import { BookOpen } from 'lucide-react';
import './ui/styles.css'; // один раз в точке входа приложения
```

- Tailwind v4 подключён через `@tailwindcss/vite`.
- Единственный набор семантических токенов — `src/vendor/linear-ui/styles/tokens.css`; отображение токенов в Tailwind — соседний `index.css`.
- Inter загружается локально через `@fontsource/inter`, без сетевого запроса к сервису шрифтов.
- `useTheme` из Linear UI поддерживает System/Light/Dark, `localStorage` (`linear-ui-theme`), синхронизацию вкладок и реакцию на системную тему.
- `ThemeControl` использует настоящий Linear UI `Select` и тот же `useTheme`.
- `Icon` сохраняет штатную интеграцию Linear UI с Hugeicons; `lucide-react` доступен дополнительно. В композиции Lucide используется с `strokeWidth={1.8}`, размером и цветом от компонентов системы.

Изменения токенов разрешены владельцем проекта. Значения пока сохранены как в upstream. Изменения следует выполнять в едином наборе, согласованно для Light/Dark, без параллельных переменных по компонентам.

## Storybook

Галерея `Linear UI/Gallery` использует оригинальные интерактивные примеры библиотеки: компоненты форм, отображения, навигации, overlays, таблицы, токены и иконки. Это демонстрационные fixtures upstream, изолированные от данных LMS. Дополнительно:

- `Linear UI/Controls/Button` — Controls для variants, sizes, текста и disabled.
- Базовая галерея и Motion Gallery содержат интерактивные stories. Обёртка Storybook переносит образцы ThemePicker на узкой ширине; это не меняет исходники компонента.
- Переключатель темы в верхней панели Storybook меняет тему preview, включая портальные меню и диалоги.

## Проверки

```sh
npm run typecheck
npm run build
npm run build-storybook
npm run test:browser
```

`typecheck` проверяет исходники приложения, компоненты библиотеки, stories, конфигурации Vite/Storybook и браузерные тесты. Раньше корневой `tsc --noEmit` с пустым `files` не проверял приложение — команда исправлена.

Браузерные сценарии проверяют 1440/375 px, обе темы, сохранение темы, клавиатурный фокус, отсутствие переполнения экрана, изменение оценки и provenance, рендер зарегистрированных stories, disabled-состояние и диалог. Скриншоты и результаты дополнительных проверок находятся в `artifacts/`.

Ограничения: сборки приложения и Storybook предупреждают о крупных чанках. После добавления Motion основной JS приложения составляет около 655 kB (201 kB gzip); перед продуктовым распространением motion-слоя стоит выделить ленивую загрузку движка. `npm audit` сообщает о четырёх moderate-проблемах в dev-цепочке Storybook/docgen (`glob`, `minimatch`); принудительный downgrade Storybook не применялся. Backend, новые LMS-сценарии и дополнительные renderer-слои не добавлены.


## Motion Integration

`Linear UI/Motion Gallery` содержит пять сравнений: Overlay, Selection, Expand / Collapse, Layout Transition и Feedback. Исходная и opt-in версии используют одни и те же Linear UI компоненты. Stiffness, damping и mass можно менять в Storybook Controls и прямо в галерее; доступны три пресета.

Общие primitives и особенности Radix Portal описаны в [ui/motion/README.md](src/ui/motion/README.md). Утверждённая физика включена в общих компонентах и автоматически работает в обычных stories и будущих Gen UI-композициях. MotionProvider задаёт общие параметры; enabled={false} отключает motion для выбранного поддерева. Исходная колонка Motion Gallery использует это отключение для сравнения.

Браузерные motion-проверки находятся в `scripts/motion.spec.ts` и `scripts/motion-integration.spec.ts`: повторные и прерванные действия, autofocus после прерванного exit, возврат фокуса, контент меняющейся высоты, перестановка элементов, feedback/reset, обе темы, 1440/375 px и Reduced Motion.

Tooltip сохраняет задержку Radix и пропускает entrance-анимацию при instant-open. Button и Toggle используют общую press-пружину без DOM-обёртки и без дублирования CSS-scale. Item анимирует существующие изменения размеров и порядка; статическому контенту entrance-анимации не добавлены. Toolbar Storybook позволяет выбрать общий spring-пресет.


## Релиз 0.1.0

- Правила проекта: [AGENTS.md](AGENTS.md), [DESIGN.md](DESIGN.md), [ARCHITECTURE.md](ARCHITECTURE.md).
- Исследование Beautiful UI и состояние Gen UI: [BEAUTIFUL_UI_REPORT.md](BEAUTIFUL_UI_REPORT.md). Отчёт описывает состояние на момент исследования; последующие изменения проверяйте по исходникам.
- Текущая версия содержит системный Composer, локальную историю чатов и Библиотеку вложений. Файлы хранятся в IndexedDB браузера; синхронизации между устройствами нет.
- Аудиозапись и распознавание — сценарная имитация. Веб-/LMS-поиск в Composer не подключён к внешним сервисам. Ответы Навигатора локальные.
- Архив `lms-2.0.1-v0.1.0-web.zip` содержит production-сборку для статического HTTP-хостинга. Исходники доступны в репозитории и стандартных GitHub Source code archives.
- Приложение использует hash-маршрутизацию; сборка поддерживает размещение в подкаталоге. Браузерное хранилище привязано к origin опубликованного сайта.

Проверки текущего релиза: типизация, production-сборка и целевые сценарии Composer/Библиотеки. Полный набор старых браузерных тестов не является подтверждённой проверкой релиза: часть сценариев относится к прежним данным и интерфейсу.
