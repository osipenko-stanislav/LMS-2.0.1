# Исследование и оптимизация Codex Skills

Дата: 24 ноября 2026

> Предварительный отчёт. Полный обход 60 записей каталога и анализ исходников кандидатов не завершены. Классификация ниже — гипотезы для проверки, не результаты полного аудита. A/B-тесты не проводились.

## Результат

Текущий набор хорошо покрывает UI, Figma, motion и React performance, но перегружен пересекающимися визуальными skills. Главные универсальные пробелы — воспроизводимая browser QA и security review.

## Инвентаризация

Обнаружено 34 пользовательских ссылки/пакета (число включает отключённые; не равно числу доступных в текущей сессии skills), среди них `impeccable`, `frontend-design`, `interaction-design`, `emil-design-eng`, `web-design-guidelines`, `apple-design`, `react-best-practices`, `cu-proofread`, `libraries-dev`, `prototype`, `brandkit`, `stitch-design-taste` и восемь Figma skills. Системные skills включают `review-agent`, `openai-docs`, `skill-creator`, `skill-installer` и `imagegen`.

В конфигурации отключены старые taste/output/image-to-code/redesign skills. Это снижает конкуренцию между визуальными маршрутами.

Публичная страница каталога Codex заявляет 60 skills. Локальный curated-cache содержит 39 записей. Поэтому каталог нельзя считать полностью проверенным только по локальному cache: часть данных загружается динамически.

## Карта компетенций

| Область | Покрытие | Комментарий |
|---|---|---|
| UI/UX | сильное | Есть общий polish, frontend design, accessibility и платформенные правила |
| Motion | сильное | Есть interaction, design-engineering и animation review |
| Figma | очень сильное | Есть fetch, implement, generate, library, rules и Code Connect |
| React performance | среднее | Покрывается `react-best-practices` |
| Browser QA | поверхностное | Нет установленного специализированного Playwright skill |
| Security | слабое | Нет постоянного security review маршрута |
| Schema/data contracts | отсутствует | Подтверждённого специализированного skill не найдено |
| Strict TypeScript | отсутствует | Отдельного подтверждённого skill не найдено |
| Form states | отсутствует | Покрытие только общими UI skills |

## Дублирование

`impeccable`, `frontend-design`, `web-design-guidelines` и `apple-design` частично пересекаются, но имеют разные режимы: общий polish, новое visual direction, audit и Apple HIG. Их нельзя запускать одновременно по одному слову «UI».

`interaction-design`, `emil-design-eng` и `review-animations` пересекаются в motion. Первый лучше использовать для реализации, второй — для craft-level interaction review, третий — для отдельного аудита.

Figma skills уже покрывают соответствующие curated-кандидаты. Добавление копий из каталога не даст новой компетенции.

## Предварительная классификация кандидатов

| Кандидат | Решение | Обоснование |
|---|---|---|
| `playwright` | **ADD** | Добавляет воспроизводимую browser automation, assertions и проверку UI states |
| `playwright-interactive` | **ON DEMAND** | Полезен для ручной инспекции, но не нужен в основном маршруте вместе с Playwright |
| `security-best-practices` | **ADD** | Добавляет отдельный security review для auth, данных, зависимостей и API |
| `security-threat-model` | **ON DEMAND** | Нужен для новых интеграций, auth-flow и внешних границ |
| `security-ownership-map` | **ON DEMAND** | Ценен в больших командах и audit ownership, избыточен для одиночных UI-проектов |
| `gh-fix-ci` | **ON DEMAND** | Применим при падении CI, но не в каждой задаче |
| `gh-address-comments` | **ON DEMAND** | Полезен только в PR workflow |
| `notion-spec-to-implementation` | **ON DEMAND** | Зависит от Notion и не универсален |
| дополнительные Figma skills | **SKIP** | Уже покрыты установленным набором |
| `define-goal` | **SKIP** | Цель и неоднозначности уже обрабатываются глобальными инструкциями |

## Предлагаемая маршрутизация

Сначала определяется режим задачи, затем выбирается один основной skill и максимум один дополнительный:

| Сигнал | Основной | Дополнительный |
|---|---|---|
| Figma URL/node | `figma-implement-design` | `figma-use` |
| UI polish/redesign | `impeccable` | `frontend-design` |
| Motion implementation | `interaction-design` | `emil-design-eng` |
| Motion review | `emil-design-eng` | `review-animations` |
| Browser verification | `playwright` | `playwright-interactive` |
| Security/auth/secrets | `security-best-practices` | `security-threat-model` |
| Apple UI/HIG | `apple-design` | `web-design-guidelines` |
| CI failure | `gh-fix-ci` | `review-agent` |

Отдельный исходник Skill Advisor в доступном окружении не найден. Поэтому выводы о маршрутизации основаны на частично прочитанных SKILL.md, доступных descriptions, invocation policy и конфигурации, а не на полном коде Advisor.

## A/B-тесты

Практические тесты пока не проводились. Для объективного сравнения нужны изолированные задачи:

1. Responsive UI change с edge cases.
2. Playwright-сценарий для Combobox/Popover.
3. Security review формы с пользовательскими данными.
4. Refactoring TypeScript-компонента.

Сравнивать нужно число найденных дефектов, ручных уточнений, повторных итераций, edge cases, созданных проверок и регрессий после сборки.

## Рекомендации

1. Приоритетно добавить `playwright`.
2. Добавить `security-best-practices`.
3. Оставить threat-model и interactive Playwright on demand.
4. Не добавлять новые эстетические и Figma skills.
5. Упростить Advisor до взаимоисключающих режимов, чтобы не загружать несколько overlapping skills.
6. Отдельно рассмотреть schema contracts и strict TypeScript после проверки их реальных исходников в каталоге.

## Ограничения исследования

Исходники Schema Contracts, Strict TypeScript, PR Review, Form States, Secrets Handling и Interface Craft ещё не проверены. Содержимое дополнительных ресурсов всех установленных skills не проанализировано полностью. Локальный curated-cache OpenAI — самостоятельный источник, он не является копией каталога Skilling. Подтверждённый топ-10 по всему каталогу пока не сформирован. Рекомендации ADD требуют проверки первоисточника перед установкой.

## Источники

- [Codex skills catalog](https://skillings.vercel.app/platform/codex)
- [Локальный curated cache](/Users/st.osipenko/.codex-cu/vendor_imports/skills-curated-cache.json)
- [Локальные установленные skills](/Users/st.osipenko/.codex-cu/skills)
- [Codex project repository](https://github.com/openai/skills)

